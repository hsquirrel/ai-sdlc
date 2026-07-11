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
