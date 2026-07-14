import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { emit } from '../src/output.js';

function captureStdout(fn: () => void): string {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  (process.stdout as any).write = (chunk: string) => {
    chunks.push(String(chunk));
    return true;
  };
  try {
    fn();
  } finally {
    (process.stdout as any).write = orig;
  }
  return chunks.join('');
}

test('emit prints pretty JSON to stdout', () => {
  const out = captureStdout(() => emit({ a: 1 }));
  expect(JSON.parse(out)).toEqual({ a: 1 });
});

test('emit --out writes file and prints summary with count', () => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'atl-out-')), 'r.json');
  const data = { issues: [{ k: 1 }, { k: 2 }], total: 2 };
  const out = captureStdout(() => emit(data, { out: file }));
  expect(JSON.parse(out)).toEqual({ savedTo: file, count: 2 });
  expect(JSON.parse(fs.readFileSync(file, 'utf8'))).toEqual(data);
});

test('emit --out on a plain array counts elements', () => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'atl-out-')), 'r.json');
  const out = captureStdout(() => emit([1, 2, 3], { out: file }));
  expect(JSON.parse(out)).toEqual({ savedTo: file, count: 3 });
});
