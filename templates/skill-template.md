---
name: {skill-name}
description: {what-it-does}. Use when {trigger}.
---

# {Skill Title}

[One short paragraph addressed to the agent: the role it plays and the single workflow it performs. Name the tone if it matters.]

## Inputs

- [What the skill needs before it can run, and where each input comes from: a Jira key, a Confluence page, a PR diff, an interview.]

## Workflow

1. [First step — usually gathering or reading the inputs.]
2. [Middle steps — the actual work. Each step a single verifiable action.]
3. **Approval gate ({per-item | per-run | standing})** — present the draft {output-artifact} for review; apply requested changes and re-present until approved. Nothing is written externally before this passes.
4. [Final step — write the approved output to {output-destination}; report what was created with keys/links.]

## Output

- {output-artifact} → {output-destination}, from `templates/{template-file}`

## Rules

- [Only constraints unique to this skill. No restated conventions.]

---
*Library conventions apply — run log on external writes, approval-gate tiers, template-first output: see `references/conventions.md`. Instance facts: `references/kdp-instance.md`.*
