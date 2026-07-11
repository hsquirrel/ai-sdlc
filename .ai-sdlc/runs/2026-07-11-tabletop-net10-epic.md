# Run Log: tabletop-sdlc-exercise — .NET 10 upgrade epic (KDP-40426)

**Started:** 2026-07-11 | **Operator:** Jeremy Harrell | **Surface/model:** Claude Code / Fable 5 | **Skill version:** library @ main (292664a)
**Status:** complete

> Imaginary (tabletop) SDLC: each pipeline skill was walked against the real epic content, per its SKILL.md, without writing anything to Jira/Confluence. Purpose: stress-test the system on in-flight + engineering-driven work.

## Context Gathered

| Source | Key / link | What was taken from it |
|--------|-----------|------------------------|
| Jira epic | KDP-40426 | Full description (scope/out-of-scope/success measures), Background field (intent, beneficiaries, assumptions), Requirements field (constraints + compliance flags), empty AC field, no parent, due 2026-09-30, 1 comment (Q3 dependency) |
| Jira children | 46 issues under KDP-40426 | Types (34 Tech Managed - Deployable, 12 Non Deployable), statuses (33 Open, 5 In Test in DEV, 3 Closed, 1 In Progress, 1 Blocked, 1 Not Required, 1 In Dev, 1 PO Validated), AC coverage (16 with / 30 without), assignment (36 unassigned) |
| Jira child (AC exemplar) | KDP-40615 | Gherkin-style AC ("Scenario:" format, not house AC#N), SR-001..005 requirement block, stamped identical assumptions |
| Jira child (in test, no AC) | KDP-40587 | In Test in DEV with empty AC field; scope note "Only eSignature receiver project" |
| Jira child (blocked) | KDP-40596 | Status Blocked; blocker = repo access RA-15195, referenced only in a comment; Flagged field NOT set; no issue link |
| Confluence | NDTW: ".NET 10 Upgrades: Notes" | Copilot Modernization Agent recommendation + starting prompt citing KDP-40426-SR-001..005; not linked from the epic |
| Confluence | NDTW: "API Testing Documentation" | Declares itself the test plan for the epic's applications; not linked from the epic |

## Questions & Answers

| # | Question asked | Answer (verbatim) |
|---|----------------|-------------------|
| 1 | (User directive) | "look at the epic for upgrading to .NET 10… It's in flight and it's engineering driven instead of product. Do a thorough imaginary SDLC on that epic and see if we need improvements to the system (or to the Jira/Confluence content - I'm also interested in what the skills uncover)." |

## Drafts & Revisions

| Rev | What changed | Requested by |
|-----|--------------|--------------|
| 1 | Findings report drafted at `docs/shakedowns/2026-07-11-net10-tabletop.md` | — |

## Approval Gate

- **Presented:** Findings report (content findings + system improvement proposals); no Jira/Confluence writes proposed in this run.
- **Decision:** n/a — read-only exercise; improvement proposals await user decision.

## External Writes

| Action | Target | Result key / link |
|--------|--------|-------------------|
| none (read-only tabletop) | — | — |

## Outcome & Follow-ups

- Report: `docs/shakedowns/2026-07-11-net10-tabletop.md` — 12 content findings, 7 system improvement proposals.
- Follow-ups: user to decide which system improvements to build and whether to apply content fixes to KDP-40426 (a real gated run could apply them).

## Improvement Notes

- The exercise itself is a missing skill: "adopt in-flight work into the pipeline" had to be improvised — see proposal S1 in the report.
- MCP result-size limits forced file-based parsing of large Jira queries; a future scripted helper (deterministic `script`) for bulk Jira reads would reduce friction.
- The critic's checklist and the writer's schema assumed `Story` issue type; Tech Managed types exercised paths the SKILL.md texts don't mention.
