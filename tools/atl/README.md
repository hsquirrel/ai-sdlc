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

- `.env` (committed): `ATL_SITE` — shared, non-secret.
- `.env.local` (git-ignored): `ATL_EMAIL` (your Atlassian account) and `ATL_TOKEN` — an **unscoped** API token from
  <https://id.atlassian.com/manage-profile/security/api-tokens>. Tokens expire (≤365 days); rotate accordingly.

## Commands

All live-verified against KDP 2026-07-14. `--out <file>` works globally; every write takes `--dry-run`. Full capability map: `references/atlassian-access.md`.

- **Jira reads:** `whoami` · `issue get|changelog|transitions|remotelinks` · `search --jql` · `project list` · `issuetype-list --project` · `createmeta --project --type` · `user-lookup --query` · `linktype-list`
- **Jira writes:** `issue create|edit|transition` · `comment add` · `worklog add` · `link create`
- **Agile:** `board list|get` · `sprint list|issues` · `backlog list`
- **Confluence:** `page get|create|update|children|comments` · `space list` · `cql --query`

Run `node dist/index.js <command> --help` for flags. `npm test` runs the unit suite (mocked clients — no network). `npm run bundle` emits the standalone `dist/atl.mjs` (~1.4 MB; needs only Node ≥20 and `.env`/`.env.local` beside it or one level up).

Rich-text inputs are Markdown (`--description-md/-file`, `--body-md/-file`) converted to ADF — subset pinned by golden tests in `test/golden/`; raw ADF escape hatch via `--adf-file`. Don't re-parse stdout through PowerShell 5.1 pipes (BOM injection) — use `--out`.
