# Code Review Checklist

Dimensions for every review. Tune as team standards firm up — this file is the team's review bar.

## 1. Story alignment (first, always)

- Every AC has corresponding implementation *and* a test that exercises it.
- No undeclared scope: behavior changes no AC asked for are flagged (they may be fine — but the PO didn't agree to them).
- The PR links its Jira story; the title follows `{story-key}: description`.

## 2. Correctness

- Edge cases from the AC's Given clauses are actually handled (empty, null, unauthorized, concurrent).
- Error paths: what happens when the dependency call fails mid-operation? Partial-write behavior is deliberate.
- Async/await correctness (.NET: no sync-over-async, no fire-and-forget without intent; Node/TS: unhandled promise rejections).
- React: state updates that depend on previous state, effect dependency arrays, key stability in lists.

## 3. Tests

- New behavior = new tests; changed behavior = changed tests (a diff that changes logic but no tests is a finding).
- Tests assert outcomes, not implementation details or mock call counts.
- Negative-path tests exist for validation and authorization logic.

## 4. Security

- Input validation at trust boundaries; parameterized SQL only (no string-built queries).
- AuthZ checked at the endpoint/handler, not just hidden in the UI.
- No secrets, connection strings, or PII in code, logs, or test fixtures.

## 5. Data changes

- SQL Server: migrations are backward-compatible for the deployment window, indexed appropriately, and have a rollback path.
- Cosmos DB: partition-key implications of new queries (cross-partition scans flagged); document-shape changes tolerate old documents.
- No EF/data-access patterns that N+1 or table-scan on hot paths.

## 6. Maintainability & conventions

- Follows the surrounding code's patterns (naming, structure, error handling) — consistency beats preference.
- No dead code, commented-out blocks, or TODOs without an issue key.
- Public contracts (API DTOs, shared types) changed only with versioning/consumer impact stated in the PR description.
- Logging: enough to diagnose the new failure modes, no noisy per-item logs in loops.
