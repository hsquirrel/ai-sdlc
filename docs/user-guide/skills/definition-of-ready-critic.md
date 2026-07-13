# definition-of-ready-critic (Product Owner)

The pipeline's critic at both ends of a story's life. **Readiness mode** (the default) catches under-specified stories before they waste refinement time, against one contract: *could a tester or coding agent translate this story into test cases without inventing requirements?* **Acceptance mode** serves you at the other end — a per-AC evidence table for stories at "In Product Owner Validation," so you accept on evidence, not assertion.

## When to run it

- After the writer creates stories, before team refinement (readiness mode)
- Against a decomposition document not yet in Jira (findings route back to the decomposer)
- When a story reaches PO Validation and you want the Definition-of-Done evidence laid out (acceptance mode)

## What it asks of you

- The scope: story keys, an Epic/Initiative key (it reviews the children — and evaluates the epic itself against the epic-readiness checklist, since stories can be green while the epic above them isn't), or the draft document
- Your ruling on disputed findings — you can overrule any of them

## What happens at the gate (per-run)

It presents the full report — verdict summary first, then per-story findings, worst first. Every failure names the checklist item and comes with the concrete question or fix, often a suggested rewrite marked as a suggestion. **Overrules are recorded, and the posted version names them in their own line** — the team sees them in refinement; sunlight is the backstop. Nothing is posted to Jira before your approval.

## What it writes and where

- Readiness: one comment per story (verdict + gaps) and the label `dor-ready` or `dor-needs-work`
- Acceptance: the per-AC table — met / not met / unverifiable, with evidence from AC, linked PRs, child Story Bugs, and the Release Notes field — for you to accept or bounce on

## What it will never do

- Edit a story's fields, AC, or status — it critiques and suggests; humans change the story, and you transition it
- Fail stories for missing estimates, sprint, or assignee — those aren't DoR concerns
- Accept an AC on assertion alone in acceptance mode — evidence or "unverifiable"; and when the implementation matches the AC but behavior still seems wrong, that's an AC conversation, not a bounce
- Go easy on AI-generated stories — pipeline provenance earns no leniency

## Good to know

- Vague AC ("works correctly", "handles errors gracefully") always fails — it demands the observable behavior.
- Verdicts: **Ready** / **Ready with notes** / **Not ready**; a story derived without an approved brief caps at Ready with notes.
- Comments criticize stories, never people.
