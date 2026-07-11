# implementation-planner (Developer)

Turns a Ready story into a step-by-step technical plan grounded in the **actual codebase** — reviewed by you before a line of code is written.

## When to use

- You picked up a story and want the thinking done and reviewed before coding
- You're about to delegate to Copilot and want a plan for the packet to reference
- A story smells wrong and you want the conflict surfaced properly

**Not for:** multi-story or architectural design (that's [tech-design-drafter](tech-design-drafter.md)); writing the code itself.

## Before you start

- The story key (ideally `dor-ready` — if not, it will tell you what's missing before planning on top of it)
- Repo access for the codebase(s) the story touches

## What happens

1. It reads the story and its AC, then explores the code: entry points, similar existing features, conventions, tests.
2. It drafts the plan: ordered verifiable steps naming real files and symbols; data changes (SQL Server migrations, Cosmos document/partition impacts) with rollout *and rollback*; API/contract changes with affected consumers; a test approach per AC; risks each with a retirement action.
3. It maps every AC to steps — an unmapped AC means the plan is incomplete; an unmapped step is scope creep and gets flagged.
4. **You approve the plan** (or it dies in review, cheaply — that's the point).
5. It saves the plan where you choose: repo docs or a Jira comment.

## What gets written

The approved plan document. No production code, ever.

## Good to know

- "If it hasn't read the file, it doesn't reference it" — plans cite real paths, not plausible ones.
- If planning reveals the story can't be built as written (contradictory AC, impossible constraint), it stops and routes that to the PO instead of planning around it.
- Data migration steps always state the backward-compatibility window — roll-forward should be a decision, not an accident.

## Related

- Next: implement it yourself, or [copilot-handoff-packager](copilot-handoff-packager.md) to delegate
