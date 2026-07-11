# Test Plan: {story-key} — {story-summary}

**Author:** {tester} | **Date:** {date} | **AC count:** {n} | **Cases:** {m}

## Coverage Summary

| AC | Cases | Levels | Automation |
|----|-------|--------|------------|
| AC#1 | {case-ids} | [unit/API/UI] | [auto/manual] |

## Test Cases

### TC-1: {name} (verifies AC#{n})

- **Level:** [unit / API / UI] | **Priority:** [AC-blocking / nice-to-verify] | **Automation:** [candidate / manual]
- **Setup:** [preconditions, test data, role]
- **Steps:** [numbered actions]
- **Expected:** [observable outcome, from the AC — not invented]

### TC-2: {name} (negative — verifies AC#{n} must-not-happen)

[Same structure. Group: happy paths first, then edges, then negative.]

## NFR Checks (from the story's Requirements block)

| Check | Source line | How verified |
|-------|-------------|--------------|
| [audit entry written on change] | {NFR-ref} | [query/log assertion] |

## Findings for the PO

- [AC untestable as written / missing expected result / contradiction — with the specific question. Mark blocking items; omit section if empty.]
