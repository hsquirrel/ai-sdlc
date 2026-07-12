# Definition of Ready Checklist

The team's Definition of Ready. Items marked **[blocking]** force a "Not ready" verdict when failed; others produce "Ready with notes." Tune this file as the team matures — it is the single source of truth for readiness.

## Story framing

1. **[blocking] Framing fits the type** — `Story`: "As a {role}, I want {capability}, so that {benefit}" with a real role (not "user" when a specific role exists) and a benefit that explains why anyone wants this. `Tech Managed - Deployable/Non Deployable`: a clear objective (what changes) plus how completion is verified — user-story costume optional. `Spike Story`: the question to answer and a timebox.
2. **[blocking] Single independently-verifiable slice** — the item delivers something observable and verifiable on its own: user-visible for product stories; an independently deployable/verifiable component for engineering work (per-repo/per-service is fine there). Never a grab-bag of unrelated changes.
3. **Sized to a sprint** — plausibly completable within one sprint by the team; if clearly larger, recommend the split.

## Acceptance criteria

4. **[blocking] AC present and verifiable** — at least one acceptance criterion in the Acceptance Criteria field. Behavioral AC describe observable outcomes, not implementation; Tech Managed items may instead carry objective completion checks (build passes, scan clean, deploy verified). House style (`AC#N: title`, Given/When/Then) is preferred — substantively sound AC in another recognizable format (e.g., `Scenario:` Gherkin) pass with a style *suggestion*, never a blocking failure.
5. **[blocking] AC testable without invention** — a tester or coding agent could write test cases from the AC alone, without inventing inputs, outcomes, or edge-case behavior. Vague qualifiers ("correctly", "gracefully", "fast", "user-friendly") fail this item.
6. **Negative and edge cases** — error paths, empty states, and boundary conditions that obviously apply are covered by AC or explicitly deferred with a reason.
7. **NFR block where relevant** — data contracts, audit logging, security, observability, or retention needs are stated as structured requirements in the description (not as Gherkin), or explicitly not applicable.

## Context and dependencies

8. **[blocking] No blocking open questions** — the story has no unresolved question that changes its behavior or scope. Non-blocking questions are listed with an owner.
9. **Traceability** — the story has a parent Epic; the Epic traces to an Initiative or brief item. Orphan stories need a stated reason.
10. **Dependencies identified** — known dependencies on other stories, teams, or systems are linked in Jira or listed, with sequencing noted.
11. **Design assets linked** — user-facing stories link the relevant design artifact (Lucidchart/Lucidspark, mockup, or Design Story); or state that no design is needed and why.

## Contradiction scan (across the reviewed set)

12. **[blocking] No contradictions** — the story does not contradict a sibling story's AC, its Epic's description, or the brief (e.g., two stories defining different behavior for the same action).
13. **[blocking] Single ownership (duplication scan)** — within the reviewed set, each behavior has exactly one owning story. Compare **AC bodies, not summaries**: verbatim or near-verbatim AC overlap between stories (the two-slicing-generations pattern) is a blocking set finding, reported with a proposed survivor and a supersession action for the other (close as superseded, or a `split to` link) — gated on the PO like everything else.

## Hotfix express contract (replaces items 1–12 for hotfix items)

For items on the hotfix express lane (label `hotfix` / hotfix fixVersion), the full checklist's ceremony is what gets skipped under pressure — so it isn't asked for. These four items are, and all are **[blocking]**; the whole check takes minutes:

- **H1. Repro documented** — the failure's minimal reproduction (or triggering condition) is on the ticket.
- **H2. Expected behavior cited** — from the regressed story's AC; if no citable AC exists, the ticket carries an explicit contract-debt note, not a blank.
- **H3. Rollback path stated** — how the fix is backed out if it makes things worse; "fix forward" is stated as a decision with a reason.
- **H4. Regression check named** — the test or monitor that proves this incident's scenario can't silently return.
