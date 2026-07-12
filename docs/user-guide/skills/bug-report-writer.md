# bug-report-writer (Tester)

Turns "it broke" into a Jira bug a developer can act on without a follow-up conversation: minimal repro, expected-vs-actual with a cited source, severity with a rationale, correct KDP bug type — and a duplicate check before anything is filed.

## When to use

- Manual testing, an exploratory session, or UAT found a defect

## Before you start

- What you've got: your description, screenshots, console/network output, session notes
- Roughly: what you did, what happened, what you expected, whether it reproduces

## What happens

1. It interviews you briefly if the material is thin, then distills the repro to the **minimum** steps that trigger the defect — ritual that doesn't matter gets cut. Intermittent? It records the observed rate instead of pretending certainty.
2. It anchors "expected": citing the AC, design doc, or release note that says what should happen. No source? Your expectation is recorded *as an assumption* — and if the implementation actually matches its AC, it routes a **behavior question to the PO** instead of filing a defect against the developer.
3. It picks the correct type per the [KDP bug-type guide](../../../skills/tester/bug-report-writer/references/kdp-bug-types.md): **Story Bug** (sub-task, QA found it in an in-flight story), **Bug** (existing functionality), or the UAT types during UAT.
4. Severity gets a one-line rationale (user impact × workaround); Priority stays with triage.
5. It searches for likely duplicates and shows you candidates — linking an existing bug may beat filing. It also checks the area's recent *closed* bugs: where reports historically bounce (high Not-An-Issue / Cannot-Reproduce rates), it tightens the evidence bar and leans harder on the PO behavior-question route.
6. **You approve the draft**, then it creates the issue (correct parent linkage, `ai-sdlc-generated` label, evidence attached) and reports the key.

## What gets written

One Jira bug (or a comment on an existing duplicate, if you choose that path).

## Good to know

- One defect per ticket — a session that found three things files three tickets.
- Facts and interpretation stay separated in the ticket; triage trusts the rationale line precisely because it's never inflated.

## Related

- Upstream: [exploratory-charter-generator](exploratory-charter-generator.md) sessions, test plan execution, UAT
