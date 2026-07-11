# skill-author (Meta)

The library's librarian: scaffolds new skills to this repo's conventions, audits existing ones for compliance, and keeps `docs/skill-catalog.md` in sync with what's on disk.

## When to use

- You want a new skill added to the library
- You suspect a skill has drifted from conventions (or want a library-wide consistency check)
- A skill was added, renamed, or retired and the catalog needs to reflect it

**Not for:** running the other skills, or editing a specific skill's content (edit the file directly and let the audit check it).

## Before you start

- For scaffolding: a clear idea of the one workflow the skill performs. If it's already listed in the catalog, that entry pre-fills most answers.

## What happens

1. **Scaffold**: a short interview (≤2 rounds, six points — name/role, purpose/trigger, inputs, outputs/destination, where the human gate sits, target surface), then it generates `skills/<role>/<name>/` from the standard template, audits its own output, and syncs the catalog.
2. **Audit**: evaluates skills against the [14-item checklist](../../../skills/meta/skill-author/references/audit-checklist.md) — structure, portability, single-purpose design, human gate present, catalog entry — and reports pass/fail per item with reasons.
3. **Catalog sync**: diffs `skills/` against the catalog; proposes additions, corrections, and retirements (retired entries are moved to a dated section, never deleted).

## What you approve

Everything that lands: the generated files, any audit-driven fixes, and every catalog edit. The skill obeys the same human-gate rule it enforces — including never committing without your say-so.

## Good to know

- The one convention exception it owns: it bundles three workflows (scaffold/audit/sync) because they share one purpose — library consistency. Every other skill must be single-purpose.
- New skills are born with the approval gate baked into their template; you can't scaffold an ungated skill.

## Related

- [Conventions reference](../../../skills/meta/skill-author/references/conventions.md) — the rules it enforces
- `docs/skill-catalog.md` — the index it maintains
