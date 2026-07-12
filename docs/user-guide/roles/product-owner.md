# Product Owner Guide

Five skills that take you from a raw idea to a Ready, Jira-resident backlog — and close the loop with stakeholder release notes. Four of them form a pipeline; run them in order. You approve at the end of every stage; nothing reaches Confluence or Jira without you.

## Your pipeline

```
idea ──► product-brief-builder ──► backlog-decomposer ──► jira-confluence-writer ──► definition-of-ready-critic ──► team refinement
                                                                                                          shipped ──► release-notes-generator
```

| Stage | Skill | You bring | You approve | It writes |
|-------|-------|-----------|-------------|-----------|
| 1 | [product-brief-builder](../skills/product-brief-builder.md) | The idea + 20 minutes of interview | The brief | One Confluence brief page |
| 2 | [backlog-decomposer](../skills/backlog-decomposer.md) | The approved brief | The draft hierarchy | A draft document only — nothing in Jira yet |
| 3 | [jira-confluence-writer](../skills/jira-confluence-writer.md) | Business Unit, Strategic Program, new-vs-existing Initiative | The write plan | Real Jira issues + backlog links on the brief |
| 4 | [definition-of-ready-critic](../skills/definition-of-ready-critic.md) | The created stories | The readiness report | Story comments + `dor-ready`/`dor-needs-work` labels |
| — | [release-notes-generator](../skills/release-notes-generator.md) | A release scope (version/sprint/epic) | Per-story notes + the page | Release Notes fields + one Confluence page |
| — | [pipeline-adopter](../skills/pipeline-adopter.md) | Existing work that predates the pipeline | The reconciliation plan, item by item | Only approved plan items + the living registry |

## What each stage protects you from

- **Brief Builder** stops solution-first framing: it will push you for the problem, evidence, measurable outcomes, and explicit non-goals. A brief with an empty "Out of scope" section isn't done.
- **Decomposer** slices vertically (no "database layer" epics), refuses to invent domain facts, and flags anything that doesn't trace back to your brief as possible scope creep — you decide keep-or-cut.
- **Writer** shows you the complete write plan (every issue, every field) before creating anything, labels it all `ai-sdlc-generated`, and is safe to re-run if something fails mid-way.
- **DoR Critic** applies the team's [Definition of Ready](../../../skills/po/definition-of-ready-critic/references/dor-checklist.md) so weak stories are caught before they waste refinement time. You can overrule any finding — the overrule is recorded, not hidden.

## Working with a low-ceremony reality

- **No brief yet?** The decomposer won't block you: it offers a five-question "brief-lite" intake and visibly flags the result as brief-debt. Use it when speed matters; backfill the brief before the team refines.
- **The critic found a lot?** That's it working. Fix the blocking items; take "Ready with notes" items to refinement with eyes open.
- **Stories change in refinement?** That's the team's job — the pipeline gets you *to* refinement well-prepared, it doesn't replace it.

## Handoffs to other roles

- Stories labeled `dor-ready` are what developers and testers pick up — see the [Developer](developer.md) and [Tester](tester.md) guides.
- The Scrum Master's refinement and planning facilitators read your backlog state directly; keeping the pipeline's labels honest keeps their prep accurate.

## Two habits that make this work

1. **Approve deliberately.** The gates are yours; rubber-stamping them turns the safety model into theater.
2. **Let open questions stay open.** Skills park unknowns as tracked questions instead of guessing. Answer them in Jira/Confluence where the answer persists — not in a chat that evaporates.
