# copilot-handoff-packager (Developer)

Packages a refined story into a bounded implementation packet and assigns it to the GitHub Copilot coding agent — after telling you honestly whether it *should* be delegated at all.

## When to use

- The team decided a work item is a Copilot candidate and you want a clean, reviewable delegation instead of pasting a Jira link at an agent

## Before you start

- The story key (refined, `dor-ready`, estimated)
- The approved [implementation plan](implementation-planner.md) for anything non-trivial
- The target repo and branch conventions

## What happens

1. It reads the story (including refinement decisions in comments) and the plan.
2. It assesses **delegation fit** and says so plainly: bounded changes with clear AC and established patterns → good fit; migrations with production risk, auth/permission logic, ambiguous UX, cross-cutting architecture → it will recommend you implement with Copilot *assisting* instead. Respect the assessment.
3. It builds the packet: objective, **AC verbatim** (paraphrase is how requirements drift), pattern pointers to real example files, explicit boundaries (don't-touch areas, no new dependencies without asking), and a definition of done.
4. It runs the **invention test** — reading the packet cold, every decision the agent would face must be answered by the packet or referenced code. Unanswered items come back to you as questions, not guesses in the packet.
5. **You approve packet + fit assessment.** Then it assigns the work to the Copilot coding agent and comments the handoff on the Jira story.

## What gets written

The Copilot assignment (via your team's GitHub / Copilot-for-Jira flow) and a handoff comment on the story.

## Good to know

- One packet, one work item — it won't bundle stories.
- Your side of the contract: the resulting PR gets a real human review ([code-review-critic](code-review-critic.md) assists) and you own the merge.
- A kicked-back packet is success, not failure — it just saved you an agent churning on ambiguity.

## Related

- Previous: [implementation-planner](implementation-planner.md) · Next: [pr-hygiene](pr-hygiene.md) → [code-review-critic](code-review-critic.md) on the resulting PR
