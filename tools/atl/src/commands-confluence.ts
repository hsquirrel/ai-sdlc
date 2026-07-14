import fs from 'node:fs';
import type { Command } from 'commander';
import { loadConfig } from './config.js';
import { ConfluenceClient } from './confluence.js';
import { emit } from './output.js';
import { withRetry, type RetryOptions } from './retry.js';
import { markdownToAdf, type AdfDoc } from './adf.js';

function bodyFrom(opts: { bodyMd?: string; bodyFile?: string; adfFile?: string }): AdfDoc {
  if (opts.adfFile) return JSON.parse(fs.readFileSync(opts.adfFile, 'utf8')) as AdfDoc;
  const md = opts.bodyMd ?? (opts.bodyFile ? fs.readFileSync(opts.bodyFile, 'utf8') : undefined);
  if (md === undefined) throw new Error('Pass --body-md, --body-file, or --adf-file');
  return markdownToAdf(md);
}

export function registerConfluenceCommands(program: Command, retryOpts: () => RetryOptions): void {
  const page = program.command('page').description('Confluence pages (v2 API)');

  page
    .command('get <id>')
    .description('Page by id')
    .option('--body', 'include body as ADF')
    .action(async (id: string, opts) => {
      const client = new ConfluenceClient(loadConfig());
      emit(await withRetry(() => client.getPage(id, opts.body === true), retryOpts()));
    });

  page
    .command('create')
    .description('Create a page (body from markdown, stored as ADF)')
    .requiredOption('--space-id <id>', 'space id (resolve via space list --keys <KEY>)')
    .option('--parent-id <id>', 'parent page id')
    .requiredOption('--title <title>', 'page title')
    .option('--body-md <markdown>', 'body as markdown')
    .option('--body-file <path>', 'body from a markdown file')
    .option('--adf-file <path>', 'body as raw ADF JSON file')
    .option('--dry-run', 'print the payload without creating')
    .action(async (opts) => {
      const client = new ConfluenceClient(loadConfig());
      const params = {
        spaceId: opts.spaceId,
        parentId: opts.parentId,
        title: opts.title,
        adf: bodyFrom(opts)
      };
      if (opts.dryRun) {
        emit({ dryRun: true, action: 'page create', payload: client.pageBody(params) });
        return;
      }
      emit(await withRetry(() => client.createPage(params), retryOpts()));
    });

  page
    .command('update <id>')
    .description('Update a page (fetches current version, bumps it)')
    .option('--title <title>', 'new title (defaults to current)')
    .option('--body-md <markdown>', 'new body as markdown')
    .option('--body-file <path>', 'new body from a markdown file')
    .option('--adf-file <path>', 'new body as raw ADF JSON file')
    .option('--message <text>', 'version message')
    .option('--dry-run', 'print the payload without updating')
    .action(async (id: string, opts) => {
      const client = new ConfluenceClient(loadConfig());
      const current = (await withRetry(() => client.getPage(id, false), retryOpts())) as {
        title?: string;
        version?: { number?: number };
      };
      const nextVersion = (current.version?.number ?? 0) + 1;
      const params = {
        id,
        title: opts.title ?? current.title ?? '',
        adf: bodyFrom(opts),
        version: nextVersion,
        message: opts.message
      };
      if (opts.dryRun) {
        emit({
          dryRun: true,
          action: 'page update',
          currentVersion: current.version?.number,
          payload: { ...params, adf: params.adf }
        });
        return;
      }
      emit(await withRetry(() => client.updatePage(params), retryOpts()));
    });

  page
    .command('children <id>')
    .description('Direct children of a page')
    .action(async (id: string) => {
      const client = new ConfluenceClient(loadConfig());
      emit(await withRetry(() => client.children(id), retryOpts()));
    });

  page
    .command('comments <id>')
    .description('Footer comments on a page')
    .action(async (id: string) => {
      const client = new ConfluenceClient(loadConfig());
      emit(await withRetry(() => client.footerComments(id), retryOpts()));
    });

  const space = program.command('space').description('Confluence spaces');
  space
    .command('list')
    .description('Spaces, optionally filtered by keys')
    .option('--keys <csv>', 'comma-separated space keys, e.g. NDTW')
    .action(async (opts) => {
      const client = new ConfluenceClient(loadConfig());
      emit(await withRetry(() => client.spaces(opts.keys), retryOpts()));
    });

  program
    .command('cql')
    .description('Confluence CQL search (v1 endpoint)')
    .requiredOption('--query <cql>', 'CQL query')
    .option('--limit <n>', 'max results', (v: string) => parseInt(v, 10), 25)
    .option('--out <file>', 'write result to file, print summary')
    .action(async (opts) => {
      const client = new ConfluenceClient(loadConfig());
      const result = await withRetry(() => client.cql(opts.query, opts.limit), retryOpts());
      emit(result, { out: opts.out });
    });
}
