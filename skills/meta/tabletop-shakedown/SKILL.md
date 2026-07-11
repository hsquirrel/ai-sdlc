---
name: tabletop-shakedown
description: Stress-tests the skills library by walking a scenario through the pipeline on paper — real Jira/Confluence content, strictly read-only — to find where skill assumptions break. Use when validating the system against a new work shape (in-flight, engineering-driven, incident, UAT, replay of a completed effort) before trusting it there.
---

# Tabletop Shakedown

You are a test pilot for the skills library itself. A tabletop takes a real scenario and asks, for each relevant skill: *what would it ask, produce, gate, and write here — and where do its assumptions break?* The scenario's content is never the patient; it's the diagnostic instrument. You read everything and write nothing to any external system.

Every tabletop is a hypothesis in charter form: **explore** {work shape} **with** {real content} **to discover** {which system assumptions break}. A tabletop that merely confirms the pipeline works was aimed at the wrong scenario.

## Inputs

- A scenario from `docs/shakedowns/scenario-backlog.md` (or a new one — add it to the backlog first, with its hypothesis)
- Read access to the relevant Jira project(s) and Confluence spaces; for replay scenarios, the completed effort's full history
- The library itself: every in-scope skill's SKILL.md, templates, and references are the rulebook being tested

## Workflow

1. Start the run log (see Run Log section) and restate the scenario's hypothesis — what this tabletop is trying to break.
2. Gather the scenario's real content, read-only: the driving Jira items with children, comments, links, statuses, field usage; Confluence pages both linked and *unlinked-but-related* (search for them — orphaned docs are themselves findings); sprint/board data where SM skills are in scope.
3. Walk each in-scope skill against the content, in pipeline order, per its actual SKILL.md text — not from memory:
   - What would it ask? Would its questions make sense to this scenario's humans?
   - What would it produce from its templates? Would the output be right, wrong, or nonsense here?
   - Where would its gates, rules, and checklists fire — correctly or falsely?
   - What can't it do at all here? (Missing entrance, wrong assumption, no template fit.)
4. For replay scenarios: compare what the pipeline *would have produced* against what history shows actually happened — reality has already graded the homework; name which real failures the pipeline would (and would not) have prevented.
5. Compile the report from `templates/shakedown-report.md`, keeping the two finding classes strictly separate:
   - **Content findings** — real defects in the scenario's Jira/Confluence, attributed to the skill that surfaced each
   - **System findings** — proposals to change skills/templates/conventions, each naming the skill and the exact rule or assumption that misfired
6. **Human approval gate** — present the report. The librarian (user) decides which system proposals become skill changes and whether content findings get routed to the content's owners.
7. On approval: save the report to `docs/shakedowns/{YYYY-MM-DD}-{slug}.md`, update the scenario's status in the backlog, and hand approved system proposals to `skill-author` work.

## Output

- A shakedown report in `docs/shakedowns/` (content findings + system proposals + verdict on the hypothesis)
- An updated scenario backlog row

## Pipeline position

- Upstream: `docs/shakedowns/scenario-backlog.md` (the charter list)
- Downstream: `skill-author` (approved system proposals become skill/template changes)

## Rules

- **Strictly read-only against external systems** — no Jira writes, no Confluence writes, no comments, no labels, ever. A tabletop that touched the patient is invalid.
- Walk skills by their written SKILL.md text, not by what you assume they'd do — the gap between the two is often the finding.
- Every system finding names the skill and quotes or cites the specific rule/assumption that misfired; "the pipeline struggled" is not a finding.
- Content findings get severity (blocking-grade vs. significant) and note what the content gets *right* — credibility requires both.
- Be honest about coverage: skills that couldn't be exercised (e.g., developer skills without repo access) are listed as not-exercised, never silently skipped.
- One scenario per tabletop; a scenario that turns out to be two hypotheses becomes two backlog rows.

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-tabletop-shakedown-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
