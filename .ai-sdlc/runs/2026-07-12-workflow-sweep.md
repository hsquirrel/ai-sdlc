# Run Log: workflow-sweep — empirical mapping of all KDP issue-type workflows

**Started:** 2026-07-12 | **Operator:** jeremy.harrell77@gmail.com | **Surface/model:** Claude Code / Fable 5 | **Skill version:** 2026-07-12
**Status:** complete

> Read-only sweep against Jira (JQL search + getTransitions only; zero writes to Jira).

## Context Gathered

| Source | Key / link | What was taken from it |
|--------|-----------|------------------------|
| Prior sweep notes (task brief) | — | Shared work-item workflow for Story/Story Bug/TMD; TMND own workflow; known done-cat traps (PO Validated, Ready to Deploy To QA) |
| Jira JQL discovery, 1 query per type | `project=KDP AND issuetype=<id> ORDER BY updated DESC`, fields=[status], max 100 | Distinct (status, category, sample key) per type |
| Jira getTransitions | ~55 issues (one per type×status) | Full outbound transition sets: name, target, category, hasScreen, isGlobal, isConditional |
| Resolution cross-check | `key in (29 resolved samples)`, fields=[status,resolution] | Which done-cat statuses actually carry a resolution |
| Gap-fill JQLs | Story gap statuses; Epic Review&Analyze/Prioritized/Deferred; Initiative On Hold/Monitoring; rare statuses (Rolled Back, Automated, Sparring, Ready for UAT, Hotfix staging/prod) | Extra samples; confirmed several statuses have 0 live issues |

## Per-type sample counts (status samples probed)

Epic 5, Initiative 4 (Closed=empty transitions), Bug 11, Spike Story 4, Design Story 5, Task 3, Sub-task 5, Clarification 2 (only 14 issues exist, all done-cat), Risk 5, Test Case 3, PV UAT Story 2, PV Test Case 5 (+Ready for UAT), PV UAT Bug 1 (all 100 sampled issues in Done), UV UAT Bug 2, UV UAT Story 2, UV Test Case 7 (+Ready for UAT), Hotfix Story 1, Hotfix System Story 1, Hotfix Bug 1 (only 5 hotfix issues exist, all Done), Contractor Hours 2 (Closed=empty transitions), Story gap-fill 2 (Grooming, Done), Epic gap-fill 3 (Review & Analyze, Prioritized, Deferred).

## Questions & Answers

| # | Question asked | Answer (verbatim) |
|---|----------------|-------------------|
| — | none (autonomous read-only sweep per brief) | — |

## Drafts & Revisions

| Rev | What changed | Requested by |
|-----|--------------|--------------|
| 1 | Initial kdp-workflows.md from empirical data | — |

## Approval Gate

- **Presented:** n/a — read-only research run; output is a repo reference file, no external writes
- **Decision:** n/a
- **Overrules / conditions:** none

## External Writes

| Action | Target | Result key / link |
|--------|--------|-------------------|
| none (Jira untouched) | — | — |

## Outcome & Follow-ups

- Wrote `skills/po/jira-confluence-writer/references/kdp-workflows.md`: 12 workflow groups covering 24 issue types, done-cat≠terminal registry (16 entries), resolution behavior, reopen paths, honest gap list.
- Key new findings vs prior sweep: Regression Passed/Failed + Rolled Back statuses in work-item family; Done has 8 reopen paths; Initiative Closed and Contractor Hours Closed are hard dead ends (empty transition lists); In UAT (done-cat) is the ACTIVE UAT state; Design Story Closed and UAT Story Closed set NO resolution; hotfix Done issues have NULL resolution despite screened transition; Task-wf "Not Required" auto-sets resolution without a screen.
- Follow-up candidates: probe Ready to Deploy To QA / Rolled Back / Monitoring / Automated / Sparring transitions if instances ever appear; investigate whether UV-UAT-Bug workflow lacks Rolled Back or it was condition-hidden.

## Improvement Notes

- `searchJiraIssuesUsingJql` ignores the `fields` narrowing for defaults (always returns summary/description/assignee/project) → 300KB+ files even for status-only queries; every discovery query needs the save-to-file + python parse pattern. A `fields`-honoring search would cut this run's cost ~10x.
- Transition-ID matching works for classic transitions but recently-added transitions (Rolled Back era) have per-clone ids — "identical ID set" is too strict a test for shared workflows; use graph-shape equality with ID-drift tolerance.
- getTransitions only shows available transitions: conditional transitions with failing conditions are invisible; single-sample-per-status can under-report (e.g., Bug Open vs UV UAT Bug Open showing Ready for Dev). Sample 2 issues per status for statuses feeding skills' write paths.
- Rare-status hunting via one cross-type JQL (`status in (...)`) is cheap and found Ready for UAT samples; do this before declaring statuses unprobeable.
