# Tester Guide

Four skills covering the two halves of good testing: verifying what the story promised (test plans, Playwright automation) and hunting what nobody promised to check (exploratory charters), with findings landing as bug reports a developer can act on immediately.

## Your flow

```
dor-ready story ──► test-plan-generator ──► ac-playwright-scaffolder ──► automated suite in CI
                            │
                            └──► exploratory-charter-generator ──► sessions ──► bug-report-writer ──► triage
```

| Skill | Use when | You approve | It writes |
|-------|----------|-------------|-----------|
| [test-plan-generator](../skills/test-plan-generator.md) | A story enters the sprint (or you want to stress-test its AC) | The plan + PO findings | Plan to the story or Confluence |
| [ac-playwright-scaffolder](../skills/ac-playwright-scaffolder.md) | The plan marked automation candidates | The scaffolds + run results | A PR in the test repo |
| [exploratory-charter-generator](../skills/exploratory-charter-generator.md) | A feature is testable and you want structured exploration | The charter set | Charters to Confluence/the Epic |
| [bug-report-writer](../skills/bug-report-writer.md) | You found a defect | The draft ticket (+ duplicate check) | A Jira bug of the correct type |

## The stances built into these skills

- **Derive, never invent.** Every test case cites the AC or NFR line it verifies. When the AC don't say what should happen, that's a *finding for the PO* — arguably the most valuable thing test design produces — not a gap to quietly fill with your best guess.
- **Honest scaffolds.** Generated Playwright tests mirror Given/When/Then one-to-one, follow the test repo's own conventions, and anything not truly assertable becomes `test.fixme()` with a `TODO(reason)`. The suite can't false-pass on day one, and run results are reported, not presumed.
- **Charters hunt where scripts are blind.** Cross-feature interactions, interrupted workflows, degraded conditions, boundary abuse — each charter is a risk hypothesis (*explore X with Y to discover Z*), timeboxed 45–90 minutes. The sessions themselves are yours; the skill just aims them.
- **Bugs that don't bounce.** Minimal deterministic repro, expected-vs-actual *cited to a source* (AC, design doc — or explicitly marked as your assumption), severity with a rationale, evidence attached, duplicates checked before filing.

## Which bug type? (KDP specifics)

The bug writer knows the schema, but it helps to know the rule: a **Story Bug** (sub-task of the story) says "this in-flight story doesn't meet its AC yet." A standalone **Bug** is a defect in existing functionality. And if the implementation *matches* the AC but the behavior still seems wrong — that's a behavior question for the PO, and the skill will route it there instead of filing against the developer.

## Handoffs

- You consume the same `dor-ready` stories and house-style AC the developers do — one source of truth, two verifications.
- Your PO findings feed back through the [DoR critic](../skills/definition-of-ready-critic.md); your charters' defects go to triage and then the [Developer flow](developer.md).
- Escaped-bug counts and testing bottlenecks surface in the SM's [sprint reports](../skills/sprint-report-generator.md) and retros — honest bug data makes those work.
