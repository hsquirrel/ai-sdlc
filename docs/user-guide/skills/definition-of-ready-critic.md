# definition-of-ready-critic (Product Owner)

A constructively adversarial reviewer that checks stories against the team's Definition of Ready **before** they cost the team refinement time — or get handed to a coding agent that would invent the gaps.

## When to use

- Stories were just created by the writer and refinement is coming
- Any time you want to know which stories are actually ready ("review KDP-1234", "review everything under this Epic")
- On a draft decomposition that hasn't hit Jira yet

## Before you start

- The scope: story keys, an Epic/Initiative key, or the draft document
- Ten minutes to engage with findings — this one talks back

## What happens

1. It evaluates every story against the [12-item DoR checklist](../../../skills/po/definition-of-ready-critic/references/dor-checklist.md): blocking items (story form, vertical slice, behavioral AC, testable-without-invention, no blocking open questions, no contradictions) and non-blocking ones (sizing, edge cases, NFRs, traceability, dependencies, design links).
2. The core judgment is one contract: *could a tester or coding agent write test cases from this story without inventing requirements?* Vague AC ("works correctly", "gracefully") always fail.
3. You get a report — verdict per story (Ready / Ready with notes / Not ready), specific gaps with the exact question to answer, and suggested rewrites where possible.
4. **You approve the report** — and you can overrule any finding; the overrule is recorded, not hidden.
5. On approval (Jira stories only): a comment per story with its verdict and gaps, plus a `dor-ready` or `dor-needs-work` label.

## What gets written

Story comments + labels, after your approval. It **never edits the stories themselves** — suggested rewrites stay suggestions until a human applies them.

## Good to know

- Stories carrying brief-debt cap at "Ready with notes" — the debt stays visible.
- It won't fail stories for missing estimates/sprint/assignee; those belong to the team, not the DoR.
- It's issue-type aware: `Tech Managed` items are judged by objective + verifiable completion checks (build/scan/deploy), not forced into user-story form — and substantively sound AC in a non-house format pass with a style suggestion, never a blocking failure.
- Readiness is two-altitude: epics in scope are judged against their own [epic-readiness checklist](../../../skills/po/definition-of-ready-critic/references/epic-readiness-checklist.md) (traceability, authored scope, epic AC, governance linked with status, closure criteria) — stories can be green while the epic above them is the problem.
- AI-generated stories get zero leniency — the pipeline grades its own homework honestly.
- The checklist is the team's to tune: start lenient, ratchet up as maturity grows.

## Related

- Previous: [jira-confluence-writer](jira-confluence-writer.md) · Downstream: team refinement, then [implementation-planner](implementation-planner.md) / [test-plan-generator](test-plan-generator.md)
