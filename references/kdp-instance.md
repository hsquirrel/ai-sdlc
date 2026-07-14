# KDP Instance Facts — Single Authoritative Reference

Everything the library knows about the live Atlassian instance, in one place. Derived empirically 2026-07-11/12; re-derive sections if creates start failing validation — schemas drift. Skills cite this file by one path: `references/kdp-instance.md`.

**Remediation note:** several sections below document *defects in the instance*, not desirable design. The case for fixing them is `docs/proposals/2026-07-12-change-case.md`; each affected section names the fix that would retire it. Until fixes land, this file is the migration bridge.

## 1. Instance

- Site: `kestra.atlassian.net` — cloudId `287e948f-75b9-420f-8cdb-818ef948b429`
- Project: **KDP** — "Kestra Digital Platform" (project id `17860`)
- Incident intake lives in project **SSQ** ("System Malfunction") — Impact Mitigation states, ~10 new/day, some automated
- Confluence spaces seen: **NDTW** (engineering), **KRN** (release notes), NAO, QA2, PMO
- Confluence: the PO chooses space and parent page at runtime — never assume a location

### Working with this instance

Access goes through the swappable layer in `references/atlassian-access.md` — MCP tools where connected, the `atl` CLI (`tools/atl/`) everywhere else. Quirks that hold on either surface:

- Keep requested `fields` minimal; route large results to files (MCP does this automatically; with `atl` pass `--out <file>`) and never re-fetch what you already saved.
- Jira's workflow-definition API is **unavailable**; workflows are mapped by sampling available transitions per (type, status) — `atl issue transitions KEY` / `getTransitionsForJiraIssue` — see §5.

## 2. Hierarchy and issue types

All levels linked via the native `parent` field. Legacy Epic Link (`customfield_11261`) mirrors parent automatically — never set it directly.

| Level | Issue type | Type ID | Notes |
|-------|-----------|---------|-------|
| 2 | Initiative | `12406` | May live in other projects (e.g., TR) — epics can parent cross-project |
| 1 | Epic | `10001` | `parent` → Initiative key |
| 0 | Story et al. | see below | `parent` → Epic key |
| −1 | Sub-task / Story Bug | `7` / `10400` | Team- or QA-created under a story |

### Complete issue-type registry (all 24 KDP types)

**Type selection is a decomposition decision** — forcing engineering work into Story form (or vice versa) is a defect.

Work items (decomposer/writer may create):

| Type | ID | Level | Use for | Pipeline role |
|------|----|-------|---------|---------------|
| Story | `10000` | 0 | User-visible functionality, vertical slices with behavioral AC | Default for product work |
| Tech Managed - Deployable | `12504` | 0 | Engineering-driven work requiring testing **and deployment** | Default for engineering work that ships |
| Tech Managed - Non Deployable | `12517` | 0 | Engineering-driven work with **no deployment** (docs, scripts, repo config) | Engineering work that doesn't ship |
| Spike Story | `12486` | 0 | Research to settle a design/technical question; timeboxed; outcome is knowledge | Decomposer creates when AC can't be written yet |
| Task | `3` | 0 | Generic work | Avoid — prefer a specific type |
| Sub-task | `7` | −1 | Team's task breakdown in refinement | Team-created; pipeline never creates |

All level-0 work types require AC (behavioral where user-visible; objective completion checks — build/scan/deploy verification — for Tech Managed).

Defects (see §6 for selection guidance):

| Type | ID | Level | Use for |
|------|----|-------|---------|
| Story Bug | `10400` | −1 | QA-found defect in an in-flight story (sub-task of it) |
| Bug | `1` | 0 | Defect in existing/shipped functionality — **including production hotfixes** |
| Hotfix Bug / Hotfix Story / Hotfix System Story | `13526`/`13524`/`13525` | 0 | **Dead in practice — do not use** (5 issues ever, 0 since 2024-11). Real hotfixes = Bug/Story + fixVersion + `hotfix` label |
| Product / User Validation UAT Bug | `12498`/`12499` | 0 | Found during the PV / UV UAT phases |

Testing (tester skills may create with team agreement): Test Case `26`, PV Test Case `12497`, UV Test Case `12501`, PV UAT Story `12496`, UV UAT Story `12500`. Note: across the UAT family, exactly 2 issues have ever had a populated AC field — these are one-shot campaign artifacts in practice.

Process types (pipeline reads, never creates): Design Story `12485` (design-team workflow), Clarification `19` (dormant — 14 ever, mostly 2020–22), Risk `12512` (fossilized — all 27 bulk-created 2023-03), Contractor Hours `13865` (never pipeline-touched).

*Retirement candidates (change-case items R3): the 3 Hotfix types, Clarification, the UAT quartet, Task.*

## 3. Fields

Required at create:

| Issue type | Required beyond summary/project/issuetype | Field ID |
|-----------|-------------------------------------------|----------|
| Initiative | Business Unit | `customfield_14694` |
| Initiative | Strategic Program | `customfield_14696` |
| Epic / Story | (none — reporter defaults to creating user) | — |

- **Business Unit** values: `Arden`, `BWP`, `KF`, `KH`, `KIP`, `KIM`, `KPWS`
- **Strategic Program** values include: `Kestra Digital Platform`, `Kestra Cybersecurity`, `Kestra Data & Analytics Strategy`, `Kestra Tech Strategy`, `Kestra Financial Intake`, `Kestra IM Strategy`, `Kestra Holdings Strategy`, `Asset Walk`, `Bluespring Strategy`, `Grove Point Strategy`, `Lead Gen`, `Other`

Notable optional fields:

| Field | ID | Applies to | Pipeline usage |
|-------|----|-----------|----------------|
| Acceptance Criteria | `customfield_14705` | all level-0 work types | **Always populate** (rich text/ADF) — house style below |
| Background | `customfield_14757` | Epic | **The de facto brief** — see §7; pipeline writes it in the house structure |
| Requirements | `customfield_14762` | Epic | Cross-cutting constraints, `{EPIC-KEY}-SR-NNN` numbering, compliance flags |
| Epic Name | `customfield_11263` | Epic | Set to the epic's short name |
| Team | `customfield_14601` | Epic, Story | Set only if PO provides; else leave for refinement |
| Story Points | `customfield_11268` | Story | Never set — team estimates in refinement |
| Sprint | `customfield_11260` | Story | Never set — team pulls in planning. **Field state can lie** — see §8 |
| Flagged | `customfield_11266` | all | **A claim, not a fact** — unused by teams, polluted with 50+ relics. Verify before trusting; skills that set it add an evidence comment |
| Severity | `customfield_10022` | bugs | Always set, with rationale in the description |
| Priority | `priority` | Epic, Story | `1-Critical`…`5-None Selected`; defaults `3-Medium`; leave bug priority for triage |
| Components | `components` | all | Managed list (e.g., "Wealth Management", "Core Platform") — set only if PO picks one |
| Labels | `labels` | all | Always add `ai-sdlc-generated` (adoption edits: `ai-sdlc-adopted`; hotfix-case bugs: `hotfix`) |
| Release Notes | `customfield_14745` | Story | Not on the create screen; populated later by the release skill |
| Issue Found in Build No | `customfield_10660` | bugs | Populate if known — never guess |
| Targeted Release | `customfield_14738` | Initiative | Options stale (2022–2023) — do not set |

### House acceptance-criteria style (observed in real KDP stories)

AC lives in the Acceptance Criteria field (not description), as repeated blocks separated by a horizontal rule:

> **AC#1: Work Item Type appears in the DAO Work Item Creation Screen**
> **Given** a user is on the DAO Work Item Creation Screen
> **When** the user opens the "Work Item Type" dropdown
> **Then** "Account and Client Edit" appears as a selectable option
>
> ---
>
> **AC#2: …**

- `AC#N: <title>` bold, then bold **Given/When/And/Then** keywords, hard line breaks between lines.
- NFR blocks (data contracts, audit logging, observability, security) go in the story description under a "Requirements (NFR)" heading, keeping the AC field behavioral.
- Within an epic, match the AC format its existing children use (some epics use plain `Scenario:` Gherkin) — consistency inside the epic beats style purity.

## 4. Issue link types

28 types exist; the pipeline-relevant ones with exact directional phrases (`createIssueLink` cares):

| Type | Outward / inward | Pipeline usage |
|------|------------------|----------------|
| Blocks | `Blocks` / `Blocked By` | Dependencies — decomposer/writer create; sprint-radar watches for rot |
| Problem/Incident | `causes` / `is caused by` | **The regression trace**: hotfix bug *is caused by* the regressed story |
| Root Cause Fix | `requires a root cause fix in` / `is a root cause fix for` | Fix item *is a root cause fix for* the SSQ incident (observed live: KDP-32165 → SSQ-2793) |
| Test | `tests` / `is tested by` | Persisted test cases *test* the stories they verify. Near-duplicate `Tests` type exists — prefer `Test` |
| Defect | `created` / `created by` | Work item *created* a defect (observed: KDP-31813) |
| Work item split | `split to` / `split from` | Refinement splits carried into Jira |
| Duplicate | `Duplicates` / `is duplicated by` | Duplicate closures name the survivor |
| Escalate | `escalates` / `escalated-by` | Radar escalations that become tracked items |
| Post-Incident Reviews | `reviews` / `is reviewed by` | RCA artifacts to the incidents they review |
| Relates / Related | symmetric | Generic association — **two** near-identical types (`Relates` 11615, `Related` 10604); prefer `Relates`, expect both in old data |

Not used: Gantt/scheduling families, Polaris types, `Child-Issue` (legacy — use native `parent`), `Deployment`, `Resolve`, `Action item`, `Discovery - Connected`.

## 5. Workflows — empirical map, terminal sets, and the delivered-detection rule

**Method:** the workflow-definition API is unavailable; this map was reconstructed by sampling one live issue per (issue type, status) and reading `getTransitionsForJiraIssue`. Swept 2026-07-12: 24 types, ~60 samples, resolution cross-checks on 29 resolved issues. Empirical — statuses with zero live issues are unprobed; conditional transitions hidden by failing conditions are invisible.

### ⚠ The delivered-detection rule (every counting skill obeys this)

Neither `statusCategory = Done` **nor** a populated resolution field reliably means delivered.

- Done-category includes mid-pipeline waypoints (PO Validated, Ready to Deploy To QA, Deployed to QA, Regression Passed/**Failed**, In UAT…) and even failure states.
- Resolution is legitimately NULL on several *true* terminals (UAT Story Closed, Design Story Closed, Contractor Hours Closed, observed Hotfix Dones) and auto-set on the *reopenable* Not Required.
- **The reliable test: status is in that issue type's terminal set below.** Use statusCategory and resolution only as corroboration; discrepancies are hygiene findings, not delivery signals.

**Terminal sets:** work-item family: Done; Task family: Closed / Not Required; Epic: Closed; Initiative: Closed; Spike: Closed; Design Story: Closed; Risk: Done; UAT Story: Closed; Test Cases: type-specific (Pass/NA/Automated with reopen caveats).

*Change-case items R1+R2 (recategorize waypoints; resolution post-functions on terminals) retire this rule and the trap registry below.*

### Workflow groups (12)

Legend: `[S]` = transition opens a screen (resolution dialog). `(cond)` = conditional. `⚠D` = done-category status.

**1. Work-item family — Story 10000, Story Bug 10400, Tech Managed-Deployable 12504, Bug 1, PV UAT Bug 12498, UV UAT Bug 12499.** Functionally one graph; clones drift only in newer transition ids.
- Globals (from every status): Blocked (491), Open (901), **Done (931) [S]**
- Open → Groom (251)→Grooming; Skip Grooming (301)→Accepted
- Grooming → Accept (261)→Accepted
- Accepted → Refine (311)→Grooming; Ready for Dev (881)→In Dev
- In Dev → Dev Complete (851)→In Test in DEV; Back to Accepted (681)
- In Test in DEV → Testing In Dev Complete (861)→In Product Owner Validation; Back to Dev (871)
- In Product Owner Validation → PO Validated (941)→PO Validated ⚠D; Back to Dev (501); Back to In Test in Dev (821)
- PO Validated ⚠D → Ready to Deploy to QA (891, cond)→Ready to Deploy To QA ⚠D
- Ready to Deploy To QA ⚠D → (prior mapping: → Deployed to QA)
- Deployed to QA ⚠D → Back to Dev (871)
- Regression Passed ⚠D → **Deployed (4) [S]→Done**; Rolled Back (3, cond)→Rolled Back (16984, To Do)
- Regression Failed ⚠D → Back to Accepted (681); Back to Grooming (691); Back to Dev (871)
- Done ⚠D → 8 reopen paths incl. conditional Rolled Back
- Blocked → Back to Deployed to QA (1021); plus 501/681/691/711/821/911 back-paths
- Clone deltas: Rolled-Back id at Done is 4 (Story) vs 5 (Bug, PV UAT Bug); UV UAT Bug Done shows Back to Regression Passed as id 3, no Rolled Back; UV UAT Bug Open additionally offered Ready for Dev (881) directly.

**2. Tech Managed - Non Deployable 12517.** Own workflow: globals →Not Required (11958 ⚠D, no screen), →Blocked, →Open; "Done" (31)→Closed(6), NO screen.

**3. Task workflow — Task 3, Sub-task 7, Clarification 19** (identical ids).
- Global: Not Required (111)→Not Required ⚠D — no screen, resolution auto-set (post-function)
- Open → Start Progress (11)→In Progress; **Close (41) [S]**→Closed; Blocked (81)
- In Progress → Stop Progress (21)→Open; **Done (31) [S]**→Closed; Blocked (91)
- Blocked → Unblock (101)→In Progress
- Closed → Re-Open (51)→Open; **Override (61) [S]** (re-resolution loop); Reopen (71)→In Progress
- Not Required ⚠D → Re-Open (121)→Open

**4. Epic 10001.**
- Globals: Blocked (21), **Closed (31) [S]**
- Open → Review (41)→Review & Analyze (11946)
- Review & Analyze → Ready for PI Planning (61)→Prioritized (11947); Back to Funnel (51)→Open
- Prioritized → In Progress (131); Back to Review (11); Deferred (141)→Deferred (11962)
- In Progress → Ready for Product Validation (121)→Epic Ready for Product Validation (11984) ⚠D no screen; Deferred (141)
- Deferred → Back to In Progress (151); Back to Prioritized (161)
- Epic Ready for Product Validation ⚠D → Back to In Progress (111)
- Blocked → Back to Review (11); Back to Funnel (51); Back to Analysis (81)→Prioritized; Back to In Progress (111)
- Closed → Back to Analysis (81)→Prioritized; Back to Review (11) — **Epic Closed is reopenable**

**5. Initiative 12406.**
- Open → **Close (131) [S]**; Schedule (461)→Scheduled (11953)
- Scheduled → **Close (501) [S]**; On Hold (511)→On Hold (10721); Start Progress (271)→In Progress
- In Progress → Stop Progress (211)→On Hold; Delivered (521)→Monitoring (11954) ⚠D no screen. **NO direct Close from In Progress.**
- **Closed → NO transitions. Hard dead end (no reopen).** On Hold / Monitoring: 0 live issues, unprobed.

**6. Spike Story 12486.**
- Globals: Blocked (491), **Closed (541) [S]** (terminal name is Closed, not Done)
- Open → Groom (251)→Grooming; Skip Grooming (301)→Accepted
- Accepted → Refine (311)→Grooming; Start Progress (731)→In Progress
- In Progress → Back to Accepted (751); **Done (761) [S]**→Closed
- Closed → globals only

**7. Design Story 12485.**
- Globals: Blocked (691), **Closed (701) — NO screen** (resolution left NULL)
- Backlog (10920) → Analysis (561)→11964; Analysis → Active Research (571)→11965; Exploration (601)→11966
- Exploration → Active Research (591); Sparring (611)→11967
- Done (10021) ⚠D → globals only (→Closed/Blocked). How Done is entered is unprobed.

**8. Risk 12512.**
- Global: Blocked (11)
- Assessing (12032) → Mitigate (31)→In Mitigation (12031) → Mitigated (91)→Mitigated (12033) → **Close (41) [S]**→Done
- Done ⚠D → global Blocked only; **reopening a Done risk requires routing through Blocked**
- Blocked → Back to Open (51); Re-Assess (61); Back to In Mitigation (71); Back to Mitigated (81); **Close (41) [S]**

**9. UAT Story workflow — PV 12496, UV 12500** (identical ids).
- Globals: **Closed (21) — NO screen** (resolution NULL), Blocked (31)
- In UAT (10121) ⚠D → Re-Open (41)→Open — **In UAT is the ACTIVE testing state despite done category**
- Closed → Re-Open (41)→Open; Back to Testing (51)→In UAT

**10. Test Case family — Test Case 26, PV TC 12497, UV TC 12501** (three near-identical clones).
- Globals: **NA (131) [S]**→Not Applicable (10320) ⚠D; Blocked (161). PV TC only: global Ready for Retest (191)→12001.
- Open → Ready for UAT (171)→10120; Start Progress (11); [PV TC only: Done (201, no screen)→10021]
- In Progress → **Pass (21) [S]**→Pass (10006) ⚠D; Fail (31)→Fail (10007, in-progress cat); ReOpen (91)→Open
- Pass ⚠D → [TC 26] Fail (61); Automated (151)→Automated (10519) ⚠D; ReOpen (121) / [UV TC] Done (201, no screen)
- Fail → Back to In Progress (211); ReOpen (121); Retest (181)→Ready for Retest
- Blocked → ReOpen (121); Retest (181); Not Applicable ⚠D → Na To In Progress (141)
- PV TC Done ⚠D → globals only, but global Ready for Retest (191) reopens it

**11. Hotfix workflow — 13524/13525/13526.** Only 5 hotfix issues exist, all in Done — only Done probed.
- Globals: Blocked (491), Open (901), **Done (2) (1161) [S]** [absent from the Hotfix Bug sample — clone delta]
- Done ⚠D → Back to Staging (1111)→13125; Back to Prod (1121)→13126; Back to Dev (501)→In Dev
- **All sampled Done hotfixes have resolution NULL despite the screened transition.**

**12. Contractor Hours 13865.** Open → Close (11)→Closed — no screen, resolution NULL. **Closed → NO transitions (hard dead end).**

### "Done-category ≠ terminal" trap registry

| Workflow | Status (id) | Why it's a trap |
|---|---|---|
| Work-item family | PO Validated (12009) | mid-pipeline; → Ready to Deploy to QA / reopens; resolution NULL |
| Work-item family | Ready to Deploy To QA (11993) | mid-pipeline queue for QA deploy; resolution NULL |
| Work-item family | Deployed to QA (12010) | regression testing pending; → Back to Dev; resolution NULL |
| Work-item family | Regression Passed (12011) | still needs "Deployed"[S]→Done; resolution NULL |
| Work-item family | Regression Failed (12035) | **a FAILURE state in done clothing**; → back to Accepted/Grooming/Dev; resolution NULL |
| Work-item family | Done (10021) | terminal-ish but 8 reopen transitions incl. conditional Rolled Back |
| Epic | Epic Ready for Product Validation (11984) | validation pending; → Back to In Progress; resolution NULL |
| Initiative | Monitoring (11954) | KPI-watch phase after Delivered; not Closed; no screen |
| Task wf | Not Required (11958) | reopenable; resolution auto-set w/o screen |
| UAT Story wf | In UAT (10121) | the ACTIVE UAT state; → Re-Open; resolution NULL |
| Test Case family | Pass (10006) | → Fail / ReOpen / Automated / Done |
| Test Case family | Not Applicable (10320) | → Na To In Progress |
| Test Case family | Automated (10519) | unprobed (0 instances); assume reopenable |
| PV Test Case | Done (10021) | no screen on entry; resolution NULL; global Ready for Retest reopens |
| Hotfix wf | Done (10021) | → Back to Staging / Prod / Dev; resolution NULL in practice |
| Design Story | Done (10021) | not final — Closed (701) is; resolution behavior inconsistent |

### Resolution behavior

- **Set by a screen [S] on:** work-item Done (931) and Regression Passed→Deployed (4); Task-wf Close/Done/Override; Epic Closed (31); Initiative Close (131/501); Spike Closed/Done; Risk Close (41); Test-Case Pass (21) and NA (131); Hotfix Done (1161).
- **Verified populated** (sampled): work-item Done; Task/Sub-task/Clarification Closed; Not Required (auto); Epic Closed; Initiative Closed; Spike Closed; Risk Done; TC Pass & NA; Design Done.
- **Verified NULL:** UAT Story Closed & In UAT; Design Closed; Contractor Closed; PV TC Done; all Hotfix Done samples; all mid-pipeline ⚠D statuses.

### Coverage gaps (honestly unmapped)

Partially probed: Hotfix types (only Done occupied), UAT Stories (only In UAT/Closed occupied). Statuses with 0 live issues unprobed: Rolled Back, Hotfix Deployed to Staging/production, Automated, Sparring, Active Research, Initiative On Hold & Monitoring, Risk Open, Spike Grooming/Blocked. Samples drawn from ≤100 most-recently-updated issues per type.

## 6. Defect reporting (bug types in practice)

| Type | When to use | Linkage |
|------|-------------|---------|
| Story Bug `10400` | QA finds a defect **within an in-flight story** | `parent` = the story under test |
| Bug `1` | Defect in existing/shipped functionality — **including production hotfixes** | Link related issues; no parent required |
| PV / UV UAT Bug | Found during the respective UAT phase | Per UAT workstream conventions |

**The hotfix case** (production defect shipping outside the release train): use a regular **Bug + the hotfix fixVersion + label `hotfix`** — verified against real shipping practice (hotfix release 1.69-OCT28 contained a regular Story and a regular Bug; SRE deployment pages track the release). Prefer routing through `incident-hotfix-runner` for the full traced packet. For regressions: cite expected behavior from the regressed story's AC; link the regressed story (Problem/Incident: *is caused by*) and the detecting SSQ incident (*is a root cause fix for*).

**Resolution must be set when a bug closes** — all 5 historical hotfix items are Done with resolution unset, making time-to-resolve unmeasurable.

**Story Bug vs. AC conversation:** a Story Bug says "the implementation doesn't meet its AC yet." If the implementation *matches* the AC and the behavior still seems wrong, that's a PO conversation (the AC were wrong), not a Story Bug.

## 7. House epic content conventions — the brief lives in the epic

Hand-authored KDP epics carry brief-grade content in a stable structure, consistent across authors. **This is the pipeline's primary brief surface — skills write it, not just read it.** A Confluence page is the optional umbrella for multi-epic initiatives only.

**The canonical structure is `templates/epic.md`** (adopted 2026-07-14 from exemplar epics KDP-40759 and KDP-40761, at Jeremy's direction — template-first: fix the template, not the instance). In brief:

- **Background (`customfield_14757`)** — the de facto brief: Business Objective, Business Context (quantified evidence), Why Now, Problem, Outcome.
- **Description** — one-line delivery statement, In Scope / Out of Scope (exclusions say where the work went), Dependencies (per owning team, phased when sequencing matters), Success Criteria (DoD), Success Metrics (baseline → target), Architecture Triage (ARB? / STP? / architecture fit / limitations / new UI).
- **Requirements (`customfield_14762`)** — numbered requirement groups (`## 1.` … — the citation unit for findings and test plans; the older `{EPIC-KEY}-SR-NNN` item numbering is not used by the exemplars), tables for matrix-shaped content, Key Reference Documentation last.

Pre-template epics may still show the older shape (Epic Intent, Primary Users/Beneficiaries, Registration Context, Confidence, SR-NNN numbering) — read both; write only the template shape.

Adoption/reconstruction use: rebuild a brief from these fields and diff against the brief template — the diff is the finding list (typical gaps: metric targets, stakeholder/approver table, unresolved scope questions).

## 8. Sprint data: commitment baselines and known lies

Jira's sprint field shows *current* membership only; without a recorded baseline, committed-vs-delivered numbers are fabrications. Order of preference for "what did the team commit to?":

1. **A real commitment record** — sprint-planning-facilitator record mode output (Confluence commitment summary + sprint populated at the boundary). If it exists, use it and cite it.
2. **Reconstruction** (no record): declare it — every artifact says "baseline reconstructed" and *how*. Read each issue's **changelog** for sprint-field changes; committed = entered the sprint at or before its start timestamp. Added after start = scope addition (with date); removed = descope (with date). Committed points only from issues present *and pointed* at start.
3. **No changelog access:** created-date heuristics, labeled a **lower-confidence estimate** — never presented as a record.

Known pitfalls (observed live):

- **The sprint field lies:** KDP-40776 (created 2026-07-07) carries the *closed* S88 sprint despite never running in it. Field state is a claim; the changelog is the evidence.
- **Unpointed completions:** AP Blue S85–S88: 81% of completed items unpointed. Points-based committed/delivered is meaningless there — **flow metrics are the primary evidence** (item throughput by type, changelog cycle time, carryover rate, unplanned-work share); points are corroboration only where a team maintains them. Label points columns "not computable" rather than fabricating.
- **Zombie sprints:** `openSprints()` returns dead containers (one open since Nov 2023) — always scope by board + team per the team operating record.

The cure is the record: at the next sprint boundary, run sprint-planning-facilitator record mode; reconstruction demotes to history for that team.

## 9. Team operating record (per-team; lives on the team's Confluence working-agreement page)

Populated by a first-run interview with the SM; every sprint-scoped skill reads it before touching data and proposes updates (gated) when reality drifts. An unrecorded convention is how honest skills produce dishonest numbers.

| Section | Contents |
|---------|----------|
| Sprint scoping | Board id/name; Team field value; sprint name pattern; known zombie sprints to ignore |
| Issue-type conventions | e.g., "bugs don't get points" (team decision + date); AC-exempt types (e.g., Story Bug — repro serves as contract). Skills flag only *convention-violating* gaps |
| Team → repository registry | repo, platform (GitHub/AzDO), what it is. **Until populated, PR/CI-reading skills run Jira-only and MUST print: "Jira-only run: PR/CI signals unavailable — stall and review detection is partial."** |
| Ceremony artifact locations | Where commitment records, retro packs, and sprint reports live in Confluence |

**First-run posture** (every skill with a "compare to last time" step): when no prior artifact exists, say **"no prior record found — this run establishes the baseline"** and proceed. Never render an empty comparison as if history were blank rather than unrecorded.
