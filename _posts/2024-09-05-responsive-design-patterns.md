---
title: "Modern Responsive Design Patterns"
date: 2024-09-05
layout: post
description: "Building layouts that work on any screen size"
---

Responsive design isn't just about media queries anymore. Modern CSS gives us better tools.

## Container Queries

The future of responsive components:

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## Fluid Typography

Using `clamp()` for responsive font sizes:

```css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

## Modern Grid Patterns

Auto-fit and auto-fill are magical:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

## Mobile-First Approach

Start small, add complexity:

```css
/* Mobile default */
.layout {
  display: block;
}

/* Desktop enhancement */
@media (min-width: 768px) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
}
```

Design for the smallest screen first.
