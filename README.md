# Ruby version
This project now requires Ruby 3.1.0 or higher to resolve compatibility issues with recent versions of the nokogiri gem and other dependencies. The project is tested with Ruby 3.2.3. You can use the included `.ruby-version` file for version managers like rbenv or rvm.
# CMORTON Blog

Personal blog for Clem Morton covering technical topics, programming, and system administration.

🌐 **Live Site:** [cmorton.info](https://cmorton.info)

## ✨ Features

- 📱 **Progressive Web App (PWA)** - Installable, works offline
- 🎨 **Multiple Themes** - Light, dark, blue, compact, and readability themes with smooth transitions
- 📐 **Responsive Design** - Optimized for all device sizes
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🚀 **Fast Loading** - Service worker caching and lazy loading
- 📝 **Multiple Content Types** - Posts, projects, and documentation
- 🔍 **SEO Optimized** - Meta tags, structured data, sitemap
- 🎯 **Modern UI** - CSS Grid/Flexbox, smooth animations, mobile navigation
- 🖨️ **Print Friendly** - Print button on all posts and articles with optimized print CSS
- 📚 **Organized Content** - Clear separation between Personal Blog and AI-Generated Documentation

## 🛠️ Technology Stack

- **Static Site Generator:** Jekyll 4.3+
- **Theme:** Custom Minima-based theme
- **Hosting:** GitHub Pages
- **PWA:** Custom service worker implementation
- **CSS:** Modern CSS with CSS Custom Properties
- **JavaScript:** ES6+ with modular architecture

## 📋 Requirements

- Ruby 3.1.0 or higher (tested with Ruby 3.2.3)
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
├── _posts/              # Blog posts (Personal Blog content)
│   └── YYYY/MM/         # Posts organized by date
├── _projects/           # Project showcases
├── _docs/              # Documentation pages (AI-Generated)
├── _layouts/           # Page layouts
│   ├── default.html    # Base layout
│   ├── home.html       # Homepage layout with content sections
│   ├── post.html       # Blog post layout (with print button)
│   ├── page.html       # Static page layout
│   ├── project.html    # Project layout
│   └── doc.html        # Documentation layout
├── _includes/          # Reusable components
│   ├── head.html       # Head section with PWA links
│   ├── header.html     # Site header and navigation
│   ├── footer.html     # Site footer with theme switcher
│   ├── social.html     # Social media links
│   └── footer-scripts.html  # JavaScript includes
├── assets/
│   ├── css/
│   │   └── modern.css  # Custom theme styles (5 themes + print CSS)
│   └── js/
│       └── modern.js   # Theme switcher, PWA, navigation, print handler
├── copilot-generated/  # AI-generated developer docs (excluded from build)
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── PWA_ICONS_README.md
│   ├── SECURITY.md
│   └── SITE_ANALYSIS_REPORT.md
├── accessibility.markdown # Accessibility statement (user-facing)
├── offline.html          # Offline page for PWA
├── blog.html           # Personal Blog index page
├── generated-docs.html # Generated Documentation index page
├── docs.markdown       # Documentation collection index
├── projects.markdown   # Projects collection index
├── manifest.json       # PWA manifest
└── sw.js              # Service worker
```

## 📝 Content Management

### Content Categories

The site content is organized into two main categories:

1. **Personal Blog** (`_posts/`) - Technical articles, tutorials, and personal thoughts
2. **AI-Generated Documentation** (`_docs/`) - AI-assisted technical documentation and guides

Static pages (e.g., About, Contact) are kept separate from both categories.

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

### AI-Generated Content Organization

**Important Rule:** All AI-generated **development documentation** (implementation summaries, site analysis reports, security documentation for developers, PWA documentation, etc.) should be placed in the `/copilot-generated/` folder. This folder is excluded from the Jekyll build process and will not appear in the published site or navigation menus.

**Files in `/copilot-generated/`** are for **developer reference only** and include:
- `IMPLEMENTATION_SUMMARY.md` - Implementation notes and summaries
- `SITE_ANALYSIS_REPORT.md` - Site analysis and recommendations
- `SECURITY.md` - Security policy for developers
- `PWA_ICONS_README.md` - PWA icon documentation
- And any other Copilot/AI-generated reference documents **not** intended for end users

**User-facing content** (even if AI-assisted) such as accessibility statements, documentation pages, blog posts, etc., should be placed in their appropriate folders (`_docs/`, `_posts/`, or root) and will be included in the site build.

This organizational structure keeps the main site clean and focused on user-facing content while preserving AI-generated documentation for development reference.

## 🖨️ Print Functionality

All blog posts and article pages include a **Print button** that:
- Opens the browser's print dialog
- Applies print-friendly CSS automatically
- Removes navigation, footer, and UI elements from the printed version
- Optimizes typography and layout for paper
- Preserves links with printed URLs (where appropriate)

The print button is automatically added by JavaScript to any page with `.post-content`, `.page-content`, `.doc-content`, or `.project-content` classes.

## 🎨 Theme Customization

The site supports **five themes** that can be switched on-the-fly via the footer theme switcher:

- **Light Theme** (default) - Clean, bright interface
- **Dark Theme** - Easy on the eyes for night reading
- **Blue Theme** - Alternative color scheme with blue accents
- **Compact Theme** - Denser layout with reduced spacing, ideal for information-dense pages
- **Readability Theme** - Optimized for reading with larger fonts, wider line spacing, and serif typography

### Theme Switcher Location

The theme switcher is located in the **site footer** for a clean, minimally-distracting interface. Users can select their preferred theme, which persists across sessions via localStorage.

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

### Excluding Content from Build

The `/copilot-generated/` folder is excluded from the Jekyll build in `_config.yml`:

```yaml
exclude:
  - copilot-generated/
  - .sass-cache/
  - .jekyll-cache/
  # ... other exclusions
```

### Navigation Structure

The site navigation is configured in `_includes/header.html` with the following structure:

- **Home** - Homepage with overview of both content sections
- **Personal Blog** - All blog posts (`/blog/`)
- **Generated Docs** - AI-generated documentation (`/generated-docs/`)
- Additional static pages (About, Contact, etc.) as configured

Pages can be excluded from navigation by setting `show_in_nav: false` in their frontmatter.

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

