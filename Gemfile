source "https://rubygems.org"

# ==============================================================================
# NOTE FOR COPILOT AND CONTRIBUTORS: This Gemfile MUST remain GitHub Pages 
# compatible. Do NOT add or upgrade gems or versions in a way that is not 
# explicitly supported by github-pages. Never uncomment or add an explicit 
# 'gem "jekyll"' version line. Prioritize GitHub Pages compatibility at all 
# times.
# ==============================================================================

# For GitHub Pages compatibility, the Jekyll version is managed automatically
# by the github-pages gem (see below). To run Jekyll locally, use:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.

# IMPORTANT: Explicit Jekyll versioning conflicts with GitHub Pages and is 
# disabled for compatibility. GitHub Pages manages the Jekyll version 
# automatically through the github-pages gem (see below). Do NOT uncomment 
# this line as it will cause dependency conflicts with GitHub Pages.
# gem "jekyll", "~> 4.3.0"

# ==============================================================================
# CRITICAL: Do NOT specify explicit versions for any gems managed by github-pages
# ==============================================================================
# The github-pages gem (below) pins specific versions of Jekyll, themes, and 
# plugins to match GitHub Pages' environment. Specifying explicit versions for 
# gems like minima, jekyll-feed, jekyll-seo-tag, or any other plugins will cause
# Bundler conflicts and build failures on Cloudflare Pages and other CI systems.
#
# The github-pages gem automatically includes and manages:
# - Jekyll (and all its dependencies)
# - minima theme
# - jekyll-feed
# - jekyll-seo-tag
# - And many other plugins
#
# To see what versions are included, visit:
# https://pages.github.com/versions/
# ==============================================================================

# GitHub Pages compatibility: This gem manages all Jekyll dependencies including
# Jekyll itself, themes, and plugins. This ensures compatibility with GitHub Pages
# and prevents version conflicts on Cloudflare Pages and other build systems.
gem "github-pages", group: :jekyll_plugins

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

