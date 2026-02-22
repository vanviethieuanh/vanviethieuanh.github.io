---
title: "Weird Things About This Project"
date: 2024-01-15
layout: post
description: "A collection of oddities, quirks, and unexpected discoveries from building this portfolio site"
---

Every project has its quirks. Here are some of the weird, unexpected, and sometimes frustrating things I encountered while building this portfolio site.

## The SVG Blinking Eye Problem

While creating an animated bird icon, I ran into a bizarre CSS animation issue. The goal was simple: make the bird's eye blink using a `scaleY` transform.

```css
@keyframes blink {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0); }
}

.eye {
  animation: blink 2s infinite;
}
```

Seems straightforward, right? Wrong. The eye would scale from its default origin point (0,0), causing it to move dramatically out of position. The eye's center was at y=72, so when scaling to 0, it would collapse toward the top of the SVG canvas.

### The Hacky Solution

Instead of fighting with `transform-origin` in SVG space (which is always confusing), I used a group element to change the coordinate system:

```xml
<g transform="translate(0,72)">
    <circle class="eye" cx="170" cy="0" r="4" fill="black" />
</g>
```

By translating the group to y=72, the eye's center is now at y=0 in the local coordinate space, making the scale transformation work perfectly. Sometimes the "tricky" solution is the right one.

## Jekyll's Timezone Confusion

Posts wouldn't show up locally even though they were clearly in the `_posts` folder. The culprit? Jekyll's default timezone behavior. Posts dated in the future (relative to your system time) won't render.

The fix:

```yaml
# _config.yml
timezone: America/Los_Angeles
future: false
```

Always set your timezone explicitly to avoid phantom posts.

## CSS Grid Auto-Placement Quirkiness

When building the projects gallery, I used CSS Grid with auto-placement. But certain items would jump to unexpected positions:

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: dense; /* The problem */
}
```

The `dense` packing algorithm tries to fill holes, which caused items to appear out of order. Removing it fixed the issue but left gaps. Sometimes you have to choose: visual perfection or logical order.

## The Markdown Code Block Indentation Trap

I spent 30 minutes debugging why code blocks weren't rendering. The issue? Indentation.

```markdown
<!-- This doesn't work -->
Some text:

    ```javascript
    console.log('hello');
    ```

<!-- This works -->
Some text:

```javascript
console.log('hello');
```
```

Indented code blocks are treated as literal code in Markdown. Fenced code blocks must start at column 0.

## Asset Path Confusion

Local development: assets load fine. Deploy to GitHub Pages: everything breaks. The issue was absolute paths.

Always use relative paths for assets, or Jekyll's `relative_url` filter to generate paths that work in subdirectories.

## Font Loading Flash of Unstyled Text

Custom fonts would cause a jarring flash during page load. The solution: font-display strategy.

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/assets/fonts/custom.woff2');
  font-display: swap; /* Show fallback immediately */
}
```

The `swap` value shows fallback text immediately, then swaps when the custom font loads. Much better UX.

## Sass Import Order Dependencies

Changing the order of `@import` statements broke the entire stylesheet. Variables defined in one file weren't available in another if imported in the wrong order.

```scss
// This order matters!
@import 'variables';  // Must be first
@import 'mixins';     // Uses variables
@import 'global';     // Uses mixins and variables
```

Sass is compiled top-to-bottom. Dependencies must be imported before use. 

## The Mysterious Horizontal Scroll

Everything looked perfect, except for a 5px horizontal scrollbar that wouldn't go away. After inspecting every element:

```css
* {
  box-sizing: border-box; /* The missing piece */
}
```

Some elements had padding that pushed them beyond 100% width. `box-sizing: border-box` makes padding count toward the width instead of adding to it.

## Lessons Learned

- **SVG transforms** are weird. Use groups to simplify.
- **Always set timezone** in Jekyll config.
- **Test on production** hosting early and often.
- **Markdown is picky** about indentation and whitespace.
- **CSS Grid** has quirks with auto-placement.
- **Font loading** needs strategy for good UX.
- **Sass import order** matters for dependencies.
- **Box-sizing** should be border-box by default.

Every weird thing you encounter teaches you something. Embrace the quirks, and document the solutions for your future self.
