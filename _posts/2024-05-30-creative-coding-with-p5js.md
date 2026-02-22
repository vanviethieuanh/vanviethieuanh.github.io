---
title: "Creative Coding with p5.js"
date: 2024-05-30
layout: post
description: "Making art with code using p5.js - from basics to generative systems"
---

p5.js brings creative coding to the browser. It's Processing reimagined for the web, making art and interactivity accessible to everyone.

## What Is p5.js?

p5.js is a JavaScript library for creative coding. Built on Processing's philosophy, it makes drawing, animation, and interaction simple.

### Why p5.js?

- **Low barrier to entry**: Start coding in minutes
- **Browser-based**: Works anywhere, no installation
- **Creative output**: Focus on art, not boilerplate
- **Great community**: Tons of examples and resources
- **Educational**: Perfect for learning programming

## Getting Started

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"></script>
</head>
<body>
  <script>
    function setup() {
      createCanvas(400, 400);
    }

    function draw() {
      background(220);
      ellipse(200, 200, 50, 50);
    }
  </script>
</body>
</html>
```

That's it! You have a canvas with a circle.

### The Core Functions

**setup()**: Runs once at the start
```javascript
function setup() {
  createCanvas(600, 400);
  background(255);
}
```

**draw()**: Runs 60 times per second
```javascript
function draw() {
  // Animation loop
  ellipse(mouseX, mouseY, 20, 20);
}
```

## Drawing Basics

### Shapes

```javascript
// Circle
ellipse(100, 100, 50, 50);

// Rectangle
rect(200, 100, 100, 80);

// Line
line(0, 0, width, height);

// Triangle
triangle(100, 100, 200, 100, 150, 50);

// Custom shape
beginShape();
vertex(100, 100);
vertex(200, 100);
vertex(200, 200);
vertex(100, 200);
endShape(CLOSE);
```

### Colors

```javascript
// RGB
fill(255, 0, 0);  // Red
stroke(0, 255, 0);  // Green outline
strokeWeight(4);

// Grayscale
fill(128);  // 50% gray

// Transparency
fill(255, 0, 0, 128);  // 50% transparent red

// No fill or stroke
noFill();
noStroke();
```

### Color Modes

```javascript
// HSB mode (Hue, Saturation, Brightness)
colorMode(HSB, 360, 100, 100);
fill(180, 50, 100);  // Cyan

// Back to RGB
colorMode(RGB, 255);
```

## Interactivity

### Mouse

```javascript
function draw() {
  ellipse(mouseX, mouseY, 50, 50);
}

function mousePressed() {
  background(random(255));
}

function mouseDragged() {
  line(pmouseX, pmouseY, mouseX, mouseY);
}
```

### Keyboard

```javascript
function keyPressed() {
  if (key === 's') {
    save('myDrawing.png');
  }
  
  if (keyCode === LEFT_ARROW) {
    // Move left
  }
}
```

## Animation Fundamentals

### Clearing vs. Accumulating

```javascript
// Clear each frame (animation)
function draw() {
  background(255);
  ellipse(frameCount % width, 200, 50, 50);
}

// Don't clear (drawing)
function draw() {
  // No background() call
  ellipse(mouseX, mouseY, 10, 10);
}
```

### Speed Control

```javascript
function setup() {
  createCanvas(400, 400);
  frameRate(30);  // 30 FPS instead of 60
}
```

### Time-Based Movement

```javascript
let x = 0;

function draw() {
  background(255);
  x += 2;  // Move 2 pixels per frame
  
  if (x > width) {
    x = 0;  // Wrap around
  }
  
  ellipse(x, 200, 50, 50);
}
```

## Randomness and Noise

### Random Values

```javascript
// Random between 0 and 255
let r = random(255);

// Random between min and max
let x = random(100, 300);

// Random from array
let colors = ['red', 'blue', 'green'];
let c = random(colors);
```

### Perlin Noise

Smoother than random:

```javascript
let xoff = 0;

function draw() {
  background(255);
  
  // Map noise (0-1) to canvas height
  let y = noise(xoff) * height;
  
  ellipse(200, y, 50, 50);
  
  xoff += 0.01;  // Increment
}
```

### 2D Noise

```javascript
let xoff = 0;
let yoff = 0;

function draw() {
  loadPixels();
  
  for (let y = 0; y < height; y++) {
    xoff = 0;
    for (let x = 0; x < width; x++) {
      let bright = noise(xoff, yoff) * 255;
      let index = (x + y * width) * 4;
      pixels[index] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;
      xoff += 0.01;
    }
    yoff += 0.01;
  }
  
  updatePixels();
  noLoop();
}
```

## Transformations

### Translate, Rotate, Scale

```javascript
function draw() {
  translate(200, 200);  // Move origin to center
  rotate(frameCount * 0.01);  // Rotate over time
  rect(-50, -50, 100, 100);  // Draw around new origin
}
```

### Push and Pop

Save and restore transformation state:

```javascript
function draw() {
  push();
  translate(100, 100);
  rotate(PI / 4);
  rect(0, 0, 50, 50);
  pop();
  
  // Back to original transformation
  ellipse(300, 300, 50, 50);
}
```

## Object-Oriented Code

### Particle Class

```javascript
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.size = random(10, 30);
  }
  
  update() {
    this.pos.add(this.vel);
    
    // Bounce off edges
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }
  
  show() {
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

let particles = [];

function setup() {
  createCanvas(600, 400);
  
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(255, 20);  // Trails effect
  
  for (let p of particles) {
    p.update();
    p.show();
  }
}
```

## Vectors

p5.Vector makes motion easier:

```javascript
let pos;
let vel;

function setup() {
  createCanvas(400, 400);
  pos = createVector(width / 2, height / 2);
  vel = createVector(2, 3);
}

function draw() {
  background(255);
  
  pos.add(vel);
  
  // Bounce
  if (pos.x < 0 || pos.x > width) vel.x *= -1;
  if (pos.y < 0 || pos.y > height) vel.y *= -1;
  
  ellipse(pos.x, pos.y, 50, 50);
}
```

## Generative Art Patterns

### Circle Packing

```javascript
let circles = [];

function setup() {
  createCanvas(600, 600);
  noStroke();
  
  // Try to add circles
  for (let i = 0; i < 1000; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    
    let valid = true;
    for (let c of circles) {
      let d = dist(x, y, c.x, c.y);
      if (d < r + c.r) {
        valid = false;
        break;
      }
    }
    
    if (valid) {
      circles.push({x, y, r});
    }
  }
  
  background(255);
  for (let c of circles) {
    fill(random(255), random(255), random(255), 128);
    ellipse(c.x, c.y, c.r * 2);
  }
}
```

### Flow Field

```javascript
let particles = [];
let flowField;
let scale = 20;

function setup() {
  createCanvas(600, 600);
  
  for (let i = 0; i < 1000; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  
  background(255);
}

function draw() {
  noStroke();
  fill(255, 10);
  rect(0, 0, width, height);
  
  for (let p of particles) {
    let x = floor(p.x / scale);
    let y = floor(p.y / scale);
    let angle = noise(x * 0.1, y * 0.1) * TWO_PI * 2;
    
    p.x += cos(angle);
    p.y += sin(angle);
    
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
    
    stroke(0, 50);
    point(p.x, p.y);
  }
}
```

### Recursive Trees

```javascript
function setup() {
  createCanvas(600, 600);
  background(255);
  stroke(0);
  
  translate(width / 2, height);
  branch(100);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  
  if (len > 4) {
    push();
    rotate(PI / 6);
    branch(len * 0.67);
    pop();
    
    push();
    rotate(-PI / 6);
    branch(len * 0.67);
    pop();
  }
}
```

## Working with Images

```javascript
let img;

function preload() {
  img = loadImage('photo.jpg');
}

function setup() {
  createCanvas(600, 400);
  image(img, 0, 0, width, height);
  
  filter(GRAY);  // Apply grayscale filter
}
```

### Pixel Manipulation

```javascript
function setup() {
  createCanvas(400, 400);
  loadPixels();
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      pixels[index] = random(255);      // R
      pixels[index + 1] = random(255);  // G
      pixels[index + 2] = random(255);  // B
      pixels[index + 3] = 255;          // A
    }
  }
  
  updatePixels();
}
```

## Saving Your Work

```javascript
function keyPressed() {
  if (key === 's') {
    save('myArt.png');
  }
  
  if (key === 'g') {
    saveGif('myAnimation', 5);  // 5 seconds
  }
}
```

## Project Ideas

1. **Generative patterns**: Random walkers, fractals, L-systems
2. **Data visualization**: Weather, stocks, personal data
3. **Interactive installations**: Mouse/keyboard controlled art
4. **Game prototypes**: Simple arcade games
5. **Simulations**: Flocking, physics, cellular automata
6. **Music visualizers**: Respond to audio
7. **Drawing tools**: Build your own creative tools

## Tips and Tricks

### Constrain Mouse

```javascript
let x = constrain(mouseX, 0, width);
let y = constrain(mouseY, 0, height);
```

### Map Values

```javascript
// Map mouse X from canvas width to 0-255
let r = map(mouseX, 0, width, 0, 255);
```

### Lerp (Linear Interpolation)

```javascript
let x = lerp(100, 300, 0.5);  // Returns 200
```

### Distance and Angles

```javascript
let d = dist(x1, y1, x2, y2);
let angle = atan2(y2 - y1, x2 - x1);
```

## Performance Tips

- Use `noStroke()` when you don't need outlines
- Call `background()` only when needed
- Use `frameRate()` to control speed
- Limit particle counts
- Use `noLoop()` for static drawings

## Resources

- **p5.js Website**: Reference and examples
- **The Coding Train**: Amazing video tutorials by Daniel Shiffman
- **OpenProcessing**: Share and discover p5.js sketches
- **Nature of Code**: Book on simulation and generative art
- **Generative Design**: Book with beautiful examples

## Advanced Topics to Explore

- **3D with WEBGL**: `createCanvas(400, 400, WEBGL)`
- **Sound**: p5.sound library
- **Machine Learning**: ml5.js integration
- **Shaders**: Custom GLSL shaders
- **Physics**: Matter.js or Box2D

## Conclusion

p5.js makes coding creative and fun. Start with simple shapes, add interactivity, introduce randomness, and build systems.

The best way to learn is to experiment. Copy examples, modify them, break them, fix them, and make them your own.

Now go make something beautiful!
