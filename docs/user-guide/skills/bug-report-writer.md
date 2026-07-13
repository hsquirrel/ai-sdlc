# bug-report-writer (Tester)

Turns "it broke" into a ticket a developer can act on without a follow-up conversation: minimal deterministic repro, expected-vs-actual anchored to a cited source, environment and evidence, severity with a rationale, and the correct KDP bug type.

## When to run it

- Testing or an exploratory session found a defect and it needs to become an actionable ticket

## What it asks of you

- The raw material: your description, screenshots, console/network output, session notes
- A short interview if the material is thin: what did you do, what happened, what did you expect, can you make it happen again?
- Your decision on duplicates it finds — link or comment on the existing bug instead of filing, when that's better

## What happens at the gate (per-run)

It presents the draft ticket and any duplicate candidates; you revise until you approve. Nothing is created in Jira before that.

## What it writes and where

One Jira bug of the correct type — **Story Bug** (sub-task of the in-flight story when QA finds it during story testing), standalone **Bug** (defect in existing functionality), or the UAT bug types during UAT — with parent linkage, the related story linked, evidence attached, and the `ai-sdlc-generated` label.

## What it will never do

- Pretend certainty about an intermittent repro — it states the observed rate instead
- Inflate severity to get attention — the severity rationale (user impact × workaround availability) is what triage trusts; Priority is left to triage
- Bundle findings — one defect per ticket; a session that found three things files three tickets
- File a defect when the story behaves exactly as its AC specify — that routes to the PO as a behavior question instead

## Good to know

- Expected behavior gets a citation — an AC, design doc, or stated convention. When it's only your reasonable assumption, the ticket says so.
- The duplicate check extends to recently *closed* bugs in the area: a high non-fix closure rate (Not An Issue / Cannot Reproduce / Duplicate / Declined) means reports there historically bounce, so it tightens the evidence and leans harder on the behavior-question route before filing.
- Facts and interpretation stay separated: what happened (evidence) vs. what it means (assessment).
