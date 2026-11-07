# Interactive checks

Use for relevant changed controls, state transitions, overlays and sticky/scroll regions. Choose representative affected states; reuse the project's harness. Do not dump every bounding box or exercise every workflow for a local fix. Record revision, fixture, viewport/scale, input and expected behaviour.

## Stability and item geometry

Compare meaningful regions before/after affected filters, search, modes and inspector changes. Note unexpected displacement, lost selection or reading context. Bounding boxes can locate movement; observe whether it actually disrupts the task.

Result removal, deliberate expansion and responsive reflow are not defects by default. Comparable items need a coherent rhythm; equal height is useful only where comparison benefits. Keep deliberately variable-height cards as a negative control against automatic uniform-height findings.

## Activation

Exercise labels, icons and usable padding of a composite control and supported keyboard activation. Confirm the intended action occurs from those areas; distinguish neighbouring actions in a segmented group. A working full-area control is a negative control.

Use hit-testing to diagnose interception, not certify behaviour: an elementFromPoint result does not prove an event handler or state transition. A covered label or non-activating padding is a located finding. Do not assume the whole bounding box of a group is one control.

## Clipping and overlays

Inspect important labels, opened menus and popovers in their actual scrolling and overflow context. Width/height checks suggest candidates but cannot settle deliberate truncation, multiline text or available detail.

Necessary full values must be reachable through the supported input paths. A labelled detail view may suffice; do not require a tooltip on every item. Verify overlay placement and focus with long content, including relevant narrow sizes.

## Sticky intersections

For a table with sticky headers and an identity column, scroll both axes. Observe the corner, header and column at their intersection: intended content remains readable without incorrect overlap. Combine position checks with the actual visible result; stacking problems may survive correct bounding boxes.

## Recovery and state truth

For affected close/removal/undo paths, exercise the real controls, including last-item removal from a secondary surface when relevant. Check restored object/input, useful destination and active focus. The focused node must be connected, visible and reveal the task; BODY focus or a destroyed node is not successful restoration.

Check repeated input and declared switching/reload persistence only where that contract is affected. Do not invent a notes field or save mechanism to supply a recovery example. Inspect pending/blocked/error/success states as applicable, without treating unknown data as zero or a partial result as success.

## Evidence and stopping

Retain action/state, selector or region, observation, consequence, proposed correction and same-state recheck. A source harness's assertion count is separate from native input/focus/rendering evidence. Correct a mistaken test path and retain its diagnostic; do not score the adapter mistake as a product defect.

Broaden checks when failures justify it; stop when scoped criteria pass or identify the unresolved limitation. Report unavailable runtime, touch/controller or assistive-technology paths as untested. Screenshots and passing source checks do not establish accessibility compliance.
