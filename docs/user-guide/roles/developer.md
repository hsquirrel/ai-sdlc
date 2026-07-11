# Developer Guide

Five skills that run from "I picked up a story" to "this PR is ready to merge" — including safe delegation to the GitHub Copilot coding agent. You approve every artifact; you own every merge.

## Your flow

```
dor-ready story ──► implementation-planner ──┬──► you implement ──────────────┐
                                             └──► copilot-handoff-packager ───┤ (Copilot agent implements)
                                                                              ▼
                                    tech-design-drafter (when the work        pr-hygiene ──► code-review-critic ──► human merge
                                    is bigger than one story)
```

| Skill | Use when | You approve | It writes |
|-------|----------|-------------|-----------|
| [implementation-planner](../skills/implementation-planner.md) | You pick up a story and want a reviewed plan first | The plan | Plan to repo docs or a Jira comment |
| [copilot-handoff-packager](../skills/copilot-handoff-packager.md) | A story is a good fit for the Copilot coding agent | The packet + fit assessment | The Copilot assignment + a Jira handoff comment |
| [code-review-critic](../skills/code-review-critic.md) | A PR needs review (especially Copilot-authored ones) | Every comment + the verdict is yours | The review, posted on your behalf |
| [tech-design-drafter](../skills/tech-design-drafter.md) | An Epic/Spike needs a written design before stories make sense | The design doc | A Confluence ADR/design page |
| [pr-hygiene](../skills/pr-hygiene.md) | A PR is about to go to review | Title + description | PR metadata only — never code |

## The delegation contract

Delegating to the Copilot coding agent is safe when — and only when — the packet passes the **invention test**: the agent can implement and test the work without inventing a single requirement. The packager enforces this, and it will also tell you honestly when work is a *poor* fit for delegation (migrations with production risk, auth logic, ambiguous UX). Respect that assessment — "Copilot assisting you" and "Copilot working alone" are different tools.

Your side of the contract: every delegated PR gets a real human review (the critic drafts it; you own it), and you own the merge.

## What the skills will and won't do

- **Planner** reads the actual codebase — it names real files and follows your repo's conventions, and if the story can't be built as written it routes the conflict back to the PO instead of planning around it. It writes no production code.
- **Review critic** checks AC coverage first, then correctness/tests/security/data via the [team checklist](../../../skills/developer/code-review-critic/references/review-checklist.md). Every blocking comment must state a failure scenario. It never approves or blocks on its own.
- **PR hygiene** verifies description claims against the diff — an AC it can't verify gets marked "not verified," never asserted. It fixes metadata, not code.
- **Design drafter** demands two real options and honest costs. A design doc without negative consequences is a sales doc, and it won't write one.

## Handoffs

- You receive `dor-ready` stories from the [PO pipeline](product-owner.md) via team refinement.
- Your AC-covered, hygiene-checked PRs are what the [Tester](tester.md) skills' plans and scaffolds assert against.
- Persistent blockers you hit belong in the SM's [impediment radar](../skills/impediment-radar.md) — flag them in Jira so the radar sees them.
