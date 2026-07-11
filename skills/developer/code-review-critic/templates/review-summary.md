# Review: {pr-title} ({pr-link})

**Story:** {story-key} | **Reviewed:** {date} | **Verdict recommendation:** [approve / approve with should-fixes / request changes] *(the human reviewer decides)*

## AC Coverage

| AC | Implemented | Tested | Where / gap |
|----|-------------|--------|-------------|
| AC#1 {short-name} | [yes/no/partial] | [yes/no] | [files — or the specific gap] |

**Undeclared scope:** [behavior changes no AC asked for — or "none"]

## Findings

### Blocking

- **{file}:{line}** — [problem]. **Failure scenario:** [input/state → wrong behavior]. **Suggestion:** [actionable fix]

### Should-fix

- **{file}:{line}** — [problem, why it matters, suggestion]

### Nits *(omit when blocking findings exist; max a handful)*

- **{file}:{line}** — [take-or-leave note]

## Checked and Clean

- [Dimensions reviewed with no findings — so the human knows what was covered: e.g., "SQL parameterization, authZ at endpoints, migration rollback"]

---

*AI-assisted review, human-approved before posting.*
