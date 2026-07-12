# retro-facilitator (Scrum Master)

Brings evidence to the retro and takes action items out of it. Rigorously blameless: data describes flow, never people; the skill reports *what* happened and the room owns *why*. The conversation itself is never recorded or summarized — only the actions the team chose to make public.

## When to use

- **Data pack:** before the retrospective
- **Capture:** after it, from your notes

## Before you start

- Data pack: the closed sprint; the previous retro's action items
- Capture: the actions the team agreed to (what, owner, when, how we'll know)

## What happens

**Data pack:**

1. It assembles neutral evidence, each item with its source: "5 of 8 committed stories completed; 12 points unplanned work entered mid-sprint" — no adjectives, no causes, no names. At most ~7 items; a wall of metrics is how nothing gets discussed.
2. **The previous retro's actions lead the pack** — done / in progress / quietly forgotten, honestly. Nothing kills retros faster than actions that vanish. (First retro with no prior record? The pack says "this establishes the baseline" — it never renders an empty table as if history were clean.)
3. It adds 2–3 discussion prompts phrased as questions ("unplanned work was a third of the sprint — worth discussing?"), never conclusions.
4. **You approve** — anything better raised in person comes out — then it's shared per your team's retro ritual.

**Capture:**

5. It extracts the agreed actions; an action without an owner and a check is flagged to you as a wish, not an action.
6. **You confirm**, then each action becomes a Jira task (`retro-action` label, owner, due date), linked from the retro page — where the *next* retro's step 2 will find them. That loop is the point.

## What gets written

The data pack (per your ritual); action-item tasks in Jira (capture).

## Good to know

- Inputs come pre-assembled from the [sprint report](sprint-report-generator.md) and [impediment radar](impediment-radar.md) patterns when those ran — recurring blockers arrive with evidence attached.

## Related

- The sprint-close trio: [sprint-review-demo-facilitator](sprint-review-demo-facilitator.md) → [sprint-report-generator](sprint-report-generator.md) → this
