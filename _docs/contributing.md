---
layout: doc
title: Contributing to CMORTON Blog
date: 2026-01-28
excerpt: Guidelines for contributing to this Jekyll blog, including content and code guidelines.
---

# Contributing to CMORTON Blog

Thank you for your interest in contributing! This document provides guidelines for contributing to this Jekyll blog.

## Table of Contents

- [Getting Started](#getting-started)
- [Content Guidelines](#content-guidelines)
- [Code Guidelines](#code-guidelines)
- [Submitting Changes](#submitting-changes)

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/cmorton_blog.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `bundle install`
5. Run locally: `bundle exec jekyll serve`

## Content Guidelines

### Blog Posts

When creating new blog posts:

1. **Location**: Place in `_posts/YYYY/MM/` directory
2. **Naming**: Use format `YYYY-MM-DD-title.md`
3. **Frontmatter**: Include all required fields

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS -0700
categories: technical programming
tags: [tag1, tag2, tag3]
excerpt: "Brief description (1-2 sentences)"
---
```

#### Category Guidelines

Use one or more of these categories:
- **technical** - All technical content (required for tech posts)
- **programming** - Code, development, software engineering
- **sysadmin** - System administration, DevOps, infrastructure
- **resources** - Curated links, references, tools
- **personal** - Personal updates, reflections

#### Writing Style

- Use clear, concise language
- Include code examples where helpful
- Add proper attribution for external sources
- Use proper markdown formatting
- Break up long content with headings
- Include alt text for all images

### Projects

When adding projects to `_projects/`:

```yaml
---
layout: project
title: "Project Name"
date: YYYY-MM-DD
excerpt: "Project description"
tags: [technology, tools, tags]
github_url: "https://github.com/user/repo"  # optional
demo_url: "https://demo.example.com"  # optional
---
```

Include:
- Clear project description
- Technologies used
- Installation/usage instructions
- Current status

### Documentation

When adding documentation to `_docs/`:

```yaml
---
layout: doc
title: "Documentation Title"
date: YYYY-MM-DD
excerpt: "Documentation description"
toc: true  # Enable table of contents
---
```

Documentation should:
- Be clear and well-structured
- Include step-by-step instructions
- Provide code examples
- Link to related resources

## Code Guidelines

### HTML/Liquid

- Use semantic HTML5 elements
- Follow existing template structure
- Add ARIA labels for accessibility
- Test with keyboard navigation

### CSS

- Use CSS custom properties (variables)
- Follow BEM naming convention where applicable
- Ensure responsive design (mobile-first)
- Maintain color contrast for accessibility
- Group related styles together
- Comment complex CSS

```css
/* Component name and description */
.component-name {
  /* Layout */
  display: flex;
  
  /* Appearance */
  background: var(--bg-color);
  
  /* Transitions */
  transition: all 0.3s;
}
```

### JavaScript

- Use ES6+ features
- Write modular, reusable code
- Add comments for complex logic
- Handle errors gracefully
- Test across browsers
- Ensure progressive enhancement

```javascript
// Feature description
class FeatureName {
  constructor() {
    this.init();
  }
  
  init() {
    // Initialization logic
  }
}
```

### Accessibility

Ensure all contributions are accessible:

- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Maintain color contrast ratios
- Add ARIA labels where needed
- Test with screen readers

### Performance

Optimize for performance:

- Minimize CSS/JS
- Optimize images
- Use lazy loading
- Implement caching
- Test on mobile devices

## Testing

Before submitting:

1. **Build locally**: `bundle exec jekyll build`
2. **Test locally**: `bundle exec jekyll serve`
3. **Check all pages** work correctly
4. **Test responsive design** on multiple screen sizes
5. **Test accessibility** with keyboard navigation
6. **Test PWA features** (service worker, offline mode)
7. **Validate HTML** (use W3C validator)
8. **Check links** for broken references

## Submitting Changes

### Commit Messages

Write clear, descriptive commit messages:

```
type: Short description (max 50 chars)

Longer description if needed (wrap at 72 chars)
- Bullet points for multiple changes
- Reference issues with #issue-number

Examples:
- feat: Add dark theme toggle button
- fix: Resolve mobile navigation z-index issue
- docs: Update README with PWA setup instructions
- style: Improve color contrast for accessibility
```

Types:
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Formatting, CSS
- **refactor**: Code restructuring
- **test**: Adding tests
- **chore**: Maintenance

### Pull Requests

1. **Update your branch**: `git pull origin main`
2. **Push changes**: `git push origin your-branch-name`
3. **Create Pull Request** on GitHub
4. **Fill out PR template** with:
   - Description of changes
   - Related issues
   - Screenshots (for UI changes)
   - Testing performed

### PR Review Process

- PRs require review before merging
- Address reviewer feedback
- Keep PRs focused and small
- Update documentation as needed

## Code of Conduct

- Be respectful and professional
- Welcome newcomers
- Provide constructive feedback
- Focus on improving the project

## Questions?

- Open an issue for questions
- Email: cmorton@cmorton.info
- Check existing issues/PRs first

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to CMORTON Blog!
