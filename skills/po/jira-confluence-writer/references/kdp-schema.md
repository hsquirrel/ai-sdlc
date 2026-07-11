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

Other types exist (Bug `1`, Story Bug `10400`, Design Story `12485`, UAT types, Hotfix types) — not used by the PO pipeline.

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

## Confluence

- Same site (`kestra.atlassian.net`); the PO chooses space and parent page at runtime — never assume a location.
