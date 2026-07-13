# Readiness Report: {scope}

**Reviewed:** {date} | **Stories:** {count} | **Ready:** {n-ready} | **Ready with notes:** {n-notes} | **Not ready:** {n-blocked}

## Verdicts

| Story | Summary | Verdict | Blocking items |
|-------|---------|---------|----------------|
| {key} | {summary} | {verdict} | {checklist-item-numbers-or-none} |

## Findings (worst first)

### {key}: {summary} — {verdict}

- **Item {n} ({item-name})**: [what's wrong, concretely]
  - **To fix**: [the question to answer or the change to make]
  - **Suggested rewrite** *(suggestion only)*: [draft AC or story text in house style, when one can be offered]

[Repeat per failed item, then per story.]

## PO overrules

| Story | Finding | PO rationale |
|-------|---------|--------------|
| {key} | {item} | [why the PO accepted the story as-is] |

## Next steps

- Ready: {keys} → team refinement
- Not ready: {keys} → blocking questions above, owner {po-name}

---

# Acceptance Report: {story-key} *(acceptance mode only)*

**Story:** {key} — {summary} | **Status:** In Product Owner Validation | **Reviewed:** {date}

## Per-AC verification (D1)

| AC | Evidence examined | Verdict |
|----|-------------------|---------|
| AC#{n}: {title} | [PR diff / test result / walkthrough — link it] | met / not met / **unverifiable** |

## Exit checks (D2–D6, from `references/definition-of-done.md`)

| Check | Finding |
|-------|---------|
| D2 Tests merged & green | [CI link / gap] |
| D3 Story Bugs dispositioned | [each child bug: resolved / accepted-deferred with comment link] |
| D4 Scope changes recorded | [none / noted where] |
| D5 Release-note line drafted | [present / drafted below / "internal — no note"] |
| D6 Exits via screened terminal transition | [confirmed path / parked-in-waypoint warning] |

## Recommendation

- [accept / bounce to {status} — unmet items: {list}] — **the PO decides and transitions; this report is evidence, not approval.**
