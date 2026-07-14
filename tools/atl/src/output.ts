import fs from 'node:fs';

/**
 * Output contract (references/atlassian-access.md pins this):
 * - success: JSON on stdout, exit 0
 * - error: JSON on stderr ({ error, status?, details? }), exit 1
 * - --out <file>: full result written to file; stdout gets only { savedTo, count }
 */

export interface EmitOptions {
  out?: string;
}

/** Global --out fallback, set from the root command before any action runs. */
let globalOut: string | undefined;
export function setGlobalOut(file: string | undefined): void {
  globalOut = file;
}

function countOf(data: unknown): number | undefined {
  if (Array.isArray(data)) return data.length;
  if (data && typeof data === 'object') {
    for (const key of ['issues', 'values', 'results', 'pages', 'changelogs', 'sprints', 'transitions']) {
      const v = (data as Record<string, unknown>)[key];
      if (Array.isArray(v)) return v.length;
    }
  }
  return undefined;
}

export function emit(data: unknown, opts: EmitOptions = {}): void {
  const out = opts.out ?? globalOut;
  if (out) {
    fs.writeFileSync(out, JSON.stringify(data, null, 2), 'utf8');
    const summary: Record<string, unknown> = { savedTo: out };
    const count = countOf(data);
    if (count !== undefined) summary.count = count;
    process.stdout.write(JSON.stringify(summary, null, 2) + '\n');
  } else {
    process.stdout.write(JSON.stringify(data, null, 2) + '\n');
  }
}

interface HttpishError {
  response?: { status?: number; data?: unknown };
  status?: number;
  message?: string;
}

export function emitError(err: unknown): void {
  const e = err as HttpishError;
  const status = e.response?.status ?? e.status;
  const payload: Record<string, unknown> = {
    error: e.message ?? String(err)
  };
  if (status !== undefined) payload.status = status;
  if (e.response?.data !== undefined) payload.details = e.response.data;
  process.stderr.write(JSON.stringify(payload, null, 2) + '\n');
  process.exitCode = 1;
}
