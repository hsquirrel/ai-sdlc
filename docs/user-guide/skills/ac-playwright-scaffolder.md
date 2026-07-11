# ac-playwright-scaffolder (Tester)

Translates Gherkin AC into Playwright test skeletons in TypeScript — one test per AC scenario, mirroring Given/When/Then, following your test repo's own conventions. Its defining trait: **honesty over green** — anything it can't truly assert becomes `test.fixme()` with a `TODO(reason)`, so the suite can't false-pass.

## When to use

- A test plan marked automation candidates, or a story's AC are ready to scaffold
- You want runnable structure instead of a blank spec file

## Before you start

- The story key (or the approved test plan)
- The Playwright test repo — it reads config, an existing nearby spec, page objects, and fixtures before generating; the repo's conventions win over its own defaults

## What happens

1. It maps structure: one `test.describe` per story, one `test` per AC named `AC#N: <title>` verbatim, Given → fixtures/setup, When → actions, Then → assertions.
2. It reuses your page objects and fixtures, extending them only when the feature genuinely needs it, in your style.
3. Where the AC or app doesn't define something (selector, route, seeded data): a `// TODO(what's needed)` plus `test.fixme()` — never a guess.
4. It runs what's runnable (`--list` at minimum) and reports per test: passing / failing-as-expected (feature not built yet) / fixme with what unblocks it. Unexecuted scaffolds are never presented as working.
5. **You approve scaffolds + run results**, then it opens a PR in the test repo (`{story-key}: test scaffolds`) and comments the link on the story.

## What gets written

A PR of scaffolds in the test repo + a link comment on the Jira story.

## Good to know

- Locators prefer role/label; missing `data-testid` hooks become a finding for the developer rather than a brittle CSS chain.
- No sleeps — web-first assertions only. Generated code passes the test repo's lint/typecheck before you ever see it.
- Conventions reference: [scaffold-conventions.md](../../../skills/tester/ac-playwright-scaffolder/references/scaffold-conventions.md)

## Related

- Previous: [test-plan-generator](test-plan-generator.md) · The `fixme` TODOs are the team's completion checklist as the feature lands
