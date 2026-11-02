# Accessibility baseline and evidence

For web interfaces, target WCAG 2.2 AA across the relevant scope. The checks below are a starting selection, not the complete standard or a certification procedure. Games and native apps also need platform- and input-specific testing.

| Area | Check in the actual interface | Source or status |
| --- | --- | --- |
| Text contrast | 4.5:1 for ordinary text; 3:1 for qualifying large text; account for exceptions and actual backgrounds | [SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) |
| Non-text contrast | Required graphical/control cues meet 3:1 against adjacent colors, subject to the criterion's exceptions | [SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) |
| Text enlargement | Text can reach 200% without losing content or functionality, with specified exceptions | [SC 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) |
| Reflow | Ordinary vertical content works at an equivalent width of 320 CSS px; necessary two-dimensional content has exceptions | [SC 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) |
| Pointer targets | At least 24 × 24 CSS px, or satisfy the criterion's spacing or other exceptions | [SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) |
| Keyboard focus | Controls are reachable, focus is visible, order is meaningful, and focus is not entirely obscured by author-created content | [SC 2.4.11 explanation](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html); also inspect keyboard operation and focus visibility |
| Semantics and recovery | Labels, errors, names, roles, status updates and recovery work with assistive technology | Manual flow review against the full [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |

For touch-heavy interfaces, roughly 44–48 CSS px hit areas can be a more comfortable initial convention. That is our usability starting point, not the WCAG AA minimum, and CSS px are not interchangeable with native platform points or dp.

## Perform a bounded review

Navigate the representative flow using keyboard alone. Test focus entry and restoration for overlays, Escape behavior where appropriate, and the absence of traps. Inspect visible labels and accessible names. Use a screen reader for important flows when available; record its name, browser/platform and what was actually exercised.

Test text enlargement and real browser zoom separately from viewport emulation. Inspect reduced motion, theme changes where supported, and meaning without color. Record pass, fail, untested or inapplicable for each check. Static analyzers support this review but do not replace it.

Game checks include UI scaling at target resolution/distance, remappable or alternative input where applicable, independent essential sound cues, readable subtitles, and status that remains clear against changing scenes. Use [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/basic/) as contextual guidance. A canvas HUD does not become accessible merely by passing text contrast math.

## Report the boundary

“Declared palette text pairs passed” is a narrow fact. “Accessible” is a much larger claim. Screenshots establish appearance at a captured state, not keyboard usability, screen-reader behavior or successful task completion. Leave unperformed checks visible in the [review report](../../templates/REVIEW.md).
