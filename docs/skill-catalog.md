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

- **test-plan-generator** (`skills/tester/test-plan-generator/`) — derives AC-traced test cases (happy/edge/negative/NFR) with levels and automation flags; AC gaps found during design become findings for the PO. Built 2026-07-11.
- **ac-playwright-scaffolder** (`skills/tester/ac-playwright-scaffolder/`) — one Playwright TS test per AC scenario mirroring Given/When/Then, repo conventions first, honest `fixme`/`TODO` over false-pass; delivers via PR. Built 2026-07-11.
- **exploratory-charter-generator** (`skills/tester/exploratory-charter-generator/`) — risk-hypothesis charters (explore X with Y to discover Z) targeting what scripted AC tests can't see, timeboxed and prioritized. Built 2026-07-11.
- **bug-report-writer** (`skills/tester/bug-report-writer/`) — minimal deterministic repro, expected-vs-actual cited to AC, severity with rationale, duplicate check, correct KDP bug type (Story Bug vs Bug vs UAT). Built 2026-07-11.

## Scrum Master (8)

Ceremony facilitation (one skill per ceremony; every skill preps and captures — the ceremony itself belongs to the team):

- **refinement-facilitator** (`skills/sm/refinement-facilitator/`) — prep cards and timeboxed agenda before refinement; captures the team's estimates and decisions to Jira after (never estimates itself). Built 2026-07-11.
- **sprint-planning-facilitator** (`skills/sm/sprint-planning-facilitator/`) — honest capacity/velocity math and draft goals before planning; records the team's commitment to Jira/Confluence after. Built 2026-07-11.
- **sprint-review-demo-facilitator** (`skills/sm/sprint-review-demo-facilitator/`) — honest "what shipped" narrative tied to the goal, plus an ordered demo script with verified click-paths and fallbacks. Built 2026-07-11.
- **retro-facilitator** (`skills/sm/retro-facilitator/`) — blameless evidence pack (with last retro's action accountability) before; captures agreed action items to Jira with owners after. Built 2026-07-11.
- **daily-standup-digest** (`skills/sm/daily-standup-digest/`) — one-screen pre-standup digest: what moved, exceptions worth discussing (flagged/stalled/aging reviews/scope changes), sprint pulse. Built 2026-07-11.

Health and reporting:

- **sprint-report-generator** (`skills/sm/sprint-report-generator/`) — stakeholder sprint reports: commitment vs delivery, velocity as ranges never targets, timestamped scope changes, facts separated from assessments. Built 2026-07-11.
- **backlog-hygiene-auditor** (`skills/sm/backlog-hygiene-auditor/`) — periodic decay sweep (stale, duplicates, unestimated near-term, orphans, zombie epics) with item-by-item PO/SM-approved cleanup; archives reversibly, never deletes. Built 2026-07-11.
- **impediment-radar** (`skills/sm/impediment-radar/`) — detects flagged blocks, silent stalls, aging reviews, and dependency rot; drafts evidence-based escalations the SM approves and owns. Built 2026-07-11.

## Meta (1)

- **skill-author** (`skills/meta/skill-author/`) — scaffolds, audits, and catalogs skills for this library, keeping it consistent as it grows. Built 2026-07-11; the first skill in the library and the template for all others.
