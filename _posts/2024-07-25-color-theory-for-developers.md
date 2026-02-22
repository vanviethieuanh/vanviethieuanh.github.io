---
title: "Color Theory for Developers"
date: 2024-07-25
layout: post
description: "Understanding color palettes and contrast in web design"
---

Good color choices can make or break a design. Developers need to understand basic color theory to create visually appealing and accessible interfaces.

## Color Models

### RGB (Red, Green, Blue)

How screens display color. Each channel ranges from 0-255.

```css
color: rgb(131, 165, 152);
background: rgb(255, 0, 0); /* Pure red */
```

### HSL (Hue, Saturation, Lightness)

More intuitive for humans to work with.

- **Hue**: Color wheel position (0-360°)
- **Saturation**: Color intensity (0-100%)
- **Lightness**: How light or dark (0-100%)

```css
color: hsl(165, 20%, 58%);
background: hsl(0, 100%, 50%); /* Same pure red */
```

### Hexadecimal

Compact RGB notation.

```css
color: #83a598; /* Same as rgb(131, 165, 152) */
```

## Creating Palettes

### The 60-30-10 Rule

A classic interior design rule that works for interfaces:

- **60%**: Dominant color (backgrounds, main areas)
- **30%**: Secondary color (sections, cards)
- **10%**: Accent color (buttons, links, highlights)

Example:

```css
:root {
  --dominant: #fbf1c7; /* 60% - light background */
  --secondary: #ebdbb2; /* 30% - sections */
  --accent: #fe8019; /* 10% - call-to-action */
}
```

### Monochromatic Schemes

Using shades and tints of a single color. Safe and harmonious.

```css
:root {
  --blue-900: #1e3a8a;
  --blue-700: #1d4ed8;
  --blue-500: #3b82f6;
  --blue-300: #93c5fd;
  --blue-100: #dbeafe;
}
```

### Complementary Colors

Colors opposite on the color wheel. High contrast and vibrant.

- Blue (240°) + Orange (60°)
- Red (0°) + Cyan (180°)
- Purple (270°) + Yellow (90°)

### Analogous Colors

Colors next to each other on the wheel. Harmonious and pleasing.

- Blue, Blue-Green, Green
- Red, Red-Orange, Orange

### Triadic Colors

Three colors equally spaced on the wheel. Balanced and vibrant.

- Red, Yellow, Blue (primary colors)
- Orange, Green, Purple (secondary colors)

## Color Psychology

Colors evoke emotions and associations:

- **Red**: Energy, urgency, passion, danger
- **Blue**: Trust, calm, professionalism, stability
- **Green**: Growth, nature, success, health
- **Yellow**: Optimism, warmth, caution
- **Purple**: Luxury, creativity, wisdom
- **Orange**: Enthusiasm, confidence, fun
- **Black**: Power, elegance, sophistication
- **White**: Purity, simplicity, cleanliness

## Accessibility and Contrast

### WCAG Standards

Minimum contrast ratios for readability:

- **Normal text**: 4.5:1 minimum
- **Large text** (18pt+ or 14pt+ bold): 3:1 minimum
- **AAA standard**: 7:1 for normal text

### Checking Contrast

```css
/* Good contrast */
.readable {
  color: #282828;
  background: #fbf1c7;
  /* Ratio: ~12:1 */
}

/* Poor contrast - avoid */
.poor {
  color: #928374;
  background: #a89984;
  /* Ratio: ~1.5:1 */
}
```

Tools for checking:

- WebAIM Contrast Checker
- Chrome DevTools (built-in)
- Contrast Ratio calculator

### Don't Rely on Color Alone

For accessibility, never convey information through color only:

```html
<!-- Bad -->
<span style="color: red;">Error</span>

<!-- Good -->
<span class="error" aria-label="Error"> ⚠️ Error </span>
```

## Building a Palette from Scratch

### Step 1: Choose Your Base Color

Start with your brand color or main theme color.

```css
--base: #3b82f6; /* Blue */
```

### Step 2: Create Shades and Tints

**Shades**: Mix with black (reduce lightness in HSL)  
**Tints**: Mix with white (increase lightness in HSL)

```css
/* From base hsl(217, 91%, 60%) */
--blue-900: hsl(217, 91%, 20%); /* Darkest */
--blue-700: hsl(217, 91%, 40%);
--blue-500: hsl(217, 91%, 60%); /* Base */
--blue-300: hsl(217, 91%, 80%);
--blue-100: hsl(217, 91%, 95%); /* Lightest */
```

### Step 3: Add Complementary or Accent Colors

```css
/* Blue base = 217° */
--accent: hsl(37, 91%, 60%); /* Complementary orange */
```

### Step 4: Grays for Text and Borders

```css
--gray-900: #1a1a1a;
--gray-700: #404040;
--gray-500: #737373;
--gray-300: #d4d4d4;
--gray-100: #f5f5f5;
```

## Popular Color Palettes

### Gruvbox (Personal Favorite)

Retro groove colors with great contrast:

```css
:root {
  --bg: #fbf1c7;
  --fg: #282828;
  --red: #fb4934;
  --green: #b8bb26;
  --yellow: #fabd2f;
  --blue: #83a598;
  --purple: #d3869b;
  --aqua: #8ec07c;
  --orange: #fe8019;
}
```

### Tailwind Default

Modern, professional, versatile:

```css
:root {
  --slate: #64748b;
  --red: #ef4444;
  --orange: #f97316;
  --yellow: #eab308;
  --green: #22c55e;
  --blue: #3b82f6;
  --purple: #a855f7;
}
```

### Nord

Cool, arctic-inspired palette:

```css
:root {
  --nord0: #2e3440;
  --nord1: #3b4252;
  --nord2: #434c5e;
  --nord3: #4c566a;
  --nord8: #88c0d0;
  --nord9: #81a1c1;
  --nord10: #5e81ac;
}
```

## Practical Tips

### Use HSL for Variations

HSL makes it easy to create variations:

```css
/* Lighten on hover */
.button {
  background: hsl(217, 91%, 60%);
}

.button:hover {
  background: hsl(217, 91%, 70%); /* Just increase lightness */
}
```

### Limit Your Palette

Stick to 3-5 main colors plus grays. More than that gets chaotic.

### Test in Grayscale

Convert your design to grayscale to check if hierarchy works without color.

### Consider Color Blindness

About 8% of men have color vision deficiency. Test your palette:

- Use tools like Color Oracle
- Don't use red/green as the only differentiator
- Add patterns or icons alongside colors

### Dark Mode Considerations

Don't just invert colors. Adjust saturation and contrast:

```css
/* Light mode */
.light {
  --bg: #ffffff;
  --text: #1a1a1a;
  --accent: hsl(217, 91%, 60%);
}

/* Dark mode */
.dark {
  --bg: #1a1a1a;
  --text: #e5e5e5;
  --accent: hsl(217, 80%, 70%); /* Desaturated, lighter */
}
```

## Color in Practice

### Backgrounds

Use lighter, less saturated colors for large areas:

```css
body {
  background: hsl(217, 20%, 98%); /* Very light, low saturation */
}
```

### Text

High contrast with background:

```css
body {
  color: hsl(0, 0%, 10%); /* Almost black */
}
```

### Buttons and Links

Use your accent color with good contrast:

```css
.button {
  background: var(--accent);
  color: white;
  /* Ensure 4.5:1 contrast minimum */
}
```

### Hover States

Slightly darker or lighter:

```css
.button:hover {
  filter: brightness(1.1);
}
```

## Resources

- **Coolors.co**: Palette generator
- **Adobe Color**: Color wheel and schemes
- **Paletton**: Palette designer
- **Contrast Checker**: WebAIM tool
- **Color Hunt**: Palette inspiration

## Conclusion

Good color choices are about:

1. Understanding color relationships
2. Maintaining proper contrast
3. Creating visual hierarchy
4. Ensuring accessibility
5. Staying consistent

Start with a simple palette and expand as needed. When in doubt, use less color.
