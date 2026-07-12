# KDP Jira Schema Reference

Derived from the live instance on 2026-07-11. Re-derive (issue type metadata + create-meta fields) if creates start failing validation — schemas drift.

## Instance

- Site: `kestra.atlassian.net` — cloudId `287e948f-75b9-420f-8cdb-818ef948b429`
- Project: **KDP** — "Kestra Digital Platform" (project id `17860`)

## Hierarchy (all levels linked via the native `parent` field)

| Level | Issue type | Type ID | Notes |
|-------|-----------|---------|-------|
| 2 | Initiative | `12406` | May also live in other projects (e.g., TR) — epics can parent cross-project |
| 1 | Epic | `10001` | `parent` → Initiative key |
| 0 | Story | `10000` | `parent` → Epic key. Legacy Epic Link (`customfield_11261`) mirrors parent automatically — never set it directly |
| 0 | Spike Story | `12486` | For research items out of design/refinement questions |
| −1 | Sub-task | `7` | Team creates these in refinement — the pipeline does not |

## Complete issue-type registry (all 24 KDP types)

The full vocabulary, with how the pipeline treats each. **Type selection is a decomposition decision** — forcing engineering work into Story form (or vice versa) is a defect.

### Work items (what the decomposer/writer may create)

| Type | ID | Level | Use for | Pipeline role |
|------|----|-------|---------|---------------|
| Story | `10000` | 0 | User-visible product functionality, vertical slices with behavioral AC | Default for product work |
| Tech Managed - Deployable | `12504` | 0 | Engineering-driven work requiring testing **and deployment** (framework upgrades, service changes, infra code) | Default for engineering-driven work that ships |
| Tech Managed - Non Deployable | `12517` | 0 | Engineering-driven work with **no deployment** (documentation, one-off scripts, repo config) | Engineering work that doesn't ship |
| Spike Story | `12486` | 0 | Research to settle a design/technical question; outcome is knowledge, timeboxed | Decomposer creates when AC can't be written yet |
| Task | `3` | 0 | Generic work | Avoid — prefer a specific type above |
| Sub-task | `7` | −1 | Team's task breakdown of a story in refinement | Team-created; pipeline never creates |

All level-0 work types still require AC (behavioral where user-visible; objective completion checks — build/scan/deploy verification — for Tech Managed).

### Defects (bug-report-writer's domain — see its `kdp-bug-types.md`)

| Type | ID | Level | Use for |
|------|----|-------|---------|
| Story Bug | `10400` | −1 | QA-found defect in an in-flight story (sub-task of it) |
| Bug | `1` | 0 | Defect in existing/shipped functionality |
| Hotfix Bug | `13526` | 0 | Defect being fixed through the hotfix process |
| Product Validation UAT Bug | `12498` | 0 | Found during Product Validation UAT |
| User Validation UAT Bug | `12499` | 0 | Found during User Validation UAT |

### Testing (tester skills may create with team agreement)

| Type | ID | Level | Use for |
|------|----|-------|---------|
| Test Case | `26` | 0 | Test cases tracked as Jira issues (NFP AS tech projects) |
| Product Validation Test Case | `12497` | 0 | PV UAT phase test cases |
| User Validation Test Case | `12501` | 0 | UV UAT phase test cases |
| Product Validation UAT Story | `12496` | 0 | UAT work items, PV phase |
| User Validation UAT Story | `12500` | 0 | UAT work items, UV phase |

`test-plan-generator` may persist an approved plan as Test Case issues (gated) when the team tracks tests in Jira rather than Confluence.

### Process types (pipeline reads, never creates)

| Type | ID | Level | Meaning |
|------|----|-------|---------|
| Design Story | `12485` | 0 | Design-team workflow (daily design meetings); functional requirements with target date |
| Clarification | `19` | 0 | A question to the project team |
| Risk | `12512` | 0 | Tracked risk |
| Hotfix Story | `13524` | 0 | Hotfix-process work item |
| Hotfix System Story | `13525` | 0 | Hotfix-process system work item |
| Contractor Hours | `13865` | 0 | Time tracking — never pipeline-touched |

## Required fields at create

| Issue type | Required beyond summary/project/issuetype | Field ID |
|-----------|-------------------------------------------|----------|
| Initiative | Business Unit | `customfield_14694` |
| Initiative | Strategic Program | `customfield_14696` |
| Epic | (none — summary and defaulted reporter only) | — |
| Story | (none — summary and defaulted reporter only) | — |

- **Business Unit** allowed values: `Arden`, `BWP`, `KF`, `KH`, `KIP`, `KIM`, `KPWS`
- **Strategic Program** allowed values include: `Kestra Digital Platform`, `Kestra Cybersecurity`, `Kestra Data & Analytics Strategy`, `Kestra Tech Strategy`, `Kestra Financial Intake`, `Kestra IM Strategy`, `Kestra Holdings Strategy`, `Asset Walk`, `Bluespring Strategy`, `Grove Point Strategy`, `Lead Gen`, `Other`
- Reporter is required but defaults to the creating user.

## Notable optional fields

| Field | ID | Applies to | Pipeline usage |
|-------|----|-----------|----------------|
| Acceptance Criteria | `customfield_14705` | Story | **Always populate** (rich text/ADF) — house style below |
| Epic Name | `customfield_11263` | Epic | Set to the epic's short name |
| Team | `customfield_14601` | Epic, Story | Set only if PO provides; else leave for refinement |
| Story Points | `customfield_11268` | Story | Never set — team estimates in refinement |
| Sprint | `customfield_11260` | Story | Never set — team pulls in planning |
| Priority | `priority` | Epic, Story | Values `1-Critical`…`5-None Selected`; defaults `3-Medium` |
| Components | `components` | All | Large managed list (e.g., "Wealth Management", "Core Platform") — set only if PO picks one |
| Background | `customfield_14757` | Epic | Optional context paragraph from the brief |
| Requirements | `customfield_14762` | Epic | Optional; prefer stories carrying the detail |
| Labels | `labels` | All | Always add `ai-sdlc-generated` |
| Release Notes | `customfield_14745` | Story | Not on the create screen (edit/view only). Left empty at create; populated later by `release-notes-generator` |
| Targeted Release | `customfield_14738` | Initiative | Options are stale (2022–2023) — do not set |

## House acceptance-criteria style (observed in real KDP stories)

AC lives in the Acceptance Criteria field (not description), formatted as repeated blocks separated by a horizontal rule:

> **AC#1: Work Item Type appears in the DAO Work Item Creation Screen**
> **Given** a user is on the DAO Work Item Creation Screen
> **When** the user opens the "Work Item Type" dropdown
> **Then** "Account and Client Edit" appears as a selectable option
>
> ---
>
> **AC#2: …**

- `AC#N: <title>` bold, then bold **Given/When/And/Then** keywords with plain-text conditions, hard line breaks between lines.
- NFR/structured requirement blocks (data contracts, audit logging, observability, security) go in the story description under a "Requirements (NFR)" heading, keeping the AC field behavioral.

## Issue link types (from the live instance, 2026-07-12)

28 types exist; the pipeline-relevant ones, with their exact directional phrases (get these right — `createIssueLink` cares):

| Type | Outward / inward | Pipeline usage |
|------|------------------|----------------|
| Blocks | `Blocks` / `Blocked By` | Dependencies between work items — decomposer/writer create them; impediment-radar watches them for rot |
| Problem/Incident | `causes` / `is caused by` | **The regression trace**: hotfix bug *is caused by* the regressed story (incident-hotfix-runner) |
| Root Cause Fix | `requires a root cause fix in` / `is a root cause fix for` | Fix item *is a root cause fix for* the SSQ incident (incident-hotfix-runner; observed in real use, KDP-32165) |
| Test | `tests` / `is tested by` | Persisted test-case issues *test* the stories they verify (test-plan-generator persist mode). A near-duplicate `Tests` type (`tested by`/`tests`) also exists — prefer `Test`, note the ambiguity |
| Defect | `created` / `created by` | Work item *created* a defect — QA-planning stories, UAT bugs back to their test case (observed: KDP-31813) |
| Work item split | `split to` / `split from` | Refinement splits — capture-summary decisions carried into Jira |
| Duplicate | `Duplicates` / `is duplicated by` | Duplicate closures name the survivor (hygiene auditor, bug-report-writer) |
| Escalate | `escalates` / `escalated-by` | Radar escalations that become tracked items |
| Post-Incident Reviews | `reviews` / `is reviewed by` | RCA artifacts to the incidents they review (future governance/RCA work) |
| Relates / Related | symmetric | Generic association — **two** near-identical types exist (`Relates` 11615, `Related` 10604); prefer `Relates`, expect both in old data |

Not used by the pipeline: Gantt/scheduling dependency types (FS/FF/SS/SF ×2 families), Polaris (Jira Product Discovery) types, `Child-Issue` (legacy hierarchy workaround — use the native `parent` field), `Deployment`, `Resolve`, `Action item`, `Discovery - Connected`.

## Workflows (empirical — mapped via the per-issue transitions API, 2026-07-12)

The library cannot read workflow *definitions* (admin API, not exposed); it maps workflows by sampling `getTransitionsForJiraIssue` per (issue type, status). Confirmed so far:

**Shared work-item workflow** — identical transition sets observed on Story, Story Bug, and Tech Managed - Deployable:

- **Global transitions (available from any status):** → Blocked · → Open · → **Done (`10021`) — the only transition with a resolution screen.** (Anything can jump to Done from anywhere; nothing structurally prevents closing over unfinished flow — relevant to the closure-integrity checks.)
- Open → Grooming ("Groom") or → Accepted ("Skip Grooming")
- In Test in DEV → In Product Owner Validation ("Testing In Dev Complete") or → In Dev ("Back to Dev")
- PO Validated → Ready to Deploy To QA (conditional) or → Done
- Deployed to QA → In Dev ("Back to Dev") or → Done

**Tech Managed - Non Deployable** runs a *different, simpler* workflow: global → Not Required (done-category, no screen) · → Blocked · → Open; its "Done" transition lands on **Closed (`6`)** with **no resolution screen**.

**⚠ The trap: `statusCategory = Done` does NOT mean terminal.** Confirmed non-terminal done-category statuses: `PO Validated` and `Ready to Deploy To QA` (deploy-pipeline waypoints), plus `Not Required` as a screen-less exit. **Rule for every skill: "delivered/terminal" means the resolution field is set (or status in Done/Closed/Not Required) — never statusCategory alone.** Discovered live: the adopter proposed setting resolution on a PO Validated item; the owner corrected it (proposed-write W4 withdrawn).

Not yet sampled: Epic/Initiative, Bug, UAT-type, and Spike workflows — extend the map the same way when a skill needs them.

**Other observed status vocabulary** (from the 2026-07 shakedowns): UAT test cases run to **Pass** (one-shot campaigns); Risk uses Assessing / In Mitigation / Blocked (seen only in the fossilized 2023 register); SSQ System Malfunction (other project) includes Impact Mitigation states, ~10 new/day, some automated. Known data quirks: sprint-field state can lie about which sprint an item ran in — reconstruct from changelog when it matters.

## House epic content conventions (observed 2026-07, consistent across authors)

Hand-authored KDP epics carry brief-grade content in a stable structure the pipeline should read, not treat as an anomaly:

- **Background (`customfield_14757`)** — the de facto brief: Epic Intent/Objective, Business Context (often with quantified evidence), Primary Users/Beneficiaries, Registration Context (BD/RIA), Why Now, Assumptions & Open Questions, Confidence.
- **Description** — In Scope / Out of Scope (with per-item reasons), Dependencies (per owning team), Success Measures/Criteria, sometimes trailing ARB questionnaire prompts.
- **Requirements (`customfield_14762`)** — cross-cutting constraints, system requirements (`{EPIC-KEY}-SR-NNN` numbering), compliance flags with rationale.

Pipeline use: `product-brief-builder` (and any adoption flow) **reconstructs a brief from these fields and diffs against the brief template** — the diff is the finding list (typical gaps: metric targets, stakeholder/approver table, unresolved scope questions). When the pipeline writes epics, it may populate these fields in the same structure; the house format is the contract.

## Confluence

- Same site (`kestra.atlassian.net`); the PO chooses space and parent page at runtime — never assume a location.
