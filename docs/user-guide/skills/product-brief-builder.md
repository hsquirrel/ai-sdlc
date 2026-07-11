# product-brief-builder (Product Owner)

Turns a raw idea into one rigorous, readable product brief in Confluence — through an interview that will (politely) refuse to transcribe weak answers.

## When to use

- A new initiative or feature idea needs framing, **before** anyone decomposes it into tickets
- An inherited/fuzzy request needs its problem, outcomes, and scope pinned down

**Not for:** writing epics/stories (that's [backlog-decomposer](backlog-decomposer.md)) or technical design (that's [tech-design-drafter](tech-design-drafter.md)).

## Before you start

- 20–30 minutes for the interview (max three short rounds)
- Anything that already exists: notes, support tickets, related Confluence pages, Lucid diagrams — share them first so you aren't asked what they already answer

## What happens

1. It reads what you share, then interviews you: problem and evidence, target roles, outcomes with metrics, current vs. future workflow, scope in/out/later, assumptions, open questions, stakeholders.
2. Expect pushback — that's the design:
   - State a solution and it will ask what hurts, for whom, with what evidence (your solution gets recorded, just not as the problem)
   - Every outcome needs a baseline → target metric; unknown baselines become early scope or open questions
   - An empty "Out of scope" list means the interview isn't done
3. It drafts the brief from the 8-section template, marking every unknown as a tracked open question (blocking vs. non-blocking) — never inventing evidence.
4. **You approve the draft** — iterate as much as you like; nothing exists outside the conversation yet.
5. You pick the Confluence space/parent; it creates the page and gives you the link.

## What gets written

One Confluence brief page, where you chose. Nothing else.

## Good to know

- Workflow sections prefer a linked Lucidchart/Lucidspark diagram; without one you get numbered steps and a marked diagram placeholder to fill later.
- The brief's status line surfaces blocking open questions — answer those before decomposing or they'll follow the work downstream.

## Related

- Next: [backlog-decomposer](backlog-decomposer.md) consumes the approved brief
