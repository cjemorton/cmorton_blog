---
layout: page
title: Documentation
permalink: /docs/
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
</div>

{% if site.docs.size == 0 %}
<p>No documentation yet. Check back soon!</p>
{% endif %}
