# CMORTON Blog

Personal blog for Clem Morton covering technical topics, programming, and system administration.

🌐 **Live Site:** [cmorton.info](https://cmorton.info)

## ✨ Features

- 📱 **Progressive Web App (PWA)** - Installable, works offline
- 🎨 **Multiple Themes** - Light, dark, and blue themes with smooth transitions
- 📐 **Responsive Design** - Optimized for all device sizes
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🚀 **Fast Loading** - Service worker caching and lazy loading
- 📝 **Multiple Content Types** - Posts, projects, and documentation
- 🔍 **SEO Optimized** - Meta tags, structured data, sitemap
- 🎯 **Modern UI** - CSS Grid/Flexbox, smooth animations, mobile navigation

## 🛠️ Technology Stack

- **Static Site Generator:** Jekyll 4.3+
- **Theme:** Custom Minima-based theme
- **Hosting:** GitHub Pages
- **PWA:** Custom service worker implementation
- **CSS:** Modern CSS with CSS Custom Properties
- **JavaScript:** ES6+ with modular architecture

## 📋 Requirements

- Ruby 2.7 or higher
- Bundler
- Jekyll 4.3+

## 🚀 Quick Start

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cjemorton/cmorton_blog.git
   cd cmorton_blog
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Run the development server:**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4000`

### Build for Production

```bash
bundle exec jekyll build
```

The built site will be in the `_site` directory.

## 📁 Project Structure

```
cmorton_blog/
├── _config.yml           # Site configuration
├── _posts/              # Blog posts
│   └── YYYY/MM/         # Posts organized by date
├── _projects/           # Project showcases
├── _docs/              # Documentation pages
├── _layouts/           # Page layouts
│   ├── default.html    # Base layout
│   ├── post.html       # Blog post layout
│   ├── project.html    # Project layout
│   └── doc.html        # Documentation layout
├── _includes/          # Reusable components
│   ├── head.html       # Head section with PWA links
│   └── footer-scripts.html  # JavaScript includes
├── assets/
│   ├── css/
│   │   └── modern.css  # Custom theme styles
│   └── js/
│       └── modern.js   # Theme switcher, PWA, navigation
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
└── offline.html       # Offline fallback page
```

## 📝 Content Management

### Blog Posts

Blog posts are stored in `_posts/` with the naming convention: `YYYY-MM-DD-title.md`

**Frontmatter template:**
```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS -0700
categories: technical programming
tags: [tag1, tag2, tag3]
excerpt: "Brief description of the post"
---
```

**Category Guidelines:**
- `technical` - All technical content
- `programming` - Code and development
- `sysadmin` - System administration
- `resources` - Links and references
- `personal` - Personal updates

### Projects

Projects are stored in `_projects/` as markdown files.

**Frontmatter template:**
```yaml
---
layout: project
title: "Project Name"
date: YYYY-MM-DD
excerpt: "Project description"
tags: [technology, stack, tags]
github_url: "https://github.com/user/repo"
demo_url: "https://demo.example.com"
---
```

### Documentation

Documentation pages are stored in `_docs/` as markdown files.

**Frontmatter template:**
```yaml
---
layout: doc
title: "Documentation Title"
date: YYYY-MM-DD
excerpt: "Documentation description"
toc: true  # Enable table of contents
---
```

## 🎨 Theme Customization

The site supports multiple themes that can be switched on-the-fly:

- **Light Theme** (default) - Clean, bright interface
- **Dark Theme** - Easy on the eyes for night reading
- **Blue Theme** - Alternative color scheme

### Customizing Themes

Edit `assets/css/modern.css` and modify the CSS custom properties:

```css
:root {
  --bg-color: #ffffff;
  --text-color: #111111;
  --accent-color: #2a7ae2;
  /* ... other variables ... */
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #e4e4e4;
  /* ... other variables ... */
}
```

## 🔧 Configuration

### Site Settings

Edit `_config.yml` to customize:

```yaml
title: Your Site Title
email: your.email@example.com
description: Your site description
url: "https://yoursite.com"
twitter_username: yourusername
github_username: yourusername
```

### Collections

Collections are defined in `_config.yml`:

```yaml
collections:
  projects:
    output: true
    permalink: /projects/:name/
  docs:
    output: true
    permalink: /docs/:name/
```

## 🌐 PWA Features

### Service Worker

The service worker (`sw.js`) provides:
- Offline support
- Asset caching
- Network-first strategy with fallback
- Automatic cache updates

### Manifest

The PWA manifest (`manifest.json`) enables:
- Add to home screen
- Standalone app mode
- Custom splash screen
- App icons

### Testing PWA

1. Build and serve the site
2. Open Chrome DevTools
3. Go to Application tab
4. Check:
   - Manifest
   - Service Workers
   - Cache Storage

## ♿ Accessibility

The site follows WCAG 2.1 Level AA guidelines:

- Semantic HTML
- Keyboard navigation support
- Skip-to-content link
- ARIA labels
- Color contrast ratios
- Focus indicators

## 📱 Responsive Design

Breakpoints:
- Mobile: < 600px
- Tablet: 600px - 900px
- Desktop: > 900px
- Large Desktop: > 1200px

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Writing Guidelines

- Use clear, concise language
- Add code examples where helpful
- Include frontmatter with proper categories/tags
- Test on multiple devices
- Check accessibility

## 📄 License

This project is open source and available under the MIT License.

## 🔒 Security

See [SECURITY.md](SECURITY.md) for security policy and reporting vulnerabilities.

## 📞 Contact

- **Email:** cmorton@cmorton.info
- **GitHub:** [@cjemorton](https://github.com/cjemorton)
- **Twitter:** [@clemmorton](https://twitter.com/clemmorton)

## 🙏 Acknowledgments

- [Jekyll](https://jekyllrb.com/) - Static site generator
- [Minima](https://github.com/jekyll/minima) - Base theme
- [GitHub Pages](https://pages.github.com/) - Hosting

---

**Last Updated:** January 2026

