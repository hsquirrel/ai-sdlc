# Skill Conventions for the ai-sdlc Library

The rules every skill in this repository follows. Each SKILL.md carries a single pointer to this file instead of restating these rules — conventions change here, once.

## Format: open Agent Skills standard

- A skill is a directory containing a `SKILL.md` with YAML frontmatter. Frontmatter has exactly two required keys:
  - `name` — kebab-case, matches the directory name
  - `description` — one or two sentences: what the skill does **and** when to use it (include trigger phrases — agent surfaces use this to decide relevance).
- Body is plain markdown addressed to the agent. No surface-specific syntax — the same file must be usable in Claude Code, GitHub Copilot, and Rovo.
- Optional subfolders, only when genuinely needed: `references/` (deep-dive docs loaded on demand), `templates/` (output templates), `scripts/` (deterministic helpers).
- Target shape: **~35 lines** — description, inputs, workflow with its gate step, rules unique to this skill. Hard ceiling ~150 lines; past that, move detail into `references/`.
- Skills live at `skills/<role>/<skill-name>/SKILL.md`; `<role>` ∈ `po`, `developer`, `tester`, `sm`, `meta`.
- **Deferred skills** stay in place, marked `**Status: deferred**` in the body's first line with their named activation trigger. The catalog lists them separately.

## Design rules

- **Single-purpose.** One skill performs one workflow. Closely related output surfaces of the *same* analysis may be modes of one skill (e.g., sprint-radar's daily and escalation modes) — separate skills are for separate workflows.
- **Human approval gate.** Every external write happens behind an explicit, numbered gate step. Gates come in three tiers; each skill's gate step names its tier:
  - **per-item** — edits to existing human-authored content, and anything person-adjacent (escalations, review comments, record-notes on someone's work). Each item is decided individually.
  - **per-run** — the default: new-artifact creation. The human approves the run's output set before anything is written.
  - **standing** — recurring, read-only-analysis, template-pinned artifacts only (e.g., a daily digest). The human approves format + destination once per sprint; runs then post automatically, and any signal outside normal bounds (first incident of a sprint, a never-seen finding type) re-triggers the per-run gate. A standing approval is re-confirmed at each sprint boundary.
- **Substantial write sets get a review document**: when a run proposes many writes, present them verbatim in a .md file with per-item decision lines — not just a chat summary.
- **Composable.** State upstream/downstream skills in the body only where the handoff is real and non-obvious.
- **Auditable.** Skills are versioned in git; behavior changes get their own commit with rationale in the message. Every Jira/Confluence artifact a skill creates carries the `ai-sdlc-generated` label (`ai-sdlc-adopted` for adoption edits).

## Growth discipline

- **Demand-signal rule:** no new skill, mode, or rule without a named person requesting it after a live run. Un-deferring a skill requires its activation trigger to have actually occurred.
- **Displacement rule:** any proposal that adds a rule or mode names what it displaces or simplifies. Provenance citations (shakedown IDs, run references) belong in commit messages, not SKILL.md prose.

## Run logs (auditability)

- **Required for every run that writes to an external system** (Jira, Confluence, GitHub). Draft-only and read-only runs don't need one — git and the artifact's own history carry those.
- Location: `.ai-sdlc/runs/{YYYY-MM-DD}-{skill-name}-{slug}.md`, from `templates/run-log.md` (repo root); no workspace → attach the log to the driving Jira/Confluence artifact.
- Records: context sources (keys/links), the approval decision (who, when, tier, edit count, any overrules), and every external write with its resulting key/link. Update as steps complete, not retrospectively.

## Template-first output

- **Every artifact that lands in a system of record is generated from a template file** in the skill's `templates/` folder. Internal intermediates (working notes, prep tables) don't need template files.
- Rationale: templates pin the output contract across model upgrades. When an output disappoints, fix the template, not the instance.
- Placeholders: `{curly}` = variable replaced with a concrete value; `[square]` = authoring guidance that must not survive into a finished artifact.

## Content standards for generated artifacts

- Acceptance criteria: **Gherkin/BDD for user-visible behavior; structured requirement blocks (not Gherkin) for NFRs** (data contracts, audit logging, retention, observability, security). Within an epic, match the AC format its existing children use — consistency inside the epic beats style purity.
- Jira hierarchy: Initiative → Epic → Story. Teams refine Stories into Tasks themselves.
- **Product briefs live in the epic's own fields** (Background / Description / Requirements, per the house structure in `references/kdp-instance.md`) — where the work lives. A Confluence page is the optional umbrella for multi-epic initiatives only.
- Blameless always: no individual's name attached to any metric, stall, or finding in anything a skill produces.
- Instance facts (schema, workflows, terminal sets, bug types, sprint-data pitfalls, team operating records): **`references/kdp-instance.md`** is the single authoritative home. Skills cite it by that one path.

## Portability note

Skill bodies are surface-neutral, but skills reference repo-level shared files (this file, `references/kdp-instance.md`, `templates/run-log.md`). When deploying a skill to another surface (Copilot, Rovo), bundle the shared files it names — a skill dropped alone will have dangling references.

## Catalog discipline

- `docs/skill-catalog.md` is the authoritative index: every active skill has an entry; deferred skills are listed with activation triggers; retired skills move to a "Retired" section with the date — never silently deleted.
- `docs/user-guide/` (system overview, role guides, per-skill pages for active skills) is updated in the same commit as any behavior change.
