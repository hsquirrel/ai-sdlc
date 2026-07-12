# pipeline-adopter (Product Owner)

Brings existing work into the pipeline without restarting it: reconstructs the brief from your epic's own fields, assesses readiness the fair way (closed items are history, not homework), and produces a tiered reconciliation plan you approve item by item.

## When to use

- An epic or initiative predates the pipeline (or bypassed it) and you want its protections — traceability, readiness gates, honest signals — from here forward
- A tabletop shakedown produced a gap list for in-flight work and you want it fixed for real

**Not for:** greenfield work (use the normal pipeline) or auditing without intent to fix (that's a tabletop).

## Before you start

- The epic/initiative key, and you (or the work's owner) available at the gate
- If a shakedown report exists for this work, it becomes the pre-verified gap list

## What happens

1. It gathers everything read-only — including a Confluence sweep for *unlinked* related docs, which in-flight work always has.
2. It reconstructs the brief from the house fields (Background/Description/Requirements) and diffs against the brief template — the diff is your gap list, not a lecture.
3. Readiness runs in **adoption mode**: fix-before-further-work vs. note-for-the-record. Nothing blocks a done item; in-test items with no AC get flagged loudly.
4. You get a **reconciliation plan in three tiers** — metadata (mechanical: parents, labels, flags, typed links, doc links), content (it drafts, you wordsmith: success measures, epic AC), campaigns (batched AC backfill, each batch gated) — every item showing the exact write.
5. **You approve item by item** (bulk per tier if you like); declined items are recorded as declined.
6. It applies exactly what you approved, labels touched items `ai-sdlc-adopted`, and seeds the initiative's living registry from current reality.

## What gets written

Only approved plan items — to Jira and Confluence — plus the seeded registry. This is the one skill allowed to *edit* existing issues, and that permission exists only inside the approved plan.

## Good to know

- Additive over destructive: it prefers comments, links, labels, and empty-field fills; any replacement shows before/after at the gate.
- If the work turns out healthier than reported, the plan shrinks — adoption adds protection, not process.

## Related

- Upstream: [tabletop-shakedown](tabletop-shakedown.md) (gap lists) · Downstream: [definition-of-ready-critic](definition-of-ready-critic.md), [backlog-hygiene-auditor](backlog-hygiene-auditor.md) for ongoing care
