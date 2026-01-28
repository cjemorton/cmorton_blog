---
layout: doc
title: "Jekyll Blog Setup Guide"
date: 2026-01-28
excerpt: "Complete guide for setting up and customizing this Jekyll blog with PWA features."
toc: true
---

## Introduction

This guide will help you understand and customize the CMORTON blog, which is built with Jekyll and includes modern PWA features.

## Prerequisites

Before you begin, ensure you have:

- Ruby 2.7 or higher installed
- Bundler gem installed
- Git for version control
- A text editor (VS Code, Sublime, etc.)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/cjemorton/cmorton_blog.git
cd cmorton_blog
```

### 2. Install Dependencies

```bash
bundle install
```

### 3. Run Locally

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` in your browser.

## Project Structure

### Core Files

- `_config.yml` - Main configuration file
- `Gemfile` - Ruby dependencies
- `manifest.json` - PWA manifest
- `sw.js` - Service worker for offline support

### Content Directories

- `_posts/` - Blog posts
- `_projects/` - Project showcases
- `_docs/` - Documentation pages

### Layout and Design

- `_layouts/` - Page templates
- `_includes/` - Reusable components
- `assets/css/` - Stylesheets
- `assets/js/` - JavaScript files

## Creating Content

### Writing a Blog Post

Create a new file in `_posts/YYYY/MM/` with the format: `YYYY-MM-DD-title.md`

```yaml
---
layout: post
title: "Your Post Title"
date: 2026-01-28 10:00:00 -0700
categories: technical programming
tags: [tag1, tag2]
excerpt: "Brief description"
---

Your content here...
```

### Adding a Project

Create a file in `_projects/` directory:

```yaml
---
layout: project
title: "Project Name"
date: 2026-01-28
excerpt: "Project description"
tags: [technology, tools]
github_url: "https://github.com/user/repo"
demo_url: "https://demo.example.com"
---

Project details...
```

## Customization

### Themes

The site includes three themes:
- Light (default)
- Dark
- Blue

Users can switch themes using the theme switcher in the top-right corner.

### Colors

Edit `assets/css/modern.css` to customize theme colors:

```css
:root {
  --bg-color: #ffffff;
  --text-color: #111111;
  --accent-color: #2a7ae2;
}
```

## PWA Features

### Service Worker

The service worker (`sw.js`) handles:
- Offline caching
- Asset caching
- Network-first strategy

### Manifest

The PWA manifest enables:
- Install to home screen
- Standalone app mode
- Custom app icons

## Deployment

### GitHub Pages

The site is automatically deployed to GitHub Pages when you push to the main branch.

### Manual Build

```bash
bundle exec jekyll build
```

The static site will be generated in the `_site/` directory.

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check Ruby version: `ruby -v`
2. Update dependencies: `bundle update`
3. Clear cache: `bundle exec jekyll clean`

### Service Worker Issues

To clear the service worker cache:

1. Open DevTools (F12)
2. Go to Application tab
3. Clear storage
4. Unregister service worker

## Best Practices

### Content

- Use clear, descriptive titles
- Add excerpts for all posts
- Tag content appropriately
- Include alt text for images

### Performance

- Optimize images before uploading
- Use lazy loading for images
- Keep JavaScript minimal
- Test on mobile devices

### Accessibility

- Use semantic HTML
- Ensure proper heading hierarchy
- Maintain color contrast
- Test with screen readers

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For issues or questions:
- Open an issue on GitHub
- Email: cmorton@cmorton.info
