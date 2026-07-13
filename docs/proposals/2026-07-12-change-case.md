# The Case for Change: Our Jira, Our Confluence, and How We Work

**Prepared:** 2026-07-12 | **Audience:** the delivery teams and whoever administers kestra.atlassian.net | **Author's note:** every claim below was found empirically by walking our own live Jira and Confluence data — issue by issue, changelog by changelog — while building AI tooling against it. Nothing here is theory, and nothing here is about any person. These are **system defects**: the system taught all of us to work this way, and the system is what we propose to change.

---

## Why now

We spent two days building AI assistants against our real backlog, and the single biggest discovery wasn't about AI at all: **our tools lie to us, and we've all learned to work around it.** Jira says "Done" about work that isn't done. The sprint field says items ran in sprints they never ran in. A quarter of our issue types are dead. Our requirements live where the people doing the work never look.

Every one of those lies costs us — in wrong reports, in re-litigated status, in software shipped past gates that were never actually checked. And almost every one of them is fixable in **an afternoon of Jira administration** plus a handful of lightweight working agreements. This document is the itemized case.

## What the data says (all of it verifiable, none of it about people)

| # | Finding | Evidence |
|---|---------|----------|
| 1 | **"Done" doesn't mean done.** Five of our done-*category* statuses are mid-pipeline waypoints — including **Regression Failed**, a failure state that counts as "Done" in every dashboard | Empirical workflow map, 24 issue types, ~60 sampled transitions ([reference](../../references/kdp-instance.md) §5) |
| 2 | **Resolution can't be trusted either.** Several true terminal transitions never set it; one reopenable status auto-sets it | 29 resolved issues cross-checked; all 5 historical hotfix items are Done with resolution unset — time-to-resolve is unmeasurable |
| 3 | A work item sat in "PO Validated" — one transition from real completion — for **10 months** | KDP-38354 changelog |
| 4 | **Three epics were closed "Complete" with open children still under them** | KDP-38179, KDP-38089, KDP-39790 |
| 5 | **27 of 46 open children** in a flagship epic (.NET 10 upgrade) have **no acceptance criteria** — several of them already in test. Testing without AC means the test contract lives in someone's head | KDP-40426 child sweep, 2026-07-12 |
| 6 | **81% of recently completed items carry no story points** (AP Blue, S85–S88) — every points-based velocity or commitment number we produce is arithmetic on missing data | Sprint history sweep |
| 7 | **No commitment record has ever existed** for the sprints we examined; the sprint field itself lies (an item created 2026-07-07 "belongs" to a sprint that closed before it existed) | KDP-40776 changelog vs. field state |
| 8 | A sprint container has been open since **November 2023**; the Flagged field carries 50+ relic flags nobody will ever clear | Board sweep |
| 9 | **~10 of our 24 issue types are dead or dormant**: 3 Hotfix types (5 issues ever, 0 since Nov 2024), Clarification (14 ever), a Risk register bulk-created in March 2023 and untouched since, a UAT family where exactly 2 issues ever had AC | Type registry sweep |
| 10 | **37% of bugs closed in one area closed as non-fixes** (Not An Issue / Cannot Reproduce / Duplicate / Declined) — a third of bug-handling effort spent disproving reports | T3 replay analysis |
| 11 | An architecture review (ARB) sat "Proposed/Pending" for **nine months while the system it reviewed shipped to production**; the epic's top dependency existed only in a comment | T2/T3 shakedowns |
| 12 | Requirements pages live in Confluence, **unlinked from the Jira epics they govern** — while every team keeps its real brief content in the epic's Background field | T1–T3 shakedowns; house-convention analysis |

One near-miss makes the cost concrete: an AI assistant, following Jira's own semantics (`statusCategory=Done`), proposed marking a mid-flow item resolved. **A human caught it at the approval gate.** Every dashboard, report, and future tool reading this instance makes that same mistake silently, every day, with no gate.

---

## Part 1 — Five Jira/Confluence changes (one admin afternoon)

Each change below deletes a *recurring* cost forever. None adds a field, a ceremony, or a step to anyone's day.

### R1. Move the waypoint statuses out of the "Done" category
**Change:** recategorize PO Validated, Ready to Deploy To QA, Deployed to QA, Regression Passed, and Regression Failed to the In Progress category.
**Why:** these are mid-pipeline states (finding 1). Today, Jira's native reports, every dashboard, and every future tool count them as delivered — including a *failure* state.
**Buys:** truthful burndowns and cumulative-flow reports, for free, forever. This is the single highest-leverage change on this list.

### R2. Make terminal transitions set the resolution
**Change:** add a resolution screen or post-function to every transition that ends a workflow (several today set nothing — finding 2).
**Buys:** "resolved" becomes a fact; time-to-resolve becomes measurable; findings 2 and 3 become visible the day they happen instead of ten months later.

### R3. Retire the dead issue types and duplicate link types
**Change:** retire the 3 Hotfix types, Clarification, and the UAT quartet (real hotfixes already ship as Bug + fixVersion; UAT work fits Story/Bug + a `uat` label + the campaign-epic pattern the org already invented). Decide the Risk register's fate: revive it or close it. Remove the duplicate `Tests`/`Test` and `Related`/`Relates` link types. ~24 types → ~10–12.
**Buys:** every "which type do I use?" conversation ends; dead types stop hiding real work; new-hire onboarding gets simpler. Nothing in active use is touched.

### R4. One-time data hygiene
**Change:** close the zombie sprint containers, bulk-clear the relic flags, purge dead team-field values ("DO NOT USE", departed staff).
**Buys:** the Flagged field becomes usable as an actual blocked-signal for the first time; sprint queries stop returning 2023.

### R5. Clean the stale pick-lists
**Change:** remove/refresh Targeted Release options frozen since 2023.
**Buys:** one less field everyone has silently agreed to ignore.

---

## Part 2 — Six working agreements (the human side)

These aren't new ceremonies. Each is a **small habit at a moment that already exists**, and each targets a failure the data shows we actually have. Most codify something some of us already do.

### H1. No work starts without acceptance criteria — and a bounce is normal
27 of 46 items in one epic have no AC; some are in test *right now* (finding 5). The agreement: **an item enters a sprint with AC, or it doesn't enter** — and a lightweight readiness check (the DoR checklist) runs before refinement, so gaps are found when they cost minutes, not mid-test. Hotfixes get a 4-item express version (repro, expected behavior, rollback, regression check) — a rule that gets skipped under pressure protects nobody, so the pressure path is designed in.

### H2. Acceptance is evidence, and it happens this week
An item waited in PO Validated for 10 months (finding 3). The agreement: **stories at "In Product Owner Validation" get validated (or bounced) within the sprint** — supported by a per-AC evidence table (which AC, what shows it's met) so accepting takes minutes and bouncing is factual, not personal.

### H3. Record the commitment at planning — two minutes, ends the archaeology
No commitment record has ever existed (finding 7), so "did we deliver what we committed?" is currently answered by changelog forensics or not at all. The agreement: **at the end of each planning session, the goal and committed scope get written down** (one Confluence stub — the tooling drafts it; the SM approves it). From that day, committed-vs-delivered is a fact.

### H4. Stop pretending about points; measure flow
81% of completed items are unpointed (finding 6) — that's not a discipline failure to fix, it's a decision already made. The agreement: **flow metrics (throughput by type, cycle time, carryover, unplanned-work share) become the primary evidence** for planning and reporting; points are optional corroboration for teams that maintain them. Nobody backfills estimates. The honest number beats the traditional one.

### H5. Epics close with a checklist, dependencies close the loop
Three epics closed with open children (finding 4); a governance review pended for nine months while the system shipped (finding 11). The agreement: **closing an epic takes a five-minute closeout check** (children resolved or re-homed, linked bugs dispositioned, delivery note written), and **cross-team dependencies and governance gates exist as linked Jira items** — a dependency that lives in a comment can't be watched by anyone.

### H6. The brief lives in the epic
Teams already keep brief-grade content in the epic's Background/Description/Requirements fields — consistently, across authors (finding 12). Meanwhile requirements pages sit in Confluence, unlinked and unread. The agreement: **codify the existing convention** — the epic's fields are the brief's home; Confluence pages are for multi-epic umbrellas, and anything kept there gets linked from the epic. This one is free: it's what most of us already do, made official.

---

## What we are NOT asking for

- **No new ceremonies.** Every agreement above lands inside a meeting or moment that already exists.
- **No estimation mandate.** H4 is the opposite — it stops asking for numbers we don't produce.
- **No tool purchases, no migration.** R1–R5 are configuration changes in the Jira we have.
- **No retroactive homework.** Closed items stay closed; history is history, not a backfill queue.
- **No AI dependency.** Every change above stands on its own; the AI tooling just found the evidence and will happily draft the checklists and records — behind human approval, as always.

## The ask, and how we'll know it's working

1. **Jira admin:** one working session to land R1+R2 (the truth-restoring pair), then R3–R5 as a follow-up. We have the complete empirical workflow map ready as the specification.
2. **Teams:** try H1–H6 as working agreements for two sprints, starting with the dry runs and tabletops scheduled in the coming days. Tune thresholds in the retro, keep what earns its place.
3. **Measurement:** four numbers, published each sprint from data we already have — % of sprint-entering items with AC, bug non-fix closure rate, cycle time through the validation states, hotfix trace completeness. If they don't move within two quarters, this document was wrong and we'll say so.

*The complete evidence base (workflow maps, transition samples, sweep data) is in the ai-sdlc repository: `references/kdp-instance.md`, `docs/shakedowns/`, and `docs/reviews/2026-07-12-system-review.md`.*
