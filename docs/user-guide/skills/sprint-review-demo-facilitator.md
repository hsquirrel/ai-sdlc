# sprint-review-demo-facilitator (Scrum Master)

Turns a pile of done tickets into a review stakeholders can follow: an honest "did we do what we said?" narrative and a demo script ordered for the audience — with verified click-paths and fallbacks for when the environment misbehaves.

## When to use

- The last days of a sprint, ahead of the review/demo session

## Before you start

- The closing sprint (goal, completed vs. committed, carryover)
- From you: who the audience is (leadership? users? the team?) and who's presenting what
- Bonus: per-story notes from [release-notes-generator](release-notes-generator.md) get reused in the narrative

## What happens

1. It computes the honest headline first: goal met / partially met / missed, in one sentence. Hiding carryover teaches stakeholders to distrust the team, so it doesn't.
2. The narrative groups what shipped by **user-visible theme** (ticket keys demoted to small references), states what didn't ship and why (factual, no blame), and closes with "what's next" phrased as direction — never as dates the team didn't give.
3. The demo script orders items most-valuable-first and gives each: presenter, the user story being shown, the click-path to the money-shot moment, and a fallback capture.
4. **Demo-ability is verified**: each scripted item is confirmed working in the demo environment or explicitly marked NEEDS VERIFICATION with an owner — it will not script a demo of a broken feature.
5. **You (and the presenters) approve**, then the pack is posted to Confluence with a prep checklist (data seeded, accounts ready, fallbacks captured).

## What gets written

The review pack in Confluence, linked from the sprint.

## Good to know

- Internal-only work (refactors, tooling) gets one honest line about why it mattered — not a forced "demo."
- The review's outcome feeds straight into the [retro data pack](retro-facilitator.md) and [sprint report](sprint-report-generator.md).

## Related

- Pairs with: [release-notes-generator](release-notes-generator.md) · Next in the sprint-close sequence: [sprint-report-generator](sprint-report-generator.md), [retro-facilitator](retro-facilitator.md)
