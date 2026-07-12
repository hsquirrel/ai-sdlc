# backlog-hygiene-auditor (Scrum Master)

A recurring sweep that keeps the backlog short, ranked, and alive: finds stale items, likely duplicates, unestimated near-term stories, orphans, and zombie epics — then proposes cleanup you and the PO approve item by item. It gardens; it never owns.

## When to use

- On cadence — weekly, or before each refinement
- Whenever the backlog "feels unmanageable" and you want the evidence

## Before you start

- Agree the scope (project/board) and any threshold tweaks (defaults: stale = 90 days untouched, near-term = top 20 ranked, aging DoR = 30 days)

## What happens

1. The sweep flags: **stale** (no edits/comments/rank changes), **likely duplicates** (presented as pairs for human judgment — it doesn't prejudge the survivor; within an epic it compares AC bodies, not just summaries), **unestimated near-term**, **orphans** (no parent, no stated reason), **aging `dor-needs-work`**, **zombie epics** (children all done or all stale), **closure-integrity violations** (*resolved* epics with open children, open linked work, or recently-active descendants — checked against the epic-closeout checklist), **registry drift** on pipeline-managed initiatives (epics with no registry marker; reparents with no moved-scope ledger entry), **done-without-resolution** (Done status, resolution unset), and **process-type rot** (Risk/Clarification items sitting in non-terminal statuses for months).
2. Every finding comes with one proposed action: archive (close + `hygiene-archived` label — reversible), merge into a named survivor, send to refinement, route to the PO with a specific question, or keep-with-reason.
3. The report shows counts, the trend versus last audit (is the backlog shrinking or aging?), and proposals sorted easiest-decision-first — the PO should clear half in ten minutes.
4. **You and the PO decide item by item** (bulk-approve per category is your shortcut to grant, not its to assume).
5. It executes only approved actions — every one commented with the audit date and approver role — and posts the report to Confluence.

## What gets written

Approved labels/closures/links in Jira; the hygiene report in Confluence.

## Good to know

- **Nothing is ever deleted** — archiving is close-with-label, fully reversible.
- "Keep" decisions get their reason recorded, so the next audit doesn't re-nag you about the same items — the audit has memory.
- Low rank isn't decay; the auditor won't flag items merely for being far down a healthy backlog.

## Related

- Feeds: [refinement-facilitator](refinement-facilitator.md) (surfaced candidates) · Reads: [definition-of-ready-critic](definition-of-ready-critic.md) labels
