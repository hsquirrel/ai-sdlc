# Atlassian access without MCP — CLI/REST options research

**Date:** 2026-07-13 · **Status:** Proposed (decision pending)
**Trigger:** MCP servers are blocked in Jeremy's work environment; the skill library's Atlassian access (`mcp__claude_ai_Atlassian__*`) needs a replacement that works there. Research run: 106-agent deep-research workflow, 24 sources fetched, 24/25 claims verified 3-0; gaps filled from the per-agent journal.

## The capability bar

A replacement must cover what the skills use today via MCP, plus one gain Jeremy flagged:

- **Jira platform:** issue get/create/edit, JQL search with large-result handling, transitions, comments, worklogs, issue links + link types, createmeta/field metadata, account lookup, **changelogs** (load-bearing for cycle-time flow metrics).
- **Confluence:** page get/create/update, descendants, spaces, CQL search, comments.
- **Jira Software (Agile) API** — boards, sprints, backlog, rank. *The MCP tool set never exposed these*; skills worked around via JQL sprint fields. A REST/CLI layer is a capability gain here.
- Windows 10 / PowerShell, non-interactive auth, JSON output an agent can consume, low corporate-approval friction, auditable deterministic commands (template-first discipline).

## Verified landscape (mid-2026)

### Atlassian official `acli`
- Free on all Jira Cloud plans (GA ~2025-05-28), vendor-maintained (monthly releases into 2026), native Windows binaries + winget (`Atlassian.AtlassianCLI`).
- Non-interactive auth: email + site + **unscoped** API token via stdin (`Get-Content token.txt | .\acli.exe jira auth login ...`) — documented since Apr 2025. The OAuth path requires site-admin authorization per site (v1.3.15, Mar 2026); token login sidesteps it.
- Jira coverage: `jira workitem` create/edit/search (JQL)/transition (incl. bulk `--jql`)/clone/link/assign/archive/delete, comments CRUD, attachments, watchers; v1.3.5 (Oct 2025) added **board search, sprint listing, sprint work-item listing**, custom field creation. `--json` output.
- **No Confluence commands at all** (command reference re-fetched 2026-07-13; no published timeline).
- Unverified: changelog access via `workitem search` (likely absent → REST fallback needed), large-result pagination behavior.

### Custom thin layer over REST (v3 Jira / v2 Confluence)
- Everything needed is documented REST: per-issue changelog endpoint (`GET /rest/api/3/issue/{key}/changelog`, paginated), transitions (GET + POST; note the edit endpoint silently ignores transitions), CQL search, Confluence v2 page create/update, full Agile API.
- Basic auth (email + API token) is Atlassian's *documented, sanctioned* model for "personal scripts, bots, and ad-hoc execution."
- Accelerators: **jira.js** (Node/TS, MIT, v5.4.0 Jun 2026, ~100% of Jira REST v2/v3 + Agile + Service Desk, typed, needs Node ≥20) — matches the target tech stack; **atlassian-python-api** (Apache-2.0, Jira+Confluence in one lib, already tracks the `nextPageToken` JQL pagination change via `enhanced_jql`).
- Implementation costs: ADF for rich-text fields (description, textarea customfields), bulk `createmeta` deprecated (use per-project `/issue/createmeta/{project}/issuetypes`), JQL search pagination migrated from `startAt` to `nextPageToken`.

### TWG CLI (resolves the name)
- **Real and Atlassian-official**: the Teamwork Graph CLI (`twg`), open beta, github.com/atlassian/twg-cli (Apache-2.0 public mirror; engineering repo is private). Agent-first — built explicitly for Claude Code/Codex/Cursor to "query and act" across Jira (work items, boards, sprints, transitions, links), Confluence (pages, blogs, spaces, search), Bitbucket, JSM, Assets, people/teams.
- Auth is **OAuth 2.1**, not API tokens — Atlassian's own comparison doc contrasts it with Rovo MCP (PAT-based). PowerShell installer exists.
- Concerns for our use: beta and "actively evolving" (Atlassian's words); OAuth admin-authorization friction in a locked-down org — plausibly blocked by the same policy that blocks MCP; natural-language-oriented surface is weaker for template-first, auditable, deterministic runs. Public repo is tiny (6 stars, 19 commits) — health unassessable from outside.

### Appfire (Bob Swift) Atlassian CLI
- The only single verified tool covering Jira + Confluence Cloud with email + API-token auth. Actively sold (repriced Jul 2026).
- But: paid Marketplace app (~$360/25 Cloud users) **and** a two-component architecture requiring an admin-installed CLI Connector app on the instance, plus Java 8+ on the client. Double approval hurdle (budget + admin app install) — the exact friction we're trying to avoid.

### ankitpokhrel/jira-cli (OSS)
- Actively maintained (v1.7.0 Aug 2025, ~5.8k stars); raw JQL, create/edit, transitions (`move`), comments, links, epics, sprints; `--plain/--raw/--csv`; Cloud auth via `JIRA_API_TOKEN` basic auth. Jira-only; largely redundant with the free official acli. Interactive-TUI-first design; all capability claims trace to its own README.

## Cross-cutting auth & platform facts (affect every option)

- **API tokens now expire**: new tokens 1–365 days (default 1 year) since 2024-12-15; pre-existing "permanent" tokens were force-expired in the 2026-03-14 → 2026-05-12 window. Any adapter needs a token-rotation habit.
- **Scoped vs unscoped**: unscoped tokens do basic auth against the normal site URL and remain the reliable choice (acli explicitly requires "token without scopes"; JRACLOUD-95747, unresolved as of Jul 2026, documents scoped tokens failing basic auth on some endpoints). Scoped tokens must call `https://api.atlassian.com/ex/jira/{cloudId}` gateway URLs. The May 2025 "unscoped tokens are deprecated" UI notice was *removed* by Jul 2025 — no cutoff timeline exists.
- **Rate limiting on API-token calls** took effect 2025-11-22 across Jira/Confluence Cloud; numeric limits unpublished, Atlassian says most customers unaffected; watch for `X-Beta-*` headers. Batch-heavy skills (flow metrics) should throttle and honor 429s.
- **Can admins block tokens?** Atlassian Guard's token-blocking policy documented for **external users** specifically; internal managed users' tokens aren't blocked by that control, and org admins get an API-token activity dashboard (visibility, not prevention). Still: **step zero is verifying Jeremy can create an API token on the work Atlassian account.**

## Top three proposals

### 1. Recommended — official `acli` for Jira + thin REST supplement, behind one adapter contract
Use the free, vendor-supported acli for the bread-and-butter Jira surface (JQL search, issue CRUD, transitions, comments, links, boards/sprints) and a small script layer (PowerShell or Node) calling REST directly for what acli lacks: Confluence v2 pages + CQL, issue changelogs, large paginated JQL exports. Skills call a documented adapter contract (`references/atlassian-access.md`-style), never a tool name — MCP at home, acli+REST at work, swappable.
**Why:** zero cost, zero admin approval (token auth), native Windows, JSON output, and the REST supplement is small because acli covers ~80% of calls. **Risk:** two mechanisms to document; acli evolves monthly (~6-month version support window).

### 2. Full custom thin CLI on jira.js (TypeScript/Node)
One coherent tool (`ai-sdlc-atl` or similar) wrapping Jira v3 + Agile + Confluence v2 with subcommands mirroring the skills' verbs, JSON-only output, run-log-friendly. jira.js gives typed ~100% Jira coverage incl. Agile; Confluence v2 is a handful of endpoints hand-rolled. Matches the target tech stack (TypeScript/Node), so it's also dogfood — a real repo for the Developer/Tester skills to operate on.
**Why:** exact fit to the skills' contract, one auth path, full changelog/Agile/Confluence coverage, no vendor CLI churn. **Cost:** a few days' build + ongoing ownership of ADF handling, `nextPageToken` pagination, createmeta replacement endpoints, 429 backoff, token rotation. Choose this if the acli hybrid's seams chafe.

### 3. TWG CLI — trial and watch, not adopt
Atlassian's own agent-first CLI covers Jira + Confluence + the graph in one official tool and targets exactly our use case (Claude Code without MCP). Blockers today: open beta, OAuth 2.1 (likely subject to the same admin controls that block MCP at work), and a fuzzier command surface that fights template-first auditability.
**Action:** try `twg login` at work once; if OAuth is blocked, that confirms option 1/2. Re-evaluate when it exits beta or gains token auth.

**Rejected:** Appfire CLI (cost + admin connector app = the approval friction we're avoiding); ankitpokhrel/jira-cli (Jira-only, redundant with free official acli).

## Open questions

1. Can Jeremy create an (unscoped) API token on the work Atlassian account, and does work policy allow basic-auth REST calls? (Step zero — one curl proves it.)
2. Does `acli jira workitem search` handle large result sets acceptably, and does any acli command expose changelogs? (Test empirically; determines the size of the REST supplement.)
3. Does TWG CLI's OAuth flow survive the work org's admin policy?
4. Numeric API-token rate limits (unpublished) — observe headers in practice.
