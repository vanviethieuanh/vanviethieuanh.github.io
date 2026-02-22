---
title: "Modern Responsive Design Patterns"
date: 2024-09-05
layout: post
description: "Building layouts that work on any screen size"
---

Responsive design isn't just about media queries anymore. Modern CSS gives us better, more flexible tools to create truly responsive layouts.

## Beyond Media Queries

### The Problem with Media Queries

Traditional approach: hard-coded breakpoints.

```css
.container { width: 100%; }

@media (min-width: 768px) {
  .container { width: 750px; }
}

@media (min-width: 1024px) {
  .container { width: 960px; }
}
```

This doesn't scale well and assumes specific device sizes.

### Modern Approach: Intrinsic Design

Let content and layout dictate themselves with flexible, content-aware patterns.

## Container Queries

**The future is here.** Make components responsive to their container, not the viewport.

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

Browser support: Chrome/Edge 105+, Safari 16+, Firefox 110+

### Why Container Queries Matter

Components become truly modular. A card adapts whether it's in a sidebar or main content area.

## Fluid Typography

Scale text smoothly across screen sizes.

### Using clamp()

```css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* minimum, preferred, maximum */
}

p {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
}
```

No media queries needed!

### Responsive Line Length

Keep text readable at all sizes:

```css
.content {
  max-width: min(65ch, 90vw);
  /* Never wider than 65 characters or 90% viewport */
}
```

## Modern Grid Patterns

### Auto-Fit RAM Pattern

**Repeat, Auto-Fit, Minmax** - the holy grail of responsive grids:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

Items automatically wrap without media queries!

### Auto-Fill vs Auto-Fit

```css
/* Auto-fit: collapses empty tracks */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* Auto-fill: preserves empty tracks */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

Usually you want `auto-fit`.

### Grid with Minimum Columns

Ensure at least 2 columns:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max(200px, 30%), 1fr));
}
```

## Flexible Layout Patterns

### The Sidebar Pattern

Sidebar collapses to stacked layout automatically:

```css
.layout {
  display: grid;
  grid-template-columns: minmax(250px, 1fr) 3fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
```

Or without media queries:

```css
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2rem;
}

.sidebar {
  grid-area: auto;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 250px 3fr;
  }
}
```

### The Pancake Stack

Header, flex content, footer:

```css
.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

Perfect for sticky footers!

### Holy Grail Layout

Classic three-column with flexible center:

```css
.holy-grail {
  display: grid;
  grid-template: 
    "header header header" auto
    "nav main aside" 1fr
    "footer footer footer" auto
    / 200px 1fr 200px;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .holy-grail {
    grid-template: 
      "header" auto
      "nav" auto
      "main" 1fr
      "aside" auto
      "footer" auto
      / 1fr;
  }
}
```

## Responsive Images

### Modern Approach

```html
<img 
  src="small.jpg"
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 800px"
  alt="Description"
>
```

Browser picks the best image for the situation.

### Art Direction with Picture

Different images for different contexts:

```html
<picture>
  <source media="(max-width: 600px)" srcset="portrait.jpg">
  <source media="(max-width: 1200px)" srcset="landscape.jpg">
  <img src="wide.jpg" alt="Description">
</picture>
```

### Aspect Ratio

Prevent layout shift:

```css
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

## Responsive Spacing

### Fluid Spacing

```css
.section {
  padding: clamp(2rem, 5vw, 6rem);
  gap: clamp(1rem, 3vw, 3rem);
}
```

### Space Toggle Pattern

```css
:root {
  --space: 1rem;
  --space-lg: calc(var(--space) * 2);
  
  @media (min-width: 768px) {
    --space: 1.5rem;
  }
}
```

Use custom properties for responsive values.

## Mobile-First Approach

Start small, enhance for larger screens:

```css
/* Mobile default */
.nav {
  flex-direction: column;
}

/* Tablet and up */
@media (min-width: 768px) {
  .nav {
    flex-direction: row;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .nav {
    gap: 2rem;
  }
}
```

Better performance: mobile styles are simpler and load first.

## Responsive Navigation Patterns

### Simple Collapse

```css
.nav {
  display: none;
}

.nav.open {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .nav {
    display: flex;
    flex-direction: row;
  }
}
```

### Off-Canvas Navigation

```css
.nav {
  position: fixed;
  left: -300px;
  width: 300px;
  height: 100vh;
  transition: left 0.3s;
}

.nav.open {
  left: 0;
}

@media (min-width: 768px) {
  .nav {
    position: static;
    width: auto;
    height: auto;
  }
}
```

## Breakpoint Strategy

### Common Breakpoints

```css
/* Mobile: default */

/* Tablet: 768px */
@media (min-width: 768px) { }

/* Desktop: 1024px */
@media (min-width: 1024px) { }

/* Large desktop: 1280px */
@media (min-width: 1280px) { }
```

But don't be dogmatic. Let content determine breakpoints.

### Use Named Breakpoints

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

## Testing Responsive Design

### Browser DevTools

- Chrome: Device toolbar (Cmd+Shift+M)
- Firefox: Responsive Design Mode
- Safari: Enter Responsive Design Mode

### Responsive Design Checklist

1. ✓ Text is readable at all sizes
2. ✓ Touch targets are at least 44x44px
3. ✓ Images scale properly
4. ✓ No horizontal scrolling
5. ✓ Content hierarchy makes sense
6. ✓ Forms are usable on mobile
7. ✓ Navigation works on small screens

## Performance Considerations

### Avoid Hiding Large Elements

```css
/* Bad - element still loads */
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
}
```

Better to not include it at all on mobile, or lazy load.

### Optimize Font Loading

```css
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2');
  font-display: swap;
}
```

### Critical CSS

Inline critical styles, load the rest async:

```html
<style>
  /* Critical above-fold styles */
</style>
<link rel="preload" href="main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## Modern Units

### Viewport Units

```css
.hero {
  height: 100vh; /* Full viewport height */
  width: 100vw;  /* Full viewport width */
}
```

New units:
- `dvh`: Dynamic viewport height (accounts for mobile toolbars)
- `svh`: Small viewport height
- `lvh`: Large viewport height

```css
.mobile-hero {
  height: 100dvh; /* Better for mobile */
}
```

### Container Query Units

```css
.card {
  font-size: 2cqw; /* 2% of container width */
  padding: 5cqi;   /* 5% of container inline size */
}
```

## Practical Examples

### Responsive Card Grid

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
  padding: clamp(1rem, 5vw, 3rem);
}

.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
  
  .card img {
    width: 150px;
    flex-shrink: 0;
  }
}
```

### Responsive Typography System

```css
:root {
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.65vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-2xl: clamp(2rem, 1.6rem + 2vw, 3rem);
  --text-3xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
}
```

## Common Mistakes

### 1. Fixed Heights

```css
/* Bad */
.box { height: 300px; }

/* Good */
.box { min-height: 300px; }
```

### 2. Forgetting Touch Targets

```css
/* Buttons should be at least 44x44px */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}
```

### 3. Not Testing on Real Devices

DevTools are great, but test on actual phones and tablets.

### 4. Viewport Units Bug

On mobile, `100vh` includes address bar. Use `100dvh` instead.

## Resources

- **Responsive Design Patterns**: Google Web Fundamentals
- **Every Layout**: Pattern library by Heydon Pickering
- **Utopia**: Fluid responsive design calculator
- **CSS Tricks**: Complete guide to responsive design

## Conclusion

Modern responsive design:
1. Start mobile-first
2. Use intrinsic sizing (clamp, minmax, auto-fit)
3. Embrace container queries
4. Let content dictate breakpoints
5. Test on real devices

The goal: layouts that adapt naturally, not just at arbitrary breakpoints.

Design for the smallest screen first, then enhance.
