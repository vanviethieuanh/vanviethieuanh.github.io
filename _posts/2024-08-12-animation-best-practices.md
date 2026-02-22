---
title: "CSS Animation Best Practices"
date: 2024-08-12
layout: post
description: "Making smooth, performant animations on the web"
---

Animations bring websites to life, but poorly executed animations can hurt performance and user experience.

## Performance Tips

### Use Transform and Opacity

These properties are GPU-accelerated:

```css
.fast {
  transform: translateX(100px);
  opacity: 0.5;
}

/* Avoid these for animation */
.slow {
  left: 100px; /* Creates layout recalculation */
  background-color: red; /* Creates repaint */
}
```

### Will-Change

Hint to the browser about upcoming animations:

```css
.animated-element {
  will-change: transform;
}
```

## Timing Functions

- `ease`: Natural, most common
- `ease-in-out`: Smooth acceleration/deceleration
- `cubic-bezier()`: Custom timing curves

## Respect User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Smooth animations make better experiences.
