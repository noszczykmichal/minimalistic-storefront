---
paths:
  - "src/**/*.css"
  - "src/**/*.tsx"
---

# Colors

All colors are defined as CSS variables in `:root` in `src/index.css`. That file is the single source of truth.

Before writing any color value (hex, rgb, hsl, or a named color):

1. Read the `:root` block in `src/index.css`.
2. If a variable with that exact value exists, use `var(--name)`. Never write the raw value.
3. If no exact match exists, look for an existing variable that is visually close or serves the same role
   (text, background, border, accent, etc.). Do not invent a new shade.
4. If nothing fits, stop and ask before adding anything. In the question, include:
   - the color you need and where it's used,
   - the closest existing variables,
   - a proposed variable name for `:root`.
     Only add the new variable after I confirm.

When editing a file that already contains raw color values, point them out and offer to replace them
with existing variables. Don't change them without asking.
