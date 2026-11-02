# Interaction, motion and assets

An interface includes the transition between states. Design what happens before, during, after and when an action cannot finish.

## State contract

For each important component, record applicable states: default, hover, focus, pressed, selected, disabled with a reason, loading, empty, error and success. Some states do not apply to every component. Identify the action, state transition, visible feedback, accessible feedback and recovery path.

Use native semantic controls when possible. Keep persistent field labels, errors beside their fields, and instructions before a decision. A disabled button should not be the only place to explain an unavailable action. In dense tools, an adjacent reason or an operable help control can expose the cause without making a disabled element falsely interactive.

Preserve entered data after recoverable failures. Show whether an operation is pending or complete; prevent accidental duplicate commitments. Use confirmation when consequences merit it and consider undo for reversible operations. Do not add confirmation dialogs to every routine action.

## Motion and sound

Motion can explain continuity, spatial movement, progress and causality. Define the trigger, purpose, affected element and reduced-motion alternative. A short transition around 120–240 ms is a possible UI starting point, not a rule for cinematic motion or game animation. Measure responsiveness in the real implementation.

Do not let decorative motion obscure content or imitate genuine processing. Avoid repeated attention-grabbing loops around routine controls. Respect reduced-motion settings on the web and provide suitable runtime controls in games. Critical feedback must remain understandable with motion and sound disabled. Begin optional sound from a user action and provide useful volume/mute controls.

## Image and icon language

Choose what an asset must communicate before choosing how to produce it. A product screenshot can prove a workflow; a custom illustration can explain a model or establish a world; a photograph can communicate material or place. Stock decorative imagery rarely substitutes for product evidence.

Reuse an established icon family and existing vector assets where suitable. Keep stroke, optical weight, perspective and corner treatment coherent. Add text labels for unfamiliar or consequential actions. Color or iconography alone should not carry essential state.

For generated assets, describe their role, composition, crop, style constraints and integration context; inspect the result at the actual display size. Verify rights and font licenses for supplied assets. Provide meaningful alt text for informative images and empty alt text for purely decorative web images. Record provenance where it matters.

## Handoff

A component is more than a picture. Include its content limits, state behavior, input methods, semantic role, theme mapping and responsive behavior. In a design canvas, use named components, deliberate auto-layout and token roles rather than piles of unstructured absolute-positioned shapes. [Vibma](../../research/sources.md) informed this structural emphasis; the workflow does not depend on installing it.
