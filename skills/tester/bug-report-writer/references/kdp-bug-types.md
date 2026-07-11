# KDP Bug Issue Types

Derived from the live instance 2026-07-11 (see also `skills/po/jira-confluence-writer/references/kdp-schema.md` for the full schema).

| Type | ID | When to use | Linkage |
|------|----|-------------|---------|
| Story Bug | `10400` | QA finds a defect **within an in-flight story** (sub-task, hierarchy −1) | `parent` = the story under test |
| Bug | `1` | Defect in existing/shipped functionality, not tied to an in-flight story | Link related issues; no parent required |
| Product Validation UAT Bug | `12498` | Found during the Product Validation UAT phase | Per UAT workstream conventions |
| User Validation UAT Bug | `12499` | Found during the User Validation UAT phase | Per UAT workstream conventions |
| Hotfix Bug | `13526` | Defect being fixed through the hotfix process | Per hotfix workflow — confirm with the team lead before using |

## Fields

- **Severity**: `customfield_10022` (option select) — always set, with a rationale in the description. Suggested scale: impact on the user's ability to complete the task × availability of a workaround.
- **Priority**: leave for triage unless the reporter insists.
- **Labels**: add `ai-sdlc-generated`.
- Environment/build fields: populate what's known (`Environment`, `Issue Found in Build No` `customfield_10660`) — never guess a build number.

## Choosing Story Bug vs. reopening discussion

A Story Bug says "the story's implementation doesn't meet its AC yet." If the implementation *matches* the AC and the behavior still seems wrong, that's a PO conversation (AC were wrong), not a Story Bug.
