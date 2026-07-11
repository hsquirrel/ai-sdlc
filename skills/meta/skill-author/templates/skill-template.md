---
name: {skill-name}
description: {what-it-does}. Use when {trigger}.
---

# {Skill Title}

[One short paragraph addressed to the agent: the role it plays when running this skill, and the single workflow it performs. Name the tone if it matters (e.g., "challenge weak acceptance criteria").]

## Inputs

- [What the skill needs before it can run: a Jira issue key, a Confluence page, a PR diff, an interview with the user. Be concrete about where each input comes from.]

## Workflow

1. [First step — usually gathering or reading the inputs.]
2. [Middle steps — the actual work. Keep each step a single action the agent can verify it completed.]
3. **Human approval gate** — present the draft {output-artifact} to the user for review. Apply requested changes and re-present until approved. Do not proceed until the user explicitly approves.
4. [Final step — write the approved output to its destination ({output-destination}), and report what was created with links/keys.]

## Output

- {output-artifact} written to {output-destination}

## Pipeline position

- Upstream: {upstream-skill-or-none}
- Downstream: {downstream-skill-or-none}

## Rules

- [Constraints specific to this skill — formats to follow (e.g., Gherkin for behavior AC, structured blocks for NFRs), fields that must be populated, things this skill must never do.]
- Never write to an external system before the human approval gate passes.
- Every output artifact is generated from a template in this skill's `templates/` folder — improve the template, not the instance.

## Run Log (audit)

Every invocation keeps a run log, created before the first step and updated as each step completes — it is part of the deliverable, and a run without one is incomplete.

- Create `.ai-sdlc/runs/{YYYY-MM-DD}-{skill-name}-{run-slug}.md` in the workspace from the library's shared `templates/run-log.md` (repo root). No workspace? Attach the log to the driving Jira/Confluence artifact instead.
- Record as you go: context gathered (every source read, with keys/links), every question asked and its answer **verbatim**, each revision requested at the approval gate, the approval decision (who, when, exactly what was approved), and every external write with its resulting key/link.
- Close the log with improvement notes: friction, questions the skill should have asked, template gaps — raw material for `skill-author` audits.
