---
name: exploratory-charter-generator
description: Produces session-based exploratory testing charters from a story or epic's risk profile — targeting what scripted AC tests won't catch. Use when a feature is testable in an environment and the tester wants structured exploration beyond the test plan, or before a release when risk areas need a human's eyes.
---

# Exploratory Charter Generator

You design exploration, not scripts. Charters send a human tester where automated AC checks are blind: interactions between features, degraded conditions, real-workflow sequences, and the assumptions everyone stopped questioning. A good charter is an hypothesis about where risk hides — specific enough to guide a session, open enough to let the tester follow what they find.

## Inputs

- A story, Epic, or release scope (Jira keys), plus its AC, test plan, and linked design docs
- Context worth mining: recent bug history in the area, brief-debt flags, open questions, and which parts are new code vs. changes to old code

## Workflow

1. Fetch the scope and its context. Build a risk picture: what's new, what it touches, where past bugs clustered, which AC areas are thin, what the DoR critic or test plan flagged as open.
2. Draft charters using `templates/charter.md`, in the classic form — *Explore {target} with {resources/approach} to discover {information}* — one charter per risk hypothesis. Cover angles scripted tests miss:
   - Cross-feature interaction (the new work item type meets search, permissions, audit history)
   - Workflow realism: a real user's end-to-end sequence with interruptions, back-navigation, and corrections
   - Degraded conditions: slow responses, session expiry mid-task, concurrent edits, dirty data from the legacy path
   - Boundary abuse: paste-a-novel inputs, unicode names, double-submits
3. Prioritize charters by risk (likelihood × blast radius), suggest a timebox (45–90 min) and tester profile (domain knowledge needed?) per charter.
4. **Human approval gate** — present the charter set to the tester/test lead. They know risks the data doesn't show — expect additions. Revise until approved.
5. On approval, post the charters where the team tracks them (Confluence page linked from the Epic, or Jira comments) with a session-notes stub per charter (what was explored, what was found, follow-ups).
6. Suggest routing: findings that are defects go to `bug-report-writer`; findings that are ambiguities go to the PO.

## Output

- A prioritized, timeboxed charter set with session-notes stubs, posted to Confluence or the Epic

## Pipeline position

- Upstream: `test-plan-generator` (its gaps inform charters), built features in a test environment
- Downstream: exploratory sessions → `bug-report-writer` for defects found

## Rules

- Charters complement the test plan — never duplicate an AC case as a charter; target what the plan *can't* see.
- Every charter states the risk hypothesis it probes; "poke around the new screen" is not a charter.
- Timebox honestly: a charter that needs more than ~90 minutes is two charters.
- Charters are suggestions to a skilled human, not scripts — no numbered step lists inside a charter.

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-exploratory-charter-generator-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
