# Skill Conventions for the ai-sdlc Library

The rules every skill in this repository must follow. `skill-author` enforces these when scaffolding and auditing.

## Format: open Agent Skills standard

- A skill is a directory containing a `SKILL.md` with YAML frontmatter. Frontmatter has exactly two required keys:
  - `name` — kebab-case, matches the directory name
  - `description` — one or two sentences: what the skill does **and** when to use it. This is what agent surfaces use to decide relevance, so include trigger phrases ("Use when…").
- Body is plain markdown instructions addressed to the agent. No surface-specific syntax: no Claude-specific XML blocks, slash-command routing, or Copilot-specific directives. The same file must be usable in Claude Code, GitHub Copilot, and Rovo.
- Optional subfolders, only when genuinely needed:
  - `references/` — deep-dive docs the agent loads on demand (link them from SKILL.md with relative paths)
  - `templates/` — output templates the skill fills in
  - `scripts/` — deterministic helpers with no LLM judgment
- Keep SKILL.md under ~150 lines. If it grows past that, move detail into `references/`.

## Directory layout and naming

- Skills live at `skills/<role>/<skill-name>/SKILL.md`.
- `<role>` is one of: `po`, `developer`, `tester`, `sm`, `meta`.
- `<skill-name>` is kebab-case and matches frontmatter `name`.

## Design rules

- **Single-purpose.** One skill performs one workflow. If the interview surfaces two workflows, that's two skills chained assembly-line style. (Sole exception: the `meta` role's `skill-author` bundles the library-maintenance workflows — scaffold, audit, catalog sync — because they share one purpose: keeping the library consistent.)
- **Human approval gate.** Every skill's workflow ends with (or contains, before any external write) an explicit step where the human reviews and approves. Nothing is written to Jira, Confluence, GitHub, or any external system without that approval. The gate must be visible as a numbered step in the workflow, not implied.
- **Composable.** A skill's output should be usable as the next skill's input (e.g., Product Brief Builder's Confluence brief feeds Backlog Decomposer). State the upstream and downstream skills in the body when they exist.
- **Auditable.** Skills are versioned in git; significant behavior changes get their own commit with rationale in the message.

## Run logs (auditability)

- **Every skill invocation keeps a run log** — a markdown file created before the skill's first step and updated as each step completes. A run without a log is incomplete.
- Location: `.ai-sdlc/runs/{YYYY-MM-DD}-{skill-name}-{slug}.md` in the workspace; when there is no workspace, attach the log to the driving Jira/Confluence artifact.
- Structure comes from the library's shared `templates/run-log.md` (repo root). It records: context gathered (every source, with keys/links), every question and its answer **verbatim**, draft revisions, the approval decision (who, when, exactly what), every external write with its resulting key/link, and improvement notes.
- Purpose: troubleshooting (reconstruct exactly what happened), and improvement (the log's improvement notes feed `skill-author` audits and template evolution).
- Every SKILL.md carries a "Run Log (audit)" section stating this; the audit checklist enforces it.

## Template-first output

- **Every artifact a skill produces is generated from a template file** — in the skill's own `templates/` folder, or the shared run-log template. Freeform output structure is a defect.
- Rationale: templates pin the output contract so it survives model upgrades (no content drift) and improve over time — when an output disappoints, fix the template, not the instance.
- Improvement loop: run-log improvement notes → `skill-author` audit → template change, reviewed like code in git.

## Placeholder conventions (templates)

- `{curly}` — a variable the scaffolder replaces with a concrete value (e.g., `{skill-name}`).
- `[square]` — prose guidance describing what the author should write there; must not survive into a finished skill.

## Content standards for generated artifacts

- Acceptance criteria: **Gherkin/BDD for user-visible behavior; structured requirement blocks (not Gherkin) for NFRs** — data contracts, audit logging, retention, observability, security.
- Jira hierarchy: Initiative → Epic → Story. Teams refine Stories into Tasks themselves.
- Documentation lands in Confluence (the system of record), not in chat. Diagrams: link or embed Lucidchart/Lucidspark where a visual is the better artifact.

## Catalog discipline

- Every skill has an entry in `docs/skill-catalog.md`; the entry's one-line definition should match the spirit of the frontmatter `description`.
- Retired skills move to a "Retired" section with the date — entries are never silently deleted.
