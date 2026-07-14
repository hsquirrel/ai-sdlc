# Atlassian Access Layer — the adapter contract

How skills reach Jira and Confluence. Skills cite this file and name *capabilities*, never tool names — the mechanism is swappable per environment.

| Environment | Mechanism |
|-------------|-----------|
| Claude Code with Atlassian MCP connected (home) | `mcp__claude_ai_Atlassian__*` tools |
| No MCP available (work) — **the default assumption for new skills** | the `atl` CLI (`tools/atl/`, or the standalone `atl.mjs` bundle) |

Built per `docs/plans/2026-07-14-atlassian-cli-build-plan.md`; every command below passed a live check against KDP on 2026-07-14 (run log: `.ai-sdlc/runs/2026-07-14-atl-phase2-write-test.md`).

## Setup (atl)

Node ≥ 20. Either `npm install && npm run build` in `tools/atl/` (run `node dist/index.js …`), or drop the `atl.mjs` bundle anywhere (run `node atl.mjs …`) — env files are found next to the executable or one level up. Credentials: `.env` holds `ATL_SITE`/`ATL_EMAIL` (committed, non-secret), `.env.local` holds `ATL_TOKEN` (git-ignored, **unscoped** API token, expires ≤365 days — rotate). Real env vars beat both files.

## Capability → command map

| Capability | atl command | MCP equivalent |
|------------|-------------|----------------|
| Auth smoke test / current user | `whoami` | `atlassianUserInfo` |
| Get issue (fields-minimal default) | `issue get KEY [--fields a,b] [--all-fields] [--expand]` | `getJiraIssue` |
| **Issue changelog (cycle-time feed)** | `issue changelog KEY` | — (MCP never had it; use `--expand changelog` there) |
| JQL search, full pagination | `search --jql "…" [--fields] [--max N]` | `searchJiraIssuesUsingJql` |
| Create issue | `issue create --project --type --summary [--description-md\|--description-file\|--adf-file] [--parent] [--labels] [--fields-json] [--no-auto-label]` | `createJiraIssue` |
| Edit issue | `issue edit KEY [--summary] [--description-md/file] [--labels-add/--labels-remove] [--fields-json]` | `editJiraIssue` |
| List / execute transitions | `issue transitions KEY` · `issue transition KEY --to <id-or-name> [--fields-json]` | `getTransitionsForJiraIssue` / `transitionJiraIssue` |
| Comment | `comment add KEY --body-md "…"` | `addCommentToJiraIssue` |
| Worklog | `worklog add KEY --time 2h [--comment-md]` | `addWorklogToJiraIssue` |
| Link issues / link types | `link create --type Relates --inward A --outward B` · `linktype-list` | `createIssueLink` / `getIssueLinkTypes` |
| Remote links | `issue remotelinks KEY` | `getJiraIssueRemoteIssueLinks` |
| Projects / issue types / field metadata | `project list` · `issuetype-list --project KDP` · `createmeta --project KDP --type <id>` | `getVisibleJiraProjects` / `getJiraProjectIssueTypesMetadata` / `getJiraIssueTypeMetaWithFields` |
| User lookup | `user-lookup --query text` | `lookupJiraAccountId` |
| **Boards / sprints / backlog (Agile)** | `board list [--project]` · `board get ID` · `sprint list --board ID [--state]` · `sprint issues ID` · `backlog list --board ID` | — (MCP never exposed the Agile API) |
| Confluence page read | `page get ID [--body]` · `page children ID` · `page comments ID` | `getConfluencePage` etc. |
| Confluence page write | `page create --space-id --parent-id --title --body-md/file` · `page update ID --body-md/file [--title] [--message]` | `createConfluencePage` / `updateConfluencePage` |
| Confluence spaces / CQL | `space list [--keys NDTW]` · `cql --query "…" [--limit]` | `getConfluenceSpaces` / `searchConfluenceUsingCql` |

## Output contract

- Success → JSON on stdout, exit 0. Error → `{ error, status?, details? }` on stderr, exit 1.
- `--out <file>` (global, any command) writes the result to a file; stdout gets `{ savedTo, count }`. **Use it for anything you'll re-parse** — this replaces the MCP large-result file convention.
- Pagination is internal and exhaustive; a `--max`-capped search carries `truncated: true`. No silent caps.
- 429/5xx are retried with backoff honoring `Retry-After` (API-token rate limiting has been active since 2025-11-22; numeric limits unpublished).
- Every mutating command takes `--dry-run` — it prints the exact payload without sending. **Gates present the dry-run output for approval, then execute.** Creates auto-apply the `ai-sdlc-generated` label (`--no-auto-label` to opt out).

## Sharp edges (learned live)

- **Rich text is Markdown in, ADF out.** The converter covers headings, bold/italic/inline code/links, flat bullet/ordered lists, fenced code blocks, pipe tables, blockquotes — the template subset, pinned by golden tests. Beyond that, pass raw ADF via `--adf-file`. Same converter feeds Confluence (`atlas_doc_format`).
- **Don't re-parse CLI stdout through PowerShell pipes** — PS 5.1 re-encodes and injects a BOM. Use `--out` and read the file. (Input files are safe: the converter strips a leading BOM.)
- **Transitions:** `issue edit` cannot change status (the REST endpoint silently ignores it) — use `issue transition`, which resolves `--to` by transition id, transition name, or target status name and lists what's available on a miss. Workflows vary by issue type; there is no workflow API (`references/kdp-instance.md` §5).
- **`--fields-json`** merges arbitrary fields (e.g. custom fields) into create/edit payloads as a JSON object.
