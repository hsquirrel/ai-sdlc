# impediment-radar (Scrum Master)

Finds work that stopped moving — flagged blocks, silent stalls, aging reviews, cross-team dependencies going quiet — early enough to act, and drafts evidence-based escalations that **you** approve and own. It detects and drafts; you escalate.

## When to use

- On cadence, 2–3× per sprint (mid-sprint and late-sprint catch most drag)
- When you sense the sprint dragging and want the evidence

## Before you start

- Tell it what's already being handled and which escalations are yours alone to make — it respects both

## What happens

1. It scans for: explicitly **flagged** issues (Jira's Flagged field) with age; **blocked without a recorded blocker** (status Blocked but no flag, no blocking link, no explaining comment); **silent stalls** (in-progress, no Jira/PR activity 2+ days, *unflagged* — the dangerous kind); **aging reviews** (PRs waiting 1+ day, or change requests gone quiet); **dependency rot** ("blocked by" links that haven't moved, resolved dependencies never reacted to, and governance/review tickets like ARB sitting in not-ready/pending states — a governance gate is a dependency); and **recurrence** (re-flagged items — a process smell).
2. Each hit becomes an evidence line: what's stuck, since when, waiting on whom/what, and the cost accruing (sprint-goal story? critical path?). Facts only — the *why* comes from humans.
3. Triage: **act now** (goal at risk) / **watch** (young stalls) / **pattern** (recurring, for the retro). Act-now items get a drafted escalation with a concrete ask: "KDP-x has waited on TR-y for 8 days; the goal slips Friday — prioritize, or should we replan?"
4. **You approve each escalation individually** — some you'll edit, some you'll take over entirely, and nothing is sent, posted, or flagged without you.
5. It executes only what you approved: sends the escalations, sets the Flagged field (with the evidence comment) on confirmed blocks, logs the snapshot to Confluence so recurrence is provable next time.

## What gets written

Approved escalations; Flagged fields with evidence comments; the radar log in Confluence.

## Good to know

- Escalations state facts, cost, and an ask — never fault. Evidence gets action; accusation gets defensiveness.
- A watch item is promoted by evidence (age, goal impact), not by accumulation anxiety — it won't cry wolf.
- The log records what was detected *and* what you chose — the difference is your judgment, kept visible as yours.

## Related

- Feeder: [daily-standup-digest](daily-standup-digest.md) (persistent items graduate here) · Consumer: [retro-facilitator](retro-facilitator.md) (the pattern pile)
