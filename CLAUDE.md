# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The project guidance lives in a single source shared with the target surface — read and follow it:

@.github/copilot-instructions.md

**Keep the two in sync by construction:** project guidance is edited ONLY in `.github/copilot-instructions.md` (imported above). This file carries only what is specific to working on the repo with Claude Code.

## Claude Code-specific notes

- GitHub Copilot is the library's only target surface; Claude Code is a development surface for this repo, not a deployment target. Don't add Claude-specific syntax to skill bodies.
- Where Atlassian MCP tools (`mcp__claude_ai_Atlassian__*`) are connected in the session, they may be used; otherwise use the `atl` CLI per `references/atlassian-access.md`. Instance quirks: `references/kdp-instance.md` §1.
