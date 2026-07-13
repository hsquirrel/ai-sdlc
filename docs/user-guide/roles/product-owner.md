# Product Owner Guide

Five active skills. Four form a pipeline — run them in order for new work. The fifth, `pipeline-adopter`, is the on-ramp for work that already exists. You approve at the end of every stage; nothing reaches Jira or Confluence without you.

## Your pipeline

```
idea ──► product-brief-builder ──► backlog-decomposer ──► jira-confluence-writer ──► definition-of-ready-critic ──► team refinement
                                                                                              │
existing / in-flight work ──► pipeline-adopter ───────────────────────────────────────────────┘
story at "In Product Owner Validation" ──► definition-of-ready-critic (acceptance mode) ──► you accept or bounce
```

| Stage | Skill | You bring | Gate tier | It writes |
|-------|-------|-----------|-----------|-----------|
| 1 | [product-brief-builder](../skills/product-brief-builder.md) | The idea + a short interview | per-run | The brief into the epic's own fields (or a document the decomposition carries) |
| 2 | [backlog-decomposer](../skills/backlog-decomposer.md) | The approved brief | per-run | A draft document only — nothing in Jira yet |
| 3 | [jira-confluence-writer](../skills/jira-confluence-writer.md) | Business Unit, Strategic Program, new-vs-existing Initiative | per-run | Real Jira issues, epic brief fields populated, all labeled `ai-sdlc-generated` |
| 4 | [definition-of-ready-critic](../skills/definition-of-ready-critic.md) | Story/epic keys (or the draft doc) | per-run | Story comments + `dor-ready`/`dor-needs-work` labels |
| on-ramp | [pipeline-adopter](../skills/pipeline-adopter.md) | An epic/initiative that predates the pipeline | **per-item** | Only approved plan items + the seeded living registry |

When the first real release routes through the pipeline, a deferred **release runner** (`release-notes-generator`: go/no-go readiness audit + stakeholder release notes) activates — until then, releases are yours by hand.

## What each stage decides — and what you decide

- **Brief Builder** pushes back on solution-first framing and unmeasurable outcomes; an empty "Out of scope" section means the interview isn't done. *You decide* what the problem actually is and approve the brief. It never invents evidence, metrics, or stakeholders — unknowns become open questions.
- **Decomposer** slices vertically by user value, picks the right work-item type per child (Story, Tech Managed, Spike), and flags anything that doesn't trace to your brief as possible scope creep. *You decide* keep-or-cut. It never estimates, never assigns, and never writes to Jira — its output document becomes the initiative's **living registry** after the write.
- **Writer** shows you the complete write plan — every issue, every field — before creating anything. *You decide* required values it can't know (Business Unit, Strategic Program); if you can't answer, it stops rather than guessing. Create-only: it never edits issues it didn't create, and re-runs after a partial failure are safe.
- **DoR Critic** applies the team's Definition of Ready before refinement, and in acceptance mode builds a per-AC evidence table when a story hits PO Validation. *You decide* the verdict — you can overrule any finding, and the overrule is named in the posted version, not hidden. It never edits a story or transitions an issue.
- **Adopter** meets existing work where it is: reconstructs the brief from the epic's fields, splits findings into fix-before-further-work vs. note-for-the-record (closed items are history, not homework), and proposes a three-tier reconciliation plan. *You decide item by item.* The library's first live run (KDP-40426) went through this skill.

## Working with a low-ceremony reality

- **No brief yet?** The decomposer won't block you: a five-question brief-lite intake, with the result visibly flagged as brief-debt. Backfill before the team refines.
- **The critic found a lot?** That's it working. Fix the blocking items; take "Ready with notes" to refinement with eyes open.
- **Work already in flight?** Don't restart it — adopt it. Adoption is reconciliation, not judgment.

## Two habits that make this work

1. **Approve deliberately.** The gates are yours; rubber-stamping turns the safety model into theater.
2. **Let open questions stay open.** Skills park unknowns as tracked questions instead of guessing. Answer them in Jira where the answer persists.
