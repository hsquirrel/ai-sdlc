# Reconciliation Plan: KDP-40426 — Upgrade Actively Maintained .NET Projects to .NET 10

**Date:** 2026-07-12 | **Owner/approver:** Jeremy Harrell (epic reporter) | **Source gap list:** T1 shakedown + fresh sweep 2026-07-12
**Work state at adoption:** 46 children (33 Open, 5 In Test in DEV, 3 Closed, 1 In Progress, 1 In Dev, 1 Blocked, 1 Not Required, 1 PO Validated); 16 with AC, 27 open without; brief reconstructed from Background/Description/Requirements

## Brief-Gap Summary (reconstruct-and-diff)

| Brief section | State | Gap |
|---------------|-------|-----|
| Problem / evidence / why-now | Present (Background: LTS policy, security, tech debt) | — |
| Users/beneficiaries | Present (Engineering, SRE, Compliance) | — |
| Success metrics | Present but self-contradicting | "100% deployed to Production" vs 12 Non-Deployable children + 1 Not Required → Tier 2.1 |
| Scope In/Out | Present, rich | XmlHubErrors drift; one cut-off bullet → Tier 2.4 |
| Open questions | Present as prose assumptions | No owners/dates; not tracked → Tier 2.3 |
| Stakeholders/approvals | Absent | Owner may add or skip (engineering-driven) |

## Tier 1 — Metadata (mechanical; bulk-approvable)

| # | Item | Current state | Exact write | Decision |
|---|------|---------------|-------------|----------|
| 1.1 | KDP-40426 parent | Orphan; TR-8 "Advisor Platform Modernization" (In Progress) is the evident candidate | Set parent = TR-8 (owner confirms target) | pending |
| 1.2 | KDP-40596 (Cover Page Listener) | Blocked; blocker RA-15195 in a comment only; Flagged unset; no link | Set Flagged; link "is blocked by" → RA-15195; comment: "Flagged: blocked on repo access RA-15195 (requested 2026-07-10). Adopted into pipeline tracking 2026-07-12." | pending |
| 1.3 | Epic ↔ Confluence | ".NET 10 Upgrades: Notes" (NDTW 9932603417) and "API Testing Documentation" (NDTW 9916121089) unlinked | Add both as remote links on KDP-40426 | pending |
| 1.4 | KDP-40497 (AC BI Bridge) | PO Validated (done category), resolution unset | Set resolution = Complete (owner confirms this status is terminal for this item) | pending |
| 1.5 | Labels | None anywhere in the family | Label KDP-40426 + every item this plan touches `ai-sdlc-adopted` | pending |
| 1.6 | Record-notes on closed-without-AC | KDP-40592, KDP-40593, KDP-40628 closed, AC never existed | One comment each: "Record note (pipeline adoption 2026-07-12): closed without AC; completion accepted as historical — see epic registry." No content edits. | pending |

**Owner action (no write by this skill):** KDP-40609 and KDP-40611 are In Test in DEV with no assignee — assignment belongs to the team; flagging for your standup, not for an edit.

## Tier 2 — Content (owner wordsmiths before approving)

| # | Item | Current text | Proposed text | Decision |
|---|------|--------------|---------------|----------|
| 2.1 | Success measure #1 | "100% of target modern .NET projects successfully deployed to Production on .NET 10." | "100% of in-scope repos upgraded to .NET 10 and, for deployable services, deployed to Production — or explicitly exempted with a recorded reason (e.g., Not Required). Tracked as: all child items resolved, with resolution set." | pending |
| 2.2 | Epic AC field | Empty (KDP's Epic definition requires AC) | Objective completion AC: (1) every child resolved with resolution set; (2) zero critical Checkmarx findings across upgraded repos; (3) `Directory.Packages.props` + `Directory.Build.props` present in all target repos; (4) all target solution files migrated to `*.slnx`; (5) exemptions recorded with reasons. | pending |
| 2.3 | Open questions | Prose assumptions in Background; Q3 dependency in one comment | Append an Open Questions table to the description: (a) Okta/NewRelic .NET 10 compatibility — owner: {?}, check by: {date}; (b) AP Red + platform-team Q3 dependency — which issues? owner? due?; (c) parity verification per Supervision flag — what does parity mean per service (ref: API Testing Documentation page)? | pending |
| 2.4 | Scope list | In-Scope still lists XmlHubErrors (child KDP-40594 = Not Required); one bullet cut off: "Migration from Legacy - All " | Annotate XmlHubErrors "(Not Required — KDP-40594)"; owner supplies the cut-off bullet's ending or deletes it | pending |

## Tier 3 — Campaigns (batch, separately gated)

| # | Campaign | Scope | Shared template | Proposed batching |
|---|----------|-------|-----------------|-------------------|
| 3.1 | AC backfill | 27 open children without AC | The 4-scenario pattern from the 16 populated siblings (build/CI passes on .NET 10 SDK; Checkmarx zero-critical; deployment verification [deployable variant] or execution verification [non-deployable]; `*.slnx` enforcement) — parameterized per repo | **Batch A (priority): the 5 in-flight** (KDP-40587 in test, KDP-40622 in progress, KDP-40609/40611 in test, KDP-40596 blocked) — testing without a contract is the worst gap. **Batches B/C:** the remaining 22, 11 each. Each batch drafted → gated → written. |

## Registry Seeding

- Create the living registry for this epic (created-keys map = current 46 children; moved-scope ledger opened; mid-flight additions active) — location: owner's choice, Confluence (NDTW, beside ".NET 10 Upgrades: Notes") or this repo.

## Declined at Review

| Item | Reason recorded |
|------|-----------------|

## Applied *(filled during execution)*

| Item | Result key/link | When |
|------|-----------------|------|
