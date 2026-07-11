# tech-design-drafter (Developer)

Drafts a design doc / ADR in Confluence for work too big or too consequential to plan story-by-story — written to be challenged, not admired.

## When to use

- An Epic or Spike needs a written, reviewable design before stories are planned against it
- A technology choice or cross-cutting change needs a decision record the team can revisit later

**Not for:** single-story planning ([implementation-planner](implementation-planner.md)) or product framing ([product-brief-builder](product-brief-builder.md)).

## Before you start

- The driving Jira item (Epic/Spike/story) and any spike findings
- 15–20 minutes of interview: constraints, the options you've weighed, what a wrong decision costs
- Repo access so integration points are real, not assumed

## What happens

1. It reads the work item and the relevant code, then interviews you — expect pushback on solution-first framing; the doc leads with the problem.
2. It insists on **at least two genuinely considered options**, each with the honest case for it and its costs — a lone option with strawmen is advocacy, and it won't write that.
3. The draft covers: context, options, the decision with rationale, consequences **including the negative ones and the follow-up work created**, data/API impact, failure modes (what happens when the queue is down, the write is partial, the cache is stale), and open questions.
4. Anything spatial gets a Lucidchart/Lucidspark link or a clearly marked diagram placeholder.
5. **You approve the draft**, then it publishes to Confluence (your chosen space, often beside the initiative's brief) and links it from the driving Jira issue.

## What gets written

One Confluence design page, linked from the Jira item.

## Good to know

- Target length: under ~3 pages of prose — if it can't be said that briefly, it's probably two designs.
- Decisions are dated and owned; when one changes, the doc gets a status update, not a silent edit — keep the argument in the doc, not in chat.

## Related

- Downstream: [backlog-decomposer](backlog-decomposer.md) and [implementation-planner](implementation-planner.md) build against the approved design
