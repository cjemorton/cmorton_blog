---
layout: page
title: Documentation
permalink: /docs/
show_in_nav: false
---

# Documentation

Technical documentation, guides, and how-tos:

<div class="content-grid">
  {% for doc in site.docs %}
    <div class="card">
      <h2>
        <a href="{{ doc.url | relative_url }}">{{ doc.title }}</a>
      </h2>
      {% if doc.excerpt %}
        <p>{{ doc.excerpt }}</p>
      {% endif %}
      {% if doc.date %}
        <p class="doc-date">Last updated: {{ doc.date | date: "%B %d, %Y" }}</p>
      {% endif %}
    </div>
  {% endfor %}
  
  {% for post in site.posts %}
    {% if post.categories contains 'docs' %}
      <div class="card">
        <h2>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>
        {% if post.excerpt %}
          <p>{{ post.excerpt }}</p>
        {% endif %}
        {% if post.date %}
          <p class="doc-date">{{ post.date | date: "%B %d, %Y" }}</p>
        {% endif %}
      </div>
    {% endif %}
  {% endfor %}
</div>

{% assign total_docs = site.docs.size %}
{% assign docs_posts = 0 %}
{% for post in site.posts %}
  {% if post.categories contains 'docs' %}
    {% assign docs_posts = docs_posts | plus: 1 %}
  {% endif %}
{% endfor %}

{% if total_docs == 0 and docs_posts == 0 %}
<p>No documentation yet. Check back soon!</p>
{% endif %}
