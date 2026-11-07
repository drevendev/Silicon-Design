# Interaction, motion and assets

An interface includes the transition between states. Design what happens before, during, after and when an action cannot finish.

## State contract

For each important component, record applicable states: default, hover, focus, pressed, selected, disabled with a reason, loading, empty, error and success. Some states do not apply to every component. Identify the action, state transition, visible feedback, accessible feedback and recovery path.

Use native semantic controls when possible. Keep persistent field labels, errors beside their fields, and instructions before a decision. A disabled button should not be the only place to explain an unavailable action. In dense tools, an adjacent reason or an operable help control can expose the cause without making a disabled element falsely interactive.

Preserve entered data after recoverable failures. Show whether an operation is pending or complete; prevent accidental duplicate commitments. Use confirmation when consequences merit it and consider undo for reversible operations. Do not add confirmation dialogs to every routine action.

## Discovery, context and completion

Make useful actions discoverable near the object they affect. Direct editing and contextual tools can reduce a detour, but need visible cues and keyboard/touch access. Preserve focus, useful selection and the working comparison when details open. Context preservation is the goal; a single page or overlay is only one possible implementation.

When that path is affected, test the moment a record disappears from a secondary view, including undo of its last item. Restore a useful object/surface or a meaningful remaining focus target. In a real browser check the focused node and visibility after rendering; a stub recording a focus call cannot prove that context survived. Preserve actual task inputs instead of adding a new editable field merely to demonstrate care.

Distinguish a new collection, no search matches, no pending work, missing access and failed loading. They need different explanations and next steps. A finished queue can acknowledge completion; a failed request must describe recovery. Do not send someone to an unrelated feature merely to fill an empty state.

Place onboarding near the relevant feature. Keep it dismissible, bound its recurrence and avoid competing announcements. Support people as they become proficient: efficient repetition, discoverable shortcuts where appropriate, and detail available without turning each action into a tutorial.

These decisions adapt [Ant interaction patterns and Primer empty-state/onboarding guidance](../../research/deep-read.md). They are product-sensitive patterns, not a requirement to add every mechanism to every interface.

## Check the interactive boundary

For affected controls, verify actual activation from labels, icons and usable padding, with supported keyboard paths. Hit-testing can diagnose an interception but cannot prove that the intended event occurred. Inspect opened menus and important text in their real overflow context; deliberate truncation needs reachable full necessary information.

Check unexpected movement during relevant search, filter, mode and inspector changes, including lost reading/selection context. Intended result removal, expansion and responsive reflow remain valid. Comparable items need coherent rhythm, not compulsory equal heights. For sticky headers and identity columns, inspect the corner during two-axis scrolling for incorrect overlap.

The review skill's [conditional procedure](../../skills/silicon-design-review/references/interactive-checks.md) gives measurement detail and negative controls. Use it when needed for interactive review, not for every edit or static screenshot. Check only relevant transitions and broaden when observations justify it.

## Voice and tone

Use consistent names for actions and results. Let the product's voice remain recognizable while tone follows the user's situation. An invitation can be light; a payment or failure needs precision and reassurance. Write errors around what happened, what remains intact and what to do next. Avoid blame, theatrical apology and humor that competes with recovery.

When establishing voice, record useful examples of invitation, confirmation and failure in DESIGN.md; a local copy fix does not need a new document or message flow. Inspect them in the interface, including repeated confirmations. Charming copy that hides the actual result is a state-design problem. See [Character & attachment](../character.md) and the [Vibe/Primer source analysis](../../research/deep-read.md).

## Motion and sound

Motion can explain continuity, spatial movement, progress and causality. Define the trigger, purpose, affected element and reduced-motion alternative. A short transition around 120–240 ms is a possible UI starting point, not a rule for cinematic motion or game animation. Measure responsiveness in the real implementation.

Do not let decorative motion obscure content or imitate genuine processing. Avoid repeated attention-grabbing loops around routine controls. Respect reduced-motion settings on the web and provide suitable runtime controls in games. Critical feedback must remain understandable with motion and sound disabled. Begin optional sound from a user action and provide useful volume/mute controls.

Distinguish efficient feedback from an expressive event. A frequently used control should not repeatedly make someone wait for an entrance flourish. Let transitions explain where something went or which state changed; treat interruption and cancellation as part of the behavior. Keep exits unobtrusive when the removed content no longer needs attention. The [Vibe and Ant motion guidance](../../research/deep-read.md) informs this separation; their numerical timing scales are not universal settings.

## Image and icon language

Choose what an asset must communicate before choosing how to produce it. A product screenshot can prove a workflow; a custom illustration can explain a model or establish a world; a photograph can communicate material or place. Stock decorative imagery rarely substitutes for product evidence.

Reuse an established icon family and existing vector assets where suitable. Keep stroke, optical weight, perspective and corner treatment coherent. Add text labels for unfamiliar or consequential actions. Color or iconography alone should not carry essential state.

For generated assets, describe their role, composition, crop, style constraints and integration context; inspect the result at the actual display size. Verify rights and font licenses for supplied assets. Provide meaningful alt text for informative images and empty alt text for purely decorative web images. Record provenance where it matters.

## Handoff

A component is more than a picture. Include its content limits, state behavior, input methods, semantic role, theme mapping and responsive behavior. In a design canvas, use named components, deliberate auto-layout and token roles rather than piles of unstructured absolute-positioned shapes. Bound container width so long content can wrap, expose editable text through actual bindings, and model meaningful variant dimensions. Read back and inspect a result after changes; API success proves that a write happened. [Vibma's detailed guidance](../../research/deep-read.md) informed this structural emphasis; the workflow does not depend on installing it.
