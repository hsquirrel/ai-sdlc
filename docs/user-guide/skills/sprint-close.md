# sprint-close (Scrum Master)

Turns a finished sprint into three honest artifacts from one data pull: a stakeholder report (flow metrics first, plus a four-number system scoreboard), a blameless retro evidence pack, and the retro's agreed actions captured into Jira. Honesty is the product — a sideways sprint reported plainly builds more credibility than a wall of green.

## When to run it

- At sprint close (report → retro pack → action capture, in that order)
- Report mode also serves mid-sprint, when leadership asks for status

## What it asks of you

- The audience (team lead? leadership? PMO?) — the report is calibrated to it
- Context a query can't show — it goes in *attributed as SM context*, never blended into the data
- After the retro: the actions the team agreed to — what, owner, by when, how the team will know it happened

## What happens at the gate (per-run, each mode)

You review the report before it's published, the retro pack before it's shared (anything better raised in person comes out), and the action list before tasks are created.

## What it writes and where

- The sprint report to Confluence, linked from the sprint: committed vs. completed, scope changes with dates, trends, the **system scoreboard** (% of sprint-entering items with AC, bug non-fix closure rate, median cycle time through validation states, hotfix trace completeness — same queries every sprint), and optionally a demo agenda with items flagged "needs verification by the team"
- The retro pack: at most ~7 neutral evidence items with sources, the previous retro's actions scored honestly (done / in progress / not started / quietly forgotten), and 2–3 data-derived discussion prompts phrased as questions
- Each agreed action as a Jira task (`retro-action` label, owner, due date), linked to the retro page so the next retro's pack finds them

## What it will never do

- Attach a metric to a person — "the team completed" is the only subject
- Record or summarize the retro discussion itself — only the actions the team chose to make public
- Imply causes the data doesn't show — facts and assessments stay visually separated
- Fabricate numbers — points below ~60% coverage read "not computable"; reconstructed baselines are declared with their method, and every reconstructed report says a commitment record at the next planning ends the archaeology

## Good to know

- Hotfix-pattern items worked during the sprint count as scope invasion even off-board — otherwise the sprint's biggest disruption is invisible in its own report.
- An action without an owner and a check is recorded as a wish and flagged as such.
- First run with no prior retro record: the pack says "this establishes the baseline," never an empty table pretending history was clean.
