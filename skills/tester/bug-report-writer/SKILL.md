---
name: bug-report-writer
description: Turns a raw observation or reproduction into a well-formed Jira bug — minimal repro steps, expected-vs-actual anchored to AC where possible, environment, and a reasoned severity — using the correct KDP bug type. Use when a tester or exploratory session finds a defect and it needs to become an actionable ticket.
---

# Bug Report Writer

You turn "it broke" into a ticket a developer can act on without a follow-up conversation. The core of a good bug is a minimal reproduction and an honest expected-vs-actual: *expected* comes from an AC, a design doc, or a stated convention — cited; when it's only the reporter's reasonable assumption, you say so. Severity gets a rationale, not a gut number.

## Inputs

- The raw material: tester's description, screenshots, console/network output, session notes from an exploratory charter
- Context: the story being tested (if any), environment, build/version if known

## Workflow

1. Interview the reporter briefly if the material is thin: what did you do, what happened, what did you expect, can you make it happen again? Distill the repro to the *minimum* steps that trigger it — cut ritual that doesn't matter.
2. Anchor expected behavior: find the AC, design doc, or release note that says what should happen and cite it. No source? State the expectation as an assumption — the ticket may be a behavior question for the PO, not a defect; say so when that's likelier.
3. Classify per the instance doc (`references/kdp-instance.md` §6): **Story Bug** (sub-task of the in-flight story when QA finds it during story testing), **Bug** (standalone defect in existing functionality — including hotfix cases), or the UAT bug types during UAT phases. Set Severity with a one-line rationale (user impact × workaround availability); leave Priority to triage.
4. Draft the ticket from `templates/bug-report.md`. Search Jira for likely duplicates (same area, similar summary, open states) — if found, present them; linking or commenting on the existing bug may beat filing a new one. Extend the same search to recently *closed* bugs in the area: a high non-fix closure rate (Not An Issue, Cannot Reproduce, Duplicate, Declined) means reports here historically bounce — tighten the evidence (environment/build captured, reproduction rate stated) and lean harder on the PO behavior-question route before filing.
5. **Approval gate (per-run)** — present the draft (and any duplicate candidates) to the reporter. Revise until approved. Nothing is created in Jira before approval.
6. On approval, create the issue (correct type, parent linkage for Story Bugs, `ai-sdlc-generated` label), attach the evidence, link the related story, and report the new key.

## Output

- A created Jira bug of the correct type, with minimal repro, cited expected behavior, severity rationale, and evidence attached

## Rules

- Repro steps must be minimal and deterministic — if it reproduces intermittently, say the observed rate rather than pretending certainty.
- One defect per ticket; a session that found three things files three tickets.
- Never inflate severity to get attention; the rationale line is what triage trusts.
- Facts and interpretation stay separated: what happened (evidence) vs. what it means (assessment).
- If the "bug" is actually the story behaving as its AC specify, route it to the PO as a behavior question instead of filing a defect against the developer.

---
*Library conventions (gates, run logs, template-first): `references/conventions.md`. Instance facts: `references/kdp-instance.md`.*
