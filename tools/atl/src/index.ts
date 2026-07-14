#!/usr/bin/env node
import { Command } from 'commander';
import { loadConfig } from './config.js';
import { jiraClient, agileClient } from './clients.js';
import { emit, emitError } from './output.js';
import { withRetry, type RetryOptions } from './retry.js';
import { fetchAllChangelogs, searchAllIssues } from './pagination.js';

const program = new Command();
program
  .name('atl')
  .description('Thin Atlassian CLI for the ai-sdlc skill library. JSON output only.')
  .version('0.1.0')
  .option('--verbose', 'log retries and diagnostics to stderr');

function retryOpts(): RetryOptions {
  return { verbose: program.opts().verbose === true };
}

/** Wrap a command action: load config lazily, emit structured errors, exit non-zero. */
function run(fn: (...args: any[]) => Promise<void>): (...args: any[]) => Promise<void> {
  return async (...args: any[]) => {
    try {
      await fn(...args);
    } catch (err) {
      emitError(err);
    }
  };
}

const splitCsv = (v: string): string[] => v.split(',').map((s) => s.trim()).filter(Boolean);

// ---------------------------------------------------------------- whoami
program
  .command('whoami')
  .description('Current user — auth smoke test')
  .action(
    run(async () => {
      const client = jiraClient(loadConfig());
      emit(await withRetry(() => client.myself.getCurrentUser(), retryOpts()));
    })
  );

// ---------------------------------------------------------------- issue group
const issue = program.command('issue').description('Jira issue reads');

issue
  .command('get <key>')
  .description('Get one issue (fields-minimal by default)')
  .option('--fields <csv>', 'comma-separated field list', splitCsv)
  .option('--expand <csv>', 'expand parameter, e.g. changelog,renderedFields')
  .option('--all-fields', 'return every field')
  .action(
    run(async (key: string, opts: { fields?: string[]; expand?: string; allFields?: boolean }) => {
      const client = jiraClient(loadConfig());
      const fields =
        opts.allFields === true
          ? undefined
          : opts.fields ?? ['summary', 'status', 'issuetype', 'assignee', 'parent', 'labels'];
      emit(
        await withRetry(
          () => client.issues.getIssue({ issueIdOrKey: key, fields, expand: opts.expand }),
          retryOpts()
        )
      );
    })
  );

issue
  .command('changelog <key>')
  .description('Complete changelog for an issue (paginated to exhaustion)')
  .option('--out <file>', 'write result to file, print summary')
  .action(
    run(async (key: string, opts: { out?: string }) => {
      const client = jiraClient(loadConfig());
      const result = await fetchAllChangelogs(
        { getChangeLogs: (p) => client.issues.getChangeLogs(p) },
        key,
        retryOpts()
      );
      emit(result, { out: opts.out });
    })
  );

issue
  .command('transitions <key>')
  .description('Transitions available from the issue’s current status')
  .action(
    run(async (key: string) => {
      const client = jiraClient(loadConfig());
      emit(await withRetry(() => client.issues.getTransitions({ issueIdOrKey: key }), retryOpts()));
    })
  );

issue
  .command('remotelinks <key>')
  .description('Remote issue links')
  .action(
    run(async (key: string) => {
      const client = jiraClient(loadConfig());
      emit(
        await withRetry(
          () => client.issueRemoteLinks.getRemoteIssueLinks({ issueIdOrKey: key }),
          retryOpts()
        )
      );
    })
  );

// ---------------------------------------------------------------- search
program
  .command('search')
  .description('JQL search, paginated to exhaustion (nextPageToken endpoints)')
  .requiredOption('--jql <jql>', 'JQL query')
  .option('--fields <csv>', 'comma-separated field list', splitCsv)
  .option('--max <n>', 'stop after n issues (result marks truncated: true)', (v) => parseInt(v, 10))
  .option('--out <file>', 'write result to file, print summary')
  .action(
    run(async (opts: { jql: string; fields?: string[]; max?: number; out?: string }) => {
      const client = jiraClient(loadConfig());
      const result = await searchAllIssues(
        {
          search: (p) =>
            client.issueSearch.searchForIssuesUsingJqlEnhancedSearchPost({
              jql: p.jql,
              fields: p.fields,
              maxResults: p.maxResults,
              nextPageToken: p.nextPageToken
            })
        },
        { jql: opts.jql, fields: opts.fields ?? ['summary', 'status', 'issuetype'], max: opts.max },
        retryOpts()
      );
      emit(result, { out: opts.out });
    })
  );

// ---------------------------------------------------------------- project / metadata
const project = program.command('project').description('Jira project reads');

project
  .command('list')
  .description('Visible projects')
  .option('--query <text>', 'filter by name/key')
  .action(
    run(async (opts: { query?: string }) => {
      const client = jiraClient(loadConfig());
      emit(
        await withRetry(
          () => client.projects.searchProjects({ query: opts.query, maxResults: 100 }),
          retryOpts()
        )
      );
    })
  );

program
  .command('issuetype-list')
  .description('Issue types available for creates in a project (createmeta level 1)')
  .requiredOption('--project <key>', 'project key or id')
  .action(
    run(async (opts: { project: string }) => {
      const client = jiraClient(loadConfig());
      emit(
        await withRetry(
          () =>
            client.issues.getCreateIssueMetaIssueTypes({
              projectIdOrKey: opts.project,
              maxResults: 200
            }),
          retryOpts()
        )
      );
    })
  );

program
  .command('createmeta')
  .description('Field metadata for one (project, issue type) — per-project endpoint, not the deprecated bulk one')
  .requiredOption('--project <key>', 'project key or id')
  .requiredOption('--type <id>', 'issue type id')
  .action(
    run(async (opts: { project: string; type: string }) => {
      const client = jiraClient(loadConfig());
      emit(
        await withRetry(
          () =>
            client.issues.getCreateIssueMetaIssueTypeId({
              projectIdOrKey: opts.project,
              issueTypeId: opts.type,
              maxResults: 200
            }),
          retryOpts()
        )
      );
    })
  );

program
  .command('user-lookup')
  .description('Find users by name/email fragment')
  .requiredOption('--query <text>', 'search text')
  .action(
    run(async (opts: { query: string }) => {
      const client = jiraClient(loadConfig());
      emit(await withRetry(() => client.userSearch.findUsers({ query: opts.query }), retryOpts()));
    })
  );

program
  .command('linktype-list')
  .description('Issue link types')
  .action(
    run(async () => {
      const client = jiraClient(loadConfig());
      emit(await withRetry(() => client.issueLinkTypes.getIssueLinkTypes(), retryOpts()));
    })
  );

// ---------------------------------------------------------------- agile (Phase 3 lands here)
const board = program.command('board').description('Jira Software boards');

board
  .command('list')
  .description('Boards visible to the user')
  .option('--project <key>', 'filter by project')
  .action(
    run(async (opts: { project?: string }) => {
      const client = agileClient(loadConfig());
      emit(
        await withRetry(
          () => client.board.getAllBoards({ projectKeyOrId: opts.project, maxResults: 100 }),
          retryOpts()
        )
      );
    })
  );

await program.parseAsync(process.argv);
