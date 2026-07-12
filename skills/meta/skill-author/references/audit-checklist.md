# Skill Audit Checklist

Evaluate every item; report pass/fail per skill with a one-line reason for each failure.

## Structure

1. **Location** — skill lives at `skills/<role>/<skill-name>/SKILL.md` with a valid role folder (`po`, `developer`, `tester`, `sm`, `meta`).
2. **Frontmatter** — YAML frontmatter present with `name` and `description`; `name` is kebab-case and matches the directory name.
3. **Description quality** — description states what the skill does *and* when to use it (contains a trigger, e.g., "Use when…").
4. **Size** — SKILL.md is under ~150 lines; overflow detail lives in `references/`.
5. **Referenced files exist** — every relative link in SKILL.md resolves to a real file in the skill directory.

## Portability

6. **No surface-specific syntax** — no Claude-specific XML blocks or tool names, no slash-command routing, no Copilot-specific directives in the skill body.
7. **Plain markdown** — body is instructions in markdown; any deterministic logic is in `scripts/`, not prose pretending to be code.

## Design

8. **Single-purpose** — the skill performs exactly one workflow; no "and also" second workflow hiding in the body.
9. **Human approval gate** — an explicit, numbered workflow step where the human approves before any write to Jira, Confluence, GitHub, or another external system.
10. **Inputs and outputs stated** — the body makes clear what the skill consumes and what it produces, including the destination of outputs.
11. **Composability noted** — upstream/downstream skills are named where they exist (pipeline skills especially).

## Templates (if the skill has a `templates/` folder)

12. **Placeholder conventions** — templates use `{curly}` for variables and `[square]` for prose guidance; no other placeholder styles.
13. **No leaked placeholders** — finished example content in the skill contains no unresolved `{curly}` or `[square]` markers.

## Auditability

14. **Run-log section** — SKILL.md contains a "Run Log (audit)" section requiring a per-invocation log (created first, updated live, verbatim Q&A, external writes recorded) per the shared `templates/run-log.md`.
15. **Template-first output** — every artifact the workflow produces is generated from a named template file; no workflow step emits a freeform-structured artifact.

## Catalog

16. **Catalog entry** — the skill appears in `docs/skill-catalog.md` under the correct role, and the one-line definition matches the frontmatter description's spirit.
17. **User-guide page** — `docs/user-guide/skills/<skill-name>.md` exists and the role guide's table lists the skill. (The role guides' skill counts and the L1 README's library count must match reality.)
