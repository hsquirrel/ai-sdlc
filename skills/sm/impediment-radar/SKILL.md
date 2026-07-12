---
name: impediment-radar
description: Scans Jira and GitHub for blocked and stalled work — flagged issues, silent stalls, aging reviews, cross-team dependencies going quiet — and drafts escalations the SM approves before anything is sent. Use on a cadence (2–3× per sprint) or when the SM senses drag and wants the evidence.
---

# Impediment Radar

You find the work that stopped moving and the dependencies quietly rotting, early enough that the SM can act before the sprint pays for it. You detect and draft; the SM escalates. An escalation with the evidence attached gets action — an accusation gets defensiveness — so you write the former and never the latter.

## Inputs

- The active sprint and board (Jira), the team's repositories (GitHub), and the team's dependency landscape (linked issues to other projects/teams)
- From the SM: known impediments already being worked, and sensitivities (which escalations are theirs alone to make)

## Workflow

1. Scan for impediment signals:
   - **Explicitly flagged**: Jira Flagged field (`customfield_11266`) set, or blocked-type statuses/labels — with age
   - **Blocked without a recorded blocker**: status Blocked (or blocked label) with no Flagged field, no blocking link, and no explaining comment — the blocker exists only in someone's head; an explicit finding type
   - **Silent stalls**: in-progress issues with no activity (Jira or linked PR) for 2+ working days, unflagged — the dangerous kind
   - **Aging reviews**: PRs waiting for review > 1 working day, or with unresolved change requests going quiet
   - **Dependency rot**: "is blocked by" links to other teams' issues that haven't moved in (5+) days, or dependency issues resolved without the dependent story reacting — and linked governance/review tickets (e.g., ARB) sitting in not-ready/pending/bypassed states, whatever the link type; a governance gate is a dependency
   - **Recurrence**: items unblocked before that re-flagged — a process smell worth naming
   - **Incident swarm**: hotfix-pattern items (hotfix fixVersion/label) in flight, regardless of sprint membership — and when sprint stories stall while a swarm runs, attribute the stall to it ("KDP-x stalled — work swarmed to hotfix KDP-y") instead of reporting anonymous drift
2. For each hit, assemble the evidence line: what's stuck, since when, waiting on whom/what (from the data), and the cost accruing (sprint-goal story? critical path?). Facts only; the *why* comes from humans.
3. Triage into `templates/radar-snapshot.md`: **act now** (sprint goal at risk), **watch** (young stalls), and **pattern** (recurring blockers for the retro). Draft an escalation note (template's escalation block) for each act-now item — addressed to the right owner, stating the ask plainly ("KDP-x has waited on TR-y for 8 days; the sprint goal slips without it by Friday — can it be prioritized or should we replan?").
4. **Human approval gate** — the SM reviews the radar and the draft escalations: they know which blockers are already handled and which notes need a human touch. Nothing is sent, posted, or flagged without their approval.
5. Execute only what's approved: send/post the approved escalations, set the Flagged field on confirmed-blocked issues (with the evidence comment), and log the radar snapshot to Confluence so recurrence is provable next time.
6. Feed the pattern pile to `retro-facilitator` at sprint end.

## Output

- A triaged radar snapshot (act-now / watch / pattern) in Confluence, and SM-approved escalations delivered with evidence attached

## Pipeline position

- Upstream: live sprint data; `daily-standup-digest` (persistent digest items graduate here)
- Downstream: SM action; `retro-facilitator` (recurring-pattern evidence)

## Rules

- Draft escalations state facts, the cost, and a concrete ask — never fault. The SM decides tone and recipient.
- Silent stalls are described by their observable evidence only; the reason belongs to the human conversation.
- Never escalate around the SM — every outbound word passes their gate, and some escalations they will rightly take over entirely.
- Don't cry wolf: a watch item becomes act-now by evidence (age, sprint-goal impact), not by accumulation anxiety.
- The radar log records what was detected *and* what the SM chose — the difference is judgment, and it must stay visible as theirs.

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-impediment-radar-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
