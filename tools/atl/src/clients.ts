import { AgileClient, Version3Client } from 'jira.js';
import type { AtlConfig } from './config.js';

export function jiraClient(cfg: AtlConfig): Version3Client {
  return new Version3Client({
    host: `https://${cfg.site}`,
    authentication: { basic: { email: cfg.email, apiToken: cfg.token } }
  });
}

export function agileClient(cfg: AtlConfig): AgileClient {
  return new AgileClient({
    host: `https://${cfg.site}`,
    authentication: { basic: { email: cfg.email, apiToken: cfg.token } }
  });
}
