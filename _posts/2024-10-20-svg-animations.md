---
title: "Animating SVGs with CSS and JavaScript"
date: 2024-10-20
layout: post
description: "Creating dynamic, scalable graphics on the web"
---

SVGs are perfect for the web: infinitely scalable, animatable, and accessible. Let's explore different animation techniques from CSS to JavaScript.

## Why Animate SVGs?

### Advantages

- **Scalable**: Crisp at any resolution
- **Small file size**: Often smaller than PNGs
- **Styleable**: CSS works on SVG elements
- **Accessible**: Screen readers can parse SVG
- **Interactive**: Responds to user events

### Use Cases

- Logos and icons
- Data visualizations
- Loading indicators
- Decorative elements
- Interactive illustrations

## CSS Animations for SVG

### Basic Rotation

```css
.logo {
  animation: rotate 3s infinite linear;
  transform-origin: center;
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

### Multiple Elements

```css
.icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
```

### Color Changes

```css
@keyframes colorShift {
  0% {
    fill: #3b82f6;
  }
  50% {
    fill: #8b5cf6;
  }
  100% {
    fill: #3b82f6;
  }
}

.shape {
  animation: colorShift 3s infinite;
}
```

## Stroke Animations

The classic "drawing" effect.

### Stroke Dasharray and Dashoffset

```css
.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2s ease-in-out forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
```

### How It Works

1. `stroke-dasharray`: Creates dashed line pattern
2. `stroke-dashoffset`: Shifts the dash pattern
3. Animating offset from length to 0 creates drawing effect

### Calculating Path Length

Use JavaScript to get exact length:

```javascript
const path = document.querySelector(".path");
const length = path.getTotalLength();

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;
```

### Reverse Drawing

```css
@keyframes undraw {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 1000;
  }
}
```

## SVG-Specific CSS Properties

### Fill and Stroke

```css
.shape {
  fill: #3b82f6;
  stroke: #1e3a8a;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

### Opacity

```css
.fade {
  fill-opacity: 0.5;
  stroke-opacity: 0.8;
}
```

### Transform Origin

SVG transform-origin works differently:

```css
/* For SVG, use percentages or px */
.svg-element {
  transform-origin: 50% 50%; /* Center */
  transform-origin: center center; /* Also works */
}
```

## SMIL Animations

Native SVG animations (being phased out, but still useful):

### Basic Animation

```xml
<circle r="20">
  <animate
    attributeName="r"
    from="20"
    to="40"
    dur="1s"
    repeatCount="indefinite"
  />
</circle>
```

### Path Animation

```xml
<path d="M10,10 L100,100">
  <animate
    attributeName="d"
    from="M10,10 L100,100"
    to="M10,10 L100,10 L100,100"
    dur="2s"
    repeatCount="indefinite"
  />
</path>
```

### AnimateTransform

```xml
<rect width="50" height="50">
  <animateTransform
    attributeName="transform"
    type="rotate"
    from="0 25 25"
    to="360 25 25"
    dur="3s"
    repeatCount="indefinite"
  />
</rect>
```

**Note**: Prefer CSS animations - better browser support and easier control.

## JavaScript Animation Libraries

### GSAP (GreenSock)

Most powerful SVG animation library:

```javascript
gsap.to(".logo", {
  rotation: 360,
  duration: 2,
  repeat: -1,
  ease: "linear",
});

// Stagger multiple elements
gsap.to(".dot", {
  y: -20,
  stagger: 0.1,
  repeat: -1,
  yoyo: true,
});

// Complex timeline
const tl = gsap.timeline();
tl.to(".shape1", { x: 100, duration: 1 })
  .to(".shape2", { y: 100, duration: 1 }, "-=0.5")
  .to(".shape3", { scale: 2, duration: 1 });
```

### Anime.js

Lightweight alternative:

```javascript
anime({
  targets: ".svg-path",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 1500,
  delay: function (el, i) {
    return i * 250;
  },
  direction: "alternate",
  loop: true,
});
```

### Snap.svg

jQuery for SVG:

```javascript
const s = Snap(".svg-container");
const circle = s.circle(50, 50, 40);

circle.animate({ r: 80 }, 1000, mina.bounce);
```

## Interactive SVG Animations

### Hover Effects

```css
.icon {
  transition: transform 0.3s;
}

.icon:hover {
  transform: scale(1.2) rotate(5deg);
}

.icon path {
  transition: fill 0.3s;
}

.icon:hover path {
  fill: #ff6b6b;
}
```

### Click Animations

```javascript
document.querySelector(".button-svg").addEventListener("click", function () {
  this.classList.add("clicked");

  setTimeout(() => {
    this.classList.remove("clicked");
  }, 600);
});
```

```css
.button-svg.clicked {
  animation: pop 0.6s;
}

@keyframes pop {
  50% {
    transform: scale(1.2);
  }
}
```

## Morphing Shapes

Transform one shape into another.

### Using CSS (Limited)

Only works for same number of points:

```css
@keyframes morph {
  from {
    d: path("M10,10 L100,10 L100,100 L10,100 Z");
  }
  to {
    d: path("M55,10 L100,100 L10,100 Z");
  }
}

.shape {
  animation: morph 2s infinite alternate;
}
```

### Using GSAP MorphSVG Plugin

```javascript
gsap.to(".shape1", {
  morphSVG: ".shape2",
  duration: 2,
  repeat: -1,
  yoyo: true,
});
```

## Performance Tips

### 1. Optimize SVG Files

Use SVGO or SVGOMG to reduce file size:

- Remove unnecessary metadata
- Simplify paths
- Reduce decimal precision

### 2. Use will-change

```css
.animated-svg {
  will-change: transform;
}
```

### 3. Limit Complexity

Fewer points = better performance:

```javascript
// Simplify paths if animating
const simplifiedPath = simplifyPath(originalPath, tolerance);
```

### 4. Use CSS Instead of JS When Possible

CSS animations are GPU-accelerated and more performant for simple animations.

### 5. Avoid Animating SVG Filters

Filters (blur, drop-shadow) are expensive. Use sparingly.

## Common Animation Patterns

### Loading Spinner

```css
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### Pulsing Dot

```css
.dot {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.5);
  }
}
```

### Animated Checkmark

```css
.checkmark {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: check 0.5s ease-in-out forwards;
}

@keyframes check {
  to {
    stroke-dashoffset: 0;
  }
}
```

### Bouncing Arrow

```css
.arrow {
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

## SVG Animation Workflow

### 1. Create SVG in Design Tool

- Illustrator, Figma, Inkscape
- Keep layers organized
- Name elements meaningfully

### 2. Export and Optimize

```bash
# Using SVGO
svgo input.svg -o output.svg
```

### 3. Add IDs/Classes

```xml
<svg viewBox="0 0 100 100">
  <circle class="dot" id="dot-1" cx="25" cy="50" r="10"/>
  <circle class="dot" id="dot-2" cx="50" cy="50" r="10"/>
  <circle class="dot" id="dot-3" cx="75" cy="50" r="10"/>
</svg>
```

### 4. Animate

Choose your method: CSS, SMIL, or JavaScript.

## Accessibility Considerations

### Add Titles and Descriptions

```xml
<svg role="img" aria-labelledby="logo-title logo-desc">
  <title id="logo-title">Company Logo</title>
  <desc id="logo-desc">A blue circle with white text</desc>
  <!-- SVG content -->
</svg>
```

### Respect prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  .animated-svg {
    animation: none;
  }
}
```

### Don't Animate Critical Content

Loading spinners should have fallback text for screen readers.

## Advanced Techniques

### Clip Paths

```xml
<svg>
  <defs>
    <clipPath id="clip">
      <circle cx="50" cy="50" r="40"/>
    </clipPath>
  </defs>

  <image href="photo.jpg" clip-path="url(#clip)" />
</svg>
```

Animate the clip path:

```css
@keyframes expandClip {
  from {
    r: 0;
  }
  to {
    r: 100;
  }
}

#clip circle {
  animation: expandClip 2s;
}
```

### Mask Animations

```xml
<svg>
  <defs>
    <mask id="fade-mask">
      <rect width="100%" height="100%" fill="white" opacity="0"/>
    </mask>
  </defs>

  <image href="photo.jpg" mask="url(#fade-mask)" />
</svg>
```

### Filter Effects

```xml
<svg>
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <circle filter="url(#glow)" cx="50" cy="50" r="30"/>
</svg>
```

## Real-World Example: Animated Logo

```html
<svg class="logo" viewBox="0 0 100 100">
  <circle class="logo-circle" cx="50" cy="50" r="40" />
  <path class="logo-path" d="M30,50 L50,70 L70,30" />
</svg>
```

```css
.logo-circle {
  stroke: #3b82f6;
  stroke-width: 3;
  fill: none;
  stroke-dasharray: 250;
  stroke-dashoffset: 250;
  animation: drawCircle 1.5s ease-out forwards;
}

.logo-path {
  stroke: #3b82f6;
  stroke-width: 4;
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawPath 1s ease-out 0.5s forwards;
}

@keyframes drawCircle {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}
```

## Resources

- **GSAP**: Most powerful animation library
- **Anime.js**: Lightweight alternative
- **SVG Artista**: Auto-generate stroke animations
- **Vivus**: Specialized SVG drawing animations
- **Lottie**: Export After Effects animations to web

## Conclusion

SVG animation combines the best of graphics and code:

- Scalable and crisp
- Performant when done right
- Accessible and semantic
- Interactive and engaging

Start with CSS for simple animations, graduate to JavaScript libraries for complex sequences.

The web is a canvas. SVG is your brush.
