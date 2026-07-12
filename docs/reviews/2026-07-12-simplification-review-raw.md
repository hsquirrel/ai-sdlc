# Raw Report B — Bloat & Simplification Review (independent agent)

> Companion to [the synthesis](2026-07-12-system-review.md). Lens: bloat hunting and radical
> simplification for a moderately mature org. Unedited agent output.

# Bloat Audit: ai-sdlc Skill Library

**Reviewer lens:** radical simplification for a moderately mature org. **Base rate that anchors everything below:** 26 skills built in ~2 days (47 commits, Jul 11–12), exactly **one** skill has ever touched live Jira (pipeline-adopter), and it is still parked at its first approval gate. Everything else is tabletop-validated shelf-ware.

## Executive summary

- **The repo is ~6,130 lines of markdown across 116 files. Roughly 55% of it is the system documenting, testing, and governing itself** — docs (2,038), run logs (511), meta skills (~300), root process templates (~110), CLAUDE.md (64) vs. ~2,570 lines of actual working skill content. The meta:working ratio is ~1.2:1 (1.4:1 counting `research/`).
- **26 skills is 2–3x too many.** A defensible minimum viable set is **9**: the 4-skill PO pipeline + pipeline-adopter + test-plan-generator + bug-report-writer + backlog-hygiene-auditor + sprint-planning-facilitator. 8 SM skills exist for a team whose own data (T4 shakedown) shows 81% unpointed items, no commitment records, and unused flags.
- **~340 lines of the 1,370 SKILL.md lines (~25%) are verbatim or near-verbatim boilerplate** repeated 26 times: an identical 8-line "Run Log (audit)" section (208 lines), a formulaic 5-line "Pipeline position" section (~130 lines), plus the approval-gate sentence. All of it already lives in `skills/meta/skill-author/references/conventions.md`.
- **Every skill is documented in 3–5 places** (SKILL.md + ~36-line user-guide page + catalog entry + role-guide table row + README count), enforced by audit-checklist item 17 — for a user base of ~1. It has already drifted: `CLAUDE.md` says "23 skills," the catalog and README say 26.
- **The single biggest complexity generator is the Jira instance, and the system chose to model the mess instead of fixing it**: a 141-line empirically-sampled workflow map, a 16-entry "done-category ≠ terminal" trap registry, a changelog-archaeology recipe for sprint commitments, and dead-issue-type warnings woven through five skills. An afternoon of Jira admin work deletes most of this machinery.
- **The improvement loop only adds, never removes.** Five shakedowns produced ~30 "system proposals," nearly all landed as extra rules, modes, and cross-references inside skills (hotfix mode, paper mode, scale mode, adoption mode, regression-plan mode). Skills accreted defensive text faster than they gained users.

---

## Findings

### 1. Skill count: 26 skills, 1 live run, 0 users besides the author — High

**Evidence:** `docs/skill-catalog.md` (26 entries, all "Built 2026-07-11/12"); `.ai-sdlc/runs/` shows 8 runs, of which 5 are tabletops, 2 are meta (workflow sweep, audit sweep), and 1 is the sole live run (`2026-07-12-pipeline-adopter-kdp40426.md`, status "in progress — at the approval gate"). The developer skills were **never exercised even on paper** — T6 ("Developer role with repo access") is still "Blocked on: read access to one ap-* repo" in `docs/shakedowns/scenario-backlog.md`.
**Recommendation:** Freeze the library at a minimum viable set of 9 (table below). No new skill, and no un-deferral, without a named human asking for it after a live run. Building skill #27 before live run #2 is the definition of shelf-ware.

### 2. Per-skill boilerplate: ~25% of all SKILL.md content is copy-paste — High

**Evidence:** 26 SKILL.md files, 1,370 lines total, avg 52.7 (range 47–61). Every file ends with the same 8-line "Run Log (audit)" section — `grep -c "Every invocation keeps a run log"` = 26 hits = **208 identical lines**, differing only in the skill name in the path. Every file carries a 5-line "Pipeline position" section (~130 lines) restating what the catalog and each skill's own workflow steps already say. The approval-gate sentence ("Nothing is written/created before approval") appears 2–3 times per file. All of this is *already normative* in `conventions.md` ("Every SKILL.md carries a 'Run Log (audit)' section stating this; the audit checklist enforces it" — the convention mandates its own duplication).
**Recommendation:** Replace all 26 Run Log sections with one line: *"Library conventions (run log, approval gate, template-first) apply — see `conventions.md`."* Delete the Pipeline position sections (the catalog is the pipeline map). Saves ~350 lines and, more importantly, makes conventions changeable in one place instead of 26.

### 3. Documentation triplication (actually quintuplication) — High

**Evidence:** Per skill: SKILL.md (~53 lines) + `docs/user-guide/skills/<name>.md` (26 pages, ~950 lines total, avg 36) + catalog entry (3–8 lines) + role-guide table row + the README's "26 skills" count. `skill-author`'s audit item 17 enforces all of them ("the role guides' skill counts and the L1 README's library count must match reality"). The user-guide pages are competent prose restatements of the SKILL.md — compare `docs/user-guide/skills/backlog-decomposer.md` (44 lines) against `skills/po/backlog-decomposer/SKILL.md`: same rules ("slice floor," "brief-lite," "living registry") rewritten in second person. Drift already happened in under 48 hours: `CLAUDE.md` still says "The agreed v1 skill set (23 skills…)".
**Recommendation:** Cut to **two** levels: SKILL.md (the truth) + `docs/skill-catalog.md` (the index, absorbing the README's one-page overview). Delete `docs/user-guide/skills/` (26 files, ~950 lines) and `docs/user-guide/roles/` (4 files, ~180 lines) until there are ≥3 actual users who can't read a SKILL.md. That's ~1,200 lines and 30 files gone with zero capability loss.

### 4. Run-log regime: audit value for writes, theater for everything else — Medium

**Evidence:** `templates/run-log.md` (45 lines) demands live updates, **verbatim** Q&A transcription ("paraphrase destroys the audit value"), and declares "a run without a log is incomplete" — for *all* skills, including ones that produce only local drafts (backlog-decomposer, implementation-planner) or are read-only (tabletop-shakedown). The actual live run log shows the real audit need: what was written to Jira and who approved it. The `ai-sdlc-generated`/`ai-sdlc-adopted` labels plus Jira's own history already audit the writes a second time.
**Recommendation:** Require run logs only for runs that perform external writes, and slim the template to: context sources, the approval decision, writes with keys. Drop the verbatim-Q&A mandate (it's transcription labor that no one will re-read) and the "incomplete without a log" rule for draft-only skills.

### 5. Shakedown reports and scenario backlog: useful once, now retained ballast — Medium

**Evidence:** `docs/shakedowns/` = 563 lines (5 reports + backlog). The reports are genuinely good empirical work (T3's replay is the best document in the repo), but 4 of 5 scenarios are status **actioned** — their findings already landed in skills. Their run logs (`.ai-sdlc/runs/2026-07-11-tabletop-*`, ~300 lines) duplicate the reports' provenance. The backlog carries 7 more queued/candidate scenarios — more paper validation for a system whose bottleneck is live usage.
**Recommendation:** Keep the reports as history (they're cheap at rest), but **retire the tabletop program after T14**. The next validation unit is a live run with a real PO, not scenario T7–T13. Delete the tabletop run logs (the reports supersede them).

### 6. Handoff docs: created and deleted within 2 minutes; CLAUDE.md still points at them — Low

**Evidence:** commit e8b9e7a adds `docs/handoffs/2026-07-12-session-handoff.md` (12:28), commit 6a18161 deletes it (12:29:50, "Remove session handoff after context restored"). `CLAUDE.md` still instructs: "When resuming work, read the most recent handoff first" — the directory no longer exists.
**Recommendation:** Drop the handoff convention from CLAUDE.md entirely; the scenario backlog + git log + the one active run log already carry resume state. A process artifact whose lifetime is one session belongs in the scratchpad, not the repo.

### 7. Team operating record + commitment baseline: machinery ahead of demand — Medium

**Evidence:** `templates/team-operating-record.md` (42 lines) and `references/commitment-baseline.md` (~33 lines) are pre-built infrastructure for a team that has never run any SM skill. The commitment-baseline reconstruction recipe (changelog archaeology, three fallback tiers) is clever, but its own closing line admits the fix is one action: "run sprint-planning-facilitator record mode at the next boundary."
**Recommendation:** Keep commitment-baseline's *pitfalls* section (it's hard-won instance fact — KDP-40776's lying sprint field) merged into the instance-facts doc (finding 12). Fold the team-operating-record into the same doc as a one-table section. Two root-level process templates become zero.

### 8. SM role: 8 skills, heavily overlapping, for ceremonies the data says the org barely instruments — High

**Evidence:** `daily-standup-digest` step 2 and `impediment-radar` step 1 detect the *same signals* with near-identical text: flagged items (`customfield_11266`), "silent stalls: in-progress… no activity for 2+ working days," "aging reviews: PRs waiting > 1 working day," hotfix-pattern items off-board. `sprint-report-generator`, `retro-facilitator`, and `sprint-review-demo-facilitator` all recompute committed-vs-delivered from the same commitment baseline and feed each other ("hand the data pack to retro-facilitator"). Meanwhile T4 found the inputs don't exist: 81% of completed items unpointed (S85–S88), no commitment record ever, flags unused, zombie sprints open since Nov 2023. Eight skills were built against data that supports approximately two.
**Recommendation:** 8 → 3. Keep `sprint-planning-facilitator` (its record mode is the single forward fix everything else depends on, and T14 is scheduled). Merge digest + radar into one **sprint-radar** (daily view = short output mode; escalation view = triaged mode). Merge report + retro-pack into one **sprint-close** skill; cut the demo-script skill (a review agenda is a template, not a workflow). Keep `backlog-hygiene-auditor` — the T3 evidence (zombie epics, duplicate epics, 37% bug noise) is the one place real demand is proven.

### 9. Developer role: 6 unproven skills that largely duplicate what coding agents now do natively — High

**Evidence:** None of the 6 was exercised even on tabletop (T6 blocked). `implementation-planner` reproduces what Claude Code plan mode / Copilot workspace planning do out of the box; `pr-hygiene` (48 lines) reproduces PR-description generation native to Copilot and overlapping `code-review-critic` step 5; the two even share the concern (both verify AC-coverage claims against the diff). `tech-design-drafter` is an interview + a 45-line template. `copilot-handoff-packager` is the only distinctively valuable idea (the invention test + delegation-fit assessment), and it's one paragraph of prompt guidance wrapped in the standard 51-line costume.
**Recommendation:** Merge `pr-hygiene` into `code-review-critic` (one PR skill: hygiene pass, then review pass). Cut `implementation-planner` to a paragraph inside the handoff packager ("require an approved plan for non-trivial work; use your surface's native plan mode"). Defer `tech-design-drafter` keeping only `templates/design-doc.md`. Defer `copilot-handoff-packager` until the org actually delegates its first ticket to Copilot — it's the stated vision, but the DoR critic already enforces the same contract ("translate into tests without inventing requirements").

### 10. Tester role: 2 keepers, 2 that are prompt paragraphs — Medium

**Evidence:** `test-plan-generator` and `bug-report-writer` encode real instance knowledge (epic-level NFR fallback via `customfield_14762`; bug-type selection; non-fix-closure-rate check) — keep both. `exploratory-charter-generator` (51 lines) produces "Explore X with Y to discover Z" one-liners — the entire skill is the charter formula plus four risk angles; that's a section of the test-plan-generator, not a skill. `ac-playwright-scaffolder` requires test-repo access nobody has (same blocker as T6) and its 30-line `scaffold-conventions.md` reference restates "read the repo first, repo wins."
**Recommendation:** Fold charter generation into test-plan-generator as an optional output section. Defer the scaffolder until repo access exists.

### 11. Hotfix handling is smeared across five skills as special modes — Medium

**Evidence:** The T5 shakedown spawned: `incident-hotfix-runner` (new skill), DoR critic "hotfix express contract" (H1–H4 in `dor-checklist.md`), test-plan-generator "regression-plan mode," release-notes-generator "hotfix mode" (KRN naming convention baked into a Rules bullet), daily-standup-digest/impediment-radar "hotfix/incident signals," backlog-hygiene checks. Each host skill grew 3–8 lines of mode logic for a flow that has run zero times.
**Recommendation:** Consolidate: `incident-hotfix-runner` owns the *whole* express path (ticket + express DoR + regression plan pointer + release-note stub) and the other skills lose their hotfix branches. One skill you can read end-to-end beats five skills with `if hotfix` sprinkled in.

### 12. Instance intelligence: the best content in the repo, in the wrong shape — Medium

**Evidence:** `kdp-schema.md` (161), `kdp-workflows.md` (141), `kdp-bug-types.md` (44), `commitment-baseline.md` (~33) = ~380 lines of genuinely hard-won facts, scattered under two skills' `references/` plus repo root. Cross-skill reach-ins break the portability story the conventions insist on: `backlog-decomposer/SKILL.md` references `skills/po/jira-confluence-writer/references/kdp-schema.md`; `test-plan-generator` does too; `incident-hotfix-runner` references `kdp-bug-types.md` in another skill's tree. Deploy any one skill to Copilot alone and its references dangle.
**Recommendation:** One `references/kdp-instance.md` at repo root (or an `instance/` dir): schema + bug types + workflow terminal-set table + sprint-data pitfalls, each as a section. Skills reference it by one path. Merge `kdp-bug-types.md` in (it half-duplicates the schema's defect table already). Then apply finding 13 to shrink it.

### 13. The system models Jira's mess instead of demanding it be fixed — High (the big one)

**Evidence:** 24 issue types, of which the system itself documents 6+ as dead or to-avoid: 3 legacy Hotfix types ("5 issues ever, 0 since 2024-11, 1 of them test junk"), `Task` ("Avoid"), near-duplicate link types (`Test` vs `Tests`, `Relates` vs `Related`), `Targeted Release` options stale since 2023. Because workflows are broken (done-category waypoints, screen-less terminal transitions leaving resolution NULL), the system built: a 141-line empirically sampled workflow map ("~60 (type,status) samples" because "the definition API isn't exposed"), a **16-entry trap registry**, a delivered-detection rule replicated into release-notes-generator, sprint-review-demo-facilitator, backlog-hygiene-auditor, and the schema doc, plus the commitment-baseline archaeology recipe for the lying sprint field, plus "zombie sprint" and "dead team-field value" checks in the hygiene auditor. Conservatively **300+ lines and a dozen skill rules exist solely to accommodate fixable Jira admin defects.**
**Recommendation:** The highest-leverage "skill" this repo could ship is a one-page **Jira simplification proposal** to whoever admins kestra.atlassian.net: (1) retire the 3 Hotfix types, the UAT-phase type quartet if unused, and duplicate link types — 24 types → ~12; (2) add resolution post-functions (or screens) to every terminal transition so resolution is trustworthy; (3) rename/re-categorize the done-category waypoints (PO Validated, Regression Failed) out of the Done category; (4) close the zombie sprints and purge dead team values; (5) pick one home for briefs (a Confluence template linked from the epic) instead of the Background-field house convention. Each admin fix deletes a whole category of adaptation text: fix #2+#3 alone deletes the trap registry and the delivered-detection rule from four skills. Accommodating the mess costs more than fixing it in every case except the Background-field brief convention (which is cheap to read and genuinely in use).

### 14. skill-author: a 200-line bureaucracy for a one-person library — Medium

**Evidence:** `skills/meta/skill-author/` = SKILL.md (58) + conventions.md (58) + audit-checklist.md (17 items, ~40) + skill-template.md (42). The audit checklist polices placeholder styles (`{curly}` vs `[square]`), catalog/user-guide synchronization (item 17 — the enforcement arm of the triplication in finding 3), and line limits. Its one audit-sweep run log exists. This is CI-grade governance for a library with one committer.
**Recommendation:** Keep `conventions.md` (slimmed) and `skill-template.md`. Delete the audit checklist and the skill-as-interview wrapper — scaffolding a new skill is "copy the template"; auditing is "read the conventions." Revisit if a second maintainer ever appears.

### 15. Template inventory: mostly justified, with clear duplicates and over-splits — Medium

**Evidence:** 27 skill templates (938 lines) + 2 root. Template-first is a defensible convention (it does pin output contracts). But: two `pr-description.md` templates (pr-hygiene 28 lines, ac-playwright-scaffolder 22) have already diverged — the diff shows different header/table shapes for what is one house PR format. `refinement-facilitator` carries two templates (agenda + capture-summary) for one skill whose capture output is a table that could live as a section of the agenda template. Audit item 15 ("no workflow step emits a freeform-structured artifact") pushes even trivial outputs (a handoff comment, a capture table) toward template files.
**Recommendation:** One shared PR-description template. Merge per-skill template pairs. Relax the rule to "artifacts that land in a system of record are template-first" — internal intermediates don't need files.

### 16. Rules sections are accreting shakedown scar tissue with no pruning mechanism — Medium

**Evidence:** Skills cite tabletop IDs inside their own rules: backlog-decomposer — "ad hoc epic creation is how duplicate epics happen (T3: four of them)"; DoR critic — "T3's costliest lesson"; test-plan-generator step 6 is a 90-word paragraph about historical test-case abandonment. The scenario backlog shows the mechanism: every shakedown yields 5–8 system proposals, and nearly all *landed* (T2: 7/7, T4: 6/6). Only one proposal was ever declined (T5-S6) and one withdrawn (W4). Nothing has ever been removed. The catalog conventions call freeform output "a defect" but there is no equivalent defect class for rule bloat.
**Recommendation:** Add the inverse gate: a system proposal that adds a rule/mode must name what it displaces, and shakedown citations (T3, T2-S5…) move to commit messages, not SKILL.md prose. Prune the three longest Rules paragraphs (test-plan-generator step 6, decomposer rule on registries, DoR critic epic preamble) into the checklists they describe.

### 17. Checklists: good content, one too many layers — Low

**Evidence:** `dor-checklist.md` (13 items + H1–H4), `epic-readiness-checklist.md` (7), `epic-closeout-checklist.md` (7) — split across two skills (DoR critic, hygiene auditor). The epic-readiness and epic-closeout lists are two ends of one epic lifecycle and cross-reference each other ("feeds the closeout checklist at the other end of its life").
**Recommendation:** Merge the two epic checklists into one `epic-lifecycle.md`. Keep the DoR checklist as-is — it is the highest-leverage artifact in the system and correctly separated for team tuning.

### 18. User-guide README oversells surfaces that don't exist yet — Low

**Evidence:** `docs/user-guide/README.md` describes GitHub Copilot as "the primary surface today. Everyone has access… Ask your team lead for the setup guide" and Rovo as "planned" — no setup guide exists in the repo, no skill has run on Copilot, and there is no team using this yet. The mermaid pipeline diagram and "Getting started" onboarding address an audience of zero.
**Recommendation:** When the guide collapses per finding 3, keep only what is true today: Claude Code works, one adoption run is live, everything else is aspiration and belongs in the catalog header as one sentence.

### 19. Meta-work ratio: the system spends more on itself than on work — High

**Evidence (lines of markdown):** Working content = 24 non-meta skills' SKILL.md (~1,250) + their templates (~850) + references (~470) ≈ **2,570**. Self-referential content = docs/ (2,038) + run logs (511) + meta skills (~300) + root process templates/references (~110) + CLAUDE.md (64) ≈ **3,020**, plus research/ (534). Ratio ≈ **1.2:1 meta:working** (1.4:1 with research). Activity tells the same story: of 8 recorded runs, 7 are the system examining itself; of 47 commits in two days, the large majority build/validate/document the library rather than produce a Jira artifact for a human.
**Recommendation:** Treat this ratio as the health metric. The cuts in findings 2–7 (~1,700 lines of boilerplate, user-guide pages, process templates) bring it to roughly 0.5:1 without touching a single capability. Then hold the line with the demand-signal rule (finding 1).

### 20. Portability convention vs. reality — Low

**Evidence:** `conventions.md` mandates surface-neutral skills, yet every SKILL.md depends on repo-root `templates/run-log.md`, cross-skill reference paths (finding 12), and `.ai-sdlc/runs/` workspace layout — none of which exist when a skill is dropped alone into Copilot or Rovo. Portability is currently a documentation claim, not a property.
**Recommendation:** Either make each skill self-contained (copy its needed references in) *for the skills actually being deployed elsewhere*, or drop the portability language until a second surface is real. Don't pay the convention tax for a property you don't have.

---

## Keep / Merge / Cut / Defer — all 26 skills

| # | Skill | Role | Verdict | Rationale |
|---|-------|------|---------|-----------|
| 1 | product-brief-builder | PO | **Keep** | Pipeline entry; house-field reconstruction is proven useful (T1/T2) |
| 2 | backlog-decomposer | PO | **Keep** | Core pipeline; slim its Rules (finding 16) |
| 3 | jira-confluence-writer | PO | **Keep** | The write bridge; owns the schema knowledge |
| 4 | definition-of-ready-critic | PO | **Keep** | The stated highest-leverage control; checklist is excellent |
| 5 | release-notes-generator | PO | **Defer** | No release has run through it; hotfix mode goes to the runner (finding 11) |
| 6 | pipeline-adopter | PO | **Keep** | The only skill with a live run and real demand — finish KDP-40426 |
| 7 | implementation-planner | Dev | **Cut** | Native agent plan modes do this; keep one paragraph in the packager |
| 8 | copilot-handoff-packager | Dev | **Defer** | Core to the vision but zero delegations yet; the invention test is one paragraph |
| 9 | code-review-critic | Dev | **Merge** | Absorb pr-hygiene; becomes the single PR skill — activate when repo access (T6) exists |
| 10 | tech-design-drafter | Dev | **Defer** | Keep `design-doc.md` template; the skill is an interview wrapper |
| 11 | pr-hygiene | Dev | **Merge → 9** | Same diff, same AC-coverage check, same gate |
| 12 | incident-hotfix-runner | Dev | **Defer** | Built from one tabletop; consolidate the 5-skill hotfix smear into it first (finding 11), activate on the first real incident use |
| 13 | test-plan-generator | Tester | **Keep** | Real instance knowledge; absorb charters |
| 14 | ac-playwright-scaffolder | Tester | **Defer** | Blocked on test-repo access nobody has |
| 15 | exploratory-charter-generator | Tester | **Cut** | The charter formula is a section of the test-plan skill |
| 16 | bug-report-writer | Tester | **Keep** | Directly targets the proven 37% bug-noise problem (T3) |
| 17 | refinement-facilitator | SM | **Cut** | Prep = DoR-critic output + rank; capture = a comment. Not a workflow |
| 18 | sprint-planning-facilitator | SM | **Keep** | Record mode is the forward fix everything depends on; T14 is scheduled |
| 19 | sprint-review-demo-facilitator | SM | **Cut** | A demo agenda is a template, not a skill |
| 20 | retro-facilitator | SM | **Merge** | Into a single sprint-close skill with #21 |
| 21 | sprint-report-generator | SM | **Merge → 20** | Same data, same baseline, same audience week |
| 22 | daily-standup-digest | SM | **Merge** | Into sprint-radar with #23 — near-identical signal detection |
| 23 | impediment-radar | SM | **Merge → 22** | Escalation drafting becomes the radar's second mode |
| 24 | backlog-hygiene-auditor | SM | **Keep** | The observed backlog decay is the best-evidenced demand in the repo; slim its 12 finding types after Jira admin fixes land |
| 25 | skill-author | Meta | **Cut** | Keep conventions.md + skill-template.md as files; delete the audit bureaucracy |
| 26 | tabletop-shakedown | Meta | **Defer/retire** | It did its job; after T14, validation happens by live use |

**Resulting minimum viable set (9):** product-brief-builder, backlog-decomposer, jira-confluence-writer, definition-of-ready-critic, pipeline-adopter, test-plan-generator, bug-report-writer, sprint-planning-facilitator, backlog-hygiene-auditor — plus two merged latent skills (pr-review, sprint-radar/sprint-close) activated on demand.

---

## Fundamental simplifications

1. **Fix Jira, don't model it.** Take the system's own empirical findings to the Jira admin as a simplification proposal: retire dead issue types (24 → ~12), add resolution post-functions to terminal transitions, move waypoint statuses out of the Done category, close zombie sprints, purge dead team values, standardize one brief location. Every fix deletes adaptation machinery: the 16-entry trap registry, the delivered-detection rule in four skills, the commitment-archaeology recipe, three hygiene-auditor check types. This is the only recommendation that reduces complexity for *every future skill at once*, and the workflow map (`kdp-workflows.md`) is already the evidence package for it.

2. **Cut the library 26 → 9 and impose a demand-signal rule.** No new skill, mode, or rule without a named person requesting it after a live run — and any addition names what it removes. The system's own base rate (1 live run) says the constraint is adoption, not capability.

3. **One conventions page, 26 lean skills.** Delete the repeated Run Log and Pipeline position sections (~350 lines); conventions live once in `conventions.md`. A SKILL.md should be ~35 lines: description, inputs, workflow with one gate step, rules unique to it.

4. **Two documentation levels, not five.** SKILL.md is the truth; the catalog is the index (absorbing a 20-line overview from the README). Delete `docs/user-guide/` (~1,200 lines, 31 files) until there are three real users. Fix CLAUDE.md's stale "23 skills" and dead `docs/handoffs/` pointer in the same commit.

5. **Audit trail = writes only.** Run logs required only when a run writes to Jira/Confluence/GitHub; slim the template to sources, approval decision, and writes-with-keys. The `ai-sdlc-generated`/`ai-sdlc-adopted` labels plus Jira history are the durable half of the audit already.

6. **One instance-facts document.** Merge kdp-schema, kdp-workflows (post-Jira-fix, it should shrink to a terminal-status table), kdp-bug-types, commitment-baseline pitfalls, and the team-operating-record into a single root `references/kdp-instance.md`. It is the repo's most valuable content and deserves one authoritative home instead of four scattered ones.

7. **Redirect the meta-energy to the live pipeline.** The two highest-value next actions are already queued in the repo's own backlog: finish the KDP-40426 adoption gate, and run T14's live sprint-planning record at the Jul 17 boundary. Both produce real artifacts for real people — which is the only metric this system hasn't yet moved.
