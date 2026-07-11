# Tabletop Shakedown: {scenario-name}

**Date:** {date} | **Mode:** [live read-only / historical replay / synthetic] | **Run log:** `.ai-sdlc/runs/{file}.md`
**Hypothesis:** Explore {work shape} with {content} to discover {which assumptions break}.
**Scenario source:** {jira-keys-and-confluence-links, or synthetic spec}

## Headline

[2-4 sentences: did the hypothesis hold? What's the single most important thing this tabletop proved about the system?]

## Part 1 — Content findings (defects in the scenario's Jira/Confluence)

### Blocking-grade

1. **[finding]** — [evidence with keys]. *([skill that surfaced it], [rule/checklist item])*

### Significant

[Numbered continuation.]

### What the content gets right

- [Credit where due — calibrates the criticism.]

## Part 2 — System findings (proposals to change the library)

| ID | Skill / convention | What misfired (cite the rule) | Proposed change | Status |
|----|--------------------|-------------------------------|-----------------|--------|
| S1 | {skill} | [quoted/cited assumption that broke] | [concrete change] | proposed |

[Prose elaboration per proposal where the table row can't carry it.]

## Replay comparison *(replay mode only)*

| What actually happened | Would the pipeline have prevented it? | Via |
|------------------------|--------------------------------------|-----|
| [real observed failure] | [yes / no / partially] | [skill + mechanism, or the gap] |

## Not exercised

- [Skills that couldn't be walked here and why — e.g., developer skills without repo access.]

## Verdict

[One paragraph: what this scenario proved, and what the next-highest-value scenario after this one would be.]
