import { fetchAllChangelogs, searchAllIssues, type ChangelogPage, type SearchPage } from '../src/pagination.js';

const fast = { sleep: async () => {} };

describe('fetchAllChangelogs', () => {
  test('walks startAt pages to exhaustion', async () => {
    const entries = Array.from({ length: 250 }, (_, i) => ({ id: i }));
    const source = {
      async getChangeLogs({ startAt, maxResults }: { issueIdOrKey: string; startAt: number; maxResults: number }): Promise<ChangelogPage> {
        const values = entries.slice(startAt, startAt + maxResults);
        return { values, total: entries.length, isLast: startAt + values.length >= entries.length };
      }
    };
    const result = await fetchAllChangelogs(source, 'KDP-1', fast);
    expect(result.total).toBe(250);
    expect(result.changelogs).toHaveLength(250);
    expect(result.issue).toBe('KDP-1');
  });

  test('handles an empty changelog', async () => {
    const source = {
      async getChangeLogs(): Promise<ChangelogPage> {
        return { values: [], total: 0, isLast: true };
      }
    };
    const result = await fetchAllChangelogs(source, 'KDP-2', fast);
    expect(result.total).toBe(0);
  });

  test('stops on an empty page even without isLast (defensive)', async () => {
    let calls = 0;
    const source = {
      async getChangeLogs(): Promise<ChangelogPage> {
        calls++;
        return { values: [] };
      }
    };
    await fetchAllChangelogs(source, 'KDP-3', fast);
    expect(calls).toBe(1);
  });
});

describe('searchAllIssues', () => {
  function tokenSource(totalIssues: number, pageSize = 100) {
    const issues = Array.from({ length: totalIssues }, (_, i) => ({ key: `KDP-${i}` }));
    return {
      calls: [] as (string | undefined)[],
      async search({ maxResults, nextPageToken }: { jql: string; maxResults: number; nextPageToken?: string }): Promise<SearchPage> {
        this.calls.push(nextPageToken);
        const start = nextPageToken ? parseInt(nextPageToken, 10) : 0;
        const size = Math.min(maxResults, pageSize);
        const page = issues.slice(start, start + size);
        const next = start + page.length;
        return {
          issues: page,
          nextPageToken: next < issues.length ? String(next) : undefined,
          isLast: next >= issues.length
        };
      }
    };
  }

  test('follows nextPageToken to exhaustion', async () => {
    const source = tokenSource(230);
    const result = await searchAllIssues(source, { jql: 'project = KDP' }, fast);
    expect(result.total).toBe(230);
    expect(result.truncated).toBe(false);
    expect(source.calls).toEqual([undefined, '100', '200']);
  });

  test('--max truncates and says so', async () => {
    const source = tokenSource(500);
    const result = await searchAllIssues(source, { jql: 'project = KDP', max: 150 }, fast);
    expect(result.total).toBe(150);
    expect(result.truncated).toBe(true);
  });

  test('max equal to result count is not truncated', async () => {
    const source = tokenSource(100);
    const result = await searchAllIssues(source, { jql: 'x', max: 100 }, fast);
    expect(result.total).toBe(100);
    expect(result.truncated).toBe(false);
  });

  test('empty result set', async () => {
    const source = tokenSource(0);
    const result = await searchAllIssues(source, { jql: 'x' }, fast);
    expect(result.total).toBe(0);
    expect(result.truncated).toBe(false);
  });
});
