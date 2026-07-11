# pr-hygiene (Developer)

The cheap gate before review: generates an honest, convention-compliant PR title and description — with an AC coverage table **verified against the actual diff** — so reviewers spend attention on the code, not on archaeology.

## When to use

- A PR (yours or Copilot's) is about to be marked ready for review

**Not for:** fixing the code (problems in the diff get noted for [code-review-critic](code-review-critic.md)); this skill changes PR metadata only.

## Before you start

- The PR or branch, and the story key it implements

## What happens

1. It checks linkage and conventions: `{story-key}: description` title, a real story whose AC plausibly match this diff (wrong-story links are a top finding), commit messages that say *why* (a `wip`/`fix`/`asdf` chain gets a squash recommendation — which **you** run; it never rewrites history).
2. It drafts the description: what/why, an AC coverage table, testing evidence, data/config changes, and a "review focus" pointing at where the risk lives.
3. Every claim is cross-checked against the diff: an AC marked "covered" needs visible implementation *and* a test in the diff — anything else is written as "claimed by author — not verified in diff," never asserted.
4. It flags scope honesty issues: changed files the description doesn't mention, drive-by refactors mixed in, silently skipped AC — with a split recommendation when the mix hurts reviewability.
5. **You approve**, then it updates the PR title/description.

## What gets written

PR title and description only.

## Good to know

- An honest "Partially covered" beats a confident lie — reviewers calibrate on this table, and the review critic checks it next.
- A PR with no plausible story link stops here: process-orphan PRs are how undocumented behavior ships.

## Related

- Next: [code-review-critic](code-review-critic.md) · Upstream: your implementation or [copilot-handoff-packager](copilot-handoff-packager.md)
