# Scrum Master Guide

Four skills around the sprint: a **planning facilitator** at both ends of planning, a **radar** watching the sprint's flow, a **close** skill that turns the finished sprint into honest artifacts, and a **hygiene auditor** keeping the backlog alive. Two principles run through all of them: the ceremony belongs to the team (skills prep and capture, never run the room), and monitors detect and draft — *you* decide and escalate.

## Around the sprint

```
sprint-planning-facilitator ──► [SPRINT] ──► sprint-close (report + retro pack + actions)
   (prep, then record)              │
                        sprint-radar: daily digest (every morning)
                        sprint-radar: escalation mode (2–3× per sprint)

backlog-hygiene-auditor: sweep on cadence · epic-closeout mode at the moment an epic closes
```

| Skill | Cadence | Gate tier | It writes |
|-------|---------|-----------|-----------|
| [sprint-planning-facilitator](../skills/sprint-planning-facilitator.md) | Before planning (prep) and at its close (record) | per-run | Planning pack; sprint populated + commitment summary in Confluence |
| [sprint-radar](../skills/sprint-radar.md) — daily | Each morning before standup | **standing** (re-confirmed each sprint) | One-screen digest where the team reads it (or your private prep) |
| [sprint-radar](../skills/sprint-radar.md) — escalation | 2–3× per sprint, or when you sense drag | **per-item** | Approved escalations, Flagged fields with evidence, snapshot to Confluence |
| [sprint-close](../skills/sprint-close.md) | Sprint close (report mode also serves mid-sprint status asks) | per-run | Report + retro pack in Confluence; retro actions as Jira tasks |
| [backlog-hygiene-auditor](../skills/backlog-hygiene-auditor.md) | On cadence; **closeout mode the moment an epic is being closed** | **per-item** | Approved labels/closures/merge links; hygiene report in Confluence |

## What you decide at each gate

- **Planning prep**: you review the capacity math (it shows its inputs so the room can correct it) and the draft goals. **Record mode is the keystone** — the commitment record it captures is the baseline every other sprint skill depends on; running it at the boundary ends baseline archaeology.
- **Radar daily**: you approve format, destination, and thresholds once per sprint; digests then post automatically under the standing approval. The first hotfix swarm of a sprint, a never-seen finding type, or anything you marked sensitive re-triggers the per-run gate. Private-prep mode (no posting) is always valid.
- **Radar escalation**: you review every draft escalation individually — you know which blockers are already being handled and which notes need a human touch. Nothing is sent, posted, or flagged without you.
- **Sprint close**: you review the report (your narrative corrections go in *attributed as SM context*), the retro pack (anything better raised in person comes out), and the action list. The retro conversation itself is never recorded — only the actions the team chose to make public.
- **Hygiene**: you and the PO decide item by item (bulk-approve per category is yours to grant). "Keep" decisions are recorded so the next audit doesn't re-nag. Closeout mode is a minutes-long go/no-go on one epic — run it *when* you're about to close it, not weeks later.

## The guardrails that protect your team

- **Blameless by construction.** No metric is ever attached to a person. Digests describe work ("in progress 3 days, no linked PR"), never people; the radar never infers *why* something stalled and never pings anyone. If output wouldn't be safe to read aloud to the whole team, that's a bug.
- **Honest numbers or none.** Flow metrics (throughput, cycle time, carryover) lead; points appear only where the team's data supports them — below ~60% pointed coverage you get "not computable," never a fabricated velocity. Velocity is always a range, never a quota, never compared across teams. The team's commitment is final even when it disagrees with the math.
- **Declared degradation.** No repo registry means the digest opens with "Jira-only run: PR/CI signals unavailable" instead of silently omitting sections. Reconstructed baselines say so, with their method.
- **Reversible cleanup.** Archiving is close-with-label, never delete.

## A working rhythm

Daily: digest before standup — let standup be about its "worth discussing" list. Mid-sprint and late-sprint: escalation mode. On cadence: hygiene sweep. Sprint boundary: close the loop (report → retro pack → action capture), then planning prep and record. The radar's pattern pile feeds the retro pack automatically — recurring blockers become retro evidence without you re-collecting them.
