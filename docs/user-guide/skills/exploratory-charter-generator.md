# exploratory-charter-generator (Tester)

Produces session-based exploratory testing charters aimed where scripted AC tests are blind — each one a specific risk hypothesis, timeboxed for a human tester to hunt. The sessions are yours; this skill aims them.

## When to use

- A feature is testable in an environment and you want structured exploration beyond the test plan
- Before a release, when risk areas deserve human eyes

## Before you start

- The scope (story, Epic, or release keys) with its AC and test plan
- Useful context: recent bug history in the area, what's new code vs. changed legacy, brief-debt flags

## What happens

1. It builds a risk picture from the scope: what's new, what it touches, where bugs clustered before, which AC areas are thin, what the DoR critic or test plan flagged.
2. It drafts charters in the classic form — ***Explore** {target} **with** {approach/data/persona} **to discover** {the suspected risk}* — covering the angles scripts miss: cross-feature interaction, real workflows with interruptions and corrections, degraded conditions (session expiry mid-task, concurrent edits, dirty legacy data), boundary abuse.
3. Each charter carries: priority (likelihood × blast radius), a 45–90 minute timebox, the tester profile it needs, and *why this charter* — the evidence pointing there.
4. **You (or your test lead) approve the set** — you know risks the data doesn't show, so additions are expected, not exceptions.
5. It posts the charters with a session-notes stub each (explored / found / follow-ups) to Confluence or the Epic.

## What gets written

The approved charter set with session-notes stubs.

## Good to know

- It never duplicates an AC case as a charter — that's the test plan's territory.
- **Paper mode**: before anything is built, it can run the risk analysis from the spec alone — requirements-shaped risks (undefined access models, boundary rules) go to the PO at refinement while they're cheap to fix; session charters wait, parked, for an environment.
- "Poke around the new screen" doesn't qualify; every charter must state its hypothesis.
- Session findings route naturally: defects → [bug-report-writer](bug-report-writer.md), ambiguities → the PO.

## Related

- Previous: [test-plan-generator](test-plan-generator.md) (its gaps are charter fuel) · Next: [bug-report-writer](bug-report-writer.md)
