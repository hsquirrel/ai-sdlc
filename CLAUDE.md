# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

A set of **skills, agents, and scripts that incorporate AI into an agile SDLC** — with humans always in the loop. This is not an application codebase; the deliverables are reusable agentic assets (Claude/agent skills, Rovo agents, automation scripts, templates) organized around the four scrum roles:

- **Scrum Master**
- **Product Owner**
- **Developer**
- **Tester**

Every skill or agent built here must keep a human approval gate in the workflow. AI drafts, decomposes, critiques, and packages — humans decide.

**Current focus: codify solid, domain-agnostic engineering practices first.** Domain-specific layers (e.g., wealth-management compliance workflows) are deliberately deferred; design skills so a domain pack can be layered on later without rework. Background research for that future layer lives in `research/`.

## Core Design Principles

- Jira/Confluence is the authoritative system of record — skills produce artifacts **in** Jira/Confluence, not documents in chat. **Product briefs live in the epic's own fields** (Background/Description/Requirements, the house convention); Confluence pages are the optional umbrella for multi-epic initiatives.
- Skills are composable and single-purpose (assembly-line pattern), not one monolithic "AI assistant" prompt.
- Outputs must be auditable: versioned skills, clear human approval points in three declared tiers (per-item / per-run / standing — see `references/conventions.md`), and **run logs for every run that writes externally** (`.ai-sdlc/runs/*.md`, from `templates/run-log.md`).
- **Template-first output**: every artifact that lands in a system of record is generated from a template file (skill's `templates/` folder) — templates pin the output contract across model upgrades. Fix the template, not the instance.
- **Growth discipline**: no new skill, mode, or rule without a named person requesting it after a live run; every addition names what it displaces. The constraint is adoption, not capability.

## Shared references (read before writing skills or touching Jira)

- `references/conventions.md` — the library's rules: skill format, gate tiers, run logs, template-first, growth discipline.
- `references/kdp-instance.md` — **the single authoritative home for instance facts**: schema, all 24 issue types, field IDs, link types, the empirical workflow map with terminal sets, the delivered-detection rule (`statusCategory=Done` ≠ delivered; use terminal sets), sprint-data pitfalls, team operating records.
- `references/definition-of-done.md` — the story exit gate (D1–D6), used by the DoR critic's acceptance mode.
- `docs/proposals/` — the standing case for Jira/Confluence and process changes; instance defects the skills keep accommodating are argued for *fixing* there.

## Tool Integrations

Skills and agents target these surfaces:

- **Jira / Confluence / Atlassian Rovo** — primary PO/SM surface; Jira artifacts (epics, stories, AC) are the main output format
- **GitHub / GitHub Copilot** — implementation handoff; well-formed tickets get assigned to Copilot coding agent (deferred until the first real delegation)
- **Visual Studio / VS Code** — developer environments
- **Playwright / xUnit / Jest** — test automation (Tester role; scaffolder deferred until test-repo access)
- **Lucidchart / Lucidspark** — diagramming; link or embed Lucid diagrams where a visual is the better artifact

Atlassian MCP tools are connected in this Claude Code environment (`mcp__claude_ai_Atlassian__*`). Instance quirks (large-result file handling, unavailable workflow API) are documented in `references/kdp-instance.md` §1.

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
- Skills follow the Agent Skills open standard (SKILL.md with frontmatter). Skill bodies are surface-neutral, but they reference repo-level shared files — bundle those when deploying a skill to another surface.
