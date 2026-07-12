# Hotfix: {concise-defect-summary}

**Incident:** {ssq-key-or-alert} | **Severity:** {sev} | **Started:** {when} | **fixVersion:** {hotfix-version} | **Incident lead:** {name}

## What's broken (repro from the incident)

1. [Minimal steps/conditions producing the failure in production]

**Blast radius:** [who/what is affected, factually]

## Regression contract (what "fixed" observably means)

- **Regressed story:** {story-key-or-UNKNOWN}
- **Expected behavior:** [cited from the regressed story's AC — quote AC#N. If the story is unknown or has no AC: `⚠ CONTRACT DEBT: expected behavior stated from {source/judgment}, no AC to cite`]

## Rollback path

[How we back out if the fix makes it worse — version rollback / flag / config. "Fix forward" is a decision, not a default: state why if chosen.]

## Regression check

[The named check proving the incident scenario can't silently return — test to add/run, monitor to watch. This feeds test-plan-generator's regression-plan mode.]

## Trace links *(non-negotiable)*

| Link | Target |
|------|--------|
| Root Cause Fix ("is a root cause fix for") | {ssq-key} |
| Problem/Incident ("is caused by") | {regressed-story-key-or-TODO} |

## Trail *(append as the run progresses)*

- [ticket {key} → PR {link} → deployment page {link} → release notes {link}]
