import fs from 'node:fs';
import type { Command } from 'commander';
import { loadConfig } from './config.js';
import { jiraClient } from './clients.js';
import { emit } from './output.js';
import { withRetry, type RetryOptions } from './retry.js';
import { markdownToAdf, type AdfDoc } from './adf.js';
import { mergeLabels, parseFieldsJson, resolveTransition, type TransitionLike } from './writes.js';

interface BodyOpts {
  bodyMd?: string;
  bodyFile?: string;
  adfFile?: string;
}

/** Resolve a rich-text body: --*-md inline markdown, --*-file markdown file, --adf-file raw ADF JSON. */
function resolveBody(opts: BodyOpts): AdfDoc | undefined {
  if (opts.adfFile) return JSON.parse(fs.readFileSync(opts.adfFile, 'utf8')) as AdfDoc;
  const md = opts.bodyMd ?? (opts.bodyFile ? fs.readFileSync(opts.bodyFile, 'utf8') : undefined);
  return md === undefined ? undefined : markdownToAdf(md);
}

const splitCsv = (v: string): string[] => v.split(',').map((s) => s.trim()).filter(Boolean);

export function registerWriteCommands(program: Command, retryOpts: () => RetryOptions): void {
  const issue = program.commands.find((c) => c.name() === 'issue')!;

  issue
    .command('create')
    .description('Create an issue (labels ai-sdlc-generated unless --no-auto-label)')
    .requiredOption('--project <key>', 'project key')
    .requiredOption('--type <name-or-id>', 'issue type name or id')
    .requiredOption('--summary <text>', 'summary')
    .option('--description-md <markdown>', 'description as markdown')
    .option('--description-file <path>', 'description from a markdown file')
    .option('--adf-file <path>', 'description as raw ADF JSON file (escape hatch)')
    .option('--parent <key>', 'parent issue key (epic or initiative)')
    .option('--labels <csv>', 'labels', splitCsv)
    .option('--fields-json <json>', 'extra fields as a JSON object (field id -> value)')
    .option('--no-auto-label', 'do not add the ai-sdlc-generated label')
    .option('--dry-run', 'print the payload without creating')
    .action(async (opts) => {
      const typeField = /^\d+$/.test(opts.type) ? { id: opts.type } : { name: opts.type };
      const description = resolveBody({
        bodyMd: opts.descriptionMd,
        bodyFile: opts.descriptionFile,
        adfFile: opts.adfFile
      });
      const fields: Record<string, unknown> = {
        project: { key: opts.project },
        issuetype: typeField,
        summary: opts.summary,
        ...(description ? { description } : {}),
        ...(opts.parent ? { parent: { key: opts.parent } } : {}),
        labels: mergeLabels(opts.labels, opts.autoLabel),
        ...parseFieldsJson(opts.fieldsJson)
      };
      if (fields.labels === undefined) delete fields.labels;
      if (opts.dryRun) {
        emit({ dryRun: true, action: 'issue create', payload: { fields } });
        return;
      }
      const client = jiraClient(loadConfig());
      emit(await withRetry(() => client.issues.createIssue({ fields: fields as any }), retryOpts()));
    });

  issue
    .command('edit <key>')
    .description('Edit issue fields (transitions are NOT possible here — use issue transition)')
    .option('--summary <text>', 'new summary')
    .option('--description-md <markdown>', 'new description as markdown')
    .option('--description-file <path>', 'new description from a markdown file')
    .option('--adf-file <path>', 'new description as raw ADF JSON file')
    .option('--labels-add <csv>', 'labels to add', splitCsv)
    .option('--labels-remove <csv>', 'labels to remove', splitCsv)
    .option('--fields-json <json>', 'fields to set, as a JSON object')
    .option('--dry-run', 'print the payload without editing')
    .action(async (key: string, opts) => {
      const description = resolveBody({
        bodyMd: opts.descriptionMd,
        bodyFile: opts.descriptionFile,
        adfFile: opts.adfFile
      });
      const fields: Record<string, unknown> = {
        ...(opts.summary !== undefined ? { summary: opts.summary } : {}),
        ...(description ? { description } : {}),
        ...parseFieldsJson(opts.fieldsJson)
      };
      const labelOps = [
        ...(opts.labelsAdd ?? []).map((l: string) => ({ add: l })),
        ...(opts.labelsRemove ?? []).map((l: string) => ({ remove: l }))
      ];
      const update = labelOps.length > 0 ? { labels: labelOps } : undefined;
      if (Object.keys(fields).length === 0 && update === undefined) {
        throw new Error('Nothing to edit — pass --summary, --description-md, --labels-add/remove, or --fields-json');
      }
      const payload = {
        issueIdOrKey: key,
        ...(Object.keys(fields).length > 0 ? { fields } : {}),
        ...(update ? { update } : {})
      };
      if (opts.dryRun) {
        emit({ dryRun: true, action: 'issue edit', payload });
        return;
      }
      const client = jiraClient(loadConfig());
      await withRetry(() => client.issues.editIssue(payload as any), retryOpts());
      emit({ edited: key });
    });

  issue
    .command('transition <key>')
    .description('Transition an issue by transition id, transition name, or target status name')
    .requiredOption('--to <id-or-name>', 'transition id/name or target status name')
    .option('--fields-json <json>', 'fields to set on the transition screen')
    .option('--dry-run', 'resolve and print the transition without executing')
    .action(async (key: string, opts) => {
      const client = jiraClient(loadConfig());
      const available = await withRetry(
        () => client.issues.getTransitions({ issueIdOrKey: key }),
        retryOpts()
      );
      const target = resolveTransition((available.transitions ?? []) as TransitionLike[], opts.to);
      const fields = parseFieldsJson(opts.fieldsJson);
      const payload = {
        issueIdOrKey: key,
        transition: { id: target.id },
        ...(Object.keys(fields).length > 0 ? { fields } : {})
      };
      if (opts.dryRun) {
        emit({
          dryRun: true,
          action: 'issue transition',
          resolved: { id: target.id, name: target.name, to: target.to?.name },
          payload
        });
        return;
      }
      await withRetry(() => client.issues.doTransition(payload as any), retryOpts());
      emit({ transitioned: key, to: target.to?.name ?? target.name ?? target.id });
    });

  const comment = program.command('comment').description('Jira comments');
  comment
    .command('add <key>')
    .description('Add a comment (markdown body)')
    .option('--body-md <markdown>', 'comment body as markdown')
    .option('--body-file <path>', 'comment body from a markdown file')
    .option('--adf-file <path>', 'comment body as raw ADF JSON file')
    .option('--dry-run', 'print the payload without commenting')
    .action(async (key: string, opts) => {
      const body = resolveBody(opts);
      if (!body) throw new Error('Pass --body-md, --body-file, or --adf-file');
      if (opts.dryRun) {
        emit({ dryRun: true, action: 'comment add', payload: { issueIdOrKey: key, comment: body } });
        return;
      }
      const client = jiraClient(loadConfig());
      emit(
        await withRetry(
          () => client.issueComments.addComment({ issueIdOrKey: key, comment: body as any }),
          retryOpts()
        )
      );
    });

  const worklog = program.command('worklog').description('Jira worklogs');
  worklog
    .command('add <key>')
    .description('Log time on an issue')
    .requiredOption('--time <spent>', 'time spent, e.g. 2h or 30m')
    .option('--comment-md <markdown>', 'worklog comment as markdown')
    .option('--started <iso>', 'start time (ISO-8601); defaults to now')
    .option('--dry-run', 'print the payload without logging')
    .action(async (key: string, opts) => {
      const payload = {
        issueIdOrKey: key,
        timeSpent: opts.time,
        ...(opts.commentMd ? { comment: markdownToAdf(opts.commentMd) } : {}),
        ...(opts.started ? { started: opts.started } : {})
      };
      if (opts.dryRun) {
        emit({ dryRun: true, action: 'worklog add', payload });
        return;
      }
      const client = jiraClient(loadConfig());
      emit(await withRetry(() => client.issueWorklogs.addWorklog(payload as any), retryOpts()));
    });

  const link = program.command('link').description('Jira issue links');
  link
    .command('create')
    .description('Link two issues')
    .requiredOption('--type <name>', 'link type name, e.g. Relates (see linktype-list)')
    .requiredOption('--inward <key>', 'inward issue key')
    .requiredOption('--outward <key>', 'outward issue key')
    .option('--dry-run', 'print the payload without linking')
    .action(async (opts) => {
      const payload = {
        type: { name: opts.type },
        inwardIssue: { key: opts.inward },
        outwardIssue: { key: opts.outward }
      };
      if (opts.dryRun) {
        emit({ dryRun: true, action: 'link create', payload });
        return;
      }
      const client = jiraClient(loadConfig());
      await withRetry(() => client.issueLinks.linkIssues(payload as any), retryOpts());
      emit({ linked: { type: opts.type, inward: opts.inward, outward: opts.outward } });
    });
}
