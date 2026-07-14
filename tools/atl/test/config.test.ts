import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig, ConfigError } from '../src/config.js';

function tmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'atl-config-'));
}

const CLEAN_KEYS = ['ATL_SITE', 'ATL_EMAIL', 'ATL_TOKEN'] as const;
let saved: Record<string, string | undefined>;

beforeEach(() => {
  saved = {};
  for (const k of CLEAN_KEYS) {
    saved[k] = process.env[k];
    delete process.env[k];
  }
});

afterEach(() => {
  for (const k of CLEAN_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
});

test('reads .env and .env.local, with .env.local winning', () => {
  const dir = tmpDir();
  fs.writeFileSync(path.join(dir, '.env'), 'ATL_SITE=site-from-env\nATL_EMAIL=a@b.c\n');
  fs.writeFileSync(path.join(dir, '.env.local'), 'ATL_SITE=site-from-local\nATL_TOKEN=tok\n');
  const cfg = loadConfig(dir);
  expect(cfg.site).toBe('site-from-local');
  expect(cfg.email).toBe('a@b.c');
  expect(cfg.token).toBe('tok');
});

test('real environment variables win over both files', () => {
  const dir = tmpDir();
  fs.writeFileSync(path.join(dir, '.env'), 'ATL_SITE=file-site\nATL_EMAIL=a@b.c\n');
  fs.writeFileSync(path.join(dir, '.env.local'), 'ATL_TOKEN=file-token\n');
  process.env.ATL_TOKEN = 'env-token';
  const cfg = loadConfig(dir);
  expect(cfg.token).toBe('env-token');
});

test('blank values count as missing', () => {
  const dir = tmpDir();
  fs.writeFileSync(path.join(dir, '.env'), 'ATL_SITE=s\nATL_EMAIL=a@b.c\n');
  fs.writeFileSync(path.join(dir, '.env.local'), 'ATL_TOKEN=\n');
  expect(() => loadConfig(dir)).toThrow(ConfigError);
  try {
    loadConfig(dir);
  } catch (e) {
    expect((e as ConfigError).missing).toEqual(['ATL_TOKEN']);
  }
});

test('missing files produce a full missing list', () => {
  const dir = tmpDir();
  try {
    loadConfig(dir);
    throw new Error('should have thrown');
  } catch (e) {
    expect((e as ConfigError).missing).toEqual(['ATL_SITE', 'ATL_EMAIL', 'ATL_TOKEN']);
  }
});
