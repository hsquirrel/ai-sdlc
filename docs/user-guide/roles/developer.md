# Developer Guide

Plainly: **every developer skill is currently deferred.** They are built, in the repo, and tabletop-tested — but none has been run against a real repository, a real delegation, or a real incident, and each waits for exactly that trigger. This page tells you what's coming so you recognize the moment the trigger occurs; there are no individual skill pages until then.

## Why deferred?

The library's growth rule is demand signals, not speculation: a skill activates when its named trigger actually happens, not before. The developer skills all depend on access or events that haven't occurred yet — pretending otherwise would mean documentation for workflows nobody can run.

## What activates, and when

| Skill | Trigger | What it will do for you |
|-------|---------|-------------------------|
| **code-review-critic** | Read access to a real `ap-*` repository | The single PR skill, two passes: a cheap hygiene pass (honest description, story linkage, convention-compliant title, scope honesty) and a rigorous review of the diff against the linked story's AC and the team checklist. It drafts anchored comments classified blocking/should-fix/nit; **you own every comment and the verdict** — it never approves or blocks a PR by itself, and never touches code. Per-item gate. |
| **copilot-handoff-packager** | The org's first real Copilot coding-agent delegation | Packages a Ready story into a bounded implementation packet — AC verbatim, patterns to follow with real example files, explicit do-not-touch boundaries — and runs the **invention test**: every decision the agent would face must be answered by the packet. It will also tell you honestly when work is a poor delegation fit (migrations, auth logic, ambiguous UX). Per-run gate; you own the resulting PR's review and merge. |
| **incident-hotfix-runner** | The first real production incident routed through the express lane | The incident scribe: while responders fix production, it creates the traced hotfix ticket the way the team actually ships (Bug + fixVersion + `hotfix` label), applies the express readiness contract (H1–H4), links incident ↔ fix ↔ regressed story, and drafts the release note at ship time. Express means compressed gates — the incident lead approves in minutes — never zero gates. |
| **tech-design-drafter** | A named request for a design doc | Drafts a design doc/ADR built to be challenged: at least two genuinely considered options, honest consequences including the negative ones, failure modes, under ~3 pages. Its template (`skills/developer/tech-design-drafter/templates/design-doc.md`) is usable standalone today. Per-run gate. |

## What you can use today

- The PO pipeline already affects you: stories arriving in refinement carry `dor-ready`/`dor-needs-work` labels and AC in the house style. The DoR contract — "could you translate this story into tests without inventing requirements?" — is your protection too; bounce stories that fail it.
- The design-doc template is real and usable now, even though the drafter skill is dormant.
- If you get read access to a repo, hit the first delegation, or catch the first incident: say so. That's the trigger, and it's a named person's request that activates the skill.

## What these skills will never do

Write production code, merge a PR, approve or block a review on their own, or ship anything without a human gate. The developer skills draft and package; you build, review, and merge.
