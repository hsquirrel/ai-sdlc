# Run Log: atl CLI build — Phases 2–4 live write test

**Started:** 2026-07-14 | **Operator:** Claude (autonomous, per Jeremy's 2026-07-14 grant) | **Surface/model:** Claude Code / Fable 5 | **Skill version:** atl 0.1.0 @ e0cecdb+
**Status:** complete

> Required for any run that writes to Jira, Confluence, or GitHub. Update as steps complete, not retrospectively.

## Context Sources

| Source | Key / link | What was taken from it |
|--------|-----------|------------------------|
| Build plan | `docs/plans/2026-07-14-atlassian-cli-build-plan.md` | Phase 2 gate protocol: dry-run before every write, single test issue |
| Instance reference | `references/kdp-instance.md` | Issue type ids (Tech Managed - Non Deployable `12517`), label conventions |

## Approval

- **Presented:** dry-run payloads recorded below before each executed write
- **Gate tier:** standing (Jeremy, 2026-07-14: one clearly-named KDP test issue; all writes confined to it; commit-as-you-go)
- **Decision:** pre-approved under the standing grant
- **Overrules / conditions:** `link create` executed dry-run only — a live link writes to a second issue, which exceeds the single-issue scope. Flagged in Follow-ups.

## External Writes

Every write was preceded by a `--dry-run` payload review (recorded in the session transcript).

| Action | Target | Result key / link |
|--------|--------|-------------------|
| created issue (Tech Managed - Non Deployable, labels `atl-write-test`+`ai-sdlc-generated`, ADF description w/ table+code) | Jira KDP | KDP-40826 |
| edited issue (summary + label add) | Jira KDP-40826 | summary "[edited]", label `atl-edit-check` |
| added comments ×2 (markdown→ADF) | Jira KDP-40826 | comment 538203 + closing comment |
| added worklog (5m) | Jira KDP-40826 | worklog 124741 |
| transitions ×3 (Open→Blocked→Open→Closed, resolved by name) | Jira KDP-40826 | final status Closed |
| link create | — | **dry-run only** (single-issue scope) — payload verified, not executed |
| created page (markdown→ADF: headings, list, table, link) | Confluence NDTW under 9962946567 (authorized root) | page 9963241480 "atl CLI write test page" |
| updated page (version fetch-and-bump) | Confluence page 9963241480 | version 2 |

Agile + Confluence reads also live-verified (no writes): board get 269, sprint list (630 sprints paginated), sprint issues, backlog list (2,444 issues paginated), space list NDTW, page children/comments, CQL.

## Follow-ups & Improvement Notes

- `link create` live execution still needs a second sanctioned issue — dry-run verified only. Extend scope or accept as-is (payload is the simplest in the CLI).
- Live testing caught and fixed two real defects: UTF-8 BOM from PowerShell `Out-File` broke first-line heading parsing (fixed + regression test); `--out` was per-command (now global).
- KDP-40826 left in place (Closed, clearly labeled) as the standing write-test target for future atl regression checks.
