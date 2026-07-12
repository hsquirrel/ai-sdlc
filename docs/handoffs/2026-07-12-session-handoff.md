# Session Handoff — 2026-07-12

For a fresh session continuing this work. Read this, then the two "resume here" files in §2. Repo: `C:\dev\ai-sdlc` → https://github.com/hsquirrel/ai-sdlc (private, main @ `775caeb`). Operator: Jeremy Harrell (Kestra; also the reporter/owner of the Jira epic in the active run).

## 1. What this is and where it stands

A library of **26 AI skills** embedding AI into an agile SDLC with humans always in the loop — PO (6), Developer (6), Tester (4), SM (8), Meta (2: `skill-author`, `tabletop-shakedown`). All skills follow the open Agent Skills standard (`skills/<role>/<name>/SKILL.md`), are template-first, keep per-run audit logs, and gate every external write on human approval. `docs/skill-catalog.md` is the index; `docs/user-guide/` is three-level user documentation (overview / role guides / per-skill pages) that must be updated in the same commit as any behavior change (CLAUDE.md rule).

History in one line: built the 23-skill catalog from a consensus interview → added run-log + template-first conventions → stress-tested via 5 tabletop shakedowns against live Jira (T1 .NET 10 epic, T2 product in-flight, T3 Bulk Upload replay, T4 SM ceremony sweep, T5 hotfix/UAT) → reviewed all five with Jeremy and landed ~40 approved system changes + 2 new skills (`incident-hotfix-runner`, `pipeline-adopter`) → started the first writes-enabled run.

## 2. ACTIVE WORK — resume here first

**The pipeline-adopter's first live run (KDP-40426, the .NET 10 upgrade epic) is AT THE APPROVAL GATE.**

- **Read:** `.ai-sdlc/runs/2026-07-12-pipeline-adopter-kdp40426.md` (run log) and `docs/adoptions/2026-07-12-kdp40426-proposed-writes.md` (every proposed write, verbatim, W1–W12 with per-item Decision lines; also delivered to Jeremy as a rendered file).
- **State:** W4 is withdrawn (see §5 trap). W1–W3, W5–W12 await Jeremy's item-by-item decisions. He may answer in chat ("approve W1–W6…") or edit the file's Decision lines. **Nothing has been written to Jira/Confluence yet.**
- **On approval:** apply exactly what's approved (the adopter is the only skill allowed to edit existing issues — only plan items, exactly as written), fill the plan's "Applied" table, update the run log's External Writes, label touched items `ai-sdlc-adopted`, seed the living registry (location = his W11 choice), commit. Tier 3 Batch A (AC backfill, 5 in-flight items) writes after its own approval; Batches B/C (22 items) get drafted for review only after Batch A survives.
- Open inputs only Jeremy has: W9 owners/dates, W10b (the cut-off scope bullet), W11 registry location, W1 initiative target (TR-8 recommended).

## 3. Scenario backlog (`docs/shakedowns/scenario-backlog.md` is authoritative)

- **T14 — TIME-SENSITIVE (~Jul 17):** live first-run pair at the AP Blue S89→S90 boundary — sprint-planning-facilitator record mode creates the org's first commitment record; then daily-standup-digest for one sprint with the declared Jira-only banner.
- T1 remnant still open: **campaign/batch mode** (T1-S5) — partially relieved by the adopter's Tier 3 batching, not yet a general mechanism.
- T6 (developer-role tabletop) + T13 (hotfix-release replay): **blocked on repo access** to one `ap-*` GitHub repo / a real PR — worth asking Jeremy to arrange; it's the library's biggest untested half.
- T12 (governance-artifact tracker): candidate, owner undecided. T7–T11: queued candidates.
- T2–T5 all **actioned** (T5's S6 UAT mode declined "not needed now"; everything else landed).

## 4. Environment facts (verified, save the rediscovery)

- Atlassian cloudId `287e948f-75b9-420f-8cdb-818ef948b429` (kestra.atlassian.net). Jira project **KDP** ("Kestra Digital Platform", id 17860). Confluence spaces seen: NDTW (engineering), KRN (release notes), NAO, QA2, PMO. Incident intake lives in project **SSQ** ("System Malfunction").
- Schema/intelligence files (all under `skills/po/jira-confluence-writer/references/`): **`kdp-schema.md`** (hierarchy, fields incl. AC `customfield_14705`, all 24 issue types, link-type registry, house epic conventions) and **`kdp-workflows.md`** (full empirical workflow map, 12 groups). Bug types: `skills/tester/bug-report-writer/references/kdp-bug-types.md`.
- Shared root artifacts: `templates/run-log.md`, `templates/team-operating-record.md`, `references/commitment-baseline.md`.
- **MCP quirk:** large Jira results save to a file path instead of returning — parse with python (`json.load`), keep `fields` minimal, never re-fetch. Workflow-definition API is unavailable; use `getTransitionsForJiraIssue` per (type,status) to map workflows.

## 5. The traps (hard-won; do not relearn)

- **`statusCategory=Done` ≠ delivered** and **resolution presence ≠ delivered**. Delivered = status in the type's terminal set per `kdp-workflows.md`. Done-category includes mid-pipeline waypoints and even a failure state (Regression Failed); resolution is legitimately NULL on several true terminals. W4 died on this; three skills were corrected twice.
- Sprint-field state lies (items carry sprints they never ran in) — changelogs are the evidence (`references/commitment-baseline.md`).
- `openSprints()` returns zombie containers (one open since Nov 2023) — always scope by board + team (team operating record).
- The Flagged field is an anti-signal in this instance (unused by teams, polluted with relics) — a claim to verify, never a fact.
- The hotfix issue types are dead; real hotfixes = Bug/Story + fixVersion (+ SSQ incident via "Root Cause Fix" link; regression trace via "Problem/Incident: is caused by").
- Teams keep brief-grade content in the epic **Background field** (`cf14757`) — reconstruct-and-diff, don't demand a Confluence brief.

## 6. Working agreements with Jeremy (observed, consistent)

- Human gates are the product's core thesis — never write externally without explicit approval; for substantial write sets he wants **a detailed .md review doc with exact verbatim writes** (learned at the adoption gate), not just AskUserQuestion summaries.
- AskUserQuestion works well for design decisions/dispositions; he answers fast and decisively, sometimes with free-text refinements that carry new requirements — read them carefully.
- Focus on **improving the skills system**, not fixing uncovered content defects (unless a run is explicitly for that, like the current adoption).
- Fan-out agents are fine; **results reviewed individually**; persistent cross-session tracking expected (scenario backlog pattern).
- Commit style: one commit per skill/coherent change, trailer `Co-Authored-By: Claude Fable 5` + `Claude-Session:` link (per session config); push to main directly. Update catalog + user-guide pages in the same commit as behavior changes. Keep run logs for our own skill executions (dogfood).
- Blameless always: no individual's name attached to any metric/stall in anything we produce.

## 7. File map (orientation)

```
CLAUDE.md                     project instructions (auto-loaded)
docs/skill-catalog.md         authoritative skill index
docs/user-guide/              L1 README / roles/*.md / skills/*.md (26 pages)
docs/shakedowns/              scenario-backlog.md + 5 tabletop reports
docs/adoptions/               KDP-40426 reconciliation plan + proposed-writes (ACTIVE)
docs/handoffs/                this file
skills/<role>/<name>/         SKILL.md + references/ + templates/
templates/, references/       shared root artifacts (run-log, team record, baseline)
.ai-sdlc/runs/                run logs (incl. the active adoption run)
```

## 8. Sensible next moves (in rough order)

1. Close the adoption gate: get Jeremy's W-decisions, apply, then Batch A.
2. T14 before ~Jul 17 (needs Jeremy to loop in the AP Blue SM — or run it on his authority).
3. Ask about `ap-*` repo access to unblock T6/T13 (developer-role validation).
4. Rovo/Copilot distribution (skills are still only runnable from this repo+session context) — discussed early on as pilot-on-Copilot / deploy-to-Rovo; untouched since.
