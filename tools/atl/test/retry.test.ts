import { withRetry } from '../src/retry.js';

const noSleep = async () => {};

function httpError(status: number, headers: Record<string, string> = {}) {
  return { response: { status, headers }, message: `HTTP ${status}` };
}

test('retries 429 then succeeds', async () => {
  let calls = 0;
  const fn = async () => {
    calls++;
    if (calls < 3) throw httpError(429);
    return 'ok';
  };
  await expect(withRetry(fn, { sleep: noSleep })).resolves.toBe('ok');
  expect(calls).toBe(3);
});

test('honors Retry-After header', async () => {
  const delays: number[] = [];
  let calls = 0;
  const fn = async () => {
    calls++;
    if (calls === 1) throw httpError(429, { 'retry-after': '7' });
    return 'ok';
  };
  await withRetry(fn, { sleep: async (ms) => void delays.push(ms) });
  expect(delays).toEqual([7000]);
});

test('does not retry non-retryable statuses', async () => {
  let calls = 0;
  const fn = async () => {
    calls++;
    throw httpError(404);
  };
  await expect(withRetry(fn, { sleep: noSleep })).rejects.toMatchObject({
    response: { status: 404 }
  });
  expect(calls).toBe(1);
});

test('does not retry plain errors without a status', async () => {
  let calls = 0;
  const fn = async () => {
    calls++;
    throw new Error('boom');
  };
  await expect(withRetry(fn, { sleep: noSleep })).rejects.toThrow('boom');
  expect(calls).toBe(1);
});

test('gives up after maxAttempts and rethrows', async () => {
  let calls = 0;
  const fn = async () => {
    calls++;
    throw httpError(503);
  };
  await expect(withRetry(fn, { maxAttempts: 3, sleep: noSleep })).rejects.toMatchObject({
    response: { status: 503 }
  });
  expect(calls).toBe(3);
});

test('exponential backoff doubles and caps', async () => {
  const delays: number[] = [];
  let calls = 0;
  const fn = async () => {
    calls++;
    if (calls <= 4) throw httpError(502);
    return 'ok';
  };
  await withRetry(fn, {
    baseDelayMs: 1000,
    maxDelayMs: 3000,
    maxAttempts: 5,
    sleep: async (ms) => void delays.push(ms)
  });
  expect(delays).toEqual([1000, 2000, 3000, 3000]);
});
