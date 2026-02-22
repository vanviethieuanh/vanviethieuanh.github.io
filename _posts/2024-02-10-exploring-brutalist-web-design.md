---
title: "Exploring Brutalist Web Design"
date: 2024-02-10
layout: post
description: "A deep dive into the raw, honest aesthetics of brutalist web design and why it matters"
---

Brutalist web design is a rebellion against the overly polished, cookie-cutter websites that dominate the modern web. It's raw, honest, and unapologetically functional.

## What Is Brutalist Web Design?

Brutalism in architecture emphasizes raw materials, exposed structures, and a "truth to materials" philosophy. Brutalist web design applies similar principles:

- **Raw HTML**: Often minimal styling, showing the structure
- **Bold Typography**: Large, impactful text
- **Harsh Contrasts**: Black text on white backgrounds, or vice versa
- **No Decoration**: Function over form
- **Exposed Elements**: Showing the "scaffolding" of the web

## Historical Context

The term comes from "béton brut" (raw concrete) in architecture. Web brutalism emerged as a reaction to:

- Over-designed corporate websites
- Templated design systems
- Homogeneous UX patterns
- The tyranny of "best practices"

## Core Principles

### 1. Content is King

Remove everything that doesn't serve the content. No hero images, no unnecessary animations, no fluffy marketing copy.

```html
<h1>Here's What I Think</h1>
<p>And here's why you should care.</p>
```

That's it. No container divs, no wrapper classes, just content.

### 2. Bold Typography

Use strong, readable fonts. Make headings HUGE.

```css
h1 {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1;
}
```

### 3. Thick Borders

Heavy borders create visual hierarchy without subtle grayscale.

```css
.brutalist-card {
  border: 5px solid black;
  padding: 2rem;
}

.brutalist-button {
  border: 3px solid black;
  background: yellow;
  padding: 1rem 2rem;
  font-weight: bold;
  text-transform: uppercase;
}

.brutalist-button:hover {
  background: black;
  color: yellow;
}
```

### 4. Limited Color Palette

Often monochromatic, or using stark, high-contrast colors:

- Black and white
- Black, white, and one accent color
- Primary colors only

```css
:root {
  --black: #000;
  --white: #fff;
  --accent: #ff0000;
}
```

### 5. Raw HTML Aesthetics

Sometimes showing default browser styles intentionally:

```css
/* Embrace the defaults */
a {
  color: blue;
  text-decoration: underline;
}

a:visited {
  color: purple;
}
```

## Why Brutalism Matters

### Honesty

Brutalist sites don't pretend to be something they're not. They're honest about being digital documents.

### Speed

Minimal CSS and JavaScript means fast load times. No frameworks, no build steps, just HTML.

### Accessibility

High contrast and simple layouts are often more accessible than complex designs.

### Personality

In a world of identical Bootstrap sites, brutalism stands out. It has character.

## Modern Examples

- **Craigslist**: The OG brutalist site (unintentionally)
- **Hacker News**: Function over form
- **Bloomberg's "Dataloss"**: Intentional brutalism
- **Yale School of Art**: Controversial and famous

## Implementing Brutalist Design

Start with semantic HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Brutalist Site</title>
  <style>
    body {
      max-width: 800px;
      margin: 2rem auto;
      font-family: monospace;
      font-size: 18px;
      padding: 0 1rem;
    }
    
    h1 {
      font-size: 3rem;
      border-bottom: 5px solid black;
    }
    
    a {
      color: blue;
      text-decoration: underline;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Welcome</h1>
  <p>This is my brutalist website. It's fast, accessible, and honest.</p>
</body>
</html>
```

### CSS Reset Not Required

Brutalism often embraces browser defaults instead of resetting them.

### Typography Choices

- **Monospace fonts**: Courier, Monaco, Consolas
- **Sans-serif**: Arial, Helvetica
- **Heavy weights**: Bold everything

### Layout

Keep it simple:

```css
.container {
  max-width: 900px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
```

## When to Use Brutalism

**Good for:**
- Personal portfolios
- Artist websites
- Experimental projects
- Content-focused blogs
- Manifestos and opinion pieces

**Bad for:**
- E-commerce
- Corporate websites
- Apps requiring complex interactions
- Mainstream consumer products

## The Spectrum of Brutalism

### Extreme Brutalism
Raw HTML, no CSS, browser defaults only.

### Moderate Brutalism
Intentional design with brutalist aesthetics: bold type, high contrast, minimal decoration.

### Brutalist-Inspired
Conventional sites with brutalist touches: bold borders, stark colors, honest layouts.

## Common Mistakes

### 1. Confusing Ugly with Brutalist

Brutalism isn't about making ugly websites. It's about honest, functional design.

### 2. Ignoring Usability

Brutalism shouldn't sacrifice usability. Links should still be obvious, navigation should still work.

### 3. No Hierarchy

Even brutalist sites need visual hierarchy. Use size, weight, and spacing.

## Tools and Resources

- **No frameworks needed**: Just HTML and CSS
- **Brutalist Websites**: A curated showcase
- **Web Design Museum**: For historical examples

## The Philosophy

```css
/* The web doesn't need to be perfect */
body {
  margin: 8px; /* Browser default */
}

/* It needs to be functional */
a:hover {
  text-decoration: none;
}

/* And honest */
.no-javascript-decorative-wrapper-div {
  /* This probably shouldn't exist */
}
```

Brutalism asks: Do we really need all these libraries, frameworks, and design systems? Or can we just... make websites?

## Conclusion

Brutalist web design isn't for everyone, and that's the point. It's a statement against homogeneity, a preference for function over form, and a reminder that the web doesn't need to be polished to be powerful.

The web is made of text and links. Everything else is decoration.
