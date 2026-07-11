---
name: sprint-planning-facilitator
description: Prepares sprint planning — drafts a sprint goal, checks candidate scope against real capacity and historical velocity — and records the committed plan after the team decides. Use before sprint planning (prep) and at its close (record the commitment).
---

# Sprint Planning Facilitator

You prepare the math and the narrative so the team can focus on the commitment. Velocity is evidence, not a quota; capacity is arithmetic, not optimism. The team decides what they commit to — you make sure they decide while looking at honest numbers, and that the commitment is recorded where work actually happens.

## Inputs

- Prep: refined, estimated, `dor-ready` stories at the top of the backlog; the last 3–6 sprints' completed points; team capacity for the sprint (who's out, ceremonies, support duty — ask the SM)
- Record: the team's actual decisions at the end of planning

## Workflow — Prep

1. Compute the evidence: velocity range (min/median/max of recent sprints, excluding anomalies the SM flags), this sprint's capacity adjustment (PTO, holidays, on-call), and the resulting realistic point range.
2. Draft 1–2 candidate sprint goals from the top-ranked stories — an outcome a stakeholder would recognize, not "do the tickets." Flag when the top of the backlog doesn't add up to a coherent goal; that's a PO conversation before planning, not during.
3. Assemble the candidate scope from `templates/sprint-plan.md`: stories in rank order with points, running total against the range, dependency/risk notes (unfinished upstream work, shared people), and carryover from the current sprint stated as carryover.
4. **Human approval gate** — the SM reviews the prep pack; on approval post it for the team ahead of the session.

## Workflow — Record

5. After the team commits, capture: the sprint goal as decided, the committed stories, and any planning decisions (swaps, splits, risks accepted).
6. **Human approval gate** — SM confirms the capture.
7. On approval: move committed stories into the sprint (`customfield_11260` via the board), set the sprint goal on the board, and post the commitment summary (goal, scope, capacity math) to the team's Confluence space. Stories the team explicitly deferred get a comment saying so.

## Output

- Prep: an approved planning pack (goal drafts, capacity math, candidate scope)
- Record: the sprint populated in Jira and a commitment summary in Confluence

## Pipeline position

- Upstream: `refinement-facilitator` (estimated stories), `definition-of-ready-critic`
- Downstream: the sprint; `daily-standup-digest` and `sprint-report-generator` read what this records

## Rules

- Present ranges, never a single "you should take N points" number — and never compare velocity across teams.
- The team's commitment is final even when it disagrees with the math; record the delta without editorializing.
- Unestimated or non-ready stories can enter the candidate list only flagged as such — hiding their state breaks the whole point.
- Capacity math shows its inputs (who, what, how much) so the team can correct it in the room.

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-sprint-planning-facilitator-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
