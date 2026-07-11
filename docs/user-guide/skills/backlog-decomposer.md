# backlog-decomposer (Product Owner)

Turns an approved product brief into a draft **Initiative → Epics → Stories** hierarchy with acceptance criteria — a document you approve, not tickets in Jira (that's the next stage's job).

## When to use

- A brief is approved and it's time to shape the backlog
- You need to decompose an idea that has **no brief yet** — it handles this gracefully rather than blocking you

**Not for:** creating Jira issues (it will decline and point to [jira-confluence-writer](jira-confluence-writer.md)) or task-level breakdown (that's the team's, in refinement).

## Before you start

- Ideally: the approved brief's Confluence link
- Without a brief: 10 minutes for the five-question "brief-lite" intake (problem, users, top outcome + metric, scope in/out, constraints)

## What happens

1. It reads the brief and confirms it's approved (no blocking open questions).
2. **No approved brief?** You choose: pause and run [product-brief-builder](product-brief-builder.md) (recommended for anything big or fuzzy), or continue with brief-lite — in which case every draft carries a visible `⚠ Derived without approved brief` flag until you backfill.
3. It decomposes: one Initiative named for the outcome; Epics as vertical slices (each independently demoable, each naming the brief item it serves); Stories in "As a / I want / so that" form with house-style Gherkin AC plus structured NFR blocks.
4. It sanity-checks traceability and flags anything that doesn't map to the brief as possible scope creep — keep or cut is your call.
5. **You approve the full hierarchy**, then choose where the draft lives (local file or draft Confluence page).

## What gets written

The approved decomposition document only. **Zero Jira issues** — the separation is deliberate, so the write step gets its own approval.

## Good to know

- It will not estimate, assign, or invent domain facts — unknowns become owned open questions on the affected story.
- Stories whose AC can't be written yet become spikes or questions, not vague stories.
- "The API layer" is not an epic here; expect re-slicing if you ask for one.

## Related

- Previous: [product-brief-builder](product-brief-builder.md) · Next: [jira-confluence-writer](jira-confluence-writer.md)
