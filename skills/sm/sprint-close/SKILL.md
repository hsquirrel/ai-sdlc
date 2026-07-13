---
name: sprint-close
description: Closes the sprint's information loop — a stakeholder report (flow metrics first, honest numbers or none), a blameless retro data pack, action-item capture into Jira, and the system scoreboard. Use at sprint close; report mode also serves mid-sprint when leadership asks for status.
---

# Sprint Close

You turn a finished sprint into three honest artifacts from one data pull: the stakeholder report, the retro's evidence pack, and the captured actions. Honesty is the product — a sideways sprint reported plainly builds more credibility than a wall of green. Numbers describe the team's flow, never individuals, and every number traces to a Jira query.

## Inputs

- The sprint (closing or in-flight): the commitment record from `sprint-planning-facilitator` when it exists — otherwise the baseline is reconstructed and declared (instance doc §8)
- History: the last 3–6 sprints for trend context; the previous retro's action items; `sprint-radar`'s pattern pile
- From the SM: audience (team lead? leadership? PMO?), context a query can't show, and (capture mode) the action items the team agreed to

## Workflow — Report

1. Pull the sprint's facts: committed vs. completed, scope changes with dates, carryover and its state, bugs opened against sprint work, the goal's fate. Hotfix-pattern items worked during the sprint count as scope invasion **even off-board** — otherwise the sprint's biggest disruption is invisible in its own report. Delivered = terminal status per the instance doc §5, never statusCategory alone.
2. Compute trends — **flow metrics are the primary evidence**: item throughput by type, changelog cycle time (flag items sitting unusually long in one status, especially the validation states), carryover rate, unplanned-work share. Points appear as corroboration only where the team maintains them (below ~60% pointed coverage: "points not computable — {n}% unpointed"). Velocity, when shown, is a range with history — never a target, promise, or cross-team comparison.
3. Append the **system scoreboard** (four numbers, same queries every sprint, trend against last time):
   - % of sprint-entering items with AC (per the team's recorded type conventions)
   - Bug non-fix closure rate in the team's area (Not An Issue / Cannot Reproduce / Duplicate / Declined)
   - Median cycle time through the validation states (In PO Validation → terminal)
   - Hotfix trace completeness (incident ↔ fix ↔ regressed-story links present)
4. Draft from `templates/sprint-report.md`, audience-calibrated: leadership gets outcome and risk in plain language; the team's copy carries the tables. Facts and assessments visually separated ("5 of 8 done" vs. "delivery risk: medium — assessment"); scope changes always show *when*. An optional **demo agenda** section (`templates/demo-agenda.md`) lists what's demoable with suggested order and owners — items flagged "needs verification by the team," never fake click-paths.
5. **Approval gate (per-run)** — the SM reviews; their narrative corrections go in attributed as SM context. On approval, publish to Confluence and link from the sprint.

## Workflow — Retro pack (before the retro)

6. Assemble evidence into `templates/retro-pack.md`, each item neutral with its source — no adjectives, no causes; causes are the team's job. Lead with the previous retro's action items, honestly: done / in progress / not started / quietly forgotten. First run: search for prior retro artifacts (`retro-action` label) and say what was found; none → "no prior retro record found — this pack establishes the baseline," never an empty table pretending history was clean.
7. Add 2–3 discussion prompts derived from the data, phrased as questions, never conclusions. At most ~7 evidence items — a wall of metrics is how nothing gets discussed.
8. **Approval gate (per-run)** — the SM reviews; anything better raised in person comes out. On approval, share per the team's retro ritual. The retro conversation itself belongs to the team.

## Workflow — Action capture (after the retro)

9. From the SM's notes, extract the agreed actions: what, owner, by when, how the team will know it happened. An action without an owner and a check is recorded as a wish and flagged as such.
10. **Approval gate (per-run)** — SM confirms the list. On approval, create each action as a Jira task (`retro-action` label, owner, due date), link the retro page, and update the pack so next retro's step 6 finds them.

## Output

- An approved sprint report (flow metrics, scoreboard, optional demo agenda) in Confluence
- A blameless retro data pack; this retro's actions in Jira with owners and dates

## Rules

- No individual's name attached to any metric — "the team completed" is the only subject.
- Never record or summarize the retro discussion itself — only the actions the team chose to make public.
- Reconstructed baselines are declared with their method, and every reconstructed report says it: a commitment record at the next planning session ends the archaeology.
- Scope the sprint per the team operating record (board + team field + name pattern) — raw `openSprints()` contains other teams and zombie containers.
- Never let the report imply causes the data doesn't show; the SM's context goes in attributed.

---
*Library conventions (gates, run logs, template-first): `references/conventions.md`. Instance facts: `references/kdp-instance.md`.*
