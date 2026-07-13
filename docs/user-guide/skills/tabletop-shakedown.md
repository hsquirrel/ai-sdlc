# tabletop-shakedown (Meta)

A test pilot for the skills library itself. A tabletop takes a real scenario — an in-flight epic, an incident, a completed effort to replay — and walks each relevant skill against its actual Jira/Confluence content, asking: what would it ask, produce, gate, and write here — and where do its assumptions break? **Strictly read-only against external systems.** The scenario's content is the diagnostic instrument, never the patient.

## When to run it

- Validating the system against a new work shape before trusting it there
- Note the sunset plan: after scenario T14 and the team's dry runs, live use becomes the validation — new tabletops need the same demand signal as everything else

## What it asks of you

- A scenario from `docs/shakedowns/scenario-backlog.md` (new scenarios join the backlog first, with the hypothesis stated in charter form: *explore {work shape} with {real content} to discover {which assumptions break}*)
- Your decisions at the gate: which system proposals become skill changes, and whether content findings get routed to the content's owners

## What happens at the gate

You (the librarian) review the report before anything moves. The two finding classes stay strictly separate: **content findings** — real defects in the scenario's Jira/Confluence, each attributed to the skill that surfaced it, with severity and a note of what the content gets *right* — and **system findings** — proposals to change skills/templates/conventions, each naming the exact rule or assumption that misfired.

## What it writes and where

Nothing external, ever — no Jira writes, no comments, no labels; a tabletop that touched the patient is invalid. On approval it saves the report to `docs/shakedowns/{date}-{slug}.md` in this repo, updates the scenario backlog, and applies approved system proposals as skill/template changes (each addition naming what it displaces).

## What it will never do

- Write to any external system
- Walk skills from memory — each is exercised by its written SKILL.md text; the gap between the two is often the finding
- Hide coverage gaps — skills that couldn't be exercised are listed as not-exercised, never silently skipped
- Accept "the pipeline struggled" as a finding — every system finding cites the specific rule that misfired

## Good to know

- Replay scenarios grade the homework against reality: what the pipeline *would have produced* vs. what history shows happened, naming which real failures it would (and would not) have prevented.
- A tabletop that merely confirms the pipeline works was aimed at the wrong scenario.
- One scenario per tabletop; a scenario hiding two hypotheses becomes two backlog rows.
- Shakedown gap lists feed [pipeline-adopter](pipeline-adopter.md) when you want the findings fixed for real.
