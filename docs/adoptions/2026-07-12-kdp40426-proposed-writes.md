# Proposed Writes — KDP-40426 Adoption (Detailed Review Copy)

**Companion to:** [the reconciliation plan](2026-07-12-kdp40426-reconciliation.md) | **Prepared:** 2026-07-12 | **Approver:** Jeremy Harrell
**Nothing below has been written.** Every item shows the exact content, verbatim. Review and reply with decisions per item (e.g., "approve W1–W6, edit W8, decline W9c"), or edit this file's Decision lines directly and tell me to read it.

---

## W1 — Parent the epic

- **Target:** KDP-40426, `parent` field (currently empty)
- **Write:** `parent = TR-8` ("Advisor Platform Modernization", In Progress)
- **Why:** the epic's own Background says "Aligns with Kestra's policy…" as part of the Advisor Platform modernization effort; T2 confirmed TR-8 is live and taking modernization epics.
- **Alternatives:** a different initiative (name it), or standalone with W2-style reason comment.
- **Decision:** ☐ approve ☐ different target: ______ ☐ standalone ☐ skip

## W2 — Make the blocked item's blocker visible (KDP-40596, Cover Page Listener)

- **Write 2a:** set Flagged (`customfield_11266`) = Impediment
- **Write 2b:** issue link, type **Blocks**: KDP-40596 *is blocked by* **RA-15195**
- **Write 2c:** comment, exact text:

  > Flagged as blocked (pipeline adoption, 2026-07-12): work cannot proceed pending repo access request RA-15195 (requested 2026-07-10, marked URGENT). Link added so dependency tooling can watch it. When access is granted: clear the flag and resume.

- **Decision:** ☐ approve all three ☐ approve some: ______ ☐ decline

## W3 — Link the institutional docs to the epic

- **Target:** KDP-40426, remote links (currently none to these pages)
- **Write 3a:** remote link → `https://kestra.atlassian.net/wiki/spaces/NDTW/pages/9932603417` (".NET 10 Upgrades: Notes")
- **Write 3b:** remote link → `https://kestra.atlassian.net/wiki/spaces/NDTW/pages/9916121089` ("API Testing Documentation" — the epic's de facto test plan)
- **Decision:** ☐ approve both ☐ one: ______ ☐ decline

## W4 — ~~Set the missing resolution (KDP-40497)~~ **WITHDRAWN 2026-07-12**

- **Owner corrected the premise:** "PO Validated" is **not** terminal. The transitions API confirms it — KDP-40497 has onward moves (Ready to Deploy To QA, Done); the item is mid-flow and its resolution correctly stays unset until the real terminal transition (which carries the resolution screen).
- **No write.** Yield instead: the `statusCategory=Done ≠ terminal` rule is now documented in kdp-schema's workflow section and applied to release-notes-generator and sprint-review-demo-facilitator ("delivered" = resolution set).
- **Decision:** withdrawn — no action needed

## W5 — Adoption labels

- **Write:** add label `ai-sdlc-adopted` to KDP-40426 and to **every issue an approved write touches** (per your decisions: potentially 40596, 40497, 40592, 40593, 40628, and Batch A items). No other issues are labeled.
- **Decision:** ☐ approve ☐ epic only ☐ decline

## W6 — Record-notes on the three closed-without-AC items

- **Targets:** KDP-40592, KDP-40593, KDP-40628 (all Closed; AC never existed). **No content edits — history, not homework.** One comment each, exact text:

  > Record note (pipeline adoption, 2026-07-12): this item was completed and closed without acceptance criteria; completion is accepted as historical. Recorded for audit continuity — see the epic's adoption registry.

- **Decision:** ☐ approve ☐ decline (skip the noise)

---

## W7 — Restate success measure #1 (epic description edit)

- **Current text (first Success Measures bullet):**

  > 100% of target modern .NET projects successfully deployed to Production on .NET 10.

- **Proposed replacement:**

  > 100% of in-scope repos upgraded to .NET 10 — deployable services deployed to Production, non-deployable projects verified building/running on .NET 10 — or explicitly exempted with a recorded reason (e.g., Not Required). Tracked as: every child item resolved, with the resolution field set.

- **Why:** the current text is unsatisfiable by 12 Non-Deployable children and already-exempted XmlHubErrors; the epic contradicts itself.
- **Decision:** ☐ approve ☐ approve with edits: ______ ☐ decline

## W8 — Populate the epic's empty AC field

- **Target:** KDP-40426 `customfield_14705` (currently null; KDP's Epic definition requires epic AC)
- **Proposed content (objective completion criteria, matching the epic's own SR numbering):**

  > **Epic completion criteria**
  > 1. Every child item is resolved with a resolution set (upgraded, or exempted with a recorded reason).
  > 2. Zero critical vulnerabilities in post-upgrade Checkmarx scans across all upgraded repos (per SR-005).
  > 3. `Directory.Packages.props` and `Directory.Build.props` are present in every target repo (SR-001/002).
  > 4. All target solution files are migrated to `*.slnx` (SR-003).
  > 5. All exemptions and scope changes are recorded in the adoption registry with reasons.

- **Decision:** ☐ approve ☐ approve with edits: ______ ☐ decline

## W9 — Open Questions table (appended to the epic description)

Three questions currently living as untracked prose/comments. **You must fill the two blanks (owners/dates) or accept "TBD" with yourself as default owner.** Proposed appended section:

  > **Open Questions (tracked at adoption, 2026-07-12)**
  >
  > | # | Question | Blocking? | Owner | Needed by |
  > |---|----------|-----------|-------|-----------|
  > | a | Okta / NewRelic .NET 10-compatible versions confirmed available? (Background lists this as an assumption) | Non-blocking until a repo using them upgrades | ______ | ______ |
  > | b | AP Red + platform-team Q3 dependency (per 2026-06-22 comment): which work items, whose, by when? Once identified, reify as "is blocked by" links | Blocking for affected repos | ______ | ______ |
  > | c | Parity verification (Supervision compliance flag): what does "business logic parity" concretely mean per service, and where is it recorded? (ref: API Testing Documentation page) | Blocking for sign-off | ______ | ______ |

- **Decision:** ☐ approve (owners: ______) ☐ approve with TBD owners ☐ decline

## W10 — Scope-list corrections (epic description edits)

- **Write 10a:** In-Scope entry `XmlHubErrors` → `XmlHubErrors (exempted — Not Required, KDP-40594)`
- **Write 10b:** the cut-off bullet `Migration from Legacy - All ` — **you supply the ending** or approve deletion:
  - Option 1: complete it: `Migration from Legacy - All ______`
  - Option 2: delete the bullet (it duplicates the "Legacy: .NET Framework (4.x) modernization" out-of-scope entry above it)
- **Decision:** 10a ☐ approve ☐ decline · 10b ☐ complete with: ______ ☐ delete ☐ leave

---

## W11 — Seed the adoption registry

- **Write:** one new Confluence page (proposed: NDTW, child of ".NET 10 Upgrades: Notes") **or** a file in this repo — your call. Content: the registry structure (created-keys map of all 46 children with status at adoption, generated from live data at write time; moved-scope ledger opened empty; mid-flight additions section active from 2026-07-12; note-for-record list = W6 items). Mechanical mirror of Jira — sample row:

  > | Registry item | Jira key | Status at adoption |
  > | Upgrade AC Auth Service | KDP-40428 | In Dev |

- **Decision:** ☐ Confluence (NDTW) ☐ repo ☐ skip registry

---

## W12 — Tier 3 Batch A: AC backfill for the five in-flight items

**Format note:** these match the epic's own 16 populated siblings (the `Scenario:` Gherkin pattern, e.g., KDP-40615) rather than the `AC#N` house style — consistency within the epic beats style purity, per the format-tolerance rule. Written to each item's AC field (`customfield_14705`), currently null on all five.

**Parameterized template (deployable variant)** — exact text, `{repo}` substituted per item:

> Scenario: Successful Framework Upgrade
> Given the {repo} source code
> When the framework is updated to .NET 10 and build properties are standardized (Directory.Packages.props, Directory.Build.props)
> Then the solution builds without errors using the .NET 10 SDK
> And all automated tests pass in the CI pipeline.
>
> Scenario: Security Compliance
> Given a successful build of the .NET 10 version
> When a Checkmarx security scan is performed
> Then the scan results show zero critical vulnerabilities.
>
> Scenario: Deployment Verification
> Given a successful build and clean security scan
> When deployed to a lower environment
> Then the service provides its intended functionality, verified per the API Testing Documentation test plan for this service.
>
> Scenario: Solution Format Migration
> Given the repository's solution file(s)
> When the migration is complete
> Then the solution file exists in *.slnx format and the legacy .sln is removed.

*(Non-deployable variant: the Deployment Verification scenario becomes "When executed in its normal runtime context / Then the tool performs its function on .NET 10 with no regressions" — no deployment step.)*

| Item | Repo parameter | Variant | Extra clause |
|------|----------------|---------|--------------|
| W12a KDP-40587 (In Test in DEV) | AccountEstablishment | deployable | Given-clause scoped: "Given the AccountEstablishment NFP.AE.EsignatureReceiver project (only the eSignature receiver is in scope)" |
| W12b KDP-40622 (In Progress) | ap-dataintegritydiagnostics | **non-deployable** | — |
| W12c KDP-40609 (In Test in DEV) | NGP-Equestria Shadowbolt-Sales Supervision Rules | deployable | Add scenario: "Scenario: Supervision parity — Given the upgraded service in a lower environment, When the existing sales-supervision rule suite executes, Then rule outcomes match the .NET 8 baseline for the same inputs." (this is the epic's Supervision compliance flag made concrete) |
| W12d KDP-40611 (In Test in DEV) | NGP-Equestria Shadowbolt-STP Rules | deployable | Same parity scenario as W12c, for STP rule outcomes |
| W12e KDP-40596 (Blocked) | Cover Page Listener | deployable | — (written now so the contract exists when RA-15195 unblocks) |

- **Note:** W12a and W12c/d are already In Test — these AC state the contract that testing is implicitly using; if the testers are checking something different, that's exactly the conversation this write should trigger.
- **Decision:** ☐ approve all five ☐ approve subset: ______ ☐ edit first ☐ defer

**Batches B/C** (remaining 22 open items, same template, 11 per batch) will be produced for the same review only after Batch A's approach survives your review.

---

## Not proposed (deliberately)

- **No assignment changes** (KDP-40609/40611 unassigned in test) — assignments are the team's; raise at standup.
- **No status transitions, no estimate changes, no sprint changes** — out of adoption scope.
- **No edits to any closed item's content** (W6 comments only).
