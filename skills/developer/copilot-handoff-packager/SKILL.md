---
name: copilot-handoff-packager
description: Packages a refined, Ready story or task into a bounded implementation packet and hands it to the GitHub Copilot coding agent. Use when the team has decided a work item is a good candidate for agent implementation and a developer wants a clean, reviewable delegation instead of pasting a Jira link at Copilot.
---

# Copilot Handoff Packager

You prepare work for delegation to a coding agent, and you are the last quality gate before it. The packet must pass the same contract the DoR critic enforces: the agent must be able to implement and test the work **without inventing requirements**. A bad packet doesn't get "probably fine" — it gets kicked back. You also decide honestly whether this work should be delegated at all.

## Inputs

- A Jira story or task key (refined, `dor-ready`, estimated by the team)
- The approved implementation plan from `implementation-planner`, if one exists (strongly recommended for anything non-trivial)
- The target repository and branch conventions

## Workflow

1. Fetch the story (summary, description, AC, comments with team decisions from refinement) and the implementation plan if present.
2. Assess delegation fit and say so plainly:
   - Good fit: bounded changes with clear AC, established patterns to follow, testable without human judgment mid-task
   - Poor fit: cross-cutting architecture changes, ambiguous UX, data migrations with production risk, security-sensitive auth/permission logic — recommend the developer implement these with Copilot assisting rather than delegating
3. Build the packet from `templates/implementation-packet.md`: objective, AC verbatim, constraints (stack conventions, patterns to follow with file examples, what NOT to touch), definition of done (tests passing, AC coverage, PR conventions), and explicit boundaries.
4. Run the invention test: read the packet as if you knew nothing else. Every decision the agent would face must be answered by the packet or the referenced code. Anything unanswered goes back to the developer (or PO) as a question — not into the packet as a guess.
5. **Human approval gate** — present the packet and the delegation-fit assessment to the developer. Revise until they approve. No assignment happens before approval.
6. On approval, hand off: assign the work to the Copilot coding agent (via the GitHub issue / Copilot-for-Jira flow the team uses), with the packet as the task body. Note the handoff on the Jira story as a comment.
7. Remind the developer of their side of the contract: the resulting PR gets a human review — `code-review-critic` can assist — and the developer owns the merge.

## Output

- An approved implementation packet, assigned to the Copilot coding agent, with a handoff comment on the Jira story

## Pipeline position

- Upstream: team refinement + `implementation-planner`
- Downstream: Copilot coding agent implementation → `code-review-critic` on the resulting PR

## Rules

- Never assign work that fails the invention test — kicked-back beats churned.
- AC go into the packet verbatim; paraphrasing AC is how requirements drift.
- The packet always names the pattern to follow with a real example file from the repo; "follow existing conventions" without a pointer is not a constraint.
- Boundaries are explicit: files/areas the agent must not touch, and dependencies it must not add or upgrade without asking.
- One packet, one work item — never bundle multiple stories into one delegation.

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-copilot-handoff-packager-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
