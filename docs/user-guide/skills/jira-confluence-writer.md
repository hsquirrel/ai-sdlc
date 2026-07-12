# jira-confluence-writer (Product Owner)

The write bridge: turns your approved decomposition into real Jira issues (Initiative → Epics → Stories in KDP) and links the backlog from the Confluence brief. The most conservative skill in the pipeline — by design.

## When to use

- A decomposition document is approved and it's time to create the actual issues

**Not for:** editing existing issues (it refuses — create-only), drafting content (upstream stages own that).

## Before you start

Have answers ready for what the draft can't know:

- **New Initiative or existing?** If existing, its key (it may live outside KDP — e.g., a TR initiative)
- For a new Initiative: **Business Unit** and **Strategic Program** (required Jira fields — it shows you the allowed values)
- Optionally: Component and Team assignments

## What happens

1. It reads the decomposition and confirms it's the approved version (brief-debt flags trigger an extra "are you sure" — the debt will be visible in Jira).
2. It builds a **write plan**: every issue it will create — type, summary, parent, fields — plus the Confluence edits.
3. **You approve the write plan.** Nothing is created before this; review it like a deploy plan, because it is one.
4. It executes top-down (Initiative → Epics → Stories), verifying each level: AC land in the Acceptance Criteria field in the house `AC#N` / Given-When-Then style, open questions go into descriptions, everything gets the `ai-sdlc-generated` label.
5. It appends a "Backlog" section to your brief linking the created work, records the created keys into the decomposition registry's Created Keys section, and reports every key with links.

## What gets written

Real KDP Jira issues in the approved hierarchy + backlog links on the Confluence brief.

## Good to know

- **Safe re-runs:** if a run fails midway, run it again — it checks for an existing issue with the same summary under the same parent and skips rather than duplicates. It also compares AC bodies against existing siblings, so it won't create a second source of truth for a behavior a story already owns.
- Dependencies become typed "is blocked by" links in the write plan; a dependency whose target doesn't exist in Jira is a blocking question (placeholder epic, or owner + date), never silent prose.
- It never sets Sprint, Story Points, or Assignee — those are the team's, in refinement.
- Schema reference (field IDs, allowed values, AC house style): [kdp-schema.md](../../../skills/po/jira-confluence-writer/references/kdp-schema.md). If creates start failing validation, the schema likely drifted — re-derive it.

## Related

- Previous: [backlog-decomposer](backlog-decomposer.md) · Next: [definition-of-ready-critic](definition-of-ready-critic.md)
