# Color and palettes

Build a palette from roles and context. Choosing a new accent is only one part of identity; typography, composition, imagery and voice must support the same direction.

Palette coherence is the goal, not a freeze. Extend the existing relationships or, within the authorized redesign, remap surfaces, text, icons, boundaries and interaction/status states together. An isolated accent that clashes with the surrounding system needs reworking; the hue itself is not forbidden. Explicit brand constraints still apply.

## Build the roles

1. Choose the product's lightness environment and neutral surfaces for its content and use setting.
2. Define readable foregrounds, supporting text, interactive boundaries and focus indicators.
3. Choose brand and action roles. A brand hue does not have to fill every button.
4. Define success, warning, danger and informational roles with text or shape cues.
5. Add categorical, sequential or diverging data palettes according to the data. Category colors must remain distinguishable without relying only on hue.

Semantic names such as `text.primary`, `surface.raised`, `action.primary`, `status.danger` and `focus.ring` explain usage. Primitive names such as `blue.700` explain a value. Map primitives to semantic roles, then components to roles. Keep theme-specific mappings where their meanings stay stable.

Perceptual color spaces such as OKLCH can help explore orderly ramps; still check gamut, rendered sRGB fallbacks and actual contrast. Equal numeric steps do not guarantee usable state differences. The specimens use explicit sRGB hex values to keep their checks small and reproducible.

## Measure pairs, not isolated swatches

For ordinary web text, use at least 4.5:1 contrast against the actual background; qualifying large text uses 3:1. WCAG defines large text as at least 18 pt regular or 14 pt bold, approximately 24 and 18.67 CSS px. Aim above the minimum for sustained reading. Account for transparency, background images, gradients and interaction states. [WCAG contrast explanation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Meaningful control and graphical cues generally need 3:1 against adjacent colors under SC 1.4.11, with specified exceptions. A decorative divider need not meet the same requirement. Check the cue needed to identify the control or state. [Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

Record foreground, background, role, threshold and result. Check the unrounded ratio against the threshold. A palette passing declared pairs says nothing about undeclared combinations or runtime overlays.

The [specimen palettes](../../examples/palettes.json) declare tested pairs for three fictional directions. Run `python tools/check.py` from the repository root to recompute them. These palettes illustrate role assignment; they are not a shared skin for every product.

## Preserve status meaning

Retain informative semantic colour together with text or shape. If a resolved pair fails its applicable contrast requirement, choose and remeasure a suitable semantic variant rather than replacing every status with ink. A darker or more saturated swatch is not automatically sufficient. A 3.09:1 ratio alone does not fail a 3:1 threshold; the actual role, pair and applicable criterion matter.

Prefer understandable status names. Dense codes need a nearby legend and reachable item detail through supported pointer, keyboard and touch paths. An existing detail view may suffice without a tooltip on every item. Include truthful success, partial, unknown and blocked examples where those states belong to the contract; do not colour an unknown or incomplete result as success.

## Design themes and states

Create a dark theme by remapping surface, foreground, border and state roles. Simple inversion rarely preserves hierarchy. Check selected, hover, pressed, loading, focus and error combinations independently. Support a system preference or a deliberate theme choice when the product calls for it; do not add a theme switch merely to satisfy a style checklist.

Inspect the resolved component colors for every materially different theme or direction. In the [matched trial](../../benchmarks/2026-11-03/PROTOCOL.md), a light folio inherited light text from the dark root despite passing declared palette calculations. Its body copy and owned quantities were almost invisible. Remap the foreground at the scope that actually supplies it; keep image-overlay roles local. A variable change or a successful CSS write is not evidence that the browser's computed color changed.

Trace meaningful glyphs too: SVG fill/stroke/currentColor, masks, filters and image-backed icons may follow a different colour path from adjacent text. Inspect the actual adjacent surface, transparency and affected states. An unreadable dark-on-dark glyph remains a failure even if other declared pairs pass. Use resolved colours for applicable contrast calculations; visual inspection also checks thin strokes, viewBox, line-height, padding and accidental overflow crops. Decorative/inactive exceptions do not make necessary active cues optional.

For errors and resource deficits, combine color with a label, icon shape, pattern or explicit amount. Reserve visual intensity for decisions that need it. A warning should not look more urgent than a destructive action unless its consequences justify it.

Primary reference for role separation: [Ant Design color system](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/colors.en-US.md). For token interchange, [DTCG Format 2025.10](https://www.designtokens.org/tr/2025.10/format/) is a Community Group report, not a W3C Recommendation. Our palette JSON is a small custom teaching format, not a DTCG implementation.
