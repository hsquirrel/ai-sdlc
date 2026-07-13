# pipeline-adopter (Product Owner)

Brings existing work into the pipeline without asking anyone to start over. Adoption is reconciliation, not judgment: the work is real, partially done, and owned by people who made reasonable choices without the pipeline — the plan meets it where it is. This is the **one skill permitted to edit existing issues**, which is exactly why its discipline is the strictest. It carried the library's first live production run (KDP-40426).

## When to run it

- An epic or initiative predates the pipeline (or bypassed it) and you want its protections — traceability, readiness gates, the living registry — from here forward
- A [tabletop-shakedown](tabletop-shakedown.md) produced a gap list for in-flight work and you want it fixed for real

Not for greenfield work (use the normal pipeline) or auditing without intent to fix (that's a tabletop).

## What it asks of you

- The epic/initiative key, and the owner — the human who approves, usually you
- Item-by-item decisions at the gate, and your wordsmithing on content items — it drafts, you edit

## What happens at the gate (per-item)

You decide item by item from a **verbatim proposed-writes review document** (tier-level bulk approval is yours to grant). The plan comes in three tiers: **metadata** (mechanical, low-risk: parenting, labels, Flagged fields with evidence, typed links, doc links), **content** (you wordsmith: success measures, epic AC, open-questions table), **campaigns** (batched work like AC backfill across N children, each batch separately gated). Nothing is written before approval; declined items are recorded as declined.

## What it writes and where

Only approved plan items, exactly as approved, to Jira/Confluence — every touched item labeled `ai-sdlc-adopted`. It also seeds the initiative's **living registry** from current reality (created-keys map, moved-scope ledger, mid-flight additions section) and hands ongoing care to the [DoR critic](definition-of-ready-critic.md) and [hygiene auditor](backlog-hygiene-auditor.md).

## What it will never do

- Overwrite human prose silently — replacements show before/after in the plan; additive (comments, links, labels, empty-field fills) is always preferred
- Retroactively edit closed items — they get record-notes for the audit trail; closed items without AC are history, not homework
- Manufacture work — if gathering shows the work is healthier than reported, it says so and shrinks the plan

## Good to know

Its readiness assessment runs in adoption mode: findings split honestly into *fix before further work* vs. *note for the record*, and status-ahead-of-readiness (in test with no AC) is flagged explicitly. The brief is reconstructed from the epic's own fields and diffed against the template — the diff is your gap list, not a lecture.
