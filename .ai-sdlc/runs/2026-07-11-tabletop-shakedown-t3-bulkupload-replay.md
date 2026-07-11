# Run Log: tabletop-shakedown — T3 Bulk Upload 2.0 historical replay

**Started:** 2026-07-11 | **Operator:** jeremy.harrell77@gmail.com | **Surface/model:** Claude Code / claude-fable-5 | **Skill version:** 2026-07-11 (working tree, no git)
**Status:** complete — report ready for approval gate

> Update this log as each step completes — not retrospectively at the end. Answers are recorded verbatim; paraphrase destroys the audit value.

**Hypothesis (restated):** Explore a completed/mature effort (Bulk Upload 2.0, initiative KDP-38143) with its full recorded history to discover which real, historically-recorded failures the pipeline artifacts (brief, DoR gate, decomposition traceability, test plans, readiness labels) would have prevented — and, honestly, which they would not. Replay mode: reality has already graded the homework.

## Context Gathered

| Source | Key / link | What was taken from it |
|--------|-----------|------------------------|
| Skill | skills/meta/tabletop-shakedown/SKILL.md | Method, rules, replay-mode step 4 |
| Template | skills/meta/tabletop-shakedown/templates/shakedown-report.md | Report structure incl. Replay comparison table |
| Template | templates/run-log.md | This log's structure |
| Exemplar | docs/shakedowns/2026-07-11-net10-tabletop.md | Rigor bar; T1 proposals S1–S7 referenced for overlap |
| Backlog | docs/shakedowns/scenario-backlog.md | T3 charter row, standing rules |
| Skill walked | skills/po/product-brief-builder/SKILL.md + templates/product-brief.md | Interview/scope/open-question rules; brief template sections |
| Skill walked | skills/po/backlog-decomposer/SKILL.md + templates/decomposition.md | Traceability rules, one-initiative rule, flagged-for-PO section |
| Skill walked | skills/po/definition-of-ready-critic/SKILL.md + references/dor-checklist.md + templates/readiness-report.md | 12 checklist items; story-level scope of the DoR |
| Skill walked | skills/po/jira-confluence-writer/SKILL.md + references/kdp-schema.md | Create-only rule, hierarchy/type registry, house AC style |
| Skill walked | skills/tester/test-plan-generator/SKILL.md | AC-as-contract; findings-for-PO mechanism |
| Skill walked | skills/tester/bug-report-writer/SKILL.md + references/kdp-bug-types.md | Type selection, duplicate search, AC-anchored expected-vs-actual |
| Skill walked | skills/sm/impediment-radar/SKILL.md | Multi-signal blocked-work scan, dependency rot |
| Skill walked | skills/sm/backlog-hygiene-auditor/SKILL.md | Zombie-epic/stale/duplicate checks; propose-never-auto-clean |
| Skill walked | skills/sm/sprint-report-generator/SKILL.md | Scope-change timestamps, carryover |
| Skill walked | skills/sm/retro-facilitator/SKILL.md | Evidence pack; pattern pile |
| Skill walked | skills/developer/tech-design-drafter/SKILL.md | Design-doc rules (options, open questions, linkage) vs the ARB page |
| Jira | KDP-38143 (Initiative) | Description (problem statement), created 2025-08-27, In Progress, no metrics/AC/links, 0 comments |
| Jira JQL | parent = KDP-38143 | 18 children: 12 KDP epics + QAA-964 (cross-project epic) + KDP-40288 (Story Bug parented to Initiative); 4 epics closed Duplicate |
| Jira | KDP-38089 (epic, Closed Complete 2026-04-23) | Created 2025-08-19 (before initiative); Connie Ross scope-dispute comment 2025-08-19 (verbatim below); Sophia Asdulla "moved to 2.0" comment 2026-03-30; open linked bug KDP-38074 as "action item"; label AdvisorComplete |
| Jira | KDP-38132 (epic, Closed Complete 2025-10-26) | Background/Requirements populated; delivery comment by Lindsay Buxton; 1 child |
| Jira | KDP-38179 (epic, Closed Complete 2025-10-29) | Two-goal description; empty Background doc; child KDP-38183 resolved 2025-12-05 (after epic close) |
| Jira JQL | parent in (KDP-38089, 38132, 38179, 39790, 39924) | 52 children with statuses/resolutions/AC lengths/dates (file: tool-results/...-1783794804743.txt) |
| Jira JQL | summary ~ "Bulk Upload" AND issuetype in (Bug, "Story Bug") | 172 issues (100+72 pages; files ...-1783794805806.txt, ...-1783794872847.txt); resolution distribution computed |
| Jira | KDP-39790 (epic, Closed Duplicate 2026-04-23) | Meeting-minutes description; Andrew Payne closure comment claiming all children moved to KDP-40164; child KDP-38344 still parented, Deployed to QA, updated 2026-07-09; ARB-487 "ARB Bypassed" |
| Jira | KDP-39924 (epic, Blocked) | Description verbatim copy of KDP-38089's; no comment/flag/blocked-by link; ARB-498 "ARB Not Ready"; children = 4 open 2025 bugs + closed items |
| Jira | KDP-38096 (story, Cancelled 2025-09-03) | 20 comments: 3 unauthorized close attempts, 2 reopens, near-deploy exchange (verbatim below), replaced by KDP-38176 over ADO commit coupling |
| Jira | KDP-40288 (Story Bug, Open) | Parented directly to Initiative KDP-38143; 4th incarnation of "No Government ID default" requirement |
| Confluence CQL | title ~ "Bulk Upload" OR text ~ "Bulk Upload 2.0" | 50 pages across NAO(kad), SRE(APS), NDTW, QA2, KRN, JS incl. requirements/validation/SOP/hub pages; DRAFT validation page in NDTW duplicated by current pages in NAO |
| Confluence | ARB Review: Bulk Upload 2.0 (NDTW, 9242673208) | Full body: status Proposed, review date Pending, review-ticket placeholder, unfilled security/compliance/HA checklists, empty open-questions table, "Row data encryption in the database?" left as inline question; author account deactivated |

Verbatim quotes preserved for the report:
- Connie Ross on KDP-38089, 2025-08-19: "This reads as if we are building a whole new bulk upload solution. The goal of this sprint was to understand what a new solution would look like and determine the feasibility versus incremental fixes. I want to ensure that we are not moving forward with just the 'new solution idea' and that incremental fixes are also being discussed this week."
- Sophia Asdulla on KDP-38089, 2026-03-30: "All the 1.0 bulk upload work is completed. The remaining work has been moved to 2.0. @Andrew Payne Please close it"
- Andrew Payne on KDP-39790, 2026-04-21: "This epic is duplicated by epic KDP-40164. I am going to close this one out ... I moved all of the related work item from this epic over to KDP-40164."
- Lindsay Buxton on KDP-38096, 2025-09-02: "is this update ready to be deployed to Production and have all acceptance criteria been met?" — Justin Derx: "Not at all that I know of. I thought it needed to pulled and worked this sprint."
- Chris Liptan on KDP-38096, 2025-09-02: "This ticket has commits which cannot be changed in ADO so we must use this ticket. Please re-open."
- Hema Punater on KDP-38096, 2025-08-28: "The subtasks/bugs linked to this ticket will be closed, and the ticket will be re-worked in S67."

## Questions & Answers

| # | Question asked | Answer (verbatim) |
|---|----------------|-------------------|
| — | None asked of humans — replay reconstruction is autonomous; the approval gate (step 6) is where the librarian weighs in | — |

## Drafts & Revisions

| Rev | What changed | Requested by |
|-----|--------------|--------------|
| 1 | Initial report drafted from templates/shakedown-report.md | — |

## Approval Gate

- **Presented:** docs/shakedowns/2026-07-11-t3-bulkupload-replay.md (full report: 14 content findings, 14-row replay table, 6 system proposals)
- **Decision:** pending librarian review
- **Overrules / conditions:** pending

## External Writes

| Action | Target | Result key / link |
|--------|--------|-------------------|
| — | NONE — strictly read-only tabletop; zero Jira/Confluence writes | — |

## Outcome & Follow-ups

- Report written to docs/shakedowns/2026-07-11-t3-bulkupload-replay.md
- Scenario backlog row T3 should move running → report-ready on approval (not edited by this run; backlog update is part of the approval step)
- System proposals T3-S1..S6 to route to skill-author on approval; overlaps noted with T1's open S1 (adopter) and S7 (doc-linkage sweep)

## Improvement Notes

- Replay mode has no changelog access via the MCP tools (no expand=changelog on search) — status-history had to be inferred from resolutiondate/updated/comments and automation comments. The tabletop skill should note this and suggest automation-comment mining ("Issue was re-opened", "Set Scrum Team Done") as the fallback evidence source; it worked well here.
- MCP JQL results >100 issues arrive as saved files needing local parsing; the skill could pre-warn that replay scenarios are file-parsing-heavy and recommend requesting minimal field sets (full AC bodies made one 52-issue query 341KB).
- The shakedown template's replay table wants one row per failure; this effort produced failure *classes* (4 duplicate epics; 64 noise bugs) — rows were written per class with counts, which read better. Template could bless that explicitly.
- "Readiness labels" from the hypothesis could not be exercised as such: `dor-ready`/`dor-needs-work` labels exist only as pipeline outputs, and this effort predates them; the replay evaluated the *gate* instead. Noted in Not Exercised.
