# Write Plan: {initiative-title}

**Prepared:** {date} | **Source:** {decomposition-doc-link} | **Target project:** {project-key}
[If brief-debt flagged: `⚠ Source was derived without approved brief — PO confirmed proceeding on {date}`]

## Issues to Create (in this order)

| # | Type | Summary | Parent | Fields to set |
|---|------|---------|--------|---------------|
| 1 | Initiative | {summary} | — | Business Unit: {value}; Strategic Program: {value}; label `ai-sdlc-generated` [or: "using existing {key} — no create"] |
| 2 | Epic | {summary} | #1 / {key} | Epic Name; label; [Team/Component if PO chose] |
| 3 | Story | {summary} | #2 | AC (house style, {n} criteria); open questions in description; label |

## Confluence Edits

| Page | Edit |
|------|------|
| {brief-link} | Append "Backlog" section linking created Initiative/Epics [or: "no brief — noted in report"] |

## Not Being Set (deliberately)

- Sprint, Story Points, Assignee — team's, in refinement
- [Anything else the PO chose to defer]

## Duplicate-Safety Note

Before each create: search for an existing issue with the same summary under the same parent; skip and report instead of duplicating.

---

## Execution Report *(filled during/after the run)*

| # | Result | Key / link | Note |
|---|--------|-----------|------|
| 1 | [created / skipped-duplicate / failed] | {key} | [reason if not created] |
