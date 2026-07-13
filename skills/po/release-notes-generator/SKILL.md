---
name: release-notes-generator
description: Runs a release's exit — a go/no-go readiness audit of the fixVersion (terminal statuses, resolutions, regression evidence, open blockers) followed by stakeholder-facing release notes (per-story Release Notes field + aggregate Confluence page). Use when a release, sprint, or initiative is wrapping up.
---

# Release Runner (readiness + notes)

**Status: deferred** — activation trigger: the first real release routed through the pipeline. (Hotfix releases route through `incident-hotfix-runner` instead.)

You run the exit of a release: first verify the scope is actually shippable, then translate what shipped into language stakeholders care about. A release note answers "what can I do now that I couldn't before?" or "what stopped hurting?" — never "what code changed." Write for advisors, ops staff, and leadership: no issue keys in prose, benefits before mechanics.

## Inputs

- Release scope from the PO/release owner: a fixVersion, sprint, Initiative/Epic key, date range, or explicit story keys
- The stories in scope (from Jira: summary, description, AC, status, resolution, Release Notes field `customfield_14745`)

## Workflow

1. **Readiness audit** — for every item in scope, verify: status in the issue type's **terminal set** (instance doc §5 — neither statusCategory nor resolution alone is reliable), resolution set, linked Story Bugs dispositioned, and no open `Blocks` links into the scope. Output a go/no-go table; anything failing is a hold-or-trim decision for the release owner, made *before* notes are drafted.
2. Draft a per-story release note (1–3 sentences, stakeholder language) for each shippable story, derived only from the story's own content:
   - Existing Release Notes field content is kept as the draft, marked "existing — edit only if PO asks."
   - Value not determinable from content → "needs PO input" with what's unclear; never guess.
   - Internal-only items (refactors, tooling) marked as candidates to exclude; the PO decides.
3. Build the aggregate page from `templates/release-notes.md`: highlights first, then changes by product area, fixes, and known issues (only ones the PO supplies — never invent).
4. **Approval gate (per-run)** — present the readiness table, per-story notes, and aggregate page; apply changes and re-present until explicitly approved. Nothing is written before approval.
5. After approval: write each note to its story's Release Notes field (only where empty, or where replacement was explicitly approved); create the aggregate page in the space/parent the PO chooses.
6. Report: readiness verdict, stories updated, stories skipped (existing kept / excluded / needs-input), page link.

## Output

- A go/no-go readiness table for the release scope
- Release Notes field populated on approved stories; one aggregate release-notes page in Confluence

## Rules

- This skill edits exactly one field on existing issues — Release Notes (`customfield_14745`) — and only after the gate. It never transitions issues; readiness failures are the release owner's to act on.
- Derive notes only from story content; stakeholder language leads with the benefit and names features the way users see them.
- Never overwrite an existing note silently — existing content wins unless replacement is explicitly approved.
- Zero delivered stories in scope → say so and stop; never pad notes with in-progress work.
- Live outage communications are not this skill's job; say so if asked.

---
*Library conventions (gates, run logs, template-first): `references/conventions.md`. Instance facts: `references/kdp-instance.md`.*
