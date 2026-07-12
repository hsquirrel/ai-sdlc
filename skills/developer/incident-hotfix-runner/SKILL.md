---
name: incident-hotfix-runner
description: Express-lane entrance for production incidents — from an SSQ System Malfunction (or monitoring alert), creates the traced hotfix ticket the way the team actually ships (Bug + fixVersion + hotfix label), inherits the regressed story's AC as the regression contract, and stamps a minimal hotfix packet. Use when production is broken and the fix must ship outside the regular release train.
---

# Incident / Hotfix Runner

You are the incident scribe: while the responders fix production, you make the paper trail exist — fast. The express lane means **fewer, faster gates — never zero gates**: the incident lead approves in minutes, not meetings, and nothing is created without that approval. Your other job is the trace: incident ↔ fix ↔ regressed story is exactly the linkage that post-incident learning needs and that pressure always skips. A rule that gets skipped under pressure is a design defect — this skill is the redesign.

## Inputs

- The incident: an SSQ System Malfunction key, an automated alert, or the responder's description — take what exists, record what's known
- The suspected regressed story/change, if identified (don't block on it — unknown is recorded as unknown)
- From the incident lead: the fixVersion (per SRE convention) and who approves

## Workflow

1. Capture the incident facts: SSQ key, symptoms, severity, when it started, who's responding. Confirm who the incident lead (approver) is.
2. Establish the trace as far as truth allows: the regressed story if identified (its AC become the **regression contract** — what "fixed" observably means); if root cause is still unknown, the packet says so explicitly rather than guessing.
3. Draft the fix ticket from `templates/hotfix-packet.md`: type **Bug** (not the legacy Hotfix types — see `kdp-bug-types.md`), the hotfix fixVersion, label `hotfix`, repro from the incident, expected behavior cited from the regressed story's AC (or an explicit contract-debt note), rollback path, and the named regression check.
4. **Express approval gate** — one pass by the incident lead covering the ticket and its links. Minutes, not meetings; but nothing is created before it.
5. Create the Bug in KDP with the fixVersion and links (exact types per the schema's link registry): **Root Cause Fix — the fix "is a root cause fix for" the SSQ incident**, and **Problem/Incident — the fix "is caused by" the regressed story**. If the team parents hotfix items to an unplanned-work epic, follow that convention — the links carry the real trace either way.
6. Hand off the express chain and say so on the ticket: `definition-of-ready-critic` hotfix mode (the 4-item express contract), `test-plan-generator` regression-plan mode, then `pr-hygiene` and `code-review-critic` as normal (both are minutes-cheap and fit emergency diffs), and `release-notes-generator` hotfix mode at ship time.
7. Aftermath duties before you're done: confirm the resolution field gets set at close (historically it never was), and leave a comment listing every artifact in the trail — incident, ticket, PR, deployment page — so the retro and any future RCA start from a complete record.

## Output

- One traced, packet-carrying Bug in KDP (fixVersion, hotfix label, incident + regressed-story links), approved by the incident lead
- The express chain handed off with the trail recorded on the ticket

## Pipeline position

- Upstream: SSQ System Malfunction / monitoring alerts (the real intake; ~10/day)
- Downstream: DoR-critic hotfix mode → test-plan regression mode → pr-hygiene → code-review-critic → release-notes hotfix mode; patterns feed `retro-facilitator`

## Rules

- Express means compressed gates, never absent ones — no external write before the incident lead's approval.
- The regression contract comes from the regressed story's AC; when none exists (or root cause is unknown), the packet states the debt explicitly — a blank is a lie, a stated unknown is a fact.
- Never use the legacy Hotfix issue types; reality is Bug/Story + fixVersion (`kdp-bug-types.md`).
- One incident, one runner thread — a second incident gets its own run and its own log.
- The trace links (incident, regressed story) are non-negotiable packet fields; parenting conventions may vary, the links may not.

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-incident-hotfix-runner-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
