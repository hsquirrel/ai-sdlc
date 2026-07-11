# Run Log: tabletop-shakedown — T5 incident/hotfix + UAT flows

**Started:** 2026-07-11 | **Operator:** jeremy.harrell77@gmail.com (via Claude Code) | **Surface/model:** Claude Code / claude-fable-5 | **Skill version:** 2026-07-11 working tree
**Status:** complete — report drafted, pending librarian approval gate

> Update this log as each step completes — not retrospectively at the end. Answers are recorded verbatim; paraphrase destroys the audit value.

## Hypothesis (restated)

Explore **incident/hotfix and UAT work shapes** with **real KDP usage of the Hotfix\*, UAT\*, Clarification, and Risk issue types plus a synthetic mid-sprint production incident** to discover **whether the pipeline has any incident entrance, and whether hotfix/UAT issue types bypass the DoR/test skills entirely — getting none of the pipeline's protections.**

Mode: live read-only inventory (Part A) + synthetic timeline walk (Part B). STRICTLY READ-ONLY against Jira/Confluence.

## Context Gathered

| Source | Key / link | What was taken from it |
|--------|-----------|------------------------|
| skills/meta/tabletop-shakedown/SKILL.md | repo | Method, finding classes, run-log duty |
| templates/shakedown-report.md + templates/run-log.md | repo | Report/log formats |
| docs/shakedowns/2026-07-11-net10-tabletop.md | repo | Exemplar rigor bar; S1 pipeline-adopter precedent |
| skills/po/jira-confluence-writer/references/kdp-schema.md | repo | Full 24-type registry; Hotfix Story/System Story = "process types (pipeline reads, never creates)"; Hotfix Bug in defects; UAT types in testing/defects; AC field customfield_14705 |
| skills/tester/bug-report-writer/SKILL.md + references/kdp-bug-types.md | repo | Type guidance: Story Bug / Bug / UAT bugs; Hotfix Bug = "confirm with the team lead before using" |
| skills/tester/test-plan-generator/SKILL.md | repo | AC-as-contract; upstream = DoR-ready stories |
| skills/tester/exploratory-charter-generator/SKILL.md, ac-playwright-scaffolder/SKILL.md | repo | Session/scaffold rules |
| skills/po/definition-of-ready-critic/SKILL.md + references/dor-checklist.md | repo | 12-item checklist, blocking items |
| skills/po/release-notes-generator/SKILL.md | repo | Done-stories scope; customfield_14745 |
| skills/sm/impediment-radar, daily-standup-digest, retro-facilitator, sprint-report-generator SKILL.mds | repo | Aftermath skills' signals and cadence |
| skills/developer/* SKILL.mds (all 5) | repo | dor-ready prerequisite, invention test, plan gates |

## Questions & Answers

| # | Question asked | Answer (verbatim) |
|---|----------------|-------------------|
| — | (none yet — tabletop runs against written scenario spec) | — |

## Jira/Confluence queries run (all read-only)

| # | Query | Purpose | Result |
|---|-------|---------|--------|
| 1 | JQL: `project = KDP AND issuetype in ("Hotfix Story","Hotfix System Story","Hotfix Bug") ORDER BY created DESC` (50 max) | Hotfix family inventory | **5 issues total, complete** (hasNextPage=false): KDP-35373 (Hotfix System Story, 2024-11-11), KDP-32710 (Hotfix Story "Test Story", 2024-03-18), KDP-32165 / KDP-31813 / KDP-30606 (Hotfix Bugs, 2024-02/2024-01/2023-09). All 5: AC field null, resolutiondate null despite Done status. Parents: quarterly "Unplanned Work" epics (KDP-35036, KDP-31454) or feature epic. KDP-32165 links "Root Cause Fix" → SSQ-2793/SSQ-2812 (System Malfunction); KDP-31813 links "Defect created" → KDP-31870 (a Story: "QA Planning and Execution in the lower environment") |
| 2 | JQL: UAT family (6 types) ORDER BY created DESC, 50 sampled (hasNextPage=true — more exist) | UAT usage inventory | Sample breakdown: 36 User Validation UAT Bug, 11 UV Test Case, 2 PV UAT Story, 1 PV Test Case. Span 2024-09→2026-06. UV UAT Bugs: 36/36 AC-empty, mostly parentless (orphans), reporters are business testers (Brandon Kee, Dennis Weldon, Marissa Griebel, Jason White, Anastasia Martino, Benjamin Brajtbord); linkage to test cases via ad-hoc "Blocks"/"Action item" links. UV Test Cases: bulk-created 2024-09-13/16 by James Mccluskey under epic KDP-34699 (Annuity Enhancements E2E), status "Pass" (custom workflow), never reused. 2026 activity: 3 PV items (KDP-40541 orphan Open test case; KDP-40365, KDP-40341 tracking-style UAT stories) |
| 3 | JQL: UAT family `AND cf[14705] is not EMPTY` | AC presence across entire UAT family | **Exactly 2 issues in all of KDP history** (complete): KDP-40341 (2026 PV UAT Story), KDP-16769 (2022 PV UAT Bug — AC is actually a user-story sentence) |
| 4 | JQL: `project = KDP AND issuetype = Clarification` | Clarification usage | 14 total ever (complete). 12 from 2020–2022, 1 from 2025. Orphans, no links, resolutions "Not Required"/Closed; several sat years (KDP-561 created 2020, resolved 2023). Dormant type |
| 5 | JQL: `project = KDP AND issuetype = Risk` | Risk usage | 27 total (complete). ALL parented to KDP-25517 "NGP Risks and Issues", bulk-created 2023-03 by one PM (Matthew Dalton). Custom workflow (Assessing/In Mitigation/Mitigated/Blocked). 16+ still in non-terminal statuses, untouched since 2023 — a one-program, now-stale risk register |
| 6 | JQL: `project = SSQ AND issuetype = "System Malfunction" ORDER BY created DESC` (10) | Locate the real incident intake | Very active: 10 issues on 2026-07-10 alone (hasNextPage=true), incl. automated Azure Sev-1 alert (SSQ-35104), support cases with Case: numbers, statuses "Impact Mitigation"/"Waiting on Internal Team". **SSQ is the live incident entrance; KDP hotfix items historically link to it via "Root Cause Fix"** |
| 7 | CQL: `title ~ "hotfix" AND type = page` | Locate real hotfix process artifacts | 10 pages, Oct 2025–Jun 2026: SRE-run "HOTFIX Release … Deployment" plan pages in NDTW (Chris Liptan et al.), "HOTFIX Release Notes" pages in KRN space (bare Jira-list dumps), plus DE/KS spaces. Hotfix releases ship ~monthly — with zero Hotfix-type Jira issues since 2024-11 |
| 8 | JQL: `project = KDP AND fixVersion = "1.69-OCT28"` | What actually ships in a hotfix release | 2 issues, both regular types: KDP-38753 **Story** (created 2025-10-27, resolved 2025-10-28 — 1 day; one-line AC) and KDP-38742 **Bug** (created 2025-10-24, resolved 2025-10-28 — 4 days; AC null, label L3Triaged) |
| 9 | getJiraIssue KDP-35387 (UV UAT Bug exemplar) | Do UAT bugs cite AC / carry repro? | Description in full: "Order ID: I33-CFLK-BFF". AC null. No expected-vs-actual, no repro steps. Links Blocks → KDP-34794 (the test case it broke). Created 2024-11-13, resolved 2024-12-05 (22 days) |

## Timeline evidence notes (Part B synthetic walk)

- Detection path in reality: SSQ System Malfunction (active daily) → no library skill reads SSQ.
- Hotfix work-item reality: regular Bug/Story + fixVersion `1.xx-<MONTHDAY>` + SRE deployment page (NDTW) + KRN release-notes page. Hotfix issue types abandoned after 2024-11.
- kdp-bug-types.md guidance for the scenario's exact case ("Hotfix Bug … Per hotfix workflow — confirm with the team lead before using") is a punt, and points at a dead type.
- Speed under hotfix clock: 1–4 days create→resolve (KDP-38753/38742); UAT bugs 3 days–3 months.

## Drafts & Revisions

| Rev | What changed | Requested by |
|-----|--------------|--------------|
| 1 | Initial report draft from templates/shakedown-report.md | — |

## Approval Gate

- **Presented:** Full shakedown report `docs/shakedowns/2026-07-11-t5-hotfix-uat.md` — 10 content findings (5 blocking-grade, 5 significant), 15-step synthetic incident timeline, 8 system proposals (T5-S1…T5-S8)
- **Decision:** pending — librarian (user) to approve which system proposals become skill-author work and whether content findings route to content owners
- **Overrules / conditions:** pending

## External Writes

| Action | Target | Result key / link |
|--------|--------|-------------------|
| NONE — strictly read-only tabletop | — | — |

## Outcome & Follow-ups

- Report: `docs/shakedowns/2026-07-11-t5-hotfix-uat.md` (10 content findings, 15-step timeline with 4 no-path steps, 8 system proposals T5-S1…S8).
- Follow-ups on approval: scenario-backlog row update for T5; T5-S1/S3 to `skill-author` as the priority pair; T5-S2 (`kdp-bug-types.md` rewrite) is a same-day reference fix; verify with the team whether the hotfix issue types should be formally retired before editing the registry.
- Suggested next scenario: replay of the 1.80-MAR27→MAR31 double hotfix (needs repo/PR access) to grade the paper verdicts on timeline steps 6–9.

## Improvement Notes

- The MCP JQL tool saves large results to files with no total count; `computeIssueCount=true` did not return a count field. Family sizes had to be established via hasNextPage + complete sub-queries (e.g., the AC-presence query). A tabletop-shakedown reference on "counting populations read-only" (use narrow `cf[x] is not EMPTY` complements, minimal `fields`) would save a round of oversized responses.
- `kdp-schema.md` documents issue types but not **link types** — three inventory findings hinged on link vocabulary ("Root Cause Fix", "Defect created", "Action item") the library doesn't know exists. Schema derivation should include `getIssueLinkTypes`.
- The shakedown template has no slot for a synthetic timeline; added it as a section between Part 1 and Part 2 — worked well, consider templating (step → skill → verdict table) for future incident/flow scenarios.
- Cross-project reads (SSQ, KRN/NDTW Confluence) were essential; the skill's step 2 says "the relevant Jira project(s)" — worth making explicit that the *adjacent* projects are where bypass flows hide.
