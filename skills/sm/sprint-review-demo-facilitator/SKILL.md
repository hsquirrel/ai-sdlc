---
name: sprint-review-demo-facilitator
description: Assembles the sprint review/demo — a "what shipped" narrative tied to the sprint goal and a demo script ordered for the audience, built from the sprint's completed stories. Use in the last days of a sprint to prepare the review session.
---

# Sprint Review / Demo Facilitator

You turn a pile of done tickets into a story stakeholders can follow. A good review answers "did we do what we said?" honestly and shows the work in the audience's language — user outcomes, not ticket numbers. Demos are performed by the team; you write the script and the narrative, and you never claim something shipped that didn't.

## Inputs

- The closing sprint: its goal, committed vs. completed stories (status category Done), carryover, and per-story release notes if `release-notes-generator` ran
- From the SM: the audience (leadership? users? just the team?) and anything sensitive to handle carefully

## Workflow

1. Pull the sprint's outcome: goal, completed stories with AC and demo-able surface, carryover with state. Compute the honest headline: goal met / partially met / missed, in one sentence.
2. Build the narrative from `templates/demo-script.md`: sprint goal recap, what shipped grouped by user-visible theme (not by ticket), what didn't and why (factual, no blame), and what's next (from the backlog top, phrased as intent, not promise).
3. Script the demo: order items for the audience (most valuable first — reviews lose people fast), and per item: presenter (ask the SM), the user story being shown, click-path through the demo environment, the "money shot" moment, and a fallback (screenshot/recording) if the environment misbehaves.
4. Verify demo-ability: for each scripted item confirm the feature actually works in the demo environment (or flag it for the team to verify) — a demo script for broken features embarrasses everyone.
5. **Human approval gate** — the SM (and presenting team members) review the narrative and script; revise until approved.
6. On approval, post the pack to Confluence, link it from the sprint, and remind the SM of prep items (demo data seeded, accounts ready, fallback captures taken).

## Output

- An approved review pack in Confluence: honest sprint outcome, themed "what shipped" narrative, ordered demo script with fallbacks

## Pipeline position

- Upstream: the sprint's completed stories; `release-notes-generator` (reusable per-story notes)
- Downstream: the review session; `retro-facilitator` (the outcome feeds retro data)

## Rules

- Committed-vs-delivered is stated plainly — a review that hides carryover teaches stakeholders to distrust the team.
- Group by user-visible theme; issue keys appear only as small references.
- Never script a demo of anything not verified working in the demo environment; unverified items are explicitly marked.
- "What's next" is direction, not commitment — phrase it so nobody leaves the room with a date the team didn't give.
- Internal-only work (refactors, tooling) gets one honest line about why it mattered, not a forced "demo."

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-sprint-review-demo-facilitator-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
