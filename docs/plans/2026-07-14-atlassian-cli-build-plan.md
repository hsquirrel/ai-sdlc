# Build Plan: `atl` — a thin Atlassian CLI for the skill library

**Status:** Built — phases 0–4 and 6 complete 2026-07-14 under Jeremy's autonomy grant; phase 5 docs landed same day (run log: `.ai-sdlc/runs/2026-07-14-atl-phase2-write-test.md`; adapter contract: `references/atlassian-access.md`). Acceptance test outstanding: first real skill run at work. · **Date:** 2026-07-14
**Decision basis:** `research/2026-07-13-atlassian-access-without-mcp.md` (option 2 chosen 2026-07-14 — one consistent tool over the acli+REST hybrid; the two-mechanism seam was the deciding objection)
**Constraint confirmed:** API tokens and OAuth both work at Jeremy's workplace; MCP does not.

## 1. Goal and non-goals

**Goal:** one TypeScript/Node CLI (`atl`) that gives every skill in the library a single, deterministic, JSON-emitting command surface over Jira Cloud REST v3, the Jira Software (Agile) API, and Confluence Cloud v2 — replacing the `mcp__claude_ai_Atlassian__*` tools everywhere, including at work.

**Non-goals:**
- Not a general-purpose Atlassian client. The command surface is exactly the library's capability bar (§3) — growth discipline applies to CLI verbs like it applies to skills: no verb without a skill that needs it.
- No interactive/TUI mode, no human-oriented formatting. Agents are the only consumers; humans review via run logs and Jira itself.
- No OAuth in v1. Unscoped API token + basic auth is the documented, sanctioned model for scripts and avoids the scoped-token gateway bugs (JRACLOUD-95747).
- Compass / Teamwork Graph / Rovo search — not load-bearing for any skill; out of scope.

## 2. Architecture

- **Location:** `tools/atl/` in this repo. It's a library deliverable like the skills; splitting into its own repo is a later decision if another team wants it.
- **Runtime:** Node ≥ 20 (jira.js requirement), TypeScript, ESM.
- **Jira client:** [jira.js](https://github.com/mrrefactoring/jira.js) (MIT, actively maintained, ~100% of REST v3 + Agile + Service Desk, fully typed).
- **Confluence client:** hand-rolled `fetch` wrapper — v2 endpoints for pages/spaces/descendants/comments, the v1 `/wiki/rest/api/search` endpoint for CQL. It's a handful of endpoints; a dependency isn't warranted.
- **Auth:** env vars `ATL_SITE` (e.g. `kestra.atlassian.net`), `ATL_EMAIL`, `ATL_TOKEN` (unscoped API token). No token on argv, no token in config files, never echoed in output or run logs.
- **Output contract:** JSON on stdout, always. Errors as structured JSON on stderr + non-zero exit code. `--out <file>` writes results to a file and prints only `{"savedTo": ..., "count": ...}` — preserving the large-result convention skills already follow (`kdp-instance.md` §1).
- **Pagination:** internalized. `search` uses the `nextPageToken` JQL endpoints and keeps fetching until done or `--max` is hit; a truncated result says so explicitly in the JSON (no silent caps).
- **Rate limits:** honor 429 + `Retry-After` with capped exponential backoff; surface `X-Beta-*`/`X-RateLimit-*` headers in `--verbose` mode. Limits are unpublished, so behavior is observed, not assumed.
- **ADF:** rich-text inputs (descriptions, comments) accepted as Markdown and converted to ADF via a small internal converter covering the house subset (headings, paragraphs, bold/italic, code, lists, tables, links — what the templates actually emit); `--adf` flag accepts raw ADF JSON passthrough for anything beyond it. Converter fidelity is pinned by golden-file tests.
- **Writes:** every mutating command supports `--dry-run` (prints the exact request payload without sending) — this is what the per-item gate shows the human before approval. Create commands apply the `ai-sdlc-generated` label by default, matching the writer skill's convention.

## 3. Command surface (the parity checklist)

Mirrors the MCP capability surface plus the Agile gain. Grouped by client; names final at Phase 1 review.

**Jira core (read):** `atl issue get` (fields-minimal by default, `--expand`) · `atl issue changelog` (paginated, complete — cycle-time feed) · `atl search --jql` (nextPageToken pagination, `--fields`, `--max`, `--out`) · `atl issue transitions` (list) · `atl project list` · `atl issuetype list --project` · `atl createmeta --project --type` (per-project replacement endpoints, not the deprecated bulk one) · `atl user lookup` · `atl linktype list` · `atl issue remotelinks` · `atl whoami` (auth smoke test)

**Jira core (write):** `atl issue create` · `atl issue edit` · `atl issue transition` (transitions endpoint — the edit endpoint silently ignores transitions) · `atl comment add` · `atl worklog add` · `atl link create`

**Agile (read — the capability gain):** `atl board list` · `atl board get` · `atl sprint list --board` (with real start/end/complete dates) · `atl sprint issues` · `atl backlog list --board`

**Confluence:** `atl page get` · `atl page create` · `atl page update` (version-aware) · `atl page children` · `atl space list` · `atl cql --query` · `atl page comments` (+ `atl comment add-page` if a skill needs it — currently none writes Confluence comments)

Done means: every row of this list maps to a passing live smoke check against KDP, and no skill needs an MCP tool the CLI lacks.

## 4. Phases and gates

Per working agreements, each phase ends at a gate; nothing proceeds past a gate without Jeremy's approval.

| Phase | Deliverable | Gate |
|-------|-------------|------|
| **0. Plan review** | This document | ✅ Approved with decisions resolved (§6), 2026-07-14 |
| **1. Scaffold + reads** | `tools/atl/` project, auth, all Jira core read commands + unit tests (mocked HTTP) | Read-only live smoke against KDP reviewed (no writes possible yet — nothing to gate per-item) |
| **2. Jira writes** | create/edit/transition/comment/worklog/link with `--dry-run` | Per-item gated live test: a fresh, clearly named KDP test issue (created at phase start, itself gated), every write reviewed via dry-run first, then executed and verified, run log kept |
| **3. Agile reads** | board/sprint/backlog commands | Live smoke: reproduce a sprint-radar data pull for the current sprint; compare against Jira UI |
| **4. Confluence** | reads first, then page create/update | Per-item gated live test in a space the PO designates (never assume location) |
| **5. Library integration** | `references/atlassian-access.md` (the adapter contract: command per capability, output shapes, error handling); `kdp-instance.md` §1 rewritten from "via MCP" to "via atl"; user-guide + catalog touches | Verbatim review of the write set before commit |
| **6. Work-machine packaging** | esbuild single-file `atl.mjs` bundle + install notes (Node 20+ at work: confirmed) | First real skill run at work using `atl` end-to-end — this is the acceptance test for the whole plan |

Estimated build effort: phases 1–4 are roughly a few sessions of work; phase 5 is small because skill bodies are already surface-neutral (zero MCP tool names in `skills/` — verified 2026-07-14).

## 5. Testing

- **Unit:** Jest (target-stack alignment), HTTP mocked; golden-file tests for the Markdown→ADF converter and for output shapes (the shapes are the adapter contract — a shape change is a breaking change).
- **Live smoke:** a scripted read-only pass (`atl whoami` → project → search → changelog → boards → sprint → CQL) runnable on demand; used at every gate and as the first command run on the work machine.
- **Write tests:** only against the designated test issue / designated Confluence page, always per-item gated, always run-logged.

## 6. Decisions (resolved by Jeremy, 2026-07-14)

1. **Name:** `atl` (short, no collision with Atlassian's `acli`).
2. **Location:** `tools/atl/` in-repo.
3. **Markdown→ADF:** small internal converter pinned by golden files (no third-party md→ADF dependency).
4. **Packaging for work:** esbuild single-file `atl.mjs` (one file + Node, no install step).
5. **Test issue:** create a new KDP issue, clearly named as the CLI write-test target, at Phase 2 start (that create is itself per-item gated).
6. **Node 20+ at work:** confirmed available.

## 7. Risks

- **ADF fidelity** — richest risk surface; mitigated by limiting v1 to the template subset + `--adf` escape hatch + golden tests.
- **Unpublished rate limits** (in force since 2025-11-22) — mitigated by backoff + header surfacing; flow-metrics sweeps are the commands to watch.
- **Token expiry** (≤365 days, forced) — mitigation: `atl whoami` reports token age if determinable; rotation noted in the access reference.
- **jira.js churn** — pin the version; the adapter contract shields skills from client-library changes.
