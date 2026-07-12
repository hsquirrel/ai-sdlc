# KDP Bug Issue Types

Derived from the live instance 2026-07-11, corrected against observed practice 2026-07-12 (T5 shakedown: the hotfix issue types are dead in practice — 5 ever, none since Nov 2024 — while real hotfixes ship as regular Bug/Story + fixVersion). See also `skills/po/jira-confluence-writer/references/kdp-schema.md`.

## Types in active use

| Type | ID | When to use | Linkage |
|------|----|-------------|---------|
| Story Bug | `10400` | QA finds a defect **within an in-flight story** (sub-task, hierarchy −1) | `parent` = the story under test |
| Bug | `1` | Defect in existing/shipped functionality — **including production hotfixes** (see below) | Link related issues; no parent required |
| Product Validation UAT Bug | `12498` | Found during the Product Validation UAT phase | Per UAT workstream conventions |
| User Validation UAT Bug | `12499` | Found during the User Validation UAT phase | Per UAT workstream conventions |

## The hotfix case (production defect shipping outside the release train)

- **Use a regular `Bug` + the hotfix fixVersion + label `hotfix`** — this is how the team actually ships (verified: hotfix release 1.69-OCT28 contained a regular Story and a regular Bug; SRE deployment pages track the release). Prefer routing through `incident-hotfix-runner`, which builds the full traced packet.
- **The regression case:** when the defect is a regression from a shipped story, the *expected behavior* is cited from **that story's AC**, and the ticket links both the regressed story (relates/caused-by) and the detecting incident — SSQ System Malfunction — via the **"Root Cause Fix"** link type (observed in real use: KDP-32165 → SSQ-2793).
- **Legacy types — do not use:** `Hotfix Bug` (`13526`), `Hotfix Story` (`13524`), `Hotfix System Story` (`13525`) are abandoned in practice (5 issues ever, 0 since 2024-11, 1 of them test junk). They remain in Jira's registry pending a team decision to retire; creating new ones just hides work from how the team actually tracks hotfixes.

## Fields

- **Severity**: `customfield_10022` (option select) — always set, with a rationale in the description. Suggested scale: impact on the user's ability to complete the task × availability of a workaround.
- **Priority**: leave for triage unless the reporter insists.
- **Resolution**: must be set when the ticket closes — all 5 historical hotfix items are Done with resolution unset, which makes time-to-resolve unmeasurable. Don't repeat that.
- **Labels**: add `ai-sdlc-generated`; add `hotfix` on hotfix-case bugs.
- Environment/build fields: populate what's known (`Environment`, `Issue Found in Build No` `customfield_10660`) — never guess a build number.

## Choosing Story Bug vs. reopening discussion

A Story Bug says "the story's implementation doesn't meet its AC yet." If the implementation *matches* the AC and the behavior still seems wrong, that's a PO conversation (AC were wrong), not a Story Bug.
