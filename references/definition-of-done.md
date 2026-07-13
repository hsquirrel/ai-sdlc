# Definition of Done (story-level)

The exit-gate counterpart to the DoR checklist. A story is **done** when every item below holds — checked by the definition-of-ready-critic's **acceptance mode** at the "In Product Owner Validation" state, where the org's own workflow already places a human acceptance gate (and where items demonstrably stall).

## The checklist

| # | Item | Evidence |
|---|------|----------|
| D1 | Every AC is demonstrably met | Per-AC verification: the linked PR diff, test results, or a walkthrough shows each AC satisfied — no AC accepted on assertion alone |
| D2 | Tests are merged and green | The PR's CI run passed; test code landed with the change, not promised after it |
| D3 | Story Bugs are dispositioned | Each child Story Bug is resolved or explicitly accepted as known-and-deferred by the PO (with a comment) |
| D4 | Scope changes are recorded | Anything descoped mid-story is noted on the issue (and in the epic's registry if one exists) — silent scope shrink is how "done" stories surprise users |
| D5 | Release-note line drafted | The Release Notes field carries its one-line user-facing summary (or "internal — no note") |
| D6 | Resolution will be set at the terminal transition | The story exits through a screened terminal transition, not parked in a done-category waypoint (see the trap registry in `references/kdp-instance.md` §5) |

## How the acceptance mode uses this

1. Fetch the story's AC, linked PRs, child Story Bugs, and Release Notes field.
2. Present a per-AC verification table (AC → evidence → met / not met / unverifiable) plus D2–D6 as line items.
3. The PO accepts (→ PO Validated with a clear conscience) or bounces (→ Back to Dev / Back to In Test in Dev, with the failing items named on the issue).

The critic never transitions the issue itself — the PO does. The skill's product is the evidence table, not the approval.

## Bounce etiquette

A bounce is a finding, not a failure: name the unmet items factually on the issue (blameless — no names), so the bounce reads identically whether the gap was code, tests, or the AC themselves. If the implementation matches the AC but the behavior still seems wrong, that's an AC conversation with the PO, not a bounce.
