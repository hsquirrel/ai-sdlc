# Definition of Ready Checklist

The team's Definition of Ready. Items marked **[blocking]** force a "Not ready" verdict when failed; others produce "Ready with notes." Tune this file as the team matures — it is the single source of truth for readiness.

## Story framing

1. **[blocking] User story form** — "As a {role}, I want {capability}, so that {benefit}" with a real role (not "user" when a specific role exists) and a benefit that explains why anyone wants this.
2. **[blocking] Single vertical slice** — the story delivers something observable to a user or stakeholder; it is not a technical layer ("build the API", "update the schema") or a grab-bag of unrelated changes.
3. **Sized to a sprint** — plausibly completable within one sprint by the team; if clearly larger, recommend the split.

## Acceptance criteria

4. **[blocking] AC present and behavioral** — at least one acceptance criterion in the Acceptance Criteria field, in the house style (`AC#N: title`, Given/When/Then). Each AC describes observable behavior, not implementation.
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
