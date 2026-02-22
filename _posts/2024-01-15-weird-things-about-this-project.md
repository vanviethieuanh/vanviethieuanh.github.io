---
title: "Weird Things About This Project"
date: 2024-01-15
layout: post
description: "Technical notes about CSS animations and SVG transformations"
---

**The blink animation of bird in twitter clone card** kind of fun when I use the css keyframe scaleY for animating. It kind of scale from the origin which is 0 and the eye move out of bird =)) because the eye center is 72. So I use a tricky way to fix it is make it in a group and move on top.

```svg
<g transform="translate(0,72)">
    <circle id="eye" cx="170" cy="0" r="4" fill="black" />
</g>
```
