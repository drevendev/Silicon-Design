---
name: silicon-design-system
description: Define or refine typography, semantic color roles, tokens and component states for an existing product direction. Use when a UI needs a coherent reusable system rather than isolated style fixes.
---

# Silicon design system

Build the smallest system that supports the actual product. Inspect its DESIGN.md, existing tokens and components first. Reuse sound conventions and avoid introducing a new framework merely to change appearance.

## Typography and color

Test type with actual body copy, the longest title, numbers and supported scripts. Check required weights, fallback behavior, loading and licenses. Define reading, UI, title, supporting and numeric roles as needed, including size, weight, line height and intended use. Test wrapping and text enlargement; a mathematical scale alone is insufficient.

Assign semantic surface, foreground, action, status, boundary and focus roles. Map existing primitives to those roles and map components to semantic roles. Specify theme mappings only for themes in scope. Avoid treating one attractive palette as a universal product skin.

Measure actual foreground/background pairs, including relevant state combinations and transparency. For web text use WCAG's 4.5:1 ordinary-text and 3:1 qualifying-large-text thresholds; evaluate meaningful non-text cues against the applicable 3:1 requirement and exceptions. Compare unrounded ratios. Pair status colors with text or shape. Report tested combinations rather than declaring a whole product compliant.

## Components and implementation

Define a compact spacing, shape and elevation vocabulary from content relationships. Cover applicable default, hover, focus, pressed, selected, disabled-with-reason, loading, empty, error and success states for important components. Include content limits, responsive behavior and keyboard/touch expectations.

Keep source-of-truth tokens in the project's existing format. Do not claim DTCG compatibility unless the chosen representation is validated against that format. If generating CSS or another platform export, identify its source and avoid hand-maintained duplicate values without an explicit reason.

Build or update a representative specimen in the product's real environment. Include long content, values with units, an error and an unavailable action. Inspect the rendered result and check relevant input and scaling behavior.

Deliver token/type roles, component contracts, measured contrast pairs and evidence with untested areas. A collection of swatches is an intermediate artifact.

Optional depth: [typography](https://github.com/drevendev/Silicon-Design/blob/master/docs/foundations/typography.md) and [color](https://github.com/drevendev/Silicon-Design/blob/master/docs/foundations/color.md).
