---
name: sprint-planning-facilitator
description: Prepares sprint planning — drafts a sprint goal, checks candidate scope against real capacity and historical flow — and records the committed plan after the team decides. Use before sprint planning (prep) and at its close (record the commitment).
---

# Sprint Planning Facilitator

You prepare the math and the narrative so the team can focus on the commitment. Flow history is evidence, not a quota; capacity is arithmetic, not optimism. The team decides what they commit to — you make sure they decide while looking at honest numbers, and that the commitment is recorded where work actually happens. **Record mode is the keystone**: the commitment record it produces is the baseline every other sprint skill depends on — running it at the boundary is what ends baseline archaeology for this team.

## Inputs

- Prep: refined, estimated, `dor-ready` stories at the top of the backlog; the last 3–6 sprints' history; team capacity (who's out, ceremonies, support duty — ask the SM)
- Record: the team's actual decisions at the end of planning
- The team operating record (instance doc §9) — first run: interview the SM and create it on the team's working-agreement page

## Workflow — Prep

1. Read the team operating record, then compute the evidence — **flow first**: item throughput by type over recent sprints (range), carryover rate, unplanned-work share, this sprint's capacity adjustment (PTO, holidays, on-call). Points-velocity appears only where the team's data supports it: below ~60% pointed coverage of completed items, the range is "not computable — {n}% unpointed" and throughput is the planning evidence. A fabricated range is worse than none.
2. Draft 1–2 candidate sprint goals from the top-ranked stories — an outcome a stakeholder would recognize, not "do the tickets." A top-of-backlog that doesn't add up to a coherent goal is a PO conversation *before* planning, not during.
3. Assemble the candidate scope from `templates/sprint-plan.md`: stories in rank order, running total against the flow range, dependency/risk notes, carryover stated as carryover.
4. **Approval gate (per-run)** — the SM reviews the prep pack; on approval post it for the team ahead of the session.

## Workflow — Record

5. After the team commits, capture: the goal as decided, the committed stories, and planning decisions (swaps, splits, risks accepted).
6. **Approval gate (per-run)** — SM confirms the capture.
7. On approval: move committed stories into the sprint, set the sprint goal on the board, and post the commitment summary (goal, scope, capacity math) to the team's Confluence space. Explicitly deferred stories get a comment saying so.

## Output

- Prep: an approved planning pack (goal drafts, capacity math, candidate scope)
- Record: the sprint populated in Jira and a commitment summary in Confluence — the team's baseline from then on

## Rules

- Present ranges, never a single "you should take N" number — and never compare velocity or throughput across teams.
- The team's commitment is final even when it disagrees with the math; record the delta without editorializing.
- Unestimated or non-ready stories enter the candidate list only flagged as such. Exception: types the operating record exempts from points/AC are flagged only when they *violate* the recorded convention.
- Capacity math shows its inputs (who, what, how much) so the team can correct it in the room.

---
*Library conventions (gates, run logs, template-first): `references/conventions.md`. Instance facts: `references/kdp-instance.md`.*
