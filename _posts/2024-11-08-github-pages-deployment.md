---
title: "Deploying to GitHub Pages: A Complete Guide"
date: 2024-11-08
layout: post
description: "Free hosting for your static sites and portfolios"
---

GitHub Pages is the easiest way to host a static website. It's free, fast, and integrates seamlessly with your Git workflow.

## What Is GitHub Pages?

Free static site hosting directly from your GitHub repository. Perfect for:

- Personal portfolios
- Project documentation
- Blogs
- Landing pages
- Open source project sites

## Quick Start

### Method 1: User/Organization Site

Create a repository named `username.github.io`:

```bash
# Create locally
mkdir username.github.io
cd username.github.io

# Initialize Git
git init
echo "<h1>Hello World</h1>" > index.html

# Push to GitHub
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:username/username.github.io.git
git push -u origin main
```

Visit `https://username.github.io` - done!

### Method 2: Project Site

Any repository can have a GitHub Pages site:

1. Create repository
2. Add HTML files
3. Go to Settings → Pages
4. Select source: main branch / docs folder
5. Visit `https://username.github.io/repo-name`

## Repository Settings

### Choosing a Source

Three options:

1. **Root of main branch**: Serve directly from repository root
2. **docs folder**: Keep source and output separate
3. **gh-pages branch**: Deploy-specific branch

Common pattern:

```
main branch (source code)
gh-pages branch (built site)
```

### Build and Deployment

GitHub Actions automatically builds Jekyll sites. For other generators, use custom workflows.

## Custom Domains

### Setting Up

1. Buy a domain (Namecheap, Google Domains, etc.)
2. Add `CNAME` file to repository root:

```
yourdomain.com
```

3. Configure DNS with your provider:

**Apex domain (yourdomain.com):**

```
A record → 185.199.108.153
A record → 185.199.109.153
A record → 185.199.110.153
A record → 185.199.111.153
```

**Subdomain (www.yourdomain.com):**

```
CNAME → username.github.io
```

4. Enable HTTPS in repository settings

DNS propagation takes 24-48 hours.

### Recommended Setup

Both apex and www:

```
# DNS Config
yourdomain.com     A      185.199.108.153 (and other IPs)
www.yourdomain.com CNAME  username.github.io
```

Then in CNAME file, use:

```
www.yourdomain.com
```

GitHub will redirect apex to www automatically.

## Jekyll Integration

GitHub Pages has built-in Jekyll support.

### Automatic Building

Push Jekyll source code - GitHub builds automatically:

```
_posts/
_layouts/
_config.yml
index.md
```

No need to commit `_site/` folder.

### Supported Plugins

GitHub Pages allows specific plugins:

```yaml
# _config.yml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-paginate
  - jekyll-mentions
  - jekyll-redirect-from
```

[Full list of supported plugins](https://pages.github.com/versions/)

### Unsupported Plugins?

Use GitHub Actions to build:

```yaml
# .github/workflows/pages.yml
name: Deploy Jekyll

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.0
          bundler-cache: true

      - name: Build
        run: bundle exec jekyll build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

## Static Site Generators

### Hugo

```yaml
# .github/workflows/hugo.yml
name: Deploy Hugo

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: "latest"

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### Next.js (Static Export)

```yaml
# .github/workflows/nextjs.yml
name: Deploy Next.js

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install and Build
        run: |
          npm ci
          npm run build
          npm run export

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## GitHub Actions Deployment

Full control over build process:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - uses: actions/checkout@v3

      - name: Build
        run: |
          npm install
          npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: "./dist"

      - name: Deploy
        uses: actions/deploy-pages@v1
```

## Environment Variables and Secrets

Never commit secrets! Use GitHub Secrets:

1. Go to repository Settings → Secrets
2. Add secret (e.g., API_KEY)
3. Use in workflow:

```yaml
steps:
  - name: Build
    env:
      API_KEY: ${{ secrets.API_KEY }}
    run: npm run build
```

## Optimization Tips

### Enable Caching

```yaml
- uses: actions/cache@v2
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### Compress Assets

```bash
# Before deployment
npm run build
find dist -name '*.js' -exec gzip -9 {} \; -exec mv {}.gz {} \;
find dist -name '*.css' -exec gzip -9 {} \; -exec mv {}.gz {} \;
```

### Optimize Images

Use GitHub Actions to auto-optimize:

```yaml
- name: Optimize images
  uses: calibreapp/image-actions@main
  with:
    githubToken: ${{ secrets.GITHUB_TOKEN }}
```

## Troubleshooting

### 404 Errors

**Problem**: Pages show 404  
**Solution**: Ensure repository name is correct or set custom domain

### Build Failures

**Problem**: Jekyll build fails  
**Solution**: Check `_config.yml` syntax or use GitHub Actions logs

### Custom Domain Not Working

Common issues:

- DNS not propagated (wait 24-48 hrs)
- CNAME file missing or wrong
- HTTPS enforcement before DNS ready

Check:

```bash
dig yourdomain.com
nslookup yourdomain.com
```

### Site Not Updating

Force rebuild:

```bash
git commit --allow-empty -m "Trigger rebuild"
git push
```

## Advantages of GitHub Pages

✅ **Free** hosting with 100GB bandwidth/month  
✅ **Fast** CDN with global distribution  
✅ **HTTPS** included for free  
✅ **Version control** built-in  
✅ **Easy** deployment (just push)  
✅ **Custom domains** supported

## Limitations

❌ No server-side code (PHP, Python, etc.)  
❌ No databases  
❌ 1GB repository size limit  
❌ 100GB bandwidth/month soft limit  
❌ 10 builds per hour limit

For dynamic sites, consider Netlify, Vercel, or traditional hosting.

## Alternatives to GitHub Pages

### Netlify

- Free tier with more builds
- Better build tools
- Form handling
- Serverless functions

```bash
# Deploy with Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel

- Optimized for Next.js
- Serverless functions
- Edge network
- Analytics

```bash
# Deploy with Vercel CLI
npm install -g vercel
vercel --prod
```

### Cloudflare Pages

- Unlimited bandwidth
- Fast edge network
- Workers integration

### GitLab Pages

- Similar to GitHub Pages
- More flexible CI/CD

## Best Practices

### 1. Use a build tool

Don't commit generated files. Use GitHub Actions to build.

### 2. Optimize assets

Minify CSS/JS, compress images, use webp format.

### 3. Set up analytics

Use Google Analytics, Plausible, or Fathom.

### 4. Enable HTTPS

Always use HTTPS for security and SEO.

### 5. Use a CDN

GitHub Pages already uses Fastly CDN, but you can add Cloudflare for extra caching.

### 6. Monitor uptime

Use UptimeRobot or StatusCake to monitor site availability.

## Example: Complete Deployment Workflow

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Test
        run: npm test

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: yourdomain.com
```

## Security Considerations

### 1. Don't Commit Secrets

Use environment variables and GitHub Secrets.

### 2. Restrict Branch Protection

Enable branch protection for main branch:

- Require pull request reviews
- Require status checks
- Restrict who can push

### 3. Use Dependabot

Auto-update dependencies:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

### 4. Audit Dependencies

```bash
npm audit
npm audit fix
```

## Conclusion

GitHub Pages is perfect for static sites:

- Simple setup
- Free hosting
- Automatic deployment
- Custom domains
- HTTPS included

For personal sites, portfolios, and documentation, it's hard to beat. Combine with GitHub Actions for unlimited flexibility.

Push your code. GitHub handles the rest.
