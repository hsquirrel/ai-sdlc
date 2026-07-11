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

- Jira/Confluence is the authoritative system of record — skills should produce artifacts **in** Jira/Confluence, not documents in chat.
- Skills are composable and single-purpose (assembly-line pattern), not one monolithic "AI assistant" prompt.
- Outputs must be auditable: versioned skills, decision logs, clear human approval points.

## Tool Integrations

Skills and agents target these surfaces:

- **Jira / Confluence / Atlassian Rovo** — primary PO/SM surface; Jira artifacts (epics, stories, AC) are the main output format
- **GitHub / GitHub Copilot** — implementation handoff; well-formed tickets get assigned to Copilot coding agent
- **Visual Studio / VS Code** — developer environments
- **Playwright** — test automation (Tester role)

Atlassian MCP tools are connected in this Claude Code environment (`mcp__claude_ai_Atlassian__*`) — use them for reading/writing Jira issues and Confluence pages when developing and testing skills.

## Target Tech Stack (of the teams being served)

Skills, code generation templates, and examples should assume: C# .NET, React, TypeScript, Node.js, MS SQL Server, Azure Cosmos DB.

## Architecture

Layered design (from `research/Perplexity research on agentic PM-PO skills.md`):

1. **Decision-quality PM/PO skills** (baseline: deanpeters/Product-Manager-Skills patterns) — discovery, prioritization, decomposition rigor
2. **Jira/Confluence write bridge** — skills that create/update real Jira artifacts against our schema (issue types, labels, links, custom fields)
3. **Domain pack** — deferred; a future layer for domain-specific workflows and gates

The agreed v1 skill set (23 skills across PO/Dev/Tester/SM plus a meta skill-authoring skill) is defined in **`docs/skill-catalog.md`** — that file is the source of truth for skill names, definitions, and conventions.

The PO pipeline is: Product Brief Builder → Backlog Decomposer → Jira/Confluence Writer → Definition-of-Ready Critic. Jira hierarchy is **Initiative → Epic → Story**; teams refine Stories into Tasks themselves. Build order: PO pipeline first.

The **Definition-of-Ready Critic** is the highest-leverage control: no ticket goes to Copilot coding agent until it passes — "if an agent can translate the ticket into tests without inventing requirements, the ticket is ready."

For acceptance criteria format: **Gherkin/BDD for user-visible behavior; structured requirement blocks (not Gherkin) for NFRs** like data contracts, audit logging, retention, observability, and security constraints.

## Repository Conventions

- `research/` — background research and decision records informing skill design
- Skills follow the Agent Skills open standard (SKILL.md with frontmatter) so they are portable across Claude Code, Copilot, and Rovo surfaces
