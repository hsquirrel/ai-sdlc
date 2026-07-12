# incident-hotfix-runner (Developer)

The express-lane entrance for production incidents: turns an SSQ System Malfunction (or alert) into a properly traced hotfix ticket — the way the team actually ships — in minutes, without losing the paper trail that pressure always loses.

## When to use

- Production is broken and the fix ships outside the regular release train
- An SSQ incident (or monitoring alert) needs to become an actionable, traced KDP ticket *now*

**Not for:** normal defects (use [bug-report-writer](bug-report-writer.md)) or planned work (the regular pipeline).

## Before you start

- The incident: SSQ key, alert, or the responder's description — it takes what exists
- If known: the story/change that regressed (don't wait for certainty — unknown gets recorded as unknown)
- Who the incident lead is (they approve) and the fixVersion per SRE convention

## What happens

1. It captures the incident facts and the trace: if the regressed story is identified, **that story's AC become the regression contract** — the citable definition of what "fixed" observably means.
2. It drafts the hotfix packet: regular **Bug** + hotfix fixVersion + `hotfix` label (never the legacy Hotfix issue types — those are dead in practice), repro from the incident, expected-from-original-AC (or an explicit contract-debt note — a stated unknown beats a blank), rollback path, and a named regression check.
3. **The incident lead approves in one express pass** — minutes, not meetings, but nothing is created before it.
4. It creates the ticket with the trace links: "Root Cause Fix" → the SSQ incident, relates/caused-by → the regressed story.
5. It hands off the express chain: DoR critic's 4-item hotfix contract → test-plan-generator's regression-plan mode → pr-hygiene → code-review-critic (both minutes-cheap) → release-notes hotfix mode — and leaves the full trail (incident → ticket → PR → deployment page) as a comment for the retro and any RCA.

## What gets written

One Bug in KDP (fixVersion, label, links, packet) after the incident lead's approval; the trail comment.

## Good to know

- The design principle: **express means fewer, faster gates — never zero gates.** A rule that gets skipped under pressure protects nobody, so the hotfix path got rules sized for its clock.
- It nags about the resolution field at close — historically 100% of hotfix items were Done with resolution unset, which destroyed time-to-resolve data.

## Related

- Express chain: [definition-of-ready-critic](definition-of-ready-critic.md) (hotfix contract) · [test-plan-generator](test-plan-generator.md) (regression mode) · [pr-hygiene](pr-hygiene.md) · [code-review-critic](code-review-critic.md) · [release-notes-generator](release-notes-generator.md) (hotfix mode)
