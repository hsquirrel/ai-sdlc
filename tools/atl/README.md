# atl

Thin Atlassian CLI for the ai-sdlc skill library — Jira REST v3, Jira Software (Agile), Confluence v2. Built per `docs/plans/2026-07-14-atlassian-cli-build-plan.md`; the command surface is pinned to the library's capability bar (plan §3), and growth discipline applies to verbs like it applies to skills.

## Contract

- **JSON only.** Success → JSON on stdout, exit 0. Error → `{ error, status?, details? }` on stderr, exit 1.
- **`--out <file>`** writes the full result to a file and prints `{ savedTo, count }` — use for large results.
- **Pagination is internalized** (JQL search follows `nextPageToken` to exhaustion; changelogs walk `startAt`). A capped result carries `truncated: true` — never a silent cap.
- **429/5xx retried** with capped exponential backoff, honoring `Retry-After`. `--verbose` logs retries to stderr.
- Writes (Phase 2+) support `--dry-run` and label creates `ai-sdlc-generated` by default.

## Setup

```powershell
npm install
npm run build
node dist/index.js whoami
```

Credentials — precedence: real env vars > `.env.local` > `.env`:

- `.env` (committed): `ATL_SITE`, `ATL_EMAIL` — non-secrets.
- `.env.local` (git-ignored): `ATL_TOKEN` — an **unscoped** API token from
  <https://id.atlassian.com/manage-profile/security/api-tokens>. Tokens expire (≤365 days); rotate accordingly.

## Commands (Phase 1 — reads)

`whoami` · `issue get|changelog|transitions|remotelinks` · `search --jql` · `project list` · `issuetype-list --project` · `createmeta --project --type` · `user-lookup --query` · `linktype-list` · `board list`

Run `node dist/index.js <command> --help` for flags. `npm test` runs the unit suite (mocked clients — no network).
