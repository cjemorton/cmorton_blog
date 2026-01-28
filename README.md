# CMORTON Blog

Personal blog for Clem Morton covering technical topics, programming, and system administration.

🌐 **Live Site:** [cmorton.info](https://cmorton.info)

## Features

- **Progressive Web App (PWA)** - Installable, works offline
- **Multiple Themes** - Light, dark, blue, compact, and readability themes
- **Responsive Design** - Optimized for all device sizes
- **Accessible** - WCAG compliant with keyboard navigation
- **Multiple Content Types** - Blog posts, projects, and documentation
- **SEO Optimized** - Meta tags, structured data, sitemap
- **Print Friendly** - Print button on all posts with optimized print CSS

## Requirements

- Ruby 3.1.0 or higher (tested with Ruby 3.2.3)
- Bundler
- Jekyll 4.3+

## Setup

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

Visit `http://localhost:4000` to view the site locally.

## Directory Structure

```
cmorton_blog/
├── _config.yml           # Site configuration
├── _posts/              # Blog posts organized by date (YYYY/MM/)
├── _projects/           # Project showcases
├── _docs/              # Documentation pages (AI-generated)
├── _layouts/           # Page layouts (default, home, post, page, project, doc)
├── _includes/          # Reusable components (head, header, footer, social)
├── assets/             # CSS and JavaScript files
├── docs/               # Developer documentation (CONTRIBUTING, IMPLEMENTATION_NOTES)
├── manifest.json       # PWA manifest
└── sw.js              # Service worker
```

## License

This project is open source and available under the MIT License.

## Contact

- **Email:** cmorton@cmorton.info
- **GitHub:** [@cjemorton](https://github.com/cjemorton)
- **Twitter:** [@clemmorton](https://twitter.com/clemmorton)

---

**Note:** This site uses Ruby 3.1.0+ for compatibility with recent versions of the nokogiri gem and other dependencies. Use the included `.ruby-version` file with version managers like rbenv or rvm.
