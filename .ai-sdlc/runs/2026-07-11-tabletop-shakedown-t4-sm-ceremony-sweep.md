# Run Log: tabletop-shakedown — T4 SM ceremony sweep

**Started:** 2026-07-11 | **Operator:** jeremy.harrell77@gmail.com (via agent) | **Surface/model:** Claude Code / claude-fable-5 | **Skill version:** 2026-07-11 working tree
**Status:** complete (pending librarian approval of report)

> Hypothesis restated: explore **a live active sprint's full ceremony cycle** with **AP Blue's active sprint in KDP** to discover **which SM-skill data needs (velocity history, planning commitment record, flags, activity signals, sprint goal) are unavailable or dirty in the real instance** — i.e., what each of the 8 SM skills can and cannot compute from real data today.

Mode: live read-only. STRICTLY no Jira/Confluence writes. Blameless constraint: no individual named against any metric or stall.

## Context Gathered

| Source | Key / link | What was taken from it |
|--------|-----------|------------------------|
| skills/meta/tabletop-shakedown/SKILL.md + report template | repo | method + report format |
| templates/run-log.md | repo | this log's format |
| docs/shakedowns/2026-07-11-net10-tabletop.md | repo | exemplar rigor bar; prior findings on KDP-40426 |
| All 8 skills/sm/*/SKILL.md + 9 templates | repo | the rulebook under test (rules & template fields quoted in report) |
| JQL `project = KDP AND sprint in openSprints()` | 84 issues, 4 "active" sprints | AP Blue S89 subset (26 items): statuses, points, flags, AC, assignees, created/updated; zombie sprints "AP Modernization Q2S4" (ended 6/9) and "Release 1 - Sprint 20" (ended 2023-11-24) still active |
| JQL `sprint in closedSprints() AND resolved >= -12w` (2 pages, 200 most-recent-resolved) | KDP | per-sprint completed points: AP Blue S85=2, S86=11, S87=0, S88=12; 44/54 AP Blue resolved items unpointed (81%); resolutions incl. Cannot Reproduce / Won't Do mixed into "completed" |
| JQL `statusCategory = "To Do" ORDER BY rank` (top 100) | KDP | 54% stale >90d, median created-age 421d, top-20 rank = 1,000–1,571-day-old sub-tasks of defunct teams ("x_AC Core (DO NOT USE)", personal-named), 15/20 top story-level unestimated |
| JQL `cf[11266] is not EMPTY` (50 sampled, more exist) | KDP | Flagged field: 0 in-flight AP Blue uses; ~all hits are 2022–2024 Done/Closed relics with never-cleared flags |
| JQL `status = Blocked` (44 hits) | KDP | 0 in AP Blue S89; 2 in AP Red S89 (KDP-40444, KDP-39780); KDP-40596 still Blocked, now in no sprint; years-old Blocked rot |
| JQL labels in (retro-action, dor-needs-work, dor-ready, hygiene-archived) | KDP | zero hits — no pipeline vocabulary exists in the wild |
| Jira issue KDP-40397 (full, with comments/links) | KDP-40397 | 5 consecutive sprints (S85→S89), 0 pts, empty AC, 1 comment since May, quiet since sprint day 1; S87/S88 goals verbatim identical |
| CQL `text ~ "AP Blue"` last 16w (9 pages) | PMO/NDTW/NAO | PMO joint Sprint Review pilot agenda (DRAFT, edited 7/10) naming AP Blue; AP Blue Working Agreement (DRAFT); no AP Blue planning/retro/report pages |
| CQL retro/planning/goal title searches | PMO/NDTW/KS/SC/KDP spaces | AP Red retros with commitment-vs-delivery prose; QAA retro; PMO Sprint Planning + Sprint Retrospective standards; DAAP Sprint Goal Generator bot pages incl. 4 abandoned "test"/"trash" pages |

## Questions & Answers

| # | Question asked | Answer (verbatim) |
|---|----------------|-------------------|
| — | (none yet — read-only tabletop; no humans pinged per charter) | — |

## Drafts & Revisions

| Rev | What changed | Requested by |
|-----|--------------|--------------|
| 1 | Initial draft from templates/shakedown-report.md | — |

## Approval Gate

- **Presented:** full shakedown report `docs/shakedowns/2026-07-11-t4-sm-ceremony-sweep.md` (13 content findings, 8-skill readiness matrix, system proposals T4-S1…T4-S8) returned to the librarian via the launching agent
- **Decision:** pending — librarian decides which T4-S* proposals go to `skill-author` and whether content findings route to AP Blue's SM
- **Overrules / conditions:** scenario-backlog row update deferred to librarian (run constrained to two file writes)

## External Writes

| Action | Target | Result key / link |
|--------|--------|-------------------|
| none (read-only tabletop) | — | — |

## Outcome & Follow-ups

- Report written: `docs/shakedowns/2026-07-11-t4-sm-ceremony-sweep.md`. Readiness score: 1 skill fully runnable (backlog-hygiene-auditor, though it overwhelms its own approval ergonomics), 7 degraded, 0 cannot-run.
- 8 system proposals (T4-S1…T4-S8) queued for librarian → `skill-author`.
- Scenario backlog row update and content-finding routing: deferred to librarian per run constraints.
- Blameless constraint honored: no individual named against any metric or stall in the report.

## Improvement Notes

- **Query-size friction:** every project-wide JQL result overflowed to file (400–500KB each) because AC/description fields are huge; SM skills that query sprints should request minimal field sets and expect file-parse workflows. Worth a note in a shared Jira-access reference.
- **`openSprints()` is a trap** the tabletop itself nearly fell into — discovery must confirm board/team scope before any per-sprint math (became T4-S3).
- **Sprint-field archaeology is lossy:** an issue created 2026-07-07 carries the closed S88 sprint in its field (KDP-40776); commitment reconstruction must use changelogs, not field state (became T4-S2).
- **"Working days" ambiguity:** stall detection (2+ working days) required assuming a Mon–Fri calendar; the digest skill says "the team's working-day calendar" is an input but no skill says where that calendar lives.
- **statusCategory surprises:** KDP maps "Accepted" to To Do and "Deployed to QA"/"PO Validated" to Done — skills that count "done" by category get 10/26, by status name would get 6/26. A kdp-schema reference note would prevent silent miscounts.
- Template gap observed live: retro-pack's mandatory "Last Retro's Actions" lead has no first-run posture (became T4-S5); hygiene-report and radar-snapshot already carry "{date-or-first}" — the pattern should be uniform.
