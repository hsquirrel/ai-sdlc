# backlog-hygiene-auditor (Scrum Master)

The backlog's gardener, not its owner. **Sweep mode** runs the recurring decay scan — stale items, likely duplicates, orphans, zombie epics, closure-integrity violations, dead process registers, dependency and governance rollups — and proposes one action per finding. **Epic-closeout mode** is the blocking, minutes-long check of a single epic at the moment you're about to close it; running it *then* is what this mode exists for — detect-after is what it replaces.

## When to run it

- Sweep: on a regular cadence, or whenever the backlog feels unmanageable
- Closeout: the moment an epic is being closed — not weeks later

## What it asks of you

- Sweep: the scope (project or board) and threshold tweaks if the defaults (stale = 90 days, top-20 unestimated, etc.) don't fit your team
- Closeout: the epic key
- Your decisions, item by item — an item that looks dead to a query may be someone's regulatory commitment

## What happens at the gate (per-item)

It walks you (and the PO) through the proposals — sorted easiest-decision-first, so half clear in ten minutes. You decide item by item; bulk-approve per category is yours to grant. Anything kept over its proposal gets its reason recorded so the next audit doesn't re-flag it. On a badly decayed backlog (roughly >30 findings) it switches to scale mode: category-level bulk proposals with sampled evidence and a per-item exception path — triage, not five hundred line items.

## What it writes and where

- Only approved actions: `hygiene-archived` close-with-label (reversible), merge links, close-with-comment, routing comments — each naming the audit date and approver role
- The hygiene report (counts by category, trend vs. the last audit, decisions) to Confluence, with the next audit date
- Closeout: a go/no-go check against the closeout checklist — children resolved or re-homed with a moved-scope ledger entry, linked bugs dispositioned, delivery comment present — recorded as a comment when it passes

## What it will never do

- Auto-clean — no close, merge, or label without explicit approval; and never delete (archiving is always reversible)
- Prejudge duplicates — pairs are *likely* duplicates until a human says so, and it doesn't pick the survivor for you
- Flag rank ordering doing its job as decay — deprioritized isn't stale

## Good to know

Sweep findings include the quieter rot too: done-without-resolution (only where the workflow's terminal screen should have set one), registry drift on pipeline-managed initiatives, zombie sprints, dead team-field values, and process registers (Risk/Clarification items) nobody has touched in 6+ months — proposed as a named retire-or-revive decision. Instance-level defects it keeps re-finding belong in the standing remediation proposal to Jira admins, not in eternal re-detection.
