# KDP Issue-Type Workflows (Empirical Map)

**Method:** Jira's workflow-definition API is unavailable; this map was reconstructed by sampling one live issue per (issue type, status) and reading `getTransitionsForJiraIssue`. Identical transition-ID sets across types = shared workflow. **Empirical, not an admin export** — statuses with zero live issues could not be probed, and conditional transitions hidden by failing conditions are invisible. Swept 2026-07-12: 24 issue types, ~60 (type,status) samples, plus resolution cross-checks on 29 resolved issues.

Legend: `[S]` = transition opens a screen (resolution dialog). `(cond)` = isConditional. `⚠D` = done-CATEGORY status. Transition ids in parens.

## Workflow groups (12)

### 1. Work-item workflow family — Story 10000, Story Bug 10400, Tech Managed-Deployable 12504, Bug 1, PV UAT Bug 12498, UV UAT Bug 12499
Functionally one graph; per-type clones drift only in the newer Rolled-Back-era transition ids (see deltas).
- Globals (from every status): Blocked (491), Open (901), **Done (931) [S]**
- Open → Groom (251)→Grooming; Skip Grooming (301)→Accepted
- Grooming → Accept (261)→Accepted
- Accepted → Refine (311)→Grooming; Ready for Dev (881)→In Dev
- In Dev → Dev Complete (851)→In Test in DEV; Back to Accepted (681)
- In Test in DEV → Testing In Dev Complete (861)→In Product Owner Validation; Back to Dev (871)
- In Product Owner Validation → PO Validated (941)→PO Validated ⚠D; Back to Dev (501); Back to In Test in Dev (821)
- PO Validated ⚠D → Ready to Deploy to QA (891, cond)→Ready to Deploy To QA ⚠D
- Ready to Deploy To QA ⚠D → (unsampled this sweep; prior mapping: → Deployed to QA)
- Deployed to QA ⚠D → Back to Dev (871)
- Regression Passed ⚠D → **Deployed (4) [S]→Done**; Rolled Back (3, cond)→Rolled Back (16984, To Do)
- Regression Failed ⚠D → Back to Accepted (681); Back to Grooming (691); Back to Dev (871)
- Done ⚠D → 8 reopen paths: Rolled Back (cond); Back to Regression Passed; Back to Dev (501); Back to Accepted (681); Back to Grooming (691); Back to In PO Validation (711); Back to In Test in Dev (821); Back to Ready to Deploy to QA (911, cond)
- Blocked → Back to Deployed to QA (1021); plus 501/681/691/711/821/911 back-paths
- Clone deltas: Rolled-Back id at Done is 4 (Story) vs 5 (Bug, PV UAT Bug); UV UAT Bug Done shows Back to Regression Passed as id 3 and no Rolled Back; UV UAT Bug Open additionally offered Ready for Dev (881) directly (Bug Open did not — possibly condition-gated). Regression Passed/Failed observed only on Bug instances.

### 2. Tech Managed - Non Deployable 12517 (prior sweep)
Own workflow: globals →Not Required (11958 ⚠D, no screen), →Blocked, →Open; "Done" (31)→Closed(6), NO screen.

### 3. Task workflow — Task 3, Sub-task 7, Clarification 19 (identical ids)
- Global: Not Required (111)→Not Required (11958) ⚠D — no screen, but resolution is auto-set anyway (post-function)
- Open → Start Progress (11)→In Progress; **Close (41) [S]**→Closed; Blocked (81)
- In Progress → Stop Progress (21)→Open; **Done (31) [S]**→Closed; Blocked (91)
- Blocked → Unblock (101)→In Progress
- Closed → Re-Open (51)→Open; **Override (61) [S]** (looped, Closed→Closed re-resolution); Reopen (71)→In Progress
- Not Required ⚠D → Re-Open (121)→Open

### 4. Epic 10001
- Globals: Blocked (21), **Closed (31) [S]**
- Open → Review (41)→Review & Analyze (11946)
- Review & Analyze → Ready for PI Planning (61)→Prioritized (11947); Back to Funnel (51)→Open
- Prioritized → In Progress (131); Back to Review (11); Deferred (141)→Deferred (11962)
- In Progress → Ready for Product Validation (121)→Epic Ready for Product Validation (11984) ⚠D no screen; Deferred (141)
- Deferred → Back to In Progress (151); Back to Prioritized (161)
- Epic Ready for Product Validation ⚠D → Back to In Progress (111)
- Blocked → Back to Review (11); Back to Funnel (51)→Open; Back to Analysis (81)→Prioritized; Back to In Progress (111)
- Closed → Back to Analysis (81)→Prioritized; Back to Review (11) — Closed is reopenable

### 5. Initiative 12406
- Open → **Close (131) [S]**; Schedule (461)→Scheduled (11953)
- Scheduled → **Close (501) [S]**; On Hold (511)→On Hold (10721); Start Progress (271)→In Progress
- In Progress → Stop Progress (211)→On Hold; Delivered (521)→Monitoring (11954) ⚠D no screen. NO direct Close from In Progress.
- **Closed → NO transitions. Hard dead end (no reopen).** On Hold / Monitoring: 0 live issues, unprobed.

### 6. Spike Story 12486
- Globals: Blocked (491), **Closed (541) [S]** (terminal name is Closed, not Done)
- Open → Groom (251)→Grooming; Skip Grooming (301)→Accepted
- Accepted → Refine (311)→Grooming; Start Progress (731)→In Progress
- In Progress → Back to Accepted (751); **Done (761) [S]**→Closed
- Closed → globals only (reopen only by going Blocked, then unknown — Blocked unsampled, 0 instances)

### 7. Design Story 12485
- Globals: Blocked (691), **Closed (701) — NO screen** (resolution left NULL)
- Backlog (10920) → Analysis (561)→Analysis (11964)
- Analysis → Active Research (571)→11965; Exploration (601)→11966
- Exploration → Active Research (591); Sparring (611)→Sparring (11967)
- Done (10021) ⚠D → globals only (→Closed/Blocked). Closed → globals only. How Done is entered is unprobed (Active Research/Sparring: 0 live issues).

### 8. Risk 12512
- Global: Blocked (11)
- Assessing (12032) → Mitigate (31)→In Mitigation (12031)
- In Mitigation → Mitigated (91)→Mitigated (12033)
- Mitigated → **Close (41) [S]**→Done
- Done ⚠D → global Blocked only; **reopening a Done risk requires routing through Blocked**
- Blocked → Back to Open (51); Re-Assess (61); Back to In Mitigation (71); Back to Mitigated (81); **Close (41) [S]**

### 9. UAT Story workflow — PV UAT Story 12496, UV UAT Story 12500 (identical ids)
- Globals: **Closed (21) — NO screen** (resolution NULL), Blocked (31)
- In UAT (10121) ⚠D → Re-Open (41)→Open — **In UAT is the ACTIVE testing state despite done category**
- Closed → Re-Open (41)→Open; Back to Testing (51)→In UAT

### 10. Test Case family — Test Case 26, PV Test Case 12497, UV Test Case 12501 (three near-identical clones)
- Globals: **NA (131) [S]**→Not Applicable (10320) ⚠D; Blocked (161). PV TC only: global Ready for Retest (191)→12001.
- Open → Ready for UAT (171)→10120; Start Progress (11); [PV TC only: Done (201, no screen)→10021]
- In Progress → **Pass (21) [S]**→Pass (10006) ⚠D; Fail (31)→Fail (10007, in-progress cat); ReOpen (91)→Open
- Pass ⚠D → [TC 26] Fail (61); Automated (151)→Automated (10519) ⚠D; ReOpen (121) / [UV TC] Done (201, no screen)
- Fail → Back to In Progress (211); ReOpen (121); Retest (181)→Ready for Retest
- Blocked → ReOpen (121); Retest (181)
- Not Applicable ⚠D → Na To In Progress (141)
- Ready for Retest / Ready for UAT → Start Progress (11) (+ReOpen (121) from Ready for UAT)
- PV TC Done ⚠D → globals only, but global Ready for Retest (191) reopens it

### 11. Hotfix workflow — Hotfix Story 13524, Hotfix System Story 13525, Hotfix Bug 13526
Only 5 hotfix issues exist, all in Done — only Done probed.
- Globals: Blocked (491), Open (901), **Done (2) (1161) [S]**→Done [absent from the Hotfix Bug sample — clone delta]
- Done ⚠D → Back to Staging (1111)→Hotfix Deployed to Staging (13125); Back to Prod (1121)→Hotfix Deployed to production (13126); Back to Dev (501)→In Dev
- All sampled Done hotfixes have resolution NULL despite the screened transition.

### 12. Contractor Hours 13865
- Open → Close (11)→Closed — no screen, resolution NULL. **Closed → NO transitions (hard dead end).**

## "Done-category ≠ terminal" registry (the trap list)
Every done-category status that is NOT a safe endpoint, per workflow:
| Workflow | Status (id) | Why it's a trap |
|---|---|---|
| Work-item family | PO Validated (12009) | mid-pipeline; → Ready to Deploy to QA / reopens; resolution NULL |
| Work-item family | Ready to Deploy To QA (11993) | mid-pipeline queue for QA deploy; resolution NULL |
| Work-item family | Deployed to QA (12010) | regression testing pending; → Back to Dev; resolution NULL |
| Work-item family | Regression Passed (12011) | still needs "Deployed"[S]→Done; resolution NULL |
| Work-item family | Regression Failed (12035) | a FAILURE state in done clothing; → back to Accepted/Grooming/Dev; resolution NULL |
| Work-item family | Done (10021) | terminal-ish but has 8 reopen transitions incl. conditional Rolled Back |
| Epic | Epic Ready for Product Validation (11984) | validation pending; → Back to In Progress; resolution NULL |
| Initiative | Monitoring (11954) | KPI-watch phase after Delivered; not Closed; no screen |
| Task wf | Not Required (11958) | reopenable (Re-Open→Open); resolution auto-set w/o screen |
| UAT Story wf | In UAT (10121) | the ACTIVE UAT state; → Re-Open; resolution NULL |
| Test Case family | Pass (10006) | → Fail / ReOpen / Automated / Done; not the end state everywhere |
| Test Case family | Not Applicable (10320) | → Na To In Progress |
| Test Case family | Automated (10519) | unprobed (0 instances); assume reopenable |
| PV Test Case | Done (10021) | no screen on entry (201), resolution NULL; global Ready for Retest reopens |
| Hotfix wf | Done (10021) | → Back to Staging / Back to Prod / Back to Dev; resolution NULL in practice |
| Design Story | Done (10021) | not final — Closed (701) is; resolution behavior inconsistent |

## Terminal states & resolution behavior
- **Resolution gets set by a screen [S] on:** work-item Done (931) and Regression Passed→Deployed (4); Task-wf Close (41)/Done (31)/Override (61); Epic Closed (31); Initiative Close (131/501); Spike Closed (541)/Done (761); Risk Close (41); Test-Case Pass (21) and NA (131); Hotfix Done (2) (1161).
- **Resolution verified populated** (sampled): work-item Done; Task/Sub-task/Clarification Closed; Not Required (auto, no screen); Epic Closed; Initiative Closed; Spike Closed; Risk Done; TC Pass & NA; Design Done.
- **Resolution verified NULL** (no screen on the entering transition): UAT Story Closed & In UAT; Design Closed; Contractor Closed; PV TC Done; all Hotfix Done samples; all mid-pipeline ⚠D statuses above. Skills must not infer "resolved" from done category or from resolution presence alone.

## Reopen paths from terminal states
- Work-item Done: 8 explicit back-transitions + global Open (901). Blocked also re-enters anywhere.
- Task-wf Closed: Re-Open (51)→Open, Reopen (71)→In Progress; Not Required: Re-Open (121).
- Epic Closed: Back to Analysis (81)→Prioritized, Back to Review (11).
- UAT Story Closed: Re-Open (41)→Open, Back to Testing (51)→In UAT.
- Spike Closed / Design Closed+Done / Risk Done: no direct reopen — only global Blocked, then recover from Blocked (Risk Blocked has 4 back-paths; Spike/Design Blocked unprobed).
- Test Case: NA and Pass reopen as above; global NA/Blocked from everywhere.
- Hotfix Done: Back to Staging/Prod/Dev.
- **No reopen at all:** Initiative Closed, Contractor Hours Closed (empty transition lists).

## Coverage gaps / honestly unmapped
- No type was fully unmappable — all 24 have ≥1 live issue. Partially probed: Hotfix types (only Done occupied; 5 issues total); UAT Stories (only In UAT/Closed occupied).
- Statuses defined in workflows but 0 live issues → transitions unprobed: Rolled Back (16984), Hotfix Deployed to Staging/production (13125/13126), Automated (10519), Sparring (11967), Active Research (11965), Initiative On Hold (10721) & Monitoring (11954), Risk Open, Spike Grooming/Blocked, work-item Ready to Deploy To QA (this sweep; prior sweep covered it), Story "In Product Owner Validation" (covered via Bug sample).
- Statuses sampled from ≤100 most-recently-updated issues per type; very old/rare statuses may be missed.
