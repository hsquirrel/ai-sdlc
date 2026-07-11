# Tabletop Shakedown: .NET 10 Upgrade Epic (KDP-40426)

**Date:** 2026-07-11 | **Method:** each pipeline skill walked on paper against the live epic; nothing written to Jira/Confluence | **Run log:** `.ai-sdlc/runs/2026-07-11-tabletop-net10-epic.md`

**Why this epic:** it stresses the two cases gated AI-SDLC systems handle worst — work that is **already in flight** (46 children, 13 past "Open") and work that is **engineering-driven** rather than product-driven.

## Headline

The system's *checks* mostly work on this epic — they surface real, actionable problems. The system's *entry path* does not: there is no way to adopt in-flight work into the pipeline, three skills carry product-work assumptions that misfire on platform work, and nothing handles a 46-item campaign of near-identical children gracefully. The epic's own content is notably strong for a hand-built engineering epic (explicit scope/out-of-scope with reasons, measurable success criteria, compliance flags) — its defects are exactly the consistency defects our templates exist to prevent.

---

## Part 1 — What the skills uncovered in the Jira/Confluence content

Each finding names the skill that surfaced it. These are real defects in the live content, fixable today.

### Blocking-grade

1. **30 of 46 children have no acceptance criteria** — including work already moving: KDP-40587 is *In Test in DEV* with an empty AC field (testing against what?), KDP-40622 is In Progress, and KDP-40592/40593/40628 were *Closed* without AC ever existing. *(definition-of-ready-critic, item 4; test-plan-generator would refuse to derive cases.)*
2. **The blocked item is invisible to blocked-work tooling.** KDP-40596 (Cover Page Listener) has status Blocked, but the Flagged field is unset and the blocker — urgent repo-access request RA-15195 — exists only as a comment, not an issue link. Any flag- or link-based query misses it. *(impediment-radar; it would catch this only via the status signal — validating why the radar scans multiple signals.)*
3. **The epic's cross-team dependency lives in one comment.** "Q3 dependency on AP Red and platform team" (2026-06-22) — no issue links, no owner, no due date, on an epic due 2026-09-30. *(DoR critic item 10; impediment-radar dependency-rot check has nothing to watch because nothing is linked.)*
4. **Schedule risk is unmanaged in the data.** Due 2026-09-30; 33 of 46 children (~72%) still Open, 36 unassigned — including two *In Test in DEV* items with no assignee (KDP-40609, KDP-40611: who is testing?). *(sprint-report-generator / standup-digest would surface this within a day of adoption.)*

### Significant

5. **The epic contradicts its own success measure.** "100% of target modern .NET projects successfully deployed to Production" — but 12 children are *Tech Managed - Non Deployable* by type, and KDP-40594 is resolved "Not Required." The measure needs restating (e.g., "every in-scope repo upgraded-and-deployed, or archived/exempted with a recorded reason"). *(DoR critic item 12, contradiction scan.)*
6. **Scope drift between epic and children.** XmlHubErrors is "Not Required" at the child level, but the epic's In-Scope list still includes it. The description's scope list and child reality have no sync mechanism. *(backlog-hygiene-auditor — though see system proposal S5.)*
7. **The epic itself has an empty AC field** — while KDP's own Epic issue-type definition says "Each epic includes acceptance criteria." The success measures in the description are AC in spirit; they're just not where the team's tooling expects them. *(DoR critic.)*
8. **The epic is an orphan** — no parent Initiative, no stated reason, despite Initiative existing in the hierarchy and the epic aligning with a stated policy ("follow Microsoft LTS cycles") that smells like an initiative. *(DoR critic item 9 / hygiene auditor orphan check.)*
9. **Existing AC are off-style and partially untestable.** The 16 children with AC use `Scenario:` Gherkin (not the house `AC#N:` format — fine in substance), but include criteria like "the service successfully provides intended functionality" (which functionality? the tester must invent it — fails the readiness contract) and "the build should fail or warn (per local policy)" (which? the policy is unnamed). *(DoR critic item 5; test-plan-generator.)*
10. **Confluence artifacts exist but are unlinked.** ".NET 10 Upgrades: Notes" (Copilot Modernization Agent guidance citing SR-001..005) and "API Testing Documentation" (self-declared test plan for this epic) both live in NDTW — neither is linked from KDP-40426 or its children. Institutional knowledge exists; traceability doesn't. *(Every skill that reads "linked context" would miss these.)*
11. **Identical assumptions stamped across 46 repos are unverified per repo.** "Assumed: No breaking changes in .NET 10 APIs are currently used by this repository" is a per-repo empirical question wearing an assumption costume — on some of 46 repos it is simply false, and the first failed upgrade will be the discovery mechanism. The Okta/NewRelic third-party assumption is likewise an epic-level open question with no owner or check date. *(DoR critic item 8; implementation-planner would convert these to verification steps per repo.)*
12. **Parity verification is asserted but undefined.** The Supervision compliance flag requires "business logic execution verified for parity on the new runtime," but no child defines what parity means concretely for its service, and the Confluence test plan tracks coverage rather than defining parity checks. *(test-plan-generator would emit this as its top PO/engineering finding.)*

### What the content gets right (worth saying)

- Scope/out-of-scope lists with per-item exclusion reasons ("personal tool - developer no longer here", "replaced by Bulk Upload 2.0") — better than most product epics.
- Measurable success criteria, compliance flags with rationale, explicit rollback stance, stated confidence — the epic already resembles our own template conventions. The gap isn't rigor, it's *consistency and placement* (right fields, linked docs, per-child uniformity) — precisely what template-first generation provides.

---

## Part 2 — System improvements the exercise exposed

### S1. Missing skill: `pipeline-adopter` (in-flight intake) — **the big one**

The pipeline has one entrance (idea → brief) and this epic can't use it: work exists, is partially done, and predates the system. Today no skill can adopt it. Proposal: a PO/SM skill that, for an existing epic/initiative — gathers everything (children, statuses, comments, linked and *unlinked* Confluence docs), reconstructs a retroactive brief from existing content (KDP-40426's Background field is 80% of one already), runs the DoR critic in **adoption mode** (below), produces a gap report + reconciliation plan (backfill AC, link docs, flag blocked items, fix contradictions), and applies it behind the standard approval gate. This tabletop exercise is effectively that skill's first, manual run.

### S2. Decomposer's vertical-slice rule misfires on platform work

"An epic delivering 'the database layer' is wrong — re-slice around something a user can see" would wrongly reject this epic's per-repo decomposition, which is *correct*: each repo upgrade is independently deliverable, verifiable, and deployable. Fix the rule's altitude: slices must be **independently deliverable and verifiable units of value**; for feature work that means user-visible, for platform work the deployable unit. Also adopt this epic's good pattern: **epic-level shared requirements inherited by children** (the SR-001..005 block) — the decomposer should support a shared-AC/requirements block stamped per child plus per-child specifics, instead of assuming every story's AC are bespoke.

### S3. Engineering-driven framing in `product-brief-builder`

The skill's language (advisors, product outcomes) implies technical initiatives don't belong — yet this epic proves the brief format fits them perfectly (problem = unsupported runtimes/security exposure; beneficiaries = engineering, SRE, compliance; metrics = % repos on LTS, critical vulns). Add explicit support: technical-initiative examples, internal beneficiaries, risk/support/security-posture outcomes. Engineering-driven must not mean brief-exempt — that's how scope lists and success measures end up contradicting each other.

### S4. DoR critic: adoption mode + two new awarenesses

- **Adoption mode:** on in-flight work, distinguish "fix before further work" (missing AC on untouched items) from "note for the record" (Closed items without AC — unfixable history, but a lesson). Blocking a done item is theater.
- **Status-ahead-of-readiness check:** a new explicit finding type — *In Test/In Progress/Closed with no AC* is the most damning in-flight signal and today falls between checklist items.
- **AC format tolerance:** accept substantively sound AC in non-house formats (`Scenario:` Gherkin); flag style as a suggestion, not a failure. Substance blocks; style advises.
- **Type awareness:** the checklist says "story"; KDP reality includes Tech Managed - Deployable/Non Deployable at story level. The critic (and the kdp-schema reference) should name these explicitly.

### S5. Campaign mode for repetitive children

46 near-identical items break per-item ergonomics: the packager would build 46 packets by hand; the writer can't backfill; approvals become 46 conversations. Proposal: batch operations pattern — one approved **campaign template** (packet/AC block) + a per-item variables table + a single gated batch apply with per-item exception list. Applies to: copilot-handoff-packager (the team is *already* running the Copilot Modernization Agent per repo — with a prompt, not a packet), jira-confluence-writer (gated backfill/update on existing issues — today it's create-only by design; adoption needs a narrowly-scoped, field-whitelisted update mode), and the DoR critic (batch report exists ✓).

### S6. Hygiene auditor: scope-reconciliation check

New check: for epics with scope lists in their description, diff the list against child reality (XmlHubErrors case). Epic-description-as-scope-registry is a common hand-built pattern; the auditor should treat divergence as a standard finding.

### S7. Doc-linkage sweep

Skills link what *they* create, but adopted work has orphaned institutional docs (the Notes and Testing pages). The adopter (S1) — and arguably the hygiene auditor — should search Confluence for topically-related unlinked pages and propose remote links. Cheap, high-value, and this epic proves the failure mode is real.

---

## Verdict on the two hard cases

- **In-flight:** the checks transfer well (every Part 1 finding is real); the *entrances* don't. S1 + S4 + S5 are the gap. Until then the honest answer to "can the pipeline handle in-flight work?" is: it can audit it, not yet adopt it.
- **Engineering-driven:** better than expected. The epic fits the brief/decompose/AC model with only altitude adjustments (S2, S3) — no new pipeline shape needed. The failure mode isn't that engineering work can't be rigorous; it's that hand-rolled rigor drifts (30 missing AC next to 16 present ones is the proof), which is the exact defect template-first generation eliminates.
