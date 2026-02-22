---
title: "Building Static Sites with Jekyll"
date: 2024-06-18
layout: post
description: "Why Jekyll is perfect for portfolios and blogs"
---

Jekyll transforms plain text into static websites and blogs. It's simple, fast, and perfect for GitHub Pages.

## Advantages

1. **No Database**: Everything is in files
2. **Fast**: Static HTML loads instantly
3. **Free Hosting**: Deploy to GitHub Pages for free
4. **Version Control**: Your content lives in Git

## Basic Structure

```
_posts/        # Blog posts
_layouts/      # Page templates
_includes/     # Reusable components
_config.yml    # Site configuration
```

## Front Matter

Every post starts with YAML front matter:

```yaml
---
title: "My Post"
date: 2024-06-18
layout: post
---
```

## Liquid Templates

Jekyll uses Liquid for templating:

```liquid
{% for post in site.posts %}
  <h2>{{ post.title }}</h2>
{% endfor %}
```

Simple, powerful, and maintainable.
