---
title: "CSS Animation Best Practices"
date: 2024-08-12
layout: post
description: "Making smooth, performant animations on the web"
---

Animations bring websites to life, but poorly executed animations hurt performance and user experience. Here's how to do it right.

## Performance Fundamentals

### The 60 FPS Rule

Smooth animation means 60 frames per second, giving you 16.67ms per frame. Anything slower feels janky.

### What Triggers Reflow/Repaint

**Avoid animating these** (they trigger layout recalculation):

- width, height
- margin, padding
- top, right, bottom, left
- border

**Avoid these** (they trigger repaint):

- background-color
- color
- box-shadow
- border-radius

### Use GPU-Accelerated Properties

**Animate these instead** (composited on GPU):

- transform
- opacity

```css
/* Bad - triggers layout */
.slow {
  transition: left 0.3s;
}
.slow:hover {
  left: 100px;
}

/* Good - uses GPU */
.fast {
  transition: transform 0.3s;
}
.fast:hover {
  transform: translateX(100px);
}
```

## Transform Properties

### Translate

Move elements without triggering layout:

```css
.box {
  transform: translate(50px, 100px);
  /* Or separately: */
  transform: translateX(50px) translateY(100px);
}
```

### Scale

Grow or shrink elements:

```css
.grow {
  transition: transform 0.3s;
}
.grow:hover {
  transform: scale(1.1);
}
```

### Rotate

Spin elements:

```css
.spinner {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### Combining Transforms

```css
.combo {
  transform: translateX(100px) rotate(45deg) scale(1.2);
}
```

Order matters! Read right to left for how transforms apply.

## Opacity Animations

One of the two GPU-accelerated properties:

```css
.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
```

## Transitions vs Animations

### Transitions

For simple state changes:

```css
.button {
  background: blue;
  transition:
    background 0.3s,
    transform 0.3s;
}

.button:hover {
  background: darkblue;
  transform: scale(1.05);
}
```

### Animations

For complex, multi-step animations:

```css
.bounce {
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
```

## Timing Functions

### Built-in Easings

```css
/* Linear - constant speed */
.linear {
  transition: transform 0.3s linear;
}

/* Ease - default, slow start and end */
.ease {
  transition: transform 0.3s ease;
}

/* Ease-in - slow start */
.ease-in {
  transition: transform 0.3s ease-in;
}

/* Ease-out - slow end (best for UI) */
.ease-out {
  transition: transform 0.3s ease-out;
}

/* Ease-in-out - slow start and end */
.ease-in-out {
  transition: transform 0.3s ease-in-out;
}
```

### Custom Cubic Bezier

Create your own easing:

```css
.custom {
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  /* Creates a "back" effect */
}
```

Use [cubic-bezier.com](https://cubic-bezier.com) to design custom curves.

## The will-change Property

Tell the browser what will animate:

```css
.will-animate {
  will-change: transform;
}

.will-animate:hover {
  transform: scale(1.2);
}
```

**⚠️ Don't overuse!** Only use on elements that will definitely animate. Remove it when done:

```javascript
element.addEventListener("animationend", () => {
  element.style.willChange = "auto";
});
```

## Animation Properties

### animation-name

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide {
  animation-name: slideIn;
}
```

### animation-duration

```css
.fast {
  animation-duration: 0.3s;
}
.slow {
  animation-duration: 2s;
}
```

### animation-timing-function

```css
.element {
  animation-timing-function: ease-in-out;
}
```

### animation-delay

```css
.delayed {
  animation-delay: 0.5s;
}
```

### animation-iteration-count

```css
.three-times {
  animation-iteration-count: 3;
}
.forever {
  animation-iteration-count: infinite;
}
```

### animation-direction

```css
.normal {
  animation-direction: normal;
}
.reverse {
  animation-direction: reverse;
}
.alternate {
  animation-direction: alternate;
} /* Bounces */
```

### animation-fill-mode

```css
.stays {
  animation-fill-mode: forwards;
} /* Stays at end */
.backwards {
  animation-fill-mode: backwards;
} /* Applies first keyframe before starting */
.both {
  animation-fill-mode: both;
}
```

### animation-play-state

```css
.paused {
  animation-play-state: paused;
}
.running {
  animation-play-state: running;
}
```

### Shorthand

```css
.element {
  animation: slideIn 0.5s ease-out 0.2s forwards;
  /* name duration timing delay fill-mode */
}
```

## Common Animation Patterns

### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s;
}
```

### Slide In

```css
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideInFromLeft 0.5s ease-out;
}
```

### Scale In

```css
@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.3s ease-out;
}
```

### Bounce

```css
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.bounce {
  animation: bounce 0.6s ease-in-out;
}
```

### Shake

```css
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.shake {
  animation: shake 0.5s;
}
```

### Pulse

```css
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse 2s infinite;
}
```

## Accessibility: Respect User Preferences

Users can request reduced motion in their OS. Honor it:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Or selectively disable:

```css
.animated-element {
  animation: bounce 1s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
  }
}
```

## JavaScript Integration

### Trigger Animations with Classes

```javascript
element.classList.add("slide-in");

element.addEventListener("animationend", () => {
  element.classList.remove("slide-in");
});
```

### Wait for Animations to Complete

```javascript
await element.animate(
  [{ transform: "translateX(0)" }, { transform: "translateX(100px)" }],
  {
    duration: 500,
    easing: "ease-out",
  },
).finished;
```

## Performance Tips

### 1. Limit Concurrent Animations

Don't animate too many elements at once. Stagger them:

```css
.item:nth-child(1) {
  animation-delay: 0s;
}
.item:nth-child(2) {
  animation-delay: 0.1s;
}
.item:nth-child(3) {
  animation-delay: 0.2s;
}
```

### 2. Use requestAnimationFrame

For JavaScript animations:

```javascript
function animate() {
  element.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

### 3. Avoid Layout Thrashing

Don't read and write to the DOM in the same frame:

```javascript
// Bad
element1.style.width = element2.offsetWidth + "px";

// Good
const width = element2.offsetWidth;
requestAnimationFrame(() => {
  element1.style.width = width + "px";
});
```

### 4. Use contain Property

Help the browser optimize:

```css
.animated-card {
  contain: layout style paint;
}
```

## Common Mistakes

### 1. Animating width/height

```css
/* Bad */
.expand {
  transition: width 0.3s;
}

/* Good */
.expand {
  transition: transform 0.3s;
}
.expand:hover {
  transform: scaleX(1.2);
}
```

### 2. Too Many Shadows

```css
/* Bad - animating box-shadow is expensive */
.card {
  transition: box-shadow 0.3s;
}

/* Better - use pseudo-element */
.card::after {
  content: "";
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover::after {
  opacity: 1;
}
```

### 3. Forgetting transform-origin

```css
.rotate-from-corner {
  transform-origin: top left;
  transform: rotate(45deg);
}
```

### 4. Not Using Hardware Acceleration

```css
/* Force GPU acceleration */
.accelerated {
  transform: translateZ(0);
  /* Or */
  will-change: transform;
}
```

## Animation Duration Guidelines

- **Micro-interactions**: 100-300ms (buttons, hovers)
- **Small movements**: 300-500ms (slides, fades)
- **Large movements**: 500-800ms (modals, page transitions)
- **Decorative**: 1s+ (background effects, loaders)

Too fast feels jarring. Too slow feels sluggish.

## Resources

- **Animista**: CSS animation library
- **Animate.css**: Ready-made animations
- **GreenSock (GSAP)**: Advanced JS animation library
- **Lottie**: JSON-based animations from After Effects

## Conclusion

Good animations:

1. Use transform and opacity
2. Are smooth (60fps)
3. Respect user preferences
4. Have appropriate timing
5. Don't overdo it

Less is often more. Animate with purpose.
