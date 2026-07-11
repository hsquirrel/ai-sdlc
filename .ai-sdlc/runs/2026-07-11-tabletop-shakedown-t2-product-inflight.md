# Run Log: tabletop-shakedown — T2 product-driven in-flight (KDP-40761)

**Started:** 2026-07-11 | **Operator:** jeremy.harrell77@gmail.com | **Surface/model:** Claude Code / claude-fable-5 | **Skill version:** 2026-07-11 (workspace copy, no git)
**Status:** complete — report ready for librarian review

> Update this log as each step completes — not retrospectively at the end. Answers are recorded verbatim; paraphrase destroys the audit value.

**Hypothesis (restated):** Explore product-driven, in-flight work with KDP-40761 (Legacy to DAO Modernization — Name Change, DOB Change, SSN/TIN Update) and all children to discover whether, even on the pipeline's home turf (product work with rich house-style AC), adoption gaps and content drift appear — and whether real house AC stress-break the definition-of-ready-critic and test-plan-generator.

**Mode:** live read-only. Hard constraint honored: no Jira/Confluence writes of any kind.

## Context Gathered

| Source | Key / link | What was taken from it |
|--------|-----------|------------------------|
| Skill rulebook | skills/meta/tabletop-shakedown/SKILL.md + report template | Method, finding classes, report shape |
| Exemplar report | docs/shakedowns/2026-07-11-net10-tabletop.md | Rigor bar, finding style |
| Scenario backlog | docs/shakedowns/scenario-backlog.md | T2 charter row (status: running) |
| Skills walked | po/product-brief-builder, po/backlog-decomposer, po/jira-confluence-writer (+kdp-schema.md), po/definition-of-ready-critic (+dor-checklist.md), tester/test-plan-generator, tester/exploratory-charter-generator, sm/backlog-hygiene-auditor, sm/impediment-radar — SKILL.md + templates + references read in full | The rules being tested |
| Jira epic | KDP-40761 (*all fields) | Description (scope/deps/success criteria), Background cf14757 (de-facto brief), Requirements cf14762 (38.9k-char functional spec), links (ARB-656 Related, KDP-40797 Related), 8 Confluence remote links, 0 comments, no parent, no AC field, no labels/team/assignee/duedate |
| Jira children | JQL `parent = KDP-40761` → KDP-40800, 40807, 40808, 40809, 40810, 40811 (6 total; full AC, descriptions, comments) | All Story type, all Open, all descriptions EMPTY, 0 comments, 0 issue links, no points/sprint, Team="Product Backlog", full house-style AC bodies captured |
| Key-range check | JQL `key in (KDP-40801..40806)` | Only KDP-40801 exists — unrelated Task (data-testid work, AC in description). Epic has exactly 6 children |
| Sibling epics | KDP-40759, KDP-40797 | 40759: rich description, same template, inline question "(Is this the Funding or Features Act?)", empty Success Metrics, ARB-655 link; 40797: EMPTY description, "(WIP)" in title, ARB-663 link. Both orphans |
| Initiative check | JQL initiatives ~ Modernization/Advisor Platform/Legacy | TR-8 "Advisor Platform Modernization" (In Progress, Connie Ross) exists — natural parent; all 3 modernization epics unparented |
| Epic-inventory check | JQL KDP epics ~ Maintenance/DAO Modernization | No "General maintenance infrastructure" epic exists in Jira — KDP-40761's must-be-first dependency has no issue |
| Remote links | getJiraIssueRemoteIssueLinks KDP-40761 | 8 Confluence pages incl. Gap Analysis (9724690442), Validation Rules (9755951161), Migration Overview (9922510869), "DAO Maintenance Migration Epic and Stories" (9929326593) |
| Confluence page | 9929326593 "DAO Maintenance Migration Epic and Stories" (KRN space) | Full draft decomposition of the *infrastructure* epic (10 stories, INVEST/EARS) — never written to Jira |
| Confluence CQL sweep | name change + DAO / DAO Modernization | Related-but-unlinked: "Tracking and discuss for Modernization" database (NAO), Redtail-integration doc suite (PMO), assumptions-driven analysis suite 01–03; "Maintenance Current State.xlsx" cited in epic without link |

## Questions & Answers

| # | Question asked | Answer (verbatim) |
|---|----------------|-------------------|
| — | (tabletop mode: no human interview; skills walked on paper) | — |

## Drafts & Revisions

| Rev | What changed | Requested by |
|-----|--------------|--------------|
| 1 | Initial report draft from templates/shakedown-report.md | — |

## Approval Gate

- **Presented:** full shakedown report `docs/shakedowns/2026-07-11-t2-product-inflight.md` (13 content findings: 4 blocking-grade + 9 significant; 7 system proposals T2-S1..S7; 12-item DoR matrix over all 6 children; hypothesis verdict)
- **Decision:** pending — awaiting librarian review (per SKILL.md step 6, proposals do not land without approval; scenario-backlog row not updated by this run per scenario constraints)
- **Overrules / conditions:** —

## External Writes

| Action | Target | Result key / link |
|--------|--------|-------------------|
| none — strictly read-only tabletop; zero Jira/Confluence writes | — | — |

## Outcome & Follow-ups

- Report: `docs/shakedowns/2026-07-11-t2-product-inflight.md` (report-ready)
- Content findings for routing to content owners (librarian decision): duplication set KDP-40800 vs 40807–40811; empty descriptions ×6; unreified infra-epic dependency; NFS-120 scope contradiction; orphaned epics vs TR-8; metric placeholder
- System proposals T2-S1..S7 → `skill-author` on approval; T2-S3 extends T1-S1 (adopter) with Background-as-brief evidence
- Scenario backlog: T2 row should move running → report-ready at review

## Improvement Notes

- Large MCP results routinely exceed token limits; the parse-from-file workflow (python over saved JSON) worked well and should be named in tabletop-shakedown's SKILL.md as the expected pattern for child-set fetches.
- The DoR checklist walk needed a *set-level* pass (reading AC bodies side by side) that no checklist item asks for — the duplication finding came from walker judgment, not the rulebook (hence T2-S1). The critic's workflow step 2 ("evaluate every story against each item") structurally hides cross-story reads except item 12.
- exploratory-charter-generator's entrance ("testable in an environment") forced a paper-mode walk; the skill has no stated degraded mode, unlike backlog-decomposer's graceful degradation — asymmetry worth normalizing (T2-S7).
- Confluence CQL text search surfaced the unlinked "Tracking and discuss for Modernization" database and the Redtail doc suite quickly; the T1-S7 doc-linkage sweep remains the right idea and would have found page 9929326593 even if it weren't remote-linked.
- Field IDs supplied by the scenario charter (AC/Background/Requirements/Flagged/Team) were all correct against the live instance; kdp-schema.md matched reality everywhere it spoke.
