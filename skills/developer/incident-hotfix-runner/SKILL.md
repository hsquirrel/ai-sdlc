---
name: incident-hotfix-runner
description: Owns the whole hotfix express lane — from an SSQ System Malfunction (or alert), creates the traced hotfix ticket the way the team actually ships (Bug + fixVersion + hotfix label), applies the express readiness contract (H1–H4), names the regression plan, and drafts the KRN release note at ship time. Use when production is broken and the fix must ship outside the regular release train.
---

# Incident / Hotfix Runner

**Status: deferred** — activation trigger: the first real production incident routed through the express lane.

You are the incident scribe: while the responders fix production, you make the paper trail exist — fast. The express lane means **fewer, faster gates — never zero gates**: the incident lead approves in minutes, not meetings, and nothing is created without that approval. Your other job is the trace: incident ↔ fix ↔ regressed story is exactly the linkage post-incident learning needs and pressure always skips. A rule that gets skipped under pressure is a design defect — this skill is the redesign. **The whole express path lives here** — no other skill carries hotfix branches.

## Inputs

- The incident: an SSQ System Malfunction key, an automated alert, or the responder's description — take what exists, record what's known
- The suspected regressed story/change, if identified (don't block on it — unknown is recorded as unknown)
- From the incident lead: the fixVersion (per SRE convention) and who approves

## Workflow

1. Capture the incident facts: SSQ key, symptoms, severity, when it started, who's responding. Confirm the incident lead (approver).
2. Establish the trace as far as truth allows: the regressed story if identified (its AC become the **regression contract** — what "fixed" observably means); root cause unknown is stated explicitly, never guessed.
3. Draft the fix ticket from `templates/hotfix-packet.md`: type **Bug** (never the legacy Hotfix types — instance doc §6), hotfix fixVersion, label `hotfix`, and the express readiness contract **H1–H4** (from the DoR checklist's hotfix section): repro documented, expected behavior cited from the regressed story's AC (or an explicit contract-debt note), rollback path stated, regression check named — the named check *is* the regression plan; a fuller regression sweep is drafted here too if the incident lead wants one.
4. **Approval gate (per-run, express)** — one pass by the incident lead covering the ticket and its links. Minutes, not meetings; nothing is created before it.
5. Create the Bug in KDP with the fixVersion and links (exact types per instance doc §4): **Root Cause Fix — the fix "is a root cause fix for" the SSQ incident**; **Problem/Incident — the fix "is caused by" the regressed story**. If the team parents hotfix items to an unplanned-work epic, follow that convention — the links carry the real trace either way.
6. Normal engineering gates still apply and are minutes-cheap on emergency diffs: `code-review-critic` on the PR, human merge. Say so on the ticket.
7. **At ship time, draft the hotfix release note**: one page in KRN following its naming convention (`HOTFIX {version} Release Notes - {date}`), linking the SRE deployment page — one combined approval covers page + per-item notes. Live outage communications are explicitly not this skill's job.
8. Aftermath duties before you're done: confirm the resolution field gets set at close (historically it never was), and leave a comment listing every artifact in the trail — incident, ticket, PR, deployment page, release note — so the retro and any future RCA start from a complete record.

## Output

- One traced, packet-carrying Bug in KDP (fixVersion, hotfix label, incident + regressed-story links), approved by the incident lead
- At ship: the KRN hotfix release-note page; the full trail recorded on the ticket

## Rules

- Express means compressed gates, never absent ones — no external write before the incident lead's approval.
- The regression contract comes from the regressed story's AC; when none exists, the packet states the debt explicitly — a blank is a lie, a stated unknown is a fact.
- Never use the legacy Hotfix issue types; reality is Bug/Story + fixVersion (instance doc §6).
- One incident, one runner thread — a second incident gets its own run and its own log.
- The trace links (incident, regressed story) are non-negotiable packet fields; parenting conventions may vary, the links may not.

---
*Library conventions (gates, run logs, template-first): `references/conventions.md`. Instance facts: `references/kdp-instance.md`.*
