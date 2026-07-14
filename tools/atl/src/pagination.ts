import { withRetry, type RetryOptions } from './retry.js';

/**
 * Pagination is internalized; a truncated result says so explicitly (no silent caps).
 * Minimal structural interfaces keep these functions unit-testable with fakes.
 */

export interface ChangelogPage {
  values?: unknown[];
  isLast?: boolean;
  total?: number;
}

export interface ChangelogSource {
  getChangeLogs(params: {
    issueIdOrKey: string;
    startAt: number;
    maxResults: number;
  }): Promise<ChangelogPage>;
}

export async function fetchAllChangelogs(
  source: ChangelogSource,
  issueIdOrKey: string,
  retry: RetryOptions = {}
): Promise<{ issue: string; total: number; changelogs: unknown[] }> {
  const all: unknown[] = [];
  for (;;) {
    const page = await withRetry(
      () => source.getChangeLogs({ issueIdOrKey, startAt: all.length, maxResults: 100 }),
      retry
    );
    const values = page.values ?? [];
    all.push(...values);
    if (page.isLast === true || values.length === 0 || (page.total !== undefined && all.length >= page.total)) {
      break;
    }
  }
  return { issue: issueIdOrKey, total: all.length, changelogs: all };
}

/** Generic startAt/maxResults paginator for Agile endpoints ({values} or {issues} pages). */
export interface StartAtPage {
  values?: unknown[];
  issues?: unknown[];
  isLast?: boolean;
  total?: number;
}

export async function fetchAllStartAt(
  fetchPage: (startAt: number) => Promise<StartAtPage>,
  retry: RetryOptions = {}
): Promise<{ total: number; items: unknown[] }> {
  const items: unknown[] = [];
  for (;;) {
    const page = await withRetry(() => fetchPage(items.length), retry);
    const vals = page.values ?? page.issues ?? [];
    items.push(...vals);
    if (
      page.isLast === true ||
      vals.length === 0 ||
      (page.total !== undefined && items.length >= page.total)
    ) {
      break;
    }
  }
  return { total: items.length, items };
}

export interface SearchPage {
  issues?: unknown[];
  nextPageToken?: string;
  isLast?: boolean;
}

export interface SearchSource {
  search(params: {
    jql: string;
    fields?: string[];
    maxResults: number;
    nextPageToken?: string;
  }): Promise<SearchPage>;
}

export interface SearchAllResult {
  jql: string;
  total: number;
  truncated: boolean;
  issues: unknown[];
}

export async function searchAllIssues(
  source: SearchSource,
  params: { jql: string; fields?: string[]; max?: number },
  retry: RetryOptions = {}
): Promise<SearchAllResult> {
  const max = params.max ?? Infinity;
  const issues: unknown[] = [];
  let nextPageToken: string | undefined;
  let truncated = false;

  for (;;) {
    const pageSize = Math.min(100, max - issues.length);
    const page = await withRetry(
      () =>
        source.search({
          jql: params.jql,
          fields: params.fields,
          maxResults: pageSize,
          nextPageToken
        }),
      retry
    );
    issues.push(...(page.issues ?? []));
    nextPageToken = page.nextPageToken;
    const exhausted = page.isLast === true || nextPageToken === undefined;
    if (issues.length >= max && !exhausted) {
      truncated = true;
      break;
    }
    if (exhausted) break;
  }

  return { jql: params.jql, total: issues.length, truncated, issues };
}
