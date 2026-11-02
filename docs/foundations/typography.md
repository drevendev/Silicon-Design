# Typography

Choose type for the content, language, device and reading distance. These are Silicon Design starting points, not universal standards or prescriptions for every product.

## Choose and test the family

Start with the actual interface text. Test body paragraphs, the longest heading, prices, dates, keyboard shortcuts, `Il1 / O0`, and the scripts the product supports. For EN/RU include `Ёжик, съешь ещё этих мягких французских булок. ₽ 1 234,50` and a long translated action. Check every required weight and italic, fallback substitution, font-loading behavior and the font's actual license.

A system sans is a practical baseline for operational interfaces. An expressive display face can give a publication or game a distinctive voice while body text stays comfortable. Begin with one reading family and add a second role only when it changes the result usefully. A third family needs a specific role, such as code or a game-world inscription. This is an effort heuristic, not a font quota.

Do not fake bold or italic when the font supplies the required face. Prefer a loaded subset that includes the product's languages; avoid a Latin-only first impression followed by a visibly different Cyrillic fallback. Verify the actual browser output.

## Define roles rather than a pile of sizes

| Role | Initial size / line height | Use and adjustment |
| --- | --- | --- |
| Reading body | 1rem / 1.5–1.7 | Long prose; tune with the actual x-height and measure |
| UI body | 1rem / 1.4–1.5 | Labels, short explanations and records; a dense tool may justify a smaller tested role |
| Supporting text | 0.875rem / 1.4–1.5 | Secondary metadata; keep contrast and avoid hiding necessary instructions here |
| Section title | 1.5–2rem / 1.15–1.3 | Create a visible jump without overwhelming nearby content |
| Display | Fluid, context-specific / 1.0–1.15 | Short expressive titles; test wrapping and accents carefully |
| Numeric data | Match nearby role | Tabular numerals for columns and changing counters, units adjacent to values |

`1rem` follows the user's root size; it is commonly 16 CSS px at browser defaults. Do not lock the root to a smaller value to make rem arithmetic convenient. A modular scale such as 1.2 or 1.25 can help start a hierarchy, but optical results matter more than the ratio.

For web display text, a bounded size such as `clamp(2rem, 1.2rem + 3vw, 4.5rem)` is a starting experiment. Include a rem component, allow wrapping, and verify text enlargement; a fluid formula alone does not prove accessibility.

## Shape the text block

Start long prose around 55–75 characters per line. Short labels and dense records have different needs. Keep paragraphs aligned to the reading direction; centered text works best for short, deliberately composed passages. Avoid justified UI copy with uneven word spacing.

Use weight, size, spacing and position to establish hierarchy before adding more colors. Restrict all-caps to short labels where the language and font support it. Avoid aggressive tracking on Cyrillic, body text and small labels. Test punctuation, descenders, diacritics and mixed weights for clipping.

For prices, counts and timestamps, choose alignment and precision according to the comparison. A compact number should preserve an accessible route to its exact value when the exact value changes a decision. Do not align numbers with spaces in markup.

## Verify

Check narrow and wide layouts, 200% text enlargement, delayed or failed font loading, all supported scripts, and dark themes where present. Inspect real headings for awkward short last lines without forcing brittle line breaks. Game text also needs a test at target resolution and viewing distance.

Primary references: [Ant Design font system](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/font.en-US.md), [Primer typography](https://github.com/primer/design/blob/87f799f202ec95df15c99f473c9c0c803da8e6b3/content/foundations/typography.mdx), [WCAG text resizing](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html). Our ranges above are independent starting conventions, not values mandated by these sources.
