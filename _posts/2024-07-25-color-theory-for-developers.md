---
title: "Color Theory for Developers"
date: 2024-07-25
layout: post
description: "Understanding color palettes and contrast in web design"
---

Good color choices can make or break a design. Developers need to understand basic color theory.

## Color Models

### RGB

Red, Green, Blue - how screens display color.

### HSL

Hue, Saturation, Lightness - more intuitive for humans.

```css
/* Same color, different models */
color: #83a598;
color: rgb(131, 165, 152);
color: hsl(165, 20%, 58%);
```

## Creating Palettes

### The 60-30-10 Rule

- 60% dominant color
- 30% secondary color
- 10% accent color

### Gruvbox Example

I use the Gruvbox color scheme:

- Background: `#fbf1c7`
- Foreground: `#282828`
- Accents: `#fabd2f`, `#fb4934`, `#b8bb26`

## Accessibility

Always check contrast ratios:

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum

Tools: WebAIM Contrast Checker, Chrome DevTools.
