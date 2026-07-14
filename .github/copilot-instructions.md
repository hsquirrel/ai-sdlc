# ai-sdlc — Agent Instructions

Instructions for AI agents working in this repository. This file is the single source of truth for project guidance; `CLAUDE.md` imports it for sessions where the repo is worked on with Claude Code. Keep project guidance HERE — surface-specific notes go in the surface's own file.

## What This Project Is

A set of **skills and scripts that incorporate AI into an agile SDLC** — with humans always in the loop. This is not an application codebase; the deliverables are reusable agentic assets (Agent Skills-standard skill modules, automation scripts, templates) organized around the four scrum roles:

- **Scrum Master**
- **Product Owner**
- **Developer**
- **Tester**

**The target surface is GitHub Copilot** — skills deploy under `.github/skills/` via `scripts/package-release.ps1`. Skill bodies follow the open Agent Skills standard and stay surface-neutral.

Every skill must keep a human approval gate in the workflow. AI drafts, decomposes, critiques, and packages — humans decide.

**Current focus: codify solid, domain-agnostic engineering practices first.** Domain-specific layers (e.g., wealth-management compliance workflows) are deliberately deferred; design skills so a domain pack can be layered on later without rework. Background research for that future layer lives in `research/`.

## Core Design Principles

- Jira/Confluence is the authoritative system of record — skills produce artifacts **in** Jira/Confluence, not documents in chat. **Product briefs live in the epic's own fields** (Background/Description/Requirements — `templates/epic.md` is canonical); Confluence pages are the optional umbrella for multi-epic initiatives.
- Skills are composable and single-purpose (assembly-line pattern), not one monolithic "AI assistant" prompt.
- Outputs must be auditable: versioned skills, clear human approval points in three declared tiers (per-item / per-run / standing — see `references/conventions.md`), and **run logs for every run that writes externally** (`.ai-sdlc/runs/*.md`, from `templates/run-log.md`).
- **Template-first output**: every artifact that lands in a system of record is generated from a template file (skill's `templates/` folder) — templates pin the output contract across model upgrades. Fix the template, not the instance.
- **Growth discipline**: no new skill, mode, or rule without a named person requesting it after a live run; every addition names what it displaces. The constraint is adoption, not capability.

## Shared references (read before writing skills or touching Jira)

- `references/conventions.md` — the library's rules: skill format, gate tiers, run logs, template-first, growth discipline.
- `references/kdp-instance.md` — **the single authoritative home for instance facts**: schema, all 24 issue types, field IDs, link types, the empirical workflow map with terminal sets, the delivered-detection rule (`statusCategory=Done` ≠ delivered; use terminal sets), sprint-data pitfalls, team operating records.
- `references/atlassian-access.md` — the Atlassian access layer: skills name capabilities, not tool names; the `atl` CLI (`tools/atl/`) is the default mechanism.
- `references/definition-of-done.md` — the story exit gate (D1–D6), used by the DoR critic's acceptance mode.
- `docs/proposals/` — the standing case for Jira/Confluence and process changes; instance defects the skills keep accommodating are argued for *fixing* there.

## Tool Integrations

Skills and scripts target these systems:

- **Jira / Confluence** — the system of record; Jira artifacts (epics, stories, AC) are the main output format. Access via the `atl` CLI (`tools/atl/` — JSON output, `--dry-run` on writes, see `references/atlassian-access.md`); environments with an Atlassian MCP server connected may use those tools instead.
- **GitHub / GitHub Copilot** — the agent surface; well-formed tickets get assigned to the Copilot coding agent (handoff skill deferred until the first real delegation).
- **Visual Studio / VS Code** — developer environments.
- **Playwright / xUnit / Jest** — test automation (Tester role; scaffolder deferred until test-repo access).
- **Lucidchart / Lucidspark** — diagramming; link or embed Lucid diagrams where a visual is the better artifact.

## Target Tech Stack (of the teams being served)

Skills, code generation templates, and examples should assume: C# .NET, React, TypeScript, Node.js, MS SQL Server, Azure Cosmos DB.

## Architecture

The library was restructured 2026-07-12 (see `docs/reviews/2026-07-12-system-review.md`): **11 active skills + 1 meta, 6 deferred behind named activation triggers**. `docs/skill-catalog.md` is the source of truth for skill names, definitions, and status.

The PO pipeline is: Product Brief Builder → Backlog Decomposer → Jira/Confluence Writer → Definition-of-Ready Critic. Jira hierarchy is **Initiative → Epic → Story**; teams refine Stories into Tasks themselves.

The **Definition-of-Ready Critic** is the highest-leverage control, at both ends of a story's life: readiness before refinement ("if an agent can translate the ticket into tests without inventing requirements, the ticket is ready") and the acceptance evidence table at PO Validation (`references/definition-of-done.md`).

Acceptance criteria: **Gherkin/BDD for user-visible behavior; structured requirement blocks (not Gherkin) for NFRs**. Within an epic, match the AC format its existing children use.

Metrics: **flow metrics are the primary evidence** (throughput by type, changelog cycle time, carryover, unplanned-work share); story points are corroboration only where a team maintains them. Sprint baselines come from commitment records (sprint-planning-facilitator record mode); reconstruction is declared, never silent.

## Repository Conventions

- `research/` — background research and decision records informing skill design
- `docs/skill-catalog.md` — authoritative index of all skills (active / deferred / retired)
- `docs/user-guide/` — user documentation: `README.md` (overview), `roles/*.md` (per-role guides), `skills/*.md` (one page per **active** skill). Update in the same commit as any behavior change.
- `docs/reviews/` — system reviews; `docs/proposals/` — the change case for Jira/Confluence and process; `docs/adoptions/` — adoption-run artifacts; `docs/shakedowns/` — tabletop reports + scenario backlog
- `docs/handoffs/` — session handoff docs, created when pausing mid-run; **when resuming work, read the most recent handoff if one exists** (absence just means the last session ended clean)
- Skills follow the Agent Skills open standard (SKILL.md with frontmatter). Skill bodies are surface-neutral, but they reference repo-level shared files — bundle those when deploying a skill to another surface (`scripts/package-release.ps1` does this).
- Historical records (`.ai-sdlc/runs/`, `docs/handoffs/`, `docs/reviews/`, `docs/adoptions/`, dated plans and research) are audit artifacts — do not rewrite them to match later conventions.
