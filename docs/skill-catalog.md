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
4. **definition-of-ready-critic** (`skills/po/definition-of-ready-critic/`) — evaluates stories against the team's Definition of Ready (12-item checklist in `references/dor-checklist.md`) before refinement; verdicts with specific fixes, PO-gated Jira comments and `dor-ready`/`dor-needs-work` labels. Built 2026-07-11.

Plus:

5. **release-notes-generator** (`skills/po/release-notes-generator/`) — drafts stakeholder-facing notes from completed stories: per-story Release Notes field (`customfield_14745`) plus an aggregate Confluence page, both PO-gated. Built 2026-07-11.

## Developer (5)

- **implementation-planner** (`skills/developer/implementation-planner/`) — turns a `dor-ready` story into a codebase-grounded technical plan (steps, data changes, AC→step map, risks) approved by the developer before any code is written. Built 2026-07-11.
- **copilot-handoff-packager** (`skills/developer/copilot-handoff-packager/`) — assesses delegation fit, builds a bounded implementation packet (AC verbatim, pattern pointers, boundaries), and assigns it to the Copilot coding agent after developer approval. Built 2026-07-11.
- **code-review-critic** (`skills/developer/code-review-critic/`) — reviews a PR against the story's AC and the team review checklist; drafts blocking/should-fix/nit comments the human reviewer approves before posting; verdict stays human. Built 2026-07-11.
- **tech-design-drafter** (`skills/developer/tech-design-drafter/`) — drafts design docs/ADRs in Confluence (real options, honest consequences, failure modes, Lucid diagrams) for Epics and Spikes, gated on developer approval. Built 2026-07-11.
- **pr-hygiene** (`skills/developer/pr-hygiene/`) — generates convention-compliant PR titles/descriptions with a diff-verified AC coverage table; flags scope honesty issues; updates the PR only after developer approval. Built 2026-07-11.

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
