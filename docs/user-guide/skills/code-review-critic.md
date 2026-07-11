# code-review-critic (Developer)

A rigorous first-pass reviewer: checks the PR against the story's AC first, then correctness, tests, security, data changes, and conventions — drafting comments **you** approve, edit, or drop before anything is posted. The verdict is always yours.

## When to use

- Any PR ready for review — especially Copilot-authored ones (same scrutiny, no more, no less)
- You're the reviewer and want the mechanical thoroughness handled so you can focus on judgment

## Before you start

- The PR (with a linked Jira story — a missing link is finding #1)
- Your reviewer hat: this drafts *your* review; it doesn't replace you

## What happens

1. AC coverage first: for each AC, it finds the implementing code **and** the test. AC without implementation, AC without tests, and implemented behavior no AC asked for all become findings.
2. Then the [team checklist](../../../skills/developer/code-review-critic/references/review-checklist.md): correctness (async pitfalls, React state/effects, error paths), tests-as-code quality, security (parameterized SQL, authZ at the endpoint, no secrets), data (migration compatibility, Cosmos partition impacts), maintainability.
3. Comments come classified — **blocking** (must state a concrete failure scenario), **should-fix**, **nit** (capped, and dropped entirely when blockers exist) — plus a summary with an AC coverage table and what was checked *and came up clean*.
4. **You approve the review**: drop, edit, add; choose the verdict.
5. It posts the approved review on your behalf, noting it was AI-assisted and human-approved.

## What gets written

The review comments and summary on the PR — only after your approval. It never approves or blocks a PR by itself.

## Good to know

- "I'd do it differently" never blocks — only failure scenarios do.
- Missing tests for changed error paths in money- or data-touching code is blocking, not a nit.
- A diff too large to review responsibly gets a split recommendation, not a skim.

## Related

- Previous: [pr-hygiene](pr-hygiene.md) (run it first — cheaper gate) · Upstream: [copilot-handoff-packager](copilot-handoff-packager.md)
