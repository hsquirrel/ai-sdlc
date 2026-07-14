import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'dotenv';

export interface AtlConfig {
  site: string;
  email: string;
  token: string;
}

/**
 * Directories searched for .env / .env.local: beside the executable file and one level up.
 * Covers both layouts — dist/index.js under the package root, and a standalone atl.mjs bundle
 * dropped in a directory with its env files next to it.
 */
export function envDirs(): string[] {
  const self = path.dirname(fileURLToPath(import.meta.url));
  return [path.resolve(self, '..'), self];
}

function readEnvFile(file: string): Record<string, string> {
  try {
    return parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return {};
  }
}

/**
 * Precedence: real environment variables > .env.local > .env
 * (dotenv's own load order is not used so that a user-set env var always wins).
 */
export function loadConfig(dir?: string): AtlConfig {
  const dirs = dir !== undefined ? [dir] : envDirs();
  let fileVals: Record<string, string> = {};
  for (const d of dirs) {
    fileVals = {
      ...fileVals,
      ...readEnvFile(path.join(d, '.env')),
      ...readEnvFile(path.join(d, '.env.local'))
    };
  }
  const get = (key: string): string | undefined => {
    const v = process.env[key] ?? fileVals[key];
    return v && v.trim() !== '' ? v.trim() : undefined;
  };

  const site = get('ATL_SITE');
  const email = get('ATL_EMAIL');
  const token = get('ATL_TOKEN');

  const missing = [
    ...(site ? [] : ['ATL_SITE']),
    ...(email ? [] : ['ATL_EMAIL']),
    ...(token ? [] : ['ATL_TOKEN'])
  ];
  if (missing.length > 0) {
    throw new ConfigError(missing);
  }
  return { site: site!, email: email!, token: token! };
}

export class ConfigError extends Error {
  readonly missing: string[];
  constructor(missing: string[]) {
    super(
      `Missing configuration: ${missing.join(', ')}. ` +
        `Set via environment variables, .env (non-secrets), or .env.local (ATL_TOKEN).`
    );
    this.missing = missing;
  }
}
