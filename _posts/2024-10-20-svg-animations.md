---
title: "Animating SVGs with CSS and JavaScript"
date: 2024-10-20
layout: post
description: "Creating dynamic, scalable graphics on the web"
---

SVGs are perfect for the web: scalable, animatable, and accessible. Let's explore animation techniques.

## CSS Animations

```css
.logo {
  animation: rotate 3s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## Stroke Animations

The classic "drawing" effect:

```css
.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
```

## JavaScript Libraries

- **GSAP**: Powerful animation library
- **Anime.js**: Lightweight and flexible
- **Snap.svg**: jQuery for SVG

## SMIL Animations

Native SVG animations:

```xml
<circle r="20">
  <animate attributeName="r" from="20" to="40" dur="1s" repeatCount="indefinite" />
</circle>
```

SVGs give you infinite creative possibilities.
