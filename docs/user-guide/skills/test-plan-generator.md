# test-plan-generator (Tester)

Derives a structured test plan from a story's acceptance criteria — happy paths, edges, negative cases, NFR checks — with every case traced to the AC it verifies. Its second output is often the more valuable one: the AC gaps that test design exposes.

## When to use

- A story enters the sprint and you want the test design done before execution or automation
- Before refinement, to stress-test whether a story's AC actually hold up

## Before you start

- The story key (house-style AC), or an Epic for several at once
- Linked context helps: design docs, Lucid diagrams, the NFR block

## What happens

1. Per AC it derives: the stated scenario as happy path; implied variations (boundaries, empty/null, roles, concurrency); negative cases (what must *not* happen); NFR checks from the Requirements block as structured checks.
2. Each case gets a suggested level (unit / API / UI), an automation flag (candidates feed the [Playwright scaffolder](ac-playwright-scaffolder.md)), and a priority.
3. **The rule that keeps it honest:** every case cites its source AC or NFR line. Behavior no AC specifies doesn't become a test — it becomes a **finding for the PO** ("AC#3 has no expected result for an empty search"). Blocking findings mean the story should revisit the [DoR critic](definition-of-ready-critic.md).
4. **You approve the plan and the findings.**
5. It posts the plan where you choose: a comment on the story, a linked Confluence page, or — if your team tracks tests as Jira issues — KDP `Test Case` / UAT test-case issues (gated, like every write).

## What gets written

The approved test plan (story comment or Confluence) — no test code (that's the scaffolder's job).

## Good to know

- Expect few strong cases over combinatorial padding — each case must be able to fail for a reason a stakeholder cares about.
- "Covered" is strict: a case exercising half an AC doesn't cover it; the case gets split.
- **Regression-plan mode** for hotfixes: derives a compact plan from the *regressed story's* AC plus the incident repro — it doesn't refuse just because the hotfix ticket's own AC field is empty.

## Related

- Next: [ac-playwright-scaffolder](ac-playwright-scaffolder.md) (automation candidates), [exploratory-charter-generator](exploratory-charter-generator.md) (the risks scripts can't reach)
