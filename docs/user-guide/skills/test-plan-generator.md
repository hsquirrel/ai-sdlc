# test-plan-generator (Tester)

Derives a structured test plan from a story's acceptance criteria — happy paths, edge cases, negative tests, NFR checks — with every case traced to the AC or NFR line it verifies. Its second output is often the more valuable one: the AC gaps that test design exposes, reported as findings for the PO. An optional charter section covers the risks scripted tests can't see.

## When to run it

- A story enters the sprint and you want the test design done before execution or automation
- Before refinement, to stress-test whether a story's AC actually hold up

## What it asks of you

- The story key (house-style AC), or several stories in an Epic; linked design docs and Lucid diagrams help
- Whether you want the exploratory-charter section (it will also offer it when the risk picture warrants)
- Where the plan should land, and — if persisting test cases as Jira issues — the **maintenance stance**: reusable regression suite or one-shot campaign, recorded on the campaign epic (an undeclared stance historically defaults to abandonment)

## What happens at the gate (per-run)

It presents the plan, any charters, and the findings list; you revise until you approve. Nothing is posted before that.

## What it writes and where

The approved plan, where you choose: a comment on the story, a linked Confluence page, or KDP `Test Case` issues parented to a campaign epic and linked `tests` → the stories they verify. Plus a "Findings for the PO" list when test design exposed AC gaps — blocking ones send the story back through the [DoR critic](definition-of-ready-critic.md).

## What it will never do

- Invent expected behavior the story doesn't state — a case with no cited source becomes a question instead
- Mark an AC "covered" by a case that only exercises part of it — the case gets split
- Pad with combinatorics — few strong cases, each able to fail for a reason a stakeholder cares about
- Write test code — that's the deferred `ac-playwright-scaffolder`'s job; hotfix regression plans belong to the deferred `incident-hotfix-runner`

## Good to know

- Each case gets a suggested level (unit / API / UI), an automation flag, and a priority.
- Empty story descriptions (common on adopted work) don't stall it: NFR and expected-results come from the parent epic's Requirements/Background fields, cited as such. No NFR source anywhere is itself a PO finding.
- Charters follow the classic form — *explore {target} with {approach} to discover {information}* — one risk hypothesis each, timeboxed 45–90 minutes, never a duplicate of an AC case. In paper mode (nothing built yet), session charters park "awaiting environment" rather than being discarded.
- Overlapping AC across sibling stories derive one case mapped to both — and the overlap is reported as a story-ownership defect.
