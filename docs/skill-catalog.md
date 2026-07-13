# Skill Catalog

The authoritative index of the ai-sdlc library. Restructured 2026-07-12 per the [system review](reviews/2026-07-12-system-review.md): **11 active skills + 1 meta**, with 6 deferred behind named activation triggers. Library rules live in `references/conventions.md`; instance facts in `references/kdp-instance.md`.

## Definitions

- **Skill** — a versioned instruction module (SKILL.md) a human invokes inside an agent surface (Claude Code, Copilot, Rovo) to run one workflow.
- **Deferred skill** — built and in the repo, marked `Status: deferred` in its body; it activates only when its named trigger actually occurs (conventions: demand-signal rule).

## Conventions (summary — `references/conventions.md` is normative)

- Human approval gates on every external write, in three declared tiers: **per-item**, **per-run**, **standing** (recurring read-only artifacts only, re-confirmed each sprint).
- **Run logs required for runs that write externally** (`.ai-sdlc/runs/`, from `templates/run-log.md`).
- **Template-first** for every artifact that lands in a system of record.
- Jira hierarchy **Initiative → Epic → Story**; teams refine Stories into Tasks. AC: Gherkin for behavior, structured blocks for NFRs. **Briefs live in the epic's own fields** (Background/Description/Requirements); Confluence is the optional multi-epic umbrella.
- Growth discipline: no new skill/mode/rule without a named requester after a live run; every addition names what it displaces.

## The PO pipeline (runs in order, each gated)

| # | Skill | One line |
|---|-------|----------|
| 1 | **product-brief-builder** (`skills/po/product-brief-builder/`) | Discovery interview → one rigorous brief in the house structure, written to the epic's fields (or carried to the writer for new epics) |
| 2 | **backlog-decomposer** (`skills/po/backlog-decomposer/`) | Approved brief → draft Initiative → Epics → Stories with AC, sliced vertically; brief-lite fallback with a visible debt flag; owns the living decomposition registry |
| 3 | **jira-confluence-writer** (`skills/po/jira-confluence-writer/`) | Approved decomposition → real Jira hierarchy, epic brief fields populated, safe re-runs, `ai-sdlc-generated` labels; create-only |
| 4 | **definition-of-ready-critic** (`skills/po/definition-of-ready-critic/`) | Entry **and exit** critic: DoR verdicts with specific fixes before refinement (`dor-ready`/`dor-needs-work`); acceptance mode builds the per-AC evidence table at PO Validation (DoD D1–D6) |

## Active skills by role

### Product Owner

- **pipeline-adopter** (`skills/po/pipeline-adopter/`) — brings existing work into the pipeline: brief reconstruction from house fields, tiered item-by-item gated reconciliation; the one skill permitted to edit existing issues. *The library's first live-run skill (KDP-40426).*

### Tester

- **test-plan-generator** (`skills/tester/test-plan-generator/`) — AC-traced test cases (happy/edge/negative/NFR) with levels and automation flags; optional exploratory-charter section; AC gaps become PO findings.
- **bug-report-writer** (`skills/tester/bug-report-writer/`) — minimal deterministic repro, expected-vs-actual cited to AC, severity with rationale, duplicate check, correct KDP bug type.

### Scrum Master

- **sprint-planning-facilitator** (`skills/sm/sprint-planning-facilitator/`) — flow-first capacity math and draft goals before planning; **record mode captures the commitment baseline every other sprint skill depends on**.
- **sprint-radar** (`skills/sm/sprint-radar/`) — one signal engine, two views: daily one-screen digest (standing gate) and 2–3×/sprint escalation triage with evidence-backed drafts (per-item gate). Merged from daily-standup-digest + impediment-radar.
- **sprint-close** (`skills/sm/sprint-close/`) — stakeholder report (flow metrics first + 4-metric system scoreboard), blameless retro pack, action capture, optional demo agenda. Merged from sprint-report-generator + retro-facilitator.
- **backlog-hygiene-auditor** (`skills/sm/backlog-hygiene-auditor/`) — cadence decay sweep (stale/duplicates/orphans/zombies/closure integrity/dependency & governance rollup) with item-by-item approved cleanup; **epic-closeout mode is the blocking gate at the moment of epic closure**.

### Meta

- **tabletop-shakedown** (`skills/meta/tabletop-shakedown/`) — stress-tests the library against real content, strictly read-only; content findings vs. system proposals. Sunset after T14 + the team dry runs; live use is the validation from then on.

## Deferred skills (activation triggers named)

| Skill | Location | Activates when |
|-------|----------|----------------|
| **release-notes-generator** (release runner: readiness go/no-go + notes) | `skills/po/release-notes-generator/` | The first real release routed through the pipeline |
| **code-review-critic** (single PR skill: hygiene pass + review pass) | `skills/developer/code-review-critic/` | Read access to a real `ap-*` repository |
| **copilot-handoff-packager** | `skills/developer/copilot-handoff-packager/` | The org's first real Copilot coding-agent delegation |
| **tech-design-drafter** (template usable standalone) | `skills/developer/tech-design-drafter/` | A named request for a design doc |
| **incident-hotfix-runner** (owns the whole hotfix express path) | `skills/developer/incident-hotfix-runner/` | The first real production incident routed through the express lane |
| **ac-playwright-scaffolder** (generalizes to xUnit/Jest/Playwright at activation) | `skills/tester/ac-playwright-scaffolder/` | Test-repo access |

## Retired (2026-07-12 restructure — git history preserves all content)

| Skill | Disposition |
|-------|-------------|
| implementation-planner | Cut — native agent plan modes cover it; plan-before-code requirement lives in copilot-handoff-packager |
| pr-hygiene | Merged into code-review-critic |
| exploratory-charter-generator | Merged into test-plan-generator (charter section) |
| refinement-facilitator | Cut — DoR report + rank is the prep; overrule sunlight moved into the readiness report |
| sprint-review-demo-facilitator | Cut — demo agenda survives as an optional sprint-close template |
| daily-standup-digest / impediment-radar | Merged into sprint-radar |
| sprint-report-generator / retro-facilitator | Merged into sprint-close |
| skill-author | Cut as a skill — `references/conventions.md` + `templates/skill-template.md` remain as files |
