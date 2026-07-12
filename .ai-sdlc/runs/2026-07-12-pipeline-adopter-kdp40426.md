# Run Log: pipeline-adopter — KDP-40426 (.NET 10 upgrade epic)

**Started:** 2026-07-12 | **Operator:** Jeremy Harrell (epic reporter/owner — approver) | **Surface/model:** Claude Code / Fable 5 | **Skill version:** library @ e387296
**Status:** in progress — at the approval gate

## Context Gathered

| Source | Key / link | What was taken from it |
|--------|-----------|------------------------|
| T1 shakedown report | docs/shakedowns/2026-07-11-net10-tabletop.md | Pre-verified gap list (12 content findings) |
| Fresh child sweep (2026-07-12) | parent = KDP-40426 | 46 children; statuses unchanged since T1; **27 open children without AC** (3 closed ones excluded); 0 labels anywhere; KDP-40596 still Blocked/unflagged; KDP-40609/40611 in test unassigned; KDP-40497 PO Validated with resolution unset |
| Epic (from T1 gather) | KDP-40426 | Background = house brief; Requirements = SR block + compliance flags; description scope lists incl. XmlHubErrors drift + cut-off bullet; AC field empty; no parent; due 2026-09-30 |
| Confluence (from T1) | NDTW 9932603417, 9916121089 | ".NET 10 Upgrades: Notes", "API Testing Documentation" — both unlinked from the epic |
| Initiative candidate (from T2) | TR-8 | "Advisor Platform Modernization", In Progress — evident parent candidate |

## Questions & Answers

| # | Question asked | Answer (verbatim) |
|---|----------------|-------------------|
| 1 | (User directive) | "go" — approving audit sweep, adopter build, and adoption run on KDP-40426 with the user at the gate |
| 2 | Reconciliation plan tier approvals | *(pending — detailed proposed-writes doc delivered for review 2026-07-12)* |
| 3 | (W4 caveat: is "PO Validated" terminal for KDP-40497?) | "You asked if PO Validated is a terminal status. It is not. Are you able to inspect the status workflows for the various story types?" |

## Drafts & Revisions

| Rev | What changed | Requested by |
|-----|--------------|--------------|
| 1 | Reconciliation plan drafted: docs/adoptions/2026-07-12-kdp40426-reconciliation.md | — |
| 2 | Every write expanded verbatim for detailed review (W1–W12, incl. full Batch A AC text and parity scenarios): docs/adoptions/2026-07-12-kdp40426-proposed-writes.md | Jeremy: "I would like to review all of your suggested changes in a .md file. Can you write out your exact proposals for my detailed review?" |

## Approval Gate

- **Presented:** the tiered reconciliation plan (Tier 1 metadata ×6, Tier 2 content ×4, Tier 3 AC-backfill campaign 27 items in 3 batches, registry seeding) — every item with its exact write.
- **Decision:** *(pending)*

## External Writes

| Action | Target | Result key / link |
|--------|--------|-------------------|
| *(none yet — nothing before the gate)* | | |

## Outcome & Follow-ups

- *(pending)*

## Improvement Notes

- **W4 withdrawn — and the premise error generalized into a rule.** The adopter trusted `statusCategory=Done` as "terminal"; the owner knew better, and 7 transitions-API samples confirmed: PO Validated and Ready to Deploy To QA are done-category *waypoints*. Schema now carries the empirical workflow map + the "delivered = resolution set" rule; release-notes and demo skills corrected. The gate did exactly its job: a wrong write died in review instead of landing in Jira.

- Large-result MCP handling again required file parsing for a 46-child sweep; a deterministic bulk-read script remains worth building.
- The adopter's plan needed an "owner action (no write)" category (unassigned in-test items — assignment is the team's, not ours); the template gets a row type for it.
