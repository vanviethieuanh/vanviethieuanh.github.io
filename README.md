# vanviethieuanh.github.io

> 👋 Personal portfolio — [vanviethieuanh.github.io](https://vanviethieuanh.github.io/)

## Tech Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Markup    | Plain HTML (no framework, no SSG)      |
| Styling   | SCSS → compiled to CSS                 |
| Fonts     | Google Fonts — Oswald, Raleway, Roboto |
| Icons     | Font Awesome 5.15 (CDN)                |
| Graphics  | Inline SVG                             |
| Analytics | Google Analytics (gtag.js)             |
| Hosting   | GitHub Pages                           |

## Style

**Gruvbox Light + Neo-brutalist** aesthetic:

- **Color palette** — [Gruvbox Light](https://github.com/morhetz/gruvbox) with warm, retro tones
  - Background: `#fbf1c7` (cream) → `#ebdbb2` (subtle)
  - Foreground: `#282828` (dark) for text and borders
  - Accents: bright red, green, yellow, blue, purple, aqua, orange
- **Thick borders** — `solid 3px` globally using Gruvbox dark0
- **Unified press-effect** — SCSS mixin for 3D inset shadow + `:active` shrink on buttons, cards, platforms
- **Hover lift** — cards translate up 20px on hover
- **Inline SVG graphics** — `stroke-width: 3-4` with CSS custom properties for colors

## Structure

```
index.html          # Landing — "Who are you finding?" tarot-style cards
card.html           # Linktree-style social card page
css/
  global.scss       # Design tokens: colors, typography, borders, buttons, cards
  index.scss        # Index page styles + SVG animations
  card.scss         # Social card page styles
  about.scss        # About page styles
images/             # Pixel art avatar (GIF + PNG)
svg/                # SVG assets (connect, human, terminal)
blog/               # Future blog posts
dev/                # Git submodule → vanviethieuanh/dev
accodius/           # Git submodule → vanviethieuanh/accodius
```

## Development

### Prerequisites

- [Sass](https://sass-lang.com/install) — to compile `.scss` → `.css`

### Setup

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/vanviethieuanh/vanviethieuanh.github.io.git

# Or init submodules if already cloned
git submodule update --init --recursive

# Watch & compile SCSS
sass --watch css/:css/
```

Serve locally with VS Code **Live Server** extension or `npx serve .`
