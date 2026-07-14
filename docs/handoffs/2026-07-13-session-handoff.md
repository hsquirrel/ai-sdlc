# Session Handoff — 2026-07-13

For a fresh session continuing this work. Repo: `C:\dev\ai-sdlc` → https://github.com/hsquirrel/ai-sdlc (private, main @ `bbb7cc6`). Operator: Jeremy Harrell (Kestra; reporter/owner of the Jira epic in the active run). Delete this file once absorbed.

## 1. What happened since the 2026-07-12 handoff

Two review agents (agile-best-practice + bloat/simplification) audited the whole system; findings reconciled in **`docs/reviews/2026-07-12-system-review.md`** (raw reports alongside). Jeremy approved and we **executed the full restructure** (6 commits, `bc16958`..`bbb7cc6`):

- **26 skills → 12 active (11 role + 1 meta) + 6 deferred** with named activation triggers. Merges: pr-hygiene→code-review-critic; charters→test-plan-generator; digest+radar→**sprint-radar**; report+retro→**sprint-close**. Cuts: implementation-planner, refinement-facilitator, sprint-review-demo-facilitator, skill-author (files survive at root). All hotfix logic consolidated into incident-hotfix-runner.
- **Foundation moved to repo root:** `references/conventions.md` (gate tiers per-item/per-run/standing, demand-signal + displacement rules, writes-only run logs), `references/kdp-instance.md` (THE single instance-facts home — schema, workflow map, trap registry, bug types, sprint pitfalls, team operating record), `references/definition-of-done.md` (D1–D6), `templates/skill-template.md`.
- **Jeremy's four decisions (2026-07-12, via AskUserQuestion):** full restructure ✓; briefs live in **epic fields** (Background/Description/Requirements; Confluence = multi-epic umbrella only) ✓; gate tiering adopted **narrowly** (standing tier = digest-class only, re-triggers on anomalies) ✓; user guide **kept and fixed** (not deleted) ✓.
- New capability landed as modes, not skills: DoR critic **acceptance mode** (per-AC evidence at PO Validation), hygiene auditor **epic-closeout mode** (blocking, at closure) + dependency/governance rollup, sprint-close **4-metric scoreboard**, flow metrics primary everywhere.
- **`docs/proposals/2026-07-12-change-case.md`** — the persuasive argument (R1–R5 Jira admin fixes + H1–H6 working agreements, all evidence-cited, blameless) for Jeremy's **team dry runs and tabletops in the coming days**. This is his active initiative.
- Catalog, CLAUDE.md, and the full user guide rebuilt and verified (links, counts, content) 2026-07-13.

## 2. ACTIVE WORK — resume here first

**The pipeline-adopter's first live run (KDP-40426, .NET 10 epic) is STILL AT THE APPROVAL GATE.**

- Read: `.ai-sdlc/runs/2026-07-12-pipeline-adopter-kdp40426.md` + `docs/adoptions/2026-07-12-kdp40426-proposed-writes.md` (W1–W12 verbatim, per-item Decision lines). W4 withdrawn. **Nothing written to Jira/Confluence yet.**
- Awaiting Jeremy: item decisions W1–W3, W5–W12; his inputs on W9 owners/dates, W10b cut-off bullet, W11 registry location, W1 initiative target (TR-8 recommended).
- On approval: apply exactly as written, fill the Applied table, update the run log, label `ai-sdlc-adopted`, seed the registry, commit. Then Tier 3 Batch A (own gate), then B/C only after A survives.

## 3. Near-term calendar

- **T14 — TIME-SENSITIVE (~Jul 17):** sprint-planning-facilitator **record mode** at the AP Blue S89→S90 boundary creates the org's first commitment record; then **sprint-radar daily mode** for one sprint (standing approval, Jira-only banner). This is also the live demo for change-case H3.
- **Team dry runs/tabletops (coming days):** Jeremy presents the change case; tabletop-shakedown stays active for these, then sunsets.

## 4. Open items only Jeremy can close

1. W-decisions for KDP-40426 (§2).
2. Change-case addressee: who admins kestra.atlassian.net, and delivery of R1–R5.
3. `ap-*` repo access → activates code-review-critic (and unblocks the developer-role live fire, ex-T6).
4. First real release / first Copilot delegation / first incident → activate the other deferred skills (triggers in `docs/skill-catalog.md`).

## 5. Environment facts & traps

All consolidated in **`references/kdp-instance.md`** — read it before touching Jira. Highlights: cloudId `287e948f-75b9-420f-8cdb-818ef948b429`, project KDP (17860), incidents in SSQ; **delivered = terminal set per §5, never statusCategory/resolution alone** (the W4 lesson); sprint fields lie — changelogs are evidence; `openSprints()` returns zombies — scope by board+team; Flagged field is a claim, not a fact; hotfixes ship as Bug + fixVersion + `hotfix` label; briefs live in epic Background/Description/Requirements. MCP quirks: large Jira results save to a file (parse with python, minimal `fields`); workflow-definition API unavailable.

## 6. Working agreements with Jeremy (durable — also in Claude's memory)

- Human gates are the product's thesis. Substantial write sets → **verbatim .md review doc with per-item Decision lines**, not chat summaries.
- AskUserQuestion for design decisions — he answers fast and decisively; his free-text refinements carry new requirements, read them carefully.
- Improve the skills system, not content defects (unless the run is for that). Fan-out agents fine; results reviewed individually. Blameless always — no names on metrics/stalls.
- Commits: one per coherent change, trailer `Co-Authored-By: Claude Fable 5` + `Claude-Session:` link, push to main directly. Catalog + user guide updated in the same commit as behavior changes. Growth discipline now codified: demand-signal + displacement rules in `references/conventions.md`.

## 7. Orientation

`docs/skill-catalog.md` (index: active/deferred/retired) → `references/conventions.md` → `references/kdp-instance.md`. User guide: `docs/user-guide/`. Reviews/proposals/adoptions/shakedowns under `docs/`. Run logs: `.ai-sdlc/runs/`.
