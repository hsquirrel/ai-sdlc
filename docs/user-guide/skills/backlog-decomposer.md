# backlog-decomposer (Product Owner)

Turns an approved product brief into a draft backlog: one Initiative named for the outcome, Epics as vertical slices of user value, and sprint-sized Stories with acceptance criteria — Gherkin for user-visible behavior, structured requirement blocks for NFRs. **Drafts only**: nothing is written to Jira by this skill. Its output document becomes the initiative's **living decomposition registry** — authoritative even after the write, where mid-flight epics and scope moves are recorded.

## When to run it

- A brief has been approved and it's time to shape the backlog
- You need to decompose something with no brief yet — it degrades gracefully rather than refusing (see below)

## What it asks of you

- The approved brief (epic fields or document). No brief? It offers the choice: pause for [product-brief-builder](product-brief-builder.md) (recommended for anything large or fuzzy), or a five-question brief-lite intake — with everything produced that way visibly flagged `⚠ Derived without approved brief`.
- Keep-or-cut decisions on anything that doesn't trace back to a brief item — it flags possible scope creep; you rule on it.

## What happens at the gate (per-run)

It presents the full draft hierarchy — Initiative, Epics with their drafted brief-field content, Stories with AC — and revises until you explicitly approve. Nothing is persisted externally before that.

## What it writes and where

One approved decomposition document, saved where you choose — not yet in Jira. Next stop: [jira-confluence-writer](jira-confluence-writer.md).

## What it will never do

- Slice by technical layer — an epic delivering "the database layer" gets re-sliced (per-repo/per-service slicing is correct for platform work, though)
- Invent domain facts, metrics, or edge cases — unknowns become open questions with owners
- Estimate or assign — sizing and task breakdown belong to the team in refinement
- Write to Jira, even if asked — it declines and points to the writer; the separation keeps the gates meaningful

## Good to know

- Every story needs at least one AC; a story whose AC can't be written yet becomes a Spike, not a story.
- It picks the right KDP work-item type per child: `Story` for user-visible work, `Tech Managed` types for engineering-driven work (objective + completion checks, not a forced user-story costume), `Spike Story` for unknowns.
- Re-slicing an existing story supersedes it in the same change, recorded in the registry's moved-scope ledger — two slicing generations are never open in parallel.
