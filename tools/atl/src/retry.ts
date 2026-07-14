/**
 * Retry wrapper for Atlassian Cloud calls.
 * Retries 429 (honoring Retry-After) and transient 5xx with capped exponential backoff.
 * Rate limits on API-token traffic are enforced since 2025-11-22 with unpublished
 * numeric limits, so behavior here is defensive, not tuned.
 */

export interface RetryOptions {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  verbose?: boolean;
  sleep?: (ms: number) => Promise<void>;
}

const RETRYABLE = new Set([429, 502, 503, 504]);

interface HttpishError {
  response?: { status?: number; headers?: Record<string, string | undefined> };
  status?: number;
}

function statusOf(err: unknown): number | undefined {
  const e = err as HttpishError;
  return e.response?.status ?? e.status;
}

function retryAfterMs(err: unknown): number | undefined {
  const raw = (err as HttpishError).response?.headers?.['retry-after'];
  if (raw === undefined) return undefined;
  const seconds = Number(raw);
  return Number.isFinite(seconds) ? seconds * 1000 : undefined;
}

const defaultSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const maxAttempts = opts.maxAttempts ?? 5;
  const baseDelayMs = opts.baseDelayMs ?? 1000;
  const maxDelayMs = opts.maxDelayMs ?? 30_000;
  const sleep = opts.sleep ?? defaultSleep;

  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const status = statusOf(err);
      if (status === undefined || !RETRYABLE.has(status) || attempt === maxAttempts) {
        throw err;
      }
      const backoff = Math.min(baseDelayMs * 2 ** (attempt - 1), maxDelayMs);
      const delay = retryAfterMs(err) ?? backoff;
      if (opts.verbose) {
        process.stderr.write(
          `atl: HTTP ${status}, retry ${attempt}/${maxAttempts - 1} in ${delay}ms\n`
        );
      }
      await sleep(delay);
    }
  }
  throw lastErr;
}
