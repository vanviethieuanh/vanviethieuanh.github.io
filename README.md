# vanviethieuanh.github.io

> 👋 Personal portfolio and blog — [vanviethieuanh.github.io](https://vanviethieuanh.github.io/)

## Tech Stack

| Layer            | Technology                             |
| ---------------- | -------------------------------------- |
| Static Site Gen  | Jekyll 4.3                             |
| Markup           | HTML + Liquid templates                |
| Styling          | SCSS (Jekyll Sass)                     |
| Fonts            | Google Fonts — Oswald, Raleway, Roboto |
| Syntax Highlight | Rouge (Kramdown)                       |
| Build Tool       | [Taskfile](https://taskfile.dev)       |
| Hosting          | GitHub Pages                           |

## Design System

**Gruvbox Light + Neo-brutalist** aesthetic:

- **Color palette** — [Gruvbox Light](https://github.com/morhetz/gruvbox) with warm, retro tones
  - Background: `#fbf1c7` (cream) → `#ebdbb2` (subtle)
  - Foreground: `#282828` (dark) for text and borders
  - Accents: bright red, green, yellow, blue, purple, aqua, orange
- **Thick borders** — `3px solid` globally using Gruvbox dark0
- **Press effect** — SCSS mixin for 3D inset shadow + `:active` shrink on interactive elements
- **Hover animations** — cards translate up on hover with smooth transitions
- **Typography** — Raleway (headings), Oswald (dense text), Roboto (body)

## Site Structure

```
├── index.html              # Blog listing page (11+ posts)
├── projects.html           # Projects showcase with grid layout
├── connect.html            # Social links and contact info
├── pixel/                  # Pixel art gallery
│   ├── index.html          # Gallery grid
│   └── deer/               # Deer pixel art project
├── _posts/                 # Blog posts (markdown)
│   ├── 2024-11-08-github-pages-deployment.md
│   ├── 2024-10-20-svg-animations.md
│   └── ...
├── _layouts/               # Jekyll layouts
│   ├── default.html        # Base layout
│   ├── page.html           # Page layout
│   └── post.html           # Blog post layout
├── _sass/                  # SCSS partials
│   ├── _global.scss        # Design tokens, mixins, variables
│   └── _syntax.scss        # Code syntax highlighting
└── assets/
    ├── css/main.scss       # Main stylesheet (imports _sass/)
    └── js/                 # JavaScript utilities
        ├── code-blocks.js  # Code block enhancements
        └── toc.js          # Table of contents generator
```

## Development

### Prerequisites

- Ruby (rbenv recommended)
- Bundler
- [Taskfile](https://taskfile.dev) (optional, for convenience)

### Setup

```bash
# Clone repository
git clone https://github.com/vanviethieuanh/vanviethieuanh.github.io.git
cd vanviethieuanh.github.io

# Install dependencies
bundle install
# Or with Taskfile
task install
```

### Local Development

```bash
# Start development server with live reload
bundle exec jekyll serve --livereload

# Or with Taskfile
task serve
```

Visit `http://localhost:4000` to preview the site.

### Build

```bash
# Build for production
bundle exec jekyll build

# Or with Taskfile
task build
```

### Available Tasks

```bash
task install    # Install Jekyll and dependencies
task serve      # Start dev server with live reload
task build      # Build for production (GitHub Pages)
task clean      # Clean build artifacts
task format     # Format all code files with Prettier
```

## Writing Blog Posts

Create a new markdown file in `_posts/` following the naming convention:

```
YYYY-MM-DD-post-title.md
```

Front matter example:

```yaml
---
title: "Your Post Title"
date: 2024-11-08
layout: post
description: "Brief description for meta tags"
---
Your content here...
```

## Deployment

The site automatically deploys to GitHub Pages on push to the `main` branch. Jekyll builds are handled by GitHub Actions.
