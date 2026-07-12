# Commitment Baseline: Reconstruction Recipe and Forward Fix

Shared procedure for every skill that needs "what did the team commit to at sprint start?" — sprint-planning-facilitator, sprint-report-generator, sprint-review-demo-facilitator, daily-standup-digest. Jira's sprint field shows *current* membership only; without a recorded baseline, committed-vs-delivered numbers are fabrications. This file defines the honest alternatives.

## Order of preference

1. **A real commitment record** — the planning facilitator's record mode output (Confluence commitment summary + the sprint populated at the boundary). If it exists, use it and cite it.
2. **Reconstruction** (no record exists): declare it — every artifact says "baseline reconstructed" and *how* — then:
   - For each issue currently or formerly in the sprint, read the **per-issue changelog** for sprint-field changes; an issue was committed if it entered the sprint at or before the sprint's start timestamp.
   - Issues added after start are scope additions (with dates); issues removed are descopes (with dates).
   - Compute committed points only from issues that were both present at start *and* pointed at start (points changed mid-sprint are noted).
3. **No changelog access** (some API surfaces): fall back to created-date heuristics (created after sprint start ⇒ addition) and say the baseline is a **lower-confidence estimate** — never present it as a record.

## Known pitfalls (observed in the live instance)

- **The sprint field lies**: KDP-40776 (created 2026-07-07) carries the *closed* S88 sprint in its field despite never running in it. Field state is a claim; the changelog is the evidence.
- **Unpointed completions**: when most completed items carry no points (AP Blue S85–S88: 81% unpointed), points-based committed/delivered is meaningless — use item throughput by type and label the points columns "not computable".
- **Zombie sprints**: `openSprints()` may return dead containers (one open since Nov 2023); always scope by board + team per the team operating record before reconstructing anything.

## The forward fix

Reconstruction is archaeology; the cure is the record. At the next sprint boundary, run `sprint-planning-facilitator` record mode — its commitment summary is the org's baseline from then on, and this recipe demotes to history for that team. Every reconstructed report should say so: "a commitment record at the next planning session makes this reconstruction unnecessary."
