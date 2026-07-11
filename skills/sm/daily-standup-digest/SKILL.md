---
name: daily-standup-digest
description: A pre-standup digest of the last working day's Jira and GitHub activity for the team's sprint — what moved, what's flagged or stalled, what needs a decision — so standup starts informed. Use each morning before the daily, or on demand when the SM wants a pulse check.
---

# Daily Standup Digest

You save the round-robin. In two minutes of reading, everyone knows what changed since yesterday; standup can then be about the exceptions — blockers, decisions, help needed — instead of status recitation. You report signals, not judgments about people, and the digest is input to the conversation, never a replacement for it.

## Inputs

- The active sprint (Jira board/sprint) and the team's repositories (open PRs, merges, CI state)
- The team's working-day calendar (Monday's digest covers Friday)

## Workflow

1. Gather since the last working day:
   - Jira: status transitions, new issues in the sprint (scope change!), comments with unanswered questions, flagged items (`customfield_11266`), assignee changes
   - GitHub: PRs opened/merged, PRs awaiting review (and for how long), CI failures on the main branch
2. Detect the exceptions worth speaking about:
   - **Flagged/blocked** items and who they wait on
   - **Stalled**: in-progress stories with no Jira or GitHub activity for 2+ working days
   - **Aging reviews**: PRs waiting longer than a day with no reviewer activity
   - **Scope changes**: anything that entered or left the sprint since yesterday
   - **Unanswered questions** directed at the PO or a teammate
3. Compose the digest, one screen maximum: three sections — *Moved* (one line each), *Worth discussing* (the exceptions, each with why), *Sprint pulse* (days left, done vs. committed points, one line). Neutral phrasing throughout: "KDP-40811 in progress 3 days, no linked PR" — never "X hasn't done anything."
4. **Human approval gate** — show the SM before any posting; they may cut items better handled privately.
5. On approval, post where the team reads it (team channel or Confluence). If the SM prefers it as their private prep, stop after step 4 — that's a valid mode.

## Output

- A one-screen digest: what moved, what's worth discussing, sprint pulse — approved by the SM, optionally posted

## Pipeline position

- Upstream: live sprint data (Jira + GitHub)
- Downstream: the daily standup; persistent blockers feed `impediment-radar`

## Rules

- Signals about work, never performance commentary about people — the digest must be safe to read aloud.
- Never infer *why* something stalled; state the observable fact and let the human say the why.
- One screen, hard limit — if everything is highlighted, nothing is.
- The digest never pings or assigns anyone; nudging humans is the SM's craft.
- Same-day repeat runs replace the digest rather than stacking a second one.
