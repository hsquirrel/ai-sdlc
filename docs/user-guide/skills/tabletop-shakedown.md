# tabletop-shakedown (Meta)

Stress-tests the library itself: walks a scenario's real Jira/Confluence content through the pipeline *on paper* — strictly read-only — to find where skill assumptions break before real runs do. The five shakedowns of July 2026 (T1–T5) drove ~30 skill changes and two new skills; this skill is how that keeps happening.

## When to use

- Validating the system against a work shape it hasn't handled (a new team, an unusual flow, a completed effort worth replaying)
- Before trusting a skill family on new terrain — the SM sweep before the first live ceremony run, for example

**Not for:** fixing the content it examines (findings route to owners) or replacing real gated runs.

## Before you start

- A scenario from [the backlog](../../shakedowns/scenario-backlog.md) — or a new one, added there first with its hypothesis in charter form: *explore {work shape} with {real content} to discover {which assumptions break}*

## What happens

1. It gathers the scenario's real content read-only — Jira items with full context, Confluence pages both linked and *unlinked-but-related* (orphaned docs are themselves findings).
2. It walks each in-scope skill against the content **by its written SKILL.md text, not from memory** — what would it ask, produce, gate, write, and where does it break?
3. Replay scenarios compare pipeline-would-have against what history records — including honest "the pipeline would have watched this happen" rows.
4. The report keeps two finding classes strictly separate: **content findings** (defects in the scenario's Jira/Confluence, skill-attributed, with credit for what's right) and **system findings** (numbered proposals to change the library, each citing the rule that misfired).
5. **You review the report** and approve/decline each system proposal; approved ones become skill changes via `skill-author`, and the backlog row tracks the disposition to *actioned*.

## What gets written

Nothing external, ever — a tabletop that touched the patient is invalid. Locally: the report in `docs/shakedowns/` and the run log.

## Good to know

- Skills that can't be exercised (no repo access, no live ceremony) are listed as *not exercised*, never silently skipped.
- A tabletop that merely confirms the pipeline works was aimed at the wrong scenario.

## Related

- [skill-author](skill-author.md) — consumes the approved proposals · `docs/shakedowns/scenario-backlog.md` — the charter list and cross-session tracker
