# sprint-planning-facilitator (Scrum Master)

Prepares the math and the narrative for sprint planning — velocity as evidence, capacity as arithmetic — then records what the team actually committed to. The team decides; this makes sure they decide looking at honest numbers.

## When to use

- **Prep:** a day before sprint planning
- **Record:** at the close of planning, while decisions are fresh

## Before you start

- Prep: refined `dor-ready` stories at the top of the backlog; the capacity facts (who's out, on-call, ceremonies)
- Record: the team's decisions — goal, scope, swaps, accepted risks

## What happens

**Prep:**

1. It computes the evidence: velocity range from recent sprints (min/median/max, anomalies excluded with your sign-off), capacity adjustments with the math shown, and the resulting realistic point range — always a range, never "you should take N."
2. It drafts 1–2 candidate sprint goals as stakeholder-recognizable outcomes. If the top of the backlog doesn't cohere into any goal, it says so — that's a PO conversation *before* planning.
3. The candidate scope lists stories in rank order with a running total against the range, dependency/risk notes, and carryover labeled as carryover.
4. **You approve the pack**, then it's posted for the team.

**Record:**

5. It captures the goal as decided, committed stories, and planning decisions. **You confirm.**
6. It moves committed stories into the sprint, sets the goal on the board, posts the commitment summary to Confluence, and comments deferrals on the deferred stories.

## What gets written

Planning pack (prep); sprint population + goal + commitment summary (record).

## Good to know

- The team's commitment is final even when it disagrees with the math — the delta is recorded without editorializing.
- Unestimated or non-ready stories can appear in the candidate list only visibly flagged as such.
- The commitment record is what makes the [sprint report](sprint-report-generator.md)'s "committed vs. delivered" trustworthy — skipping record mode costs you later.

## Related

- Previous: [refinement-facilitator](refinement-facilitator.md) · The sprint it opens is watched by [daily-standup-digest](daily-standup-digest.md) and [impediment-radar](impediment-radar.md)
