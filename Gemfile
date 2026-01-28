source "https://rubygems.org"

# ==============================================================================
# NOTE FOR COPILOT AND CONTRIBUTORS: This Gemfile MUST remain GitHub Pages 
# compatible. Do NOT add or upgrade gems or versions in a way that is not 
# explicitly supported by github-pages. Never uncomment or add an explicit 
# 'gem "jekyll"' version line. Prioritize GitHub Pages compatibility at all 
# times.
# ==============================================================================

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

# IMPORTANT: Explicit Jekyll versioning conflicts with GitHub Pages and is 
# disabled for compatibility. GitHub Pages manages the Jekyll version 
# automatically through the github-pages gem (see below). Do NOT uncomment 
# this line as it will cause dependency conflicts with GitHub Pages.
# gem "jekyll", "~> 4.3.0"
# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.5"

# GitHub Pages compatibility: This gem manages all Jekyll dependencies including
# Jekyll itself, ensuring compatibility with GitHub Pages. This approach prevents
# version conflicts and ensures the site builds correctly on GitHub Pages.
gem "github-pages", group: :jekyll_plugins
# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.8"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

