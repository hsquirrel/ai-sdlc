# jira-confluence-writer (Product Owner)

The write bridge between approved drafts and the systems of record. It creates the real Jira hierarchy — Initiative → Epics → Stories — from your approved decomposition, populating each epic's brief fields (Background / Description / Requirements) in the house structure. Because it creates real issues, it is the most conservative skill in the pipeline: explicit write plan, safe ordering, and it never touches an issue it didn't create.

## When to run it

- A decomposition draft has been approved and it's time to create the actual Jira issues

## What it asks of you

- Confirmation that the decomposition document is the approved version (a `⚠ Derived without approved brief` flag prompts a reminder that the debt will be visible in Jira)
- What the draft can't contain: new Initiative or an existing key? For a new Initiative, **Business Unit** and **Strategic Program** (required); optionally a Component and team assignment. If you can't answer a required field, it stops and says what's blocking — it never invents values.

## What happens at the gate (per-run)

It builds a complete write plan — every issue to create with type, summary, parent, and populated fields, plus any Confluence edits — and presents it in full. You approve the plan before a single issue is created.

## What it writes and where

- The Initiative (or reuse of an existing one), Epics parented to it with brief fields populated, Stories parented to Epics with AC in the Acceptance Criteria field — all labeled `ai-sdlc-generated`
- Draft dependencies as typed `Blocks` links (a dependency with no target issue is a blocking write-plan question — placeholder epic or named owner and date)
- A "Backlog" section on the Confluence umbrella page, if one exists
- Created keys back into the decomposition registry, plus a report table of everything created and anything skipped

## What it will never do

- Edit or delete issues it didn't create this run — changes to existing issues belong to [pipeline-adopter](pipeline-adopter.md) or a human
- Set Sprint, Story Points, or Assignee — those belong to the team in refinement
- Retry blindly after a mid-run failure — it stops, reports exactly what was and wasn't created, and its duplicate check (same summary under the same parent is skipped) makes the re-run safe

## Related

Next: [definition-of-ready-critic](definition-of-ready-critic.md) before the stories enter team refinement.
