# sprint-radar (Scrum Master)

One signal engine, two views. **Daily mode** is a one-screen pre-standup digest of what moved and what's worth discussing. **Escalation mode** (2–3× per sprint) triages blocked and stalled work into act-now / watch / pattern and drafts evidence-backed escalations. Both read the same signals: flags (verified — a flag is a claim, not a fact), blocked-without-a-recorded-blocker, silent stalls (in progress, no activity 2+ working days), aging PR reviews, CI red on main, scope changes, dependency and governance rot, hotfix swarms, unanswered questions, recurrence.

## When to run it

- Daily mode: each morning before standup
- Escalation mode: mid- and late-sprint on rhythm, or whenever you sense drag and want the evidence

## What it asks of you

- The active sprint/board; the team operating record for scoping. No repo registry yet → it runs Jira-only and says so in a banner ("PR/CI signals unavailable — stall and review detection is partial") rather than silently omitting sections
- Escalation mode: which impediments are already being worked, and which escalations are yours alone to handle

## What happens at the gate

- **Daily: standing.** You approve format, destination, and thresholds once per sprint; daily runs then post automatically with the run log as audit. Re-triggers to per-run on the first hotfix swarm of the sprint, a never-seen finding type, or anything you marked sensitive. Private-prep mode (no posting) is always valid. The standing approval is re-confirmed at each sprint boundary.
- **Escalation: per-item.** You review the snapshot and each draft escalation individually; nothing is sent, posted, or flagged without your approval.

## What it writes and where

- Daily: the digest — *Moved*, *Worth discussing*, *Sprint pulse* against the commitment record — posted where the team reads it; same-day re-runs replace, never stack
- Escalation: approved escalations delivered with evidence attached, the Flagged field set on confirmed-blocked issues (with an evidence comment), and the snapshot logged to Confluence so recurrence is provable; the pattern pile feeds [sprint-close](sprint-close.md)'s retro pack

## What it will never do

- Comment on people — signals describe work ("KDP-40811 in progress 3 days, no linked PR"), everything must be safe to read aloud
- Infer *why* something stalled — it states the observable fact; humans say the why
- Ping or assign anyone — nudging humans is your craft
- Cry wolf — a watch item becomes act-now by evidence (age, sprint-goal impact), not accumulation anxiety

## Good to know

Draft escalations state the ask plainly: "KDP-x has waited on TR-y for 8 days; the sprint goal slips without it by Friday — prioritize or replan?" The snapshot records what was detected *and* what you chose — the difference is judgment, and it stays visibly yours.
