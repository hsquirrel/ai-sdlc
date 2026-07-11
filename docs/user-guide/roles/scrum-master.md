# Scrum Master Guide

Eight skills in two families: **ceremony facilitators** that prep every scrum event and capture its outcomes, and **health monitors** that watch the sprint and backlog so you act on evidence, not vibes. Two principles run through all of them: the ceremony belongs to the team (skills prep and capture, never run the room), and monitors detect and draft — *you* escalate.

## Around the sprint

```
        ┌────────── daily-standup-digest (every morning) ──────────┐
        │                                                          │
refinement-facilitator ──► sprint-planning-facilitator ──► [SPRINT] ──► sprint-review-demo-facilitator ──► retro-facilitator
        ▲                                                     │
backlog-hygiene-auditor (weekly)              impediment-radar (2-3× per sprint) ──► sprint-report-generator
```

| Skill | Cadence | You approve | It writes |
|-------|---------|-------------|-----------|
| [refinement-facilitator](../skills/refinement-facilitator.md) | Before + after each refinement | Agenda; capture summary | Agenda post; estimates + decision comments |
| [sprint-planning-facilitator](../skills/sprint-planning-facilitator.md) | Before + at close of planning | Prep pack; commitment record | Planning pack; sprint population + summary |
| [daily-standup-digest](../skills/daily-standup-digest.md) | Each morning | The digest (or keep it private) | Optional channel/Confluence post |
| [impediment-radar](../skills/impediment-radar.md) | 2–3× per sprint | Every escalation, individually | Approved escalations; Flagged fields; radar log |
| [sprint-review-demo-facilitator](../skills/sprint-review-demo-facilitator.md) | Last days of sprint | Narrative + demo script | Review pack in Confluence |
| [sprint-report-generator](../skills/sprint-report-generator.md) | Sprint close / on demand | The report | Report in Confluence |
| [retro-facilitator](../skills/retro-facilitator.md) | Before + after retro | Data pack; action list | Retro pack; action tasks in Jira |
| [backlog-hygiene-auditor](../skills/backlog-hygiene-auditor.md) | Weekly / pre-refinement | Each cleanup action | Approved labels/closures; hygiene report |

## The guardrails that protect your team

- **Blameless by construction.** No metric is ever attached to a person's name. Digests describe work ("in progress 3 days, no linked PR"), never people. Retro data states *what* happened; the room owns *why*. If a skill's output wouldn't be safe to read aloud to the whole team, that's a bug.
- **Estimates and commitments are the team's.** The refinement facilitator captures estimates, never suggests them. The planning facilitator shows velocity as an evidence range — never a quota — and records the team's commitment even when it disagrees with the math.
- **Escalations pass through you.** The radar drafts evidence-based asks ("blocked 8 days on TR-y; goal slips Friday — prioritize or replan?"), but nothing is sent without your item-by-item approval, and some escalations you'll rightly take over entirely.
- **Honest reporting builds trust.** Reports separate facts from assessments, show scope changes with dates, and state carryover plainly. The demo facilitator won't script anything unverified in the demo environment.
- **Reversible cleanup.** The hygiene auditor proposes; you and the PO decide item by item. Archiving is close-with-label, never delete, and "keep" decisions are remembered so you aren't re-nagged.

## A working rhythm

- **Daily:** run the digest before standup; let standup be about its "worth discussing" list.
- **Weekly:** hygiene audit before refinement; refinement facilitator prep the day before the session.
- **Per sprint:** planning facilitator both ends of planning; radar mid-sprint and late-sprint; review pack + report + retro pack in the closing days. The three feed each other — the report's evidence becomes the retro's data pack.

## Handoffs

- The [PO pipeline](product-owner.md) produces the labeled, Ready backlog your prep reads; keep the PO honest about running the DoR critic.
- Radar patterns (recurring blockers) land in the retro pack automatically — the accountability loop from retro action → next retro's first agenda item is what makes retros compound.
