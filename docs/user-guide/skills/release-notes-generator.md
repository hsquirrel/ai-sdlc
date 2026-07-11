# release-notes-generator (Product Owner)

Turns completed stories into stakeholder language: a short note on each story (in Jira's Release Notes field) and one aggregate release-notes page in Confluence. Written for advisors, ops, and leadership — benefits first, no jargon, no ticket keys in prose.

## When to use

- A release, sprint, or initiative is wrapping and stakeholders need "what shipped"
- Done stories are missing their per-story Release Notes field entries

## Before you start

- The scope: a fix version, sprint, Initiative/Epic key, date range, or explicit story keys
- A Confluence destination in mind for the aggregate page

## What happens

1. It fetches **Done** stories in scope — and tells you what's in scope but *not* done, so you can hold the notes or trim the scope.
2. Per story it drafts a 1–3 sentence note answering "what can I do now?" or "what stopped hurting?" — derived only from the story's own content:
   - Existing Release Notes field content is kept and marked "existing" — never silently replaced
   - Stories whose value can't be determined go on a "needs your input" list instead of getting fiction
   - Internal-only work (refactors, tooling) is flagged as candidates to exclude — your call
3. It assembles the aggregate page: highlights, changes by product area, fixes, and known issues (only ones you supply).
4. **You approve both** the per-story notes and the page.
5. It writes the notes to each story's Release Notes field and publishes the page where you choose.

## What gets written

- The **Release Notes field** (`customfield_14745`) on approved stories — the only field this skill ever touches, and only where empty unless you explicitly approve a replacement
- One aggregate Confluence page

## Good to know

- Zero done stories in scope → it says so and stops; it will not pad with in-progress work.
- Story keys appear as trailing references on the page, never in the prose.

## Related

- Pairs with [sprint-review-demo-facilitator](sprint-review-demo-facilitator.md), which reuses per-story notes for the demo narrative
