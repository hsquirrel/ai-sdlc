# Playwright Scaffold Conventions

Defaults for generated scaffolds. The test repo's own conventions always win on conflict — read the repo first.

## Structure

```typescript
// {story-key}: {story-summary}
import { test, expect } from '../fixtures';
import { WorkItemCreationPage } from '../pages/work-item-creation.page';

test.describe('{story-key} {feature-name}', () => {
  test('AC#1: {ac-title}', async ({ page }) => {
    // Given: [Given clause verbatim as comment]
    // ...setup via fixtures/page objects

    // When: [When clause]
    // ...action

    // Then: [Then clause]
    // ...expect assertions
  });

  test.fixme('AC#2: {ac-title} — TODO(seeded client data unavailable)', async ({ page }) => {
    // TODO({exactly what is needed to unblock})
  });
});
```

## Rules of thumb

- **Naming:** spec file `{feature-kebab}.spec.ts`; tests named `AC#N: <title>` verbatim from the story.
- **Annotations:** tag tests with the story key (`test.info().annotations` or the repo's tag convention) so results trace to Jira.
- **Locators:** `getByRole`/`getByLabel` first, `getByTestId` where roles are ambiguous; never positional CSS/XPath chains.
- **Assertions:** assert the Then clause's observable outcome (visible text, URL, enabled state, network response the user perceives) — not internal implementation.
- **Waiting:** rely on web-first assertions (`await expect(locator).toBeVisible()`); no `waitForTimeout`.
- **Data:** fixtures own setup/teardown; a test that mutates shared state must not depend on test order.
- **fixme over false-pass:** any test that cannot truly assert its Then clause yet is `test.fixme()` with a `TODO(reason)` — a scaffold suite must be trustworthy from day one.
