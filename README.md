# ai-sdlc

**AI skills, agents, and tooling that fold AI into an agile SDLC — with humans always in the loop.**

This is not an application codebase. The deliverables are reusable agentic assets — [Agent Skills](https://agentskills.io)-standard skill modules, an Atlassian CLI, automation scripts, and templates — organized around the four scrum roles (Product Owner, Scrum Master, Developer, Tester) and serving teams whose system of record is Jira/Confluence.

The one idea that matters: **AI drafts, decomposes, critiques, and packages — humans decide.** Every skill ends in a human approval gate; nothing lands in Jira, Confluence, or GitHub without a person approving it.

## What's here

| Path | What it is |
|------|------------|
| `skills/` | The skill library — 12 active (11 role + 1 meta), 6 deferred behind named real-world triggers. Index: [`docs/skill-catalog.md`](docs/skill-catalog.md) |
| `docs/user-guide/` | **Start here to use the library** — [overview](docs/user-guide/README.md), per-role workflow guides, one page per active skill |
| `references/` | Shared contracts every skill cites: [library conventions](references/conventions.md) (gates, run logs, template-first), [instance facts](references/kdp-instance.md), [Atlassian access layer](references/atlassian-access.md), [definition of done](references/definition-of-done.md) |
| `templates/` | Repo-level templates ([run log](templates/run-log.md), [epic fields](templates/epic.md), [skill](templates/skill-template.md)) — every artifact that lands in a system of record is generated from a template |
| `tools/atl/` | `atl` — a thin TypeScript CLI over Jira REST v3, the Agile API, and Confluence v2, for environments without MCP. JSON-only output, `--dry-run` on every write. See its [README](tools/atl/README.md) |
| `scripts/` | [`package-release.ps1`](scripts/package-release.ps1) — zips the deployable library for GitHub Copilot (`.github/skills/` layout) |
| `docs/plans/` · `docs/proposals/` · `docs/reviews/` · `docs/adoptions/` · `docs/shakedowns/` · `docs/handoffs/` | Build plans, the standing Jira/process change case, system reviews, adoption-run artifacts, tabletop reports, session handoffs |
| `research/` | Background research and decision records informing skill design |
| `.ai-sdlc/runs/` | Run logs — one per run that writes externally |

## Quick start

### Use the skills (GitHub Copilot — the target surface)

1. Package and deploy: run `.\scripts\package-release.ps1` and extract the zip at your repo's root — skills land under `.github/skills/`, where Copilot picks them up, alongside the shared `references/` and `templates/` they cite. (Working inside this repo directly with any Agent Skills-compatible assistant also works.)
2. Read the [user guide overview](docs/user-guide/README.md), then your role's guide under `docs/user-guide/roles/`.
3. Invoke a skill (e.g. the PO pipeline: `product-brief-builder` → `backlog-decomposer` → `jira-confluence-writer` → `definition-of-ready-critic`). Each ends at an approval gate — you review before anything is written.

### Set up Atlassian access

Where Atlassian MCP tools are connected, skills use them. Everywhere else, the `atl` CLI covers the full surface (and adds boards/sprints, which MCP never had):

```powershell
cd tools/atl
npm install && npm run build
# .env holds the site (committed); put your email + an unscoped API token in .env.local (git-ignored)
node dist/index.js whoami   # auth smoke test
```

Details and the capability→command map: [`references/atlassian-access.md`](references/atlassian-access.md).

### Deploy to GitHub Copilot

```powershell
.\scripts\package-release.ps1
```

Fresh-clone ready — it verifies Node ≥ 20, installs dependencies, runs the test suite, builds the `atl` bundle, and produces `releases/ai-sdlc-copilot-<version>.zip` laid out for extraction at a target repo's root (skills under `.github/skills/`, shared references alongside). Note: Copilot distribution is packaged but not yet validated by live use.

## How trust is maintained

- **Gates, always** — three declared tiers (per-item / per-run / standing), defined in [`references/conventions.md`](references/conventions.md). No external write without one.
- **Run logs** — every run that writes to Jira/Confluence/GitHub keeps a live log in `.ai-sdlc/runs/`, from [the template](templates/run-log.md).
- **Template-first** — artifacts are generated from versioned templates; when output needs to change, fix the template, not the instance.
- **Attributable output** — everything AI-created carries the `ai-sdlc-generated` label.
- **Honest status** — one live production run so far ([pipeline-adopter](docs/skill-catalog.md)); everything else validated by read-only tabletop shakedowns against real content. The [user guide](docs/user-guide/README.md#where-things-stand-today) keeps the current truth.

## Contributing

Open a pull request against `main`. Before you do, know the two rules that shape this library:

1. **Growth discipline.** No new skill, mode, or rule without a **named person requesting it after a live run** — and every addition names what it displaces. The constraint is adoption, not capability. If your idea is speculative, it belongs in `research/` or a deferred skill with a named activation trigger, not in the active set.
2. **Template-first, gate-always.** If your change affects what a skill writes to a system of record, change the skill's template and keep a human approval gate in the flow. Skills that write externally must produce run logs.

Practicalities:

- Skills follow the Agent Skills open standard (`SKILL.md` + frontmatter, from [`templates/skill-template.md`](templates/skill-template.md)); bodies are surface-neutral and cite shared files by repo-relative path.
- Update [`docs/skill-catalog.md`](docs/skill-catalog.md) and the relevant `docs/user-guide/` page **in the same commit** as any skill behavior change.
- For `tools/atl`: `npm test` must pass (42 tests incl. ADF golden files); new output shapes are breaking changes to the [access contract](references/atlassian-access.md).
- Jira/Confluence configuration complaints don't get worked around silently — they get argued for fixing in [`docs/proposals/`](docs/proposals/).

## Context

Built for teams on a C# .NET / React / TypeScript / Node.js stack with Jira Cloud + Confluence as the system of record. Domain-specific layers (e.g. wealth-management compliance) are deliberately deferred; skills are designed so a domain pack can be layered on later without rework.
