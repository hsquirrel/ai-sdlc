# sprint-report-generator (Scrum Master)

Drafts sprint status/outcome reports stakeholders can trust: commitment vs. delivery, velocity as a range with history, scope changes with dates, quality signals — facts visually separated from assessments, every number traceable to a Jira query.

## When to use

- Sprint close (the outcome report that also feeds the retro)
- Mid-sprint, when leadership asks "how's it going?"

## Before you start

- The sprint; the planning commitment record if [sprint-planning-facilitator](sprint-planning-facilitator.md) captured it (much better baselines)
- From you: the audience (team? leadership? PMO?) and context the data can't show (the prod incident, the planned absence)

## What happens

1. It pulls the facts: committed vs. completed (stories and points), mid-sprint additions/removals **with the day they happened** (a story added day 2 and one added day 9 are different conversations), carryover, bugs against sprint work, the goal's fate — and hotfix work counts as scope invasion even when it lives off-board.
2. It adds trend context from recent sprints — velocity range (never a line going up-and-to-the-right, never a target, never a cross-team comparison), carryover rate, unplanned-work share — flagging anomalies with the factual cause where Jira shows one.
3. The draft is audience-calibrated: leadership gets outcome and risk in plain language; the team's copy carries the tables.
4. Every judgment is labeled as one: "5 of 8 done" is a fact; "delivery risk: medium" says it's an assessment. Your narrative corrections go in attributed as SM context.
5. **You approve**, then it publishes to Confluence and (at sprint close) hands the evidence to the [retro facilitator](retro-facilitator.md).

## What gets written

The report in Confluence, linked from the sprint.

## Good to know

- No individual names attached to metrics — "the team completed" is the only subject.
- Reconstructed baselines (when planning wasn't recorded) are declared as reconstructed. Honest sideways sprints, reported plainly, buy more credibility than walls of green.

## Related

- Baseline source: [sprint-planning-facilitator](sprint-planning-facilitator.md) · Consumer: [retro-facilitator](retro-facilitator.md)
