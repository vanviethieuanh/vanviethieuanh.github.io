---
title: "Deploying to GitHub Pages: A Complete Guide"
date: 2024-11-08
layout: post
description: "Free hosting for your static sites and portfolios"
---

GitHub Pages is the easiest way to host a static website. It's free, fast, and integrates seamlessly with your workflow.

## Setup Steps

1. Create a repository named `username.github.io`
2. Push your site files
3. Enable GitHub Pages in settings
4. Visit `https://username.github.io`

## Custom Domains

Add a `CNAME` file with your domain:

```
yourdomain.com
```

Then configure DNS:

- A records pointing to GitHub's IPs
- Or CNAME record pointing to `username.github.io`

## Jekyll Integration

GitHub Pages builds Jekyll sites automatically:

```yaml
# _config.yml
title: My Site
theme: minima
```

Push and it builds automatically!

## Deployment Workflow

```bash
git add .
git commit -m "Update content"
git push origin main
```

That's it. No build steps, no deployment scripts.

## Custom Actions

For more control, use GitHub Actions:

```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: peaceiris/actions-gh-pages@v3
```

Simple, powerful, and free.
