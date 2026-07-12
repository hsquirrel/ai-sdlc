# Epic Closeout Checklist

The gate at the other end of an epic's life. An epic proposed for closure (or found resolved by the closure-integrity check) is evaluated against every item; failures on a *resolved* epic are standard hygiene findings proposing reopen-or-complete-the-closeout.

1. **No open children** — every child is resolved, or explicitly re-homed with a moved-scope ledger entry (destination, why, by whom). Silent reparenting fails.
2. **Linked work dispositioned** — linked bugs and action items are fixed, moved (with ledger entry), or explicitly accepted as non-blocking with a recorded reason.
3. **No recently-active descendants** — nothing under the epic has activity within the audit's staleness window. Active work under a resolved epic means the closure was premature or a child was stranded (T3: KDP-38344 deployed to QA under an epic closed months earlier).
4. **Governance settled** — any linked review artifact (ARB, design doc) is in a terminal state: approved, or bypassed with a recorded reason and owner. "Proposed/Pending" at closure fails.
5. **Delivery comment present** — what shipped, what didn't, and where remaining work went (KDP-38132's closing summary is the house exemplar).
6. **Success measure outcome recorded** — met / not met / not measured, with reason, against the epic's stated measure or closure criteria.
7. **Resolution honesty** — the chosen resolution's own definition holds ("Complete = no outstanding issues" must actually be true; a Duplicate closure names the survivor and the survivor actually absorbed the scope).
