import type { Command } from 'commander';
import { loadConfig } from './config.js';
import { agileClient } from './clients.js';
import { emit } from './output.js';
import { withRetry, type RetryOptions } from './retry.js';
import { fetchAllStartAt } from './pagination.js';

const splitCsv = (v: string): string[] => v.split(',').map((s) => s.trim()).filter(Boolean);

export function registerAgileCommands(program: Command, retryOpts: () => RetryOptions): void {
  const board = program.commands.find((c) => c.name() === 'board')!;

  board
    .command('get <id>')
    .description('Board details')
    .action(async (id: string) => {
      const client = agileClient(loadConfig());
      emit(await withRetry(() => client.board.getBoard({ boardId: Number(id) }), retryOpts()));
    });

  const sprint = program.command('sprint').description('Jira Software sprints');

  sprint
    .command('list')
    .description('Sprints for a board, with real start/end/complete dates')
    .requiredOption('--board <id>', 'board id')
    .option('--state <csv>', 'filter: active,future,closed')
    .option('--out <file>', 'write result to file, print summary')
    .action(async (opts) => {
      const client = agileClient(loadConfig());
      const result = await fetchAllStartAt(
        (startAt) =>
          client.board.getAllSprints({
            boardId: Number(opts.board),
            state: opts.state,
            startAt,
            maxResults: 50
          }),
        retryOpts()
      );
      emit({ board: Number(opts.board), total: result.total, sprints: result.items }, { out: opts.out });
    });

  sprint
    .command('issues <sprintId>')
    .description('Issues in a sprint')
    .option('--fields <csv>', 'comma-separated field list', splitCsv)
    .option('--out <file>', 'write result to file, print summary')
    .action(async (sprintId: string, opts) => {
      const client = agileClient(loadConfig());
      const fields = opts.fields ?? ['summary', 'status', 'issuetype', 'assignee'];
      const result = await fetchAllStartAt(
        (startAt) =>
          client.sprint.getIssuesForSprint({
            sprintId: Number(sprintId),
            fields,
            startAt,
            maxResults: 100
          }),
        retryOpts()
      );
      emit({ sprint: Number(sprintId), total: result.total, issues: result.items }, { out: opts.out });
    });

  const backlog = program.command('backlog').description('Jira Software backlog');

  backlog
    .command('list')
    .description('Backlog issues for a board')
    .requiredOption('--board <id>', 'board id')
    .option('--fields <csv>', 'comma-separated field list', splitCsv)
    .option('--out <file>', 'write result to file, print summary')
    .action(async (opts) => {
      const client = agileClient(loadConfig());
      const fields = opts.fields ?? ['summary', 'status', 'issuetype', 'rank'];
      const result = await fetchAllStartAt(
        (startAt) =>
          client.board.getIssuesForBacklog({
            boardId: Number(opts.board),
            fields,
            startAt,
            maxResults: 100
          }),
        retryOpts()
      );
      emit({ board: Number(opts.board), total: result.total, issues: result.items }, { out: opts.out });
    });
}
