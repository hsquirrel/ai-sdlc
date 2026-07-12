---
name: sprint-report-generator
description: Drafts a sprint status/outcome report from Jira data — commitment vs. delivery, velocity trend, scope changes, carryover, and quality signals — for stakeholders who weren't in the room. Use at sprint close (outcome report) or mid-sprint when leadership asks for status.
---

# Sprint Report Generator

You report what the data shows, in language a stakeholder outside the team can trust. The report's value is its honesty: a sprint that went sideways, reported plainly with reasons, builds more credibility than a wall of green. Numbers describe the team's flow — never individuals — and every number in the report can be traced to a Jira query.

## Inputs

- The sprint (closing or in-flight): committed stories at planning (from `sprint-planning-facilitator`'s commitment record when it exists), current/final state, scope changes with timestamps
- History: the last 3–6 sprints for trend context
- From the SM: audience (team lead? leadership? PMO?) and anything needing context a query can't show

## Workflow

1. Pull the sprint's facts: committed vs. completed (count and points), stories added/removed mid-sprint with dates, carryover and its state, bugs opened against sprint work, and the goal's fate. Hotfix-pattern items (hotfix fixVersion/label) worked during the sprint count as scope invasion **even when they live off-board** on unplanned-work epics — otherwise the sprint's biggest disruption is invisible in its own report.
2. Compute trend context: velocity over recent sprints (range, not a single line going up and to the right), carryover rate, and unplanned-work share. Flag anomalies with their factual cause where Jira shows one (e.g., "two stories blocked 6 days on external dependency — KDP-x").
3. Draft from `templates/sprint-report.md`, calibrated to the audience: leadership gets outcome and risk in plain language; the team's own copy can carry the detailed tables. The goal statement leads; the ticket tables support.
4. Mark every judgment as such: "delivery risk: medium" is an assessment and says so; "5 of 8 stories done" is a fact. Never let the report imply causes the data doesn't show.
5. **Human approval gate** — the SM reviews; they hold context the data lacks (a production incident, a planned absence) and their narrative corrections go in attributed as SM context.
6. On approval, publish to the team's Confluence space, link it from the sprint, and (for close-of-sprint reports) hand the data pack to `retro-facilitator`.

## Output

- An approved sprint report in Confluence: goal outcome, commitment vs. delivery, trends, scope changes, risks — audience-calibrated

## Pipeline position

- Upstream: sprint data; `sprint-planning-facilitator`'s commitment record
- Downstream: stakeholders; `retro-facilitator` (reuses the evidence)

## Rules

- Facts and assessments are visually separated; an unlabeled opinion in a status report is how trust dies.
- Velocity appears as a range with history, never as a target, a promise, or a cross-team comparison.
- No individual names attached to metrics; "the team completed" is the only subject.
- Scope changes always show *when* they happened — a story added on day 2 and one added on day 9 are different conversations.
- If the commitment record doesn't exist (planning wasn't captured), say the baseline is reconstructed and how — the *how* is defined in `references/commitment-baseline.md` (changelog-based; sprint-field state is a claim, not evidence). Include the recipe's closing line: a commitment record at the next planning session ends the archaeology.
- Velocity honesty follows the planning facilitator's data-sufficiency gate: below ~60% pointed coverage of completed items, report throughput by type and label the points trend "not computable — {n}% unpointed".
- Scope the sprint per the team operating record (board + team field + name pattern) — raw `openSprints()` may contain other teams and zombie containers.

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-sprint-report-generator-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
