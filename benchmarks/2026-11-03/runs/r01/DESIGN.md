# Dispatch implementation direction

Implemented local prototype; rendered appearance is unverified. The intended operator feeling is steady competence: an object has been repaired, but its handover still deserves a deliberate record.

## Subject inventory

Supplied: three work orders, exact owners, repair notes, address values, lamp customer correction, three technical object drawings, action labels, stage transitions and fixture contracts. The repeated ritual is inspecting a repair, resolving the handover condition, recording the actual result, then optionally undoing.

Authored interface framing: bench index, numbered record sections, empty handover book, visit-only workshop-note field and record framing. These introduce no customer evidence or service claims. The number 017 connects the bench drawing, selected work slip and handover receipt.

## Retained alternatives

| Direction | Dominant object and reading model | Structural decisions | Tradeoff |
| --- | --- | --- | --- |
| A — Bench ledger (recommended) | Selected work record; index → repair/note → address/action | Vertical three-job index, selected slip, a dedicated action column; receipts use the same rule and label grammar | Best balance of context and action, with less drawing emphasis than B; needs vertical scrolling on phones |
| B — Object desk | Drawing → object record → handover | Horizontal object shelf, large drawing occupying its own desk panel, record and action beside it; drawing leads on mobile; receipts have broad object bands | Strongest object orientation; greater vertical travel and less dense operation |
| C — Work-order register | Compare all stages → open a work slip | Full-width stage table precedes a compact selected record, restrained typography, smaller illustrations; completed records become register rows | Fast comparison and repeated use; less emotional emphasis on the object |

All three are active implementations with shared fixture data, drawings, actions, notes and state. The recommendation is provisional design judgment, not a measured preference result. No direction is discarded. A theatrical full-screen object presentation was avoided because the address choice must remain a decision-critical value; B retains a large drawing while exposing the record and action.

## System and cross-state grammar

Source tokens are in `styles.css`. A uses Georgia for object titles and customer wording; Arial handles operating labels; monospace identifies work orders. B uses larger bold sans titles and broader drawing surfaces. C uses compact sans titles and tabular record structure. The common palette assigns dark green to action/ink, cream to records, amber to the unresolved address, muted neutral to waiting, and red to failed operations. Status text always accompanies color.

Rules divide record sections instead of enclosing every sentence in a card. A 24px spacing rhythm separates stages; 8–14px gaps group controls. Address text is 16–18px, with persistent labels for both the original and corrected values. Controls have visible focus, native radio/textarea semantics, labelled fixture navigation, and disabled radio release with a visible repair reason. Reduced motion removes transitions.

The same work-order number and drawing extend to empty/populated handovers and receipt inspection. Error retains the slip and chosen address; success replaces it with an actual-address receipt; undo restores the stage and chosen correction. A waiting radio never receives a completion mark. Repeated visits avoid celebration and keep the bench index accessible.

Invitation: “Confirm the address.” Failure: the supplied contract explains why 18 is wrong and tells the operator to use 18a. Success: “Released to delivery” with “Actual delivery address / 18a High Street.” These are labelled local records, not actual fulfillment.

## Responsive and verification criteria

At 1280px, A has a vertical index and three record columns; B has a shelf and object desk; C has a register and compact slip. At 390px, A uses a compact three-object chooser and stacked action; B places the drawing first; C retains all three table rows, stacking the selected action below the repair. Necessary text may wrap. No fixed-height clipping is intended.

Switching job, direction and bench/handovers retains this visit's state, including notes, address and inspected record. Reset/reload starts the selected QA fixture. No storage or remote calls are used. User notes are escaped into text/textarea content.

Unresolved: visual density, actual narrow-screen wrapping, browser focus behavior, zoom, screen-reader output, touch operation and audience response require browser/human inspection. See RUN.md for the source-level checks actually performed.
