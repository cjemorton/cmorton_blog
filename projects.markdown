---
layout: page
title: Projects
permalink: /projects/
show_in_nav: false
---

# Projects

Here are some of the projects I've worked on:

<div class="content-grid">
  {% for project in site.projects %}
    <div class="card">
      <h2>
        <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
      </h2>
      {% if project.excerpt %}
        <p>{{ project.excerpt }}</p>
      {% endif %}
      {% if project.tags %}
        <div class="project-tags">
          {% for tag in project.tags %}
            <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      {% endif %}
      {% if project.date %}
        <p class="project-date">{{ project.date | date: "%B %Y" }}</p>
      {% endif %}
    </div>
  {% endfor %}
</div>

{% if site.projects.size == 0 %}
<p>No projects yet. Check back soon!</p>
{% endif %}
