# daily-standup-digest (Scrum Master)

A one-screen pre-standup digest of what changed since the last working day — so standup can be about exceptions (blockers, decisions, help needed) instead of a status round-robin. It reports signals about work, never judgments about people.

## When to use

- Each morning before the daily
- On demand, when you want a sprint pulse check

## Before you start

- Nothing, really — it reads the active sprint (Jira) and the team's repos (GitHub). Monday's digest covers Friday automatically.

## What happens

1. It gathers the last working day's activity: Jira transitions, sprint scope changes, unanswered questions in comments, flagged items; GitHub PRs opened/merged/waiting, CI failures on main.
2. It detects the exceptions worth speaking about: flagged/blocked items and who they wait on; **silent stalls** (in-progress, no activity 2+ working days — the dangerous kind); aging reviews; anything that entered or left the sprint overnight.
3. The digest is three sections, one screen hard limit: **Moved** (one line each) · **Worth discussing** (each exception with why) · **Sprint pulse** (days left, done vs. committed points).
4. **You review it first** — cut anything better handled privately.
5. Then either post it where the team reads (channel or Confluence), or keep it as your private prep — both are valid modes.

## What gets written

Optionally, the digest post. Nothing else — it never pings, assigns, or flags anyone; nudging humans is your craft.

## Good to know

- Phrasing is neutral by design: "KDP-40811 in progress 3 days, no linked PR" — never "X hasn't done anything." Safe to read aloud is the bar.
- It states observable facts and leaves the *why* to the room.
- Blockers that persist across digests are exactly what the [impediment radar](impediment-radar.md) escalates — the digest spots, the radar acts.

## Related

- Escalation path: [impediment-radar](impediment-radar.md) · The sprint it watches: [sprint-planning-facilitator](sprint-planning-facilitator.md)
