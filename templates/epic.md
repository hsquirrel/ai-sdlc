# Epic Field Template

The canonical structure for creating or updating KDP epics, distilled from the exemplar epics **KDP-40759** (IRA BDA) and **KDP-40761** (Name/DOB/SSN-TIN changes) at Jeremy's direction, 2026-07-14. Skills cite this file via `references/kdp-instance.md` §7; **fix this template, not the instance**, when the structure needs to change.

An epic carries its brief in three fields. All three are rich text (ADF) — author in Markdown and write with `atl` (`--description-file` / `--fields-json` per `references/atlassian-access.md`); the converter handles headings, bullets, tables, bold, and links.

Writing style (observed in the exemplars): capability areas in **bold** at the start of bullets; quantified evidence wherever a claim is made (volumes, percentages, counts); name systems precisely (not "the legacy system" — *which* one).

---

## Field: Background (`customfield_14757`) — why this epic exists

```markdown
## Business Objective

[One paragraph: Enable {who} to {do what} entirely through {target platform} while maintaining {the rules/controls that must survive} — including {the major capability areas covered}.]

## Business Context

[Narrative, 2–4 paragraphs: what the workflow is and why it matters to the people in it; the current state with quantified evidence (volumes, % on legacy path, error/NIGO rates, counts); what is still locked to the old world and what that blocks.]

## Why Now

- **{Driver}** - [one line of substance: decommission path, experience consistency, operational efficiency, compliance/PII, effort-vs-return...]
- **{Driver}** - [...]

## Problem

[Tight statement: what is blocked or unsupported today, and the consequence — who is forced into what workaround, what it prevents.]

## Outcome

[The end state when this epic completes: who can do what, with what parity or improvement.]
```

Optional when material: an **Assumptions & Open Questions** section after Outcome (the exemplars omit it; the initiative-level brief usually carries it — don't duplicate, but don't lose a blocking question either).

## Field: Description — what this epic delivers

```markdown
[One-sentence delivery statement: Migrate/Build {thing} from {source} to {target}, covering {capability list}.]

## In Scope

- **{Capability area}** - [what's included, with specifics: counts, sub-types, named components]
- **{Capability area}** - [...]

## Out of Scope

- [Excluded item] - [where it lives instead: "separate epic", "delivered by {epic}", or the reason]

## Dependencies

**Internal ({platform/team})**
[If sequencing matters, phase them: "Phase 1 - {name}: {what must exist first and why}." Otherwise plain bullets naming the depended-on epic/service and what it must provide.]

**{Other owning team}**
- [Dependency] - [what they must deliver and by when it's needed]

## Success Criteria (Definition of Done)

- [Testable, binary statement — "Advisors can X for all N types without touching {legacy}"]
- [Existing behavior preserved: "{adjacent thing} remains unaffected"]
- [Documentation/enablement criterion if the process is new]

## Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| [what's measured] | [today's number] | [the number that means success] |

## Architecture Triage

- **ARB Needed?** [Yes/No — why]
- **Eligible for STP?** [Yes/No]
- **Does our current architecture support the changes in scope?** [answer]
- **Any technical limitations that would limit the user experience?** [answer]
- **Do we need to build new UI screens?** [answer]
```

## Field: Requirements (`customfield_14762`) — how, in checkable detail

```markdown
## 1. {Requirement group — a workflow stage or capability area}

[Optional one-line framing.]

- [Requirement — specific enough that a reviewer can check it: named fields, named forms with IDs, named picklists/queues]
- [...]

## 2. {Next group}

[Use tables where the content is a matrix — form bundling triggers, status models, act-by-act scope:]

| {Key} | {Dimension} | {Detail} |
|-------|-------------|----------|
| ... | ... | ... |

## Key Reference Documentation

- [Named analysis/architecture docs, master pages, spreadsheets that ground these requirements]
```

---

## Template rules

1. **No empty sections.** The exemplars' weakest spots are `Success Metrics` left as a question ("X% reduced NIGO rates?") and unanswered triage lines — fill them or write `TBD — {owner}, {date needed}`. An empty Out of Scope is a DoR finding, not a formatting choice.
2. **Numbers over adjectives.** "39% NIGO (558 of 1,422 work items, 2025)" survives review; "high NIGO rates" doesn't.
3. **Out-of-scope items say where the work went.** "Separate epic" beats silence; a dangling exclusion becomes next quarter's surprise.
4. **Requirements groups are numbered** (`## 1.` … `## n.`) so findings and test plans can cite "Req 3, bullet 2". (The exemplars don't use `{EPIC-KEY}-SR-NNN` item numbering; groups are the citation unit.)
5. When **updating** an existing epic, preserve its populated content into this structure — restructure, don't rewrite meaning; show a before/after diff at the gate.
