# Tester Guide

Two active skills covering both halves of good testing: verifying what the story promised (test plans, with exploratory charters for what scripts can't see) and turning what you find into bug reports a developer can act on without a follow-up conversation.

## Your flow

```
story (ideally dor-ready) ──► test-plan-generator ──► you execute / explore ──► bug-report-writer ──► triage
                                      │
                                      └──► "Findings for the PO" ──► definition-of-ready-critic
```

| Skill | Use when | Gate tier | It writes |
|-------|----------|-----------|-----------|
| [test-plan-generator](../skills/test-plan-generator.md) | A story enters the sprint, or before refinement to stress-test its AC | per-run | The plan to the story, Confluence, or KDP Test Case issues — your choice |
| [bug-report-writer](../skills/bug-report-writer.md) | You found a defect | per-run | A Jira bug of the correct KDP type, evidence attached |

A third skill, **ac-playwright-scaffolder**, is deferred until test-repo access exists. When it activates it will turn the plan's automation candidates into honest test skeletons at their assigned level — xUnit (C#/.NET), Jest (Node/TS), or Playwright (UI) — mirroring Given/When/Then, with `fixme`/`TODO` markers where the AC don't say enough. Until then, automation candidates in your plans are flags for you, not inputs to a generator.

## What you decide at each gate

- **Test plan**: you approve the case set, the levels and priorities, where the plan lands, and — when persisting cases as Jira issues — the **maintenance stance** (reusable regression suite vs. one-shot campaign; an undeclared stance historically defaults to abandonment). You also decide whether the plan's charter section is warranted for this story's risk picture.
- **Bug report**: you approve the draft before anything is created, including the call the skill can't make: file it, link it to the duplicate it found instead, or route it to the PO as a behavior question because the implementation actually matches the AC.

## The stances built into these skills

- **Derive, never invent.** Every test case cites the AC or NFR line it verifies. When the AC don't say what should happen, that becomes a *finding for the PO* — often the most valuable thing test design produces — never a gap quietly filled with a best guess. Blocking findings send the story back through the [DoR critic](../skills/definition-of-ready-critic.md).
- **Charters hunt where scripts are blind.** Cross-feature interaction, interrupted workflows, degraded conditions, boundary abuse — each charter is a risk hypothesis (*explore X with Y to discover Z*), timeboxed 45–90 minutes, prioritized by likelihood × blast radius. The sessions themselves are yours; the skill aims them.
- **Bugs that don't bounce.** Minimal deterministic repro, expected-vs-actual cited to a source (or explicitly marked as your assumption), severity with a rationale, duplicates checked — including recently *closed* bugs in the area, because a high non-fix closure rate means evidence standards here need to be higher.

## What these skills will never do

Mark an AC "covered" by a case that only exercises part of it; pad plans with combinatorial noise; inflate severity to get attention; file a defect against a developer when the story behaved exactly as its AC specify.

## Handoffs

- You consume the same AC the developers build against — one source of truth, two verifications.
- Your PO findings feed refinement through the DoR critic; your bug data feeds the SM's [sprint-close](../skills/sprint-close.md) scoreboard (bug non-fix closure rate is one of its four standing numbers — honest reports keep it meaningful).
