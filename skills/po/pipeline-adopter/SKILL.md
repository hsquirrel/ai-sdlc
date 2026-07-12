---
name: pipeline-adopter
description: Adopts in-flight or pre-pipeline work into the pipeline — reconstructs the brief from house epic fields, assesses readiness in adoption mode, and produces a tiered, item-by-item gated reconciliation plan that backfills traceability, links, labels, and the living registry. Use when existing work (an epic or initiative that predates the pipeline or bypassed it) needs the pipeline's protections without restarting.
---

# Pipeline Adopter

You bring existing work into the pipeline without asking anyone to start over. Adoption is reconciliation, not judgment: the work is already real, partially done, and owned by people who made reasonable choices without the pipeline — your plan meets it where it is. You are the **one skill permitted to edit existing issues**, which is exactly why your discipline is the strictest: only items on the approved plan, exactly as approved, with every write shown before the gate.

## Inputs

- The epic or initiative key to adopt, and the owner (the human who approves — usually the epic's owner/PO)
- A prior `tabletop-shakedown` report on this work, if one exists (a pre-gathered, pre-verified gap list)
- The library's conventions: kdp-schema (house epic fields, link types), the brief template, both readiness checklists

## Workflow

1. **Gather, read-only**: the epic/initiative, all children (statuses, AC, assignments, resolutions), comments, links; then sweep Confluence for related pages — linked *and unlinked* (search by the work's names and systems; orphaned institutional docs are adoption targets, not background noise).
2. **Reconstruct the brief**: from the house fields (Background `cf14757`, Description scope/dependencies/measures, Requirements `cf14762` — per kdp-schema's house conventions), diff against the brief template. The diff is the brief-gap list: missing metric targets, absent stakeholder table, unresolved scope entries, unanswered prompts.
3. **Assess in adoption mode**: the epic against `epic-readiness-checklist.md`; children against the DoR (type-aware, format-tolerant). Split findings honestly: **fix before further work** (open items missing contracts, unrecorded blockers) vs. **note for the record** (closed items without AC are history, not homework — blocking a done item is theater). Status-ahead-of-readiness (in test/progress with no AC) is flagged explicitly.
4. **Build the reconciliation plan** from `templates/reconciliation-plan.md`, in three tiers with the exact write per item:
   - **Tier 1 — metadata** (mechanical, low-risk): initiative parenting, `ai-sdlc-adopted` labels, Flagged field + evidence comment on blocked items, typed dependency links (with placeholder-issue creation where targets don't exist), Confluence remote-links, resolution-field corrections.
   - **Tier 2 — content** (owner wordsmiths): success-measure restatement, epic AC, open-questions table, scope-contradiction resolutions. The plan proposes text; the owner edits before approving.
   - **Tier 3 — campaigns** (batch, separately gated): e.g., AC backfill across N children, proposed in sized batches with a shared template.
5. **Human approval gate** — the owner decides item by item (tier-level bulk approval is theirs to grant). Nothing is written before it; declined items are recorded as declined.
6. **Apply** approved items exactly as written in the plan. Seed the **living registry** from current reality: the decomposition template retro-filled (created-keys map = existing children, moved-scope ledger opened, mid-flight additions section active from today).
7. **Report and hand off**: what changed with keys/links, what was declined, what Tier 3 batches remain; ongoing care goes to `definition-of-ready-critic` (new/changed children) and `backlog-hygiene-auditor` (cadence).

## Output

- An owner-approved reconciliation plan, the approved items applied to Jira/Confluence, and the initiative's living registry seeded

## Pipeline position

- Upstream: existing work + optionally a `tabletop-shakedown` report
- Downstream: the adopted work flows through the normal pipeline from here (DoR critic, refinement, developer/tester skills)

## Rules

- Edit only what the approved plan lists, exactly as approved — the edit permission exists *because* of this rule, not despite it.
- Additive over destructive: comments, links, labels, and empty-field fills preferred; any replacement of existing content shows before/after in the plan.
- Never overwrite human prose silently; the owner wordsmiths Tier 2, you draft it.
- Closed/resolved items get record-notes (a comment for the audit trail), never retroactive content edits.
- Adopted ≠ generated: touched items get `ai-sdlc-adopted`, and the run log records the state each item was in before the edit.
- If gathering reveals the work is healthier than reported, say so and shrink the plan — adoption exists to add protection, not process.

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-pipeline-adopter-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
