# AI-SDLC System Review — Synthesis & Reconciliation

**Date:** 2026-07-12 | **Prepared for:** Jeremy Harrell | **Status:** for review — nothing below has been applied

Two independent review agents examined the full skill library (all 26 skills, docs, templates, references, shakedown reports, and instance-intelligence files):

- **Review A — Agile best practice** for internal corporate software (surfaced to employees *and* clients). Raw report: [2026-07-12-agile-practice-review-raw.md](2026-07-12-agile-practice-review-raw.md)
- **Review B — Bloat & simplification**, premise "complexity is the enemy." Raw report: [2026-07-12-simplification-review-raw.md](2026-07-12-simplification-review-raw.md)

This document reconciles them: where they agree (high confidence — two independent lenses converged), where they conflict (with my resolution and reasoning), a unified skill-disposition table, and a sequenced action plan. Decision points that are genuinely yours are marked **⚖ DECISION**.

---

## Executive summary

1. **Both reviews independently reached the same #1 recommendation: fix Jira instead of modeling it.** The trap registry, delivered-detection rules, commitment archaeology, and zombie-sprint ignore lists are permanent complexity standing in for roughly an afternoon of Jira admin work. The system is the only actor in the org holding the empirical evidence to argue for the fix. A one-page remediation proposal to the Jira admin is the highest-leverage deliverable available.
2. **The library should shrink from 26 skills to 11 active + 6 latent.** Review B quantified it (1 live run ever, ~55% of the repo is the system documenting itself, ~25% of skill text is copy-paste boilerplate); Review A's praise concentrated on the same core skills B kept. The cuts lose no validated capability — everything cut is either unproven, mergeable, or a paragraph wearing a skill costume.
3. **The one thing best practice says to *add*, add as checklists and modes — not skills.** Review A's strongest structural finding is that the gate map is front-loaded: entry (DoR) is superbly gated while story acceptance, epic closure, and release readiness are detect-after or absent — and every expensive failure recorded in the shakedowns happened at an exit. Reconciled with B's freeze: close the exit gaps inside kept skills (a DoD reference + acceptance mode on the DoR critic, a closeout mode on the hygiene auditor, a readiness checklist inside the deferred release skill).
4. **Move the brief into Jira.** The org keeps ~90% of a brief in the epic's Background field by consistent convention; Confluence-resident context demonstrably goes unread here (T3). The pipeline should write the house convention it already reads. Confluence demotes to an optional initiative-level umbrella.
5. **Make flow metrics the native language.** 81% of completed items are unpointed; the org has voted. Changelog-derived throughput/cycle-time becomes the primary evidence and points optional corroboration — this simplifies the skills *and* matches modern practice for internal delivery teams.
6. **Tier the approval gates by risk.** Uniform per-run gates were right for launch; a daily rubber-stamp is now a bigger threat to the safety model than an ungated write. Proposed: per-item / per-run / standing-approval tiers. This touches the product's core thesis, so it's flagged as your call.
7. **Redirect all remaining energy to live fire.** Finish the KDP-40426 gate, run T14 at the Jul 17 boundary, live-run the greenfield PO pipeline on a real initiative, and get `ap-*` repo access for the developer role. After T14, retire the tabletop program — validation happens by use. Adopt B's demand-signal rule: no new skill, mode, or rule without a named requester after a live run, and any addition names what it displaces.

---

## 1. Where the reviews agree (high confidence)

### 1.1 Fix Jira, don't model it — the flagship recommendation

Both reviews, from opposite lenses, landed on the same conclusion with the same evidence. Review B counted the cost (300+ lines and a dozen skill rules existing solely to accommodate fixable admin defects); Review A named the mechanism (the shakedowns *find* the mess but route findings to POs and SMs who cannot change schemes — there is no channel to whoever administers kestra.atlassian.net).

**The merged remediation proposal** (each item names the machinery it retires):

| # | Jira admin change | What it deletes from our system |
|---|-------------------|--------------------------------|
| R1 | Recategorize done-category waypoints (PO Validated, Ready to Deploy To QA, Deployed to QA, Regression Passed, **Regression Failed**) into the In Progress category | The 16-entry trap registry; the terminal-set rule replicated in 4 skills; W4-class errors for every future tool, not just ours |
| R2 | Add resolution post-functions/screens to every terminal transition | The "resolution legitimately NULL on true terminals" caveat; delivered-detection heuristics; makes `statusCategory=Done` and Jira's own reports truthful for the first time |
| R3 | Retire dead issue types: 3 Hotfix types, Clarification, the UAT quartet (replace with Story/Bug + `uat` label + the campaign-epic pattern the org already invented), review the fossilized Risk register; kill duplicate link types (Test/Tests, Relates/Related). ~24 types → ~10–12 | Type-selection logic in every skill; the "dead hotfix types" warnings woven through five skills; new-hire confusion |
| R4 | Close the zombie sprint containers (open since Nov 2023); purge dead team-field values; bulk-clear relic Flagged entries | Per-team zombie ignore lists; the "Flagged is a claim, not a fact" rule (the radar already re-seeds flags correctly — a clean field becomes usable) |
| R5 | Clean stale Targeted Release options (frozen since 2023) | One more field the skills must treat as unreliable |

The evidence package already exists: `kdp-workflows.md` and the shakedown reports *are* the argument. **⚖ DECISION:** who is the addressee (which Jira admin/team), and will you champion it? Until fixed, the accommodation machinery stays — but it should be reframed in the docs as a *migration bridge*, not permanent architecture.

### 1.2 Shrink the library; concentrate on the proven core

Review B's keep-list and Review A's praise converge on the same skills: the four-skill PO pipeline, pipeline-adopter (A: "one of the most mature brownfield-adoption designs I've seen"; B: "the only skill with a live run and real demand"), the DoR critic and its hotfix express contract (A: "the best gate design in the library"), test-plan-generator, bug-report-writer, sprint-planning-facilitator's record mode, and backlog-hygiene-auditor (B: "the best-evidenced demand in the repo"). Both flag the same redundancies: digest/radar/report share one detection engine; pr-hygiene duplicates code-review-critic; hotfix logic is smeared across five skills; charter generation is a section of the test-plan skill. Full disposition table in §3.

### 1.3 Deduplicate the boilerplate and the documentation

- ~25% of all SKILL.md text is a verbatim Run Log section (26 copies) plus a formulaic Pipeline-position section. Replace with one line pointing at `conventions.md`. Target SKILL.md shape: ~35 lines — description, inputs, workflow with its gate step, rules unique to the skill.
- Documentation drops from five places per skill to two: **SKILL.md (the truth) + skill-catalog.md (the index, absorbing a short overview from the user-guide README)**. Delete `docs/user-guide/` (~1,200 lines, 31 files, already drifted, currently overselling surfaces that don't exist) until there are ≥3 real users. Fix CLAUDE.md's stale "23 skills" and the dead `docs/handoffs/` pointer in the same commit. *(⚖ DECISION if you want to keep the user guide as a future adoption-pitch asset — my recommendation is delete and regenerate from SKILL.md when a real audience exists.)*
- Consolidate all instance intelligence into **one root `references/kdp-instance.md`** (schema + workflows/terminal table + bug types + sprint-data pitfalls + team operating record as a section). Both reviews called it the most valuable content in the repo, in the wrong shape — scattered across two skills' reference trees with cross-skill reach-ins that break the portability claim.
- Drop or make real the portability claim: skills reference root templates and cross-skill paths that won't exist on Copilot/Rovo. Don't pay the convention tax until a second surface is real.

### 1.4 Live fire beats more paper

Both reviews say the constraint is adoption, not capability. Sequenced: (1) finish KDP-40426; (2) T14 by ~Jul 17 (time-sensitive); (3) the greenfield PO pipeline's first *live* run on a real small initiative — the flagship value stream is still paper-only; (4) `ap-*` repo access to live-fire the developer role. After T14, retire the tabletop program; the demand-signal rule governs all future additions.

### 1.5 Brief lives in the epic, not Confluence

Review A made the case (the org's consistent Background/Description/Requirements convention; T3's proof that Confluence context goes unread from Jira); Review B independently noted the Background convention is "cheap to read and genuinely in use." `product-brief-builder` and `jira-confluence-writer` should *write* the house structure they already *read*; a Confluence page remains only as an optional umbrella for multi-epic initiatives. This also removes a whole reconcile-two-homes problem class.

---

## 2. Where the reviews conflict — and the reconciliation

### 2.1 "Add exit gates" vs. "cut everything unproven"

The genuine tension. A wants a Definition of Done + PO-validation assist, an epic-closeout gate, a release-readiness audit, a dependency/governance tracker, CI-health ownership, and a generalized test scaffolder. B wants a hard freeze at 9 skills.

**Reconciliation — A's diagnosis, B's delivery mechanism.** The exit-gate gap is real and evidenced (KDP-38354 sat in "PO Validated" for 10 months; epics closed Complete with open children were the costliest recorded failures; a permanently-pending ARB review shipped to production). But none of it needs a new skill:

| Gap | Where it lands (no new skills) |
|-----|-------------------------------|
| Definition of Done | New `references/definition-of-done.md` + an **acceptance mode** on the DoR critic: fetch AC + linked PR/test evidence, present a per-AC verification table for the PO to accept or bounce at the "In Product Owner Validation" state. Entry and exit critique are the same muscle. |
| Epic closeout | A **closeout mode** on backlog-hygiene-auditor invoking the existing `epic-closeout-checklist.md` *at the moment of closure* (minutes, blocking — the hotfix-express pattern) instead of weeks later on cadence |
| Release readiness | A go/no-go checklist folded into the deferred release skill (release-notes-generator becomes a single **release-runner** covering notes + readiness when the first real release activates it) |
| CI health | One line in the merged sprint-radar: "main is red" = act-now impediment. A full CI skill waits for the developer-role live fire |
| Dependency/governance tracker (T12) | Smallest version only: the hygiene auditor's existing dependency-rot and governance-ticket checks gain a per-initiative rollup table. A standalone tracker waits for the demand-signal rule — though note this is the org's top recorded failure mode, so it is first in line if anyone asks |
| Generalized test scaffolder (xUnit/Jest/API, not just Playwright) | Applied *when* the deferred scaffolder is activated by repo access — the stack's defect mass is below the UI, so generalize at activation rather than maintaining a UI-only skill now |

### 2.2 SM role: "8 are defensible" vs. "8 → 3"

Less conflict than it looks. A's defense is that the SM skills are *bookkeeping installers* (commitment records, operating baselines) — but A also found three of them share one detection engine, and B's merges preserve every output A valued. **Reconciliation: 8 → 4.** `sprint-planning-facilitator` (record mode is the keystone; T14 scheduled), **sprint-radar** (digest + impediment-radar; daily mode and escalation mode over one signal set), **sprint-close** (report + retro pack; the demo agenda survives as an optional template inside it), `backlog-hygiene-auditor`. The shared signal definitions live once (a section of the instance doc or a small `sprint-signals.md`), fixing A's three-copies maintenance problem by construction.

### 2.3 Run logs: "writes-only" vs. "the instrumentation source"

B says run logs for draft-only runs are theater; A wants to mine run logs for gate-health metrics (rubber-stamp rate, interview cost). **Reconciliation: run logs required only for runs that write externally; slim the template to context sources, the approval decision (with edit count), and writes-with-keys; drop the verbatim-Q&A mandate.** Gate-health metrics remain computable from exactly those decision lines. Accept losing draft-run telemetry until there's more than one user — the labels (`ai-sdlc-generated`/`ai-sdlc-adopted`) plus Jira history already carry the durable half of the audit.

### 2.4 Approval gates: uniform (current thesis) vs. risk-tiered

A wants three tiers — **per-item** (edits to existing human content, anything person-adjacent), **per-run** (new-artifact creation; current default), **standing approval** (recurring, read-only, template-pinned artifacts like the daily digest: approve format + destination once per sprint, auto-post daily, re-trigger the per-run gate on unusual signals). B independently flagged daily-gate fatigue. The reasoning is sound — a gate approved 10 times a sprint by reflex protects less than one approved with attention, and your own PO guide warns rubber-stamping "turns the safety model into theater."

**⚖ DECISION — this modifies the product's core thesis** (humans always in the loop). My recommendation: adopt the taxonomy, apply the standing tier *only* to the digest class of artifact, and record each skill's tier + rationale in `conventions.md`. But "every write gets a human" is your load-bearing sales pitch, and only you can decide whether "a human approved this artifact *class* this sprint" satisfies it.

### 2.5 Points vs. flow metrics

A says formally concede the story-points battle (invert the default: changelog-derived throughput, cycle time, carryover, unplanned-share as primary; points as corroboration where a team keeps them). B is silent but its whole posture — stop maintaining machinery for disciplines the org doesn't practice — points the same way. **Reconciliation: adopt A's inversion.** It deletes the "degraded mode" framing and several fallback branches, and it stops the skills from implying the org should backfill a pointing discipline it has voted against. The changelog plumbing is already built and trusted.

### 2.6 System scoreboard vs. meta-work aversion

A wants 4–5 outcome metrics; B wants less self-referential work. **Reconciliation: adopt a small scoreboard, computed by existing skills during runs they already do, published inside the sprint-close output — no new artifact system.** The four: (1) % of sprint-entering items with AC; (2) bug non-fix closure rate (T3's 37% is the baseline); (3) changelog cycle time through the validation states; (4) hotfix trace completeness. The labeled-cohort comparison (pipeline-born vs. hand-made items) comes free later. Without some version of this, "the system helps" rests on anecdote — and the first budget conversation will ask.

### 2.7 Loose ends both flagged differently

- **Hotfix smear:** consolidate all express-path logic into `incident-hotfix-runner` (deferred, activates on the first real incident); the other four skills lose their `if hotfix` branches. A praised the runner's design — deferral keeps it, consolidated and ready.
- **`dor-ready` label as unsatisfiable precondition:** adopt A's fix — when the label is absent, the invention test *is* the readiness check, recorded as such. Costs one sentence in the packager.
- **skill-author:** B cuts the skill; A wanted its audit to also check gate tiers. Reconciliation: keep `conventions.md` (slimmed, gaining the gate-tier taxonomy and the displacement rule) + `skill-template.md` as plain files; delete the audit-checklist bureaucracy and the interview wrapper. Revisit if a second maintainer appears.
- **Rule accretion:** B's inverse gate becomes a convention — any proposal that adds a rule/mode names what it displaces; shakedown citations (T3, T2-S5…) move to commit messages, out of SKILL.md prose.
- **Self-approval blind spot (A only):** the PO approves the critique of their own stories through four consecutive gates. Cheap sunlight fix: the readiness report posted to Jira names any PO-overruled findings, so the team sees them in refinement. No second approver, no ceremony.

---

## 3. Reconciled disposition — all 26 skills

| Skill | Review A signal | Review B verdict | **Reconciled** |
|-------|----------------|------------------|----------------|
| product-brief-builder | Retarget output to epic fields | Keep | **Keep** — rewrite step 5 to write Background/Description/Requirements; Confluence optional |
| backlog-decomposer | Positive (brief-lite praised) | Keep, slim rules | **Keep** — prune rule prose into checklists |
| jira-confluence-writer | Positive | Keep | **Keep** — owns the write bridge; schema knowledge moves to the shared instance doc |
| definition-of-ready-critic | Best gate design; add DoD symmetry | Keep | **Keep + grow acceptance mode** (per-AC verification at PO Validation) + `definition-of-done.md` reference |
| release-notes-generator | Missing release-readiness gate | Defer | **Defer as release-runner** — notes + readiness checklist in one skill, activated by the first real release |
| pipeline-adopter | "Most mature brownfield design" | Keep | **Keep** — finish KDP-40426 first |
| implementation-planner | Modern practice, mild | Cut (native plan modes) | **Cut** — one paragraph in conventions: "require an approved plan for non-trivial work; use the surface's native plan mode" |
| copilot-handoff-packager | Fix `dor-ready` precondition | Defer | **Defer** — activate at first real delegation; invention-test-in-lieu-of-label posture baked in |
| code-review-critic | Watch pr-hygiene overlap | Merge (absorb pr-hygiene) | **Merge + defer** — single PR skill (hygiene pass then review pass), latent until repo access |
| tech-design-drafter | — | Defer, keep template | **Defer** — `design-doc.md` template survives |
| pr-hygiene | — | Merge → critic | **Merged away** |
| incident-hotfix-runner | Standout design | Defer, consolidate smear | **Defer** — owns the whole express path; other skills lose hotfix branches |
| test-plan-generator | Genuinely shift-left | Keep, absorb charters | **Keep** — absorbs exploratory charters as an optional section |
| ac-playwright-scaffolder | Generalize beyond UI | Defer (blocked) | **Defer** — generalize to xUnit/Jest/API at activation |
| exploratory-charter-generator | — | Cut | **Cut** — folded into test-plan-generator |
| bug-report-writer | — | Keep | **Keep** — targets the proven 37% bug-noise problem |
| refinement-facilitator | Sunlight for DoR overrules | Cut | **Cut** — the overrule-sunlight line moves into the DoR report itself |
| sprint-planning-facilitator | Record mode = keystone | Keep | **Keep** — T14 runs it live ~Jul 17 |
| sprint-review-demo-facilitator | Slim verification step | Cut | **Cut** — demo agenda survives as an optional template in sprint-close |
| retro-facilitator | Shared engine | Merge | **Merged → sprint-close** |
| sprint-report-generator | Shared engine; flow metrics | Merge | **Merged → sprint-close** — carries the 4-metric scoreboard |
| daily-standup-digest | Standing-approval candidate | Merge | **Merged → sprint-radar** (daily mode) |
| impediment-radar | Add "main is red" signal | Merge | **Merged → sprint-radar** (escalation mode; CI signal added) |
| backlog-hygiene-auditor | Add closeout gate, debt check | Keep | **Keep + grow** — epic-closeout mode (at closure, blocking), debt/risk-register health check, dependency rollup |
| skill-author | Enforce gate tiers | Cut, keep files | **Cut as a skill** — conventions.md + skill-template.md remain as files |
| tabletop-shakedown | Live-fire T11/T6 instead | Retire after T14 | **Retire after T14** — future validation is live runs |

**Result: 11 active** (brief-builder, decomposer, writer, DoR-critic, adopter, test-plan-gen, bug-report-writer, planning-facilitator, hygiene-auditor, sprint-radar, sprint-close) **+ 6 latent/deferred** (release-runner, pr-review, handoff-packager, hotfix-runner, test-scaffolder, design-doc template), each with a named activation trigger. Nine skills disappear as standalone artifacts; none of their validated substance is lost.

---

## 4. Sequenced action plan

**Phase 0 — live fire (already queued; do first, unchanged by this review)**
1. Close the KDP-40426 adoption gate; apply approved writes; Batch A.
2. T14 at the S89→S90 boundary (~Jul 17) — time-sensitive.

**Phase 1 — the Jira remediation proposal (small effort, biggest leverage)**
3. Draft the one-page proposal (R1–R5, §1.1) from the existing evidence; you identify the addressee and deliver it. Everything in Phase 2 gets simpler if even R1+R2 land.

**Phase 2 — library restructure (one coherent change set)**
4. Execute the disposition table: merges, cuts, defers; consolidate hotfix logic into the runner.
5. Slim all SKILL.md boilerplate to a one-line conventions pointer; conventions.md gains the gate-tier taxonomy (pending your ⚖ call), the displacement rule, and the demand-signal rule.
6. Docs: two levels (SKILL.md + catalog); delete user-guide (pending ⚖); fix CLAUDE.md staleness; build the single `references/kdp-instance.md`.
7. Run-log regime: external-write runs only; slimmed template.

**Phase 3 — practice upgrades (content, not structure)**
8. Brief-into-epic retarget of brief-builder/writer.
9. DoD reference + DoR-critic acceptance mode; hygiene-auditor closeout mode.
10. Flow-metrics inversion + the 4-metric scoreboard in sprint-close.

**Standing rules from here on:** no new skill/mode/rule without a named requester after a live run; every addition names what it displaces; after T14, validation = live use.

## 5. Open decisions (yours)

| ⚖ | Question | My recommendation |
|---|----------|-------------------|
| 1 | Approve the 26 → 11+6 restructure (or amend the table)? | Approve as tabled |
| 2 | Gate tiering — allow standing approvals for recurring read-only artifacts? (Core-thesis question) | Adopt, narrowly: digest-class only, re-trigger on anomalies |
| 3 | Jira remediation — who's the addressee, and will you champion R1–R5? | Highest-leverage item in either report; even R1+R2 alone pay for themselves |
| 4 | Delete `docs/user-guide/` until ≥3 real users? | Delete; regenerate from SKILL.md when a real audience exists |
| 5 | Brief home: epic fields (recommended) vs. Confluence? | Epic fields; Confluence only as multi-epic umbrella |
