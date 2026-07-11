# Skill Catalog (v1)

The agreed set of skills to build, organized by scrum role. Locked by consensus on 2026-07-11.

## Definitions

- **Skill** — a versioned instruction module (SKILL.md) a human invokes inside an agent surface (Claude Code, Copilot, Rovo) to run one workflow.
- **Agent** — a persona with autonomy that may chain skills (e.g., a Rovo agent).
- **Script** — deterministic code with no LLM judgment (e.g., a Jira API sync script).

## Conventions

- Skills are single-purpose and chained assembly-line style, with a **human approval gate at the end of every skill**. Nothing is written to Jira/Confluence/GitHub without human approval.
- Jira hierarchy target: **Initiative → Epic → Story** (all three issue types exist in our Jira instance). Teams refine Stories into Tasks themselves during ceremonies.
- Acceptance criteria: Gherkin/BDD for user-visible behavior; structured requirement blocks for NFRs (data contracts, audit logging, retention, observability, security).
- Developer and Tester skills target **GitHub Copilot** (VS / VS Code) as the primary surface; author to the Agent Skills open standard so they remain portable to Claude Code and Rovo.
- Build order: **PO pipeline first**, since every downstream role depends on well-formed briefs and stories.

## Product Owner (5)

The four pipeline skills run in order, each gated by PO approval:

1. **product-brief-builder** (`skills/po/product-brief-builder/`) — interactive discovery producing a single Confluence brief: problem, users, outcomes/metrics, workflow, scope, assumptions, open questions, stakeholders. Built 2026-07-11.
2. **backlog-decomposer** (`skills/po/backlog-decomposer/`) — turns an approved brief into a draft Initiative → Epics → Stories with AC, sliced vertically; degrades gracefully to a brief-lite intake (with visible brief-debt flag) when no approved brief exists. Built 2026-07-11.
3. **jira-confluence-writer** (`skills/po/jira-confluence-writer/`) — writes an approved decomposition into Jira (KDP) as a real Initiative → Epic → Story hierarchy and links it back to the Confluence brief; write-plan approval gate, safe re-runs, `ai-sdlc-generated` label. Schema derived from the live instance in `references/kdp-schema.md`. Built 2026-07-11.
4. **Definition-of-Ready Critic** — raises blocking questions, contradictions, and missing AC before a story enters team refinement.

Plus:

5. **Release Notes Generator** — drafts stakeholder-facing release notes from completed stories; PO approves.

## Developer (5)

- **Implementation Planner** — turns a Ready ticket into a step-by-step technical plan (files, migrations, risks) before any code is written.
- **Copilot Handoff Packager** — after team refinement, packages a task/story into a bounded implementation packet and assigns it to Copilot coding agent.
- **Code Review Critic** — reviews a PR diff against the ticket's AC and team standards; drafts review comments for human approval.
- **Tech Design Drafter** — drafts an ADR / design doc in Confluence for larger stories or spikes.
- **PR Hygiene** — generates PR descriptions linked to Jira, checks commit messages, verifies AC coverage claims.

## Tester (4)

- **Test Plan Generator** — turns a story's AC into a structured test plan (happy path, edge cases, negative tests, NFR checks).
- **AC → Playwright Scaffolder** — translates Gherkin AC into Playwright test skeletons in TypeScript.
- **Exploratory Charter Generator** — produces session-based exploratory testing charters from a story's risk profile.
- **Bug Report Writer** — turns a raw observation/repro into a well-formed Jira bug with severity rationale.

## Scrum Master (8)

Ceremony facilitation (one skill per ceremony):

- **Refinement Facilitator** — preps candidate stories, surfaces DoR gaps and open questions, captures estimates/decisions back to Jira.
- **Sprint Planning Facilitator** — drafts sprint goal, checks capacity, pulls candidate stories, records the plan in Jira/Confluence.
- **Sprint Review/Demo Facilitator** — assembles demo script and "what shipped" narrative from completed work.
- **Retro Facilitator** — prepares retro inputs from sprint data, captures action items back into Jira.
- **Daily Standup Digest** — pre-standup digest of yesterday's Jira/GitHub activity, flagging items worth discussing.

Health and reporting:

- **Sprint Report Generator** — drafts sprint review/status summaries from Jira data (velocity, scope changes, carryover).
- **Backlog Hygiene Auditor** — flags stale, duplicate, unestimated, or DoR-violating backlog items.
- **Impediment Radar** — scans Jira/GitHub activity for blocked or stalled work and drafts escalations.

## Meta (1)

- **skill-author** (`skills/meta/skill-author/`) — scaffolds, audits, and catalogs skills for this library, keeping it consistent as it grows. Built 2026-07-11; the first skill in the library and the template for all others.
