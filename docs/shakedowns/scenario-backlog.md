# Tabletop Scenario Backlog

The persistent, cross-session tracker for stress-testing the skills library. Each scenario is a charter — *explore {work shape} with {real content} to discover {which assumptions break}*. Run via the `tabletop-shakedown` meta skill; statuses: **queued → running → report-ready → reviewed → actioned** (system proposals landed or explicitly declined).

## Active

| ID | Scenario | Hypothesis (to discover…) | Mode | Content | Status | Report |
|----|----------|---------------------------|------|---------|--------|--------|
| T1 | Engineering-driven, in-flight (.NET 10) | Adoption + engineering-work assumptions break | Live read-only | KDP-40426 + 46 children | **actioned** (registry/type-awareness landed; S1 adopter, S5 campaign mode still open) | [2026-07-11-net10-tabletop.md](2026-07-11-net10-tabletop.md) |
| T2 | Product-driven, in-flight | Even on home turf (product work, rich AC), adoption gaps and content drift appear; house-AC quality tests the DoR critic and test-plan generator for real | Live read-only | KDP-40761 (Client Name Change) + children | **report-ready** | [2026-07-11-t2-product-inflight.md](2026-07-11-t2-product-inflight.md) |
| T3 | Historical replay | Pipeline artifacts would have prevented specific observed failures in a completed effort — find which, and which not | Replay | Bulk Upload 2.0 family (KDP-38143 initiative and descendants) | **actioned** (2026-07-12: S1, S2, S4, S5, S6 landed; S3 landed in lite form folded into bug-report-writer's duplicate search) | [2026-07-11-t3-bulkupload-replay.md](2026-07-11-t3-bulkupload-replay.md) |
| T9 | Cancelled/pivoted epic | No skill handles scope death: what should happen to briefs, children, registry entries, and catalog links when an epic is killed mid-flight (T3 hit this four times) | Live read-only | The four Duplicate-closed Bulk Upload epics + any recently cancelled epic | queued | — |
| T4 | SM ceremony sweep | The 8 SM skills' data needs (velocity, commitment record, flags, activity signals) are unavailable or dirty in the real instance | Live read-only | AP Blue's active sprint + board | **report-ready** | [2026-07-11-t4-sm-ceremony-sweep.md](2026-07-11-t4-sm-ceremony-sweep.md) |
| T5 | Incident/hotfix + UAT flows | The pipeline has no incident entrance; hotfix and UAT issue types bypass DoR/test skills entirely | Live read-only + synthetic | Real Hotfix/UAT-type usage in KDP + synthetic mid-sprint incident | **report-ready** | [2026-07-11-t5-hotfix-uat.md](2026-07-11-t5-hotfix-uat.md) |

## Candidates (not yet scheduled)

| ID | Scenario | Hypothesis | Blocked on |
|----|----------|------------|-----------|
| T6 | Developer role with repo access | Implementation-planner/code-review-critic/pr-hygiene assumptions vs. a real repo and PR | Read access to one `ap-*` repo + a real PR |
| T7 | Cross-project initiative | Traceability and writer assumptions break when epics parent to another project's initiative (TR-8 pattern) | — |
| T8 | Design-driven work | Design Story workflow (design team) enters the pipeline nowhere; discover the correct seam | — |
| T10 | Bug lifecycle end-to-end | bug-report-writer → triage → dev skills → release notes on a real bug's history | — |
| T12 | Governance-artifact tracker | Nothing tracks governance artifacts (ARB reviews, design docs) to completion — T3's perma-"Proposed/Pending" ARB shipped anyway; candidate new skill or SM-skill extension | Decide owner: new skill vs impediment-radar/hygiene-auditor extension |
| T11 | Greenfield live-fire (not a tabletop) | The PO pipeline end-to-end on a real new small initiative, writes enabled | A real initiative + PO time |

## Standing rules

- One scenario per tabletop; split multi-hypothesis scenarios into rows.
- Fan-out is allowed (parallel agents), but **review is individual** — one report per review conversation, statuses updated as each is reviewed.
- System proposals from reports don't land automatically: each is approved/declined at review, then tracked to **actioned**.
