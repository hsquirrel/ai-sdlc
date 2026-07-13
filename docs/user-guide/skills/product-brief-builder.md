# product-brief-builder (Product Owner)

Turns a raw idea into one rigorous product brief through a short discovery interview — problem, users, measurable outcomes, workflow, scope with explicit non-goals, assumptions, open questions, stakeholders. The brief lives where the work lives: **in the epic's own fields** (Background / Description / Requirements), not in a separate document. A Confluence page appears only as the optional umbrella for a multi-epic initiative.

## When to run it

- A new initiative or feature idea needs framing before any decomposition
- An epic already exists but its brief is thin — the skill reconstructs from its fields and interviews you only against the gaps, not re-asking what's already written

## What it asks of you

- The working title and any existing material (meeting notes, tickets, Confluence pages, Lucid diagrams) — it reads what you share before asking questions it already answers
- At most three short interview rounds. Expect pushback, not transcription: state a solution and it asks what hurts today and for whom; an outcome without a baseline → target metric gets challenged; an empty "Out of scope" list means the interview isn't done.

## What happens at the gate (per-run)

It presents the full draft brief and revises until you explicitly approve. Nothing is written externally before that. When the target is an existing epic, the gate shows the exact before/after of the field edits.

## What it writes and where

- Existing epic → the approved brief into its Background/Description/Requirements fields
- No epic yet → the brief travels as a document with the decomposition; [jira-confluence-writer](jira-confluence-writer.md) populates the epic's fields at create time
- Multi-epic initiative → optionally a Confluence umbrella page, in a space and parent you pick — never assumed

## What it will never do

- Invent evidence, metrics, or stakeholders — anything unknown lands in Open Questions, each classified blocking or non-blocking
- Write a PRD novel — any section past ~half a page gets summarized with supporting material linked, not inlined

## Related

Next: [backlog-decomposer](backlog-decomposer.md) against the approved brief.
