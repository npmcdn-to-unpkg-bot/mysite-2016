---
title: Web
layout: default
regenerate: true
aboutImage: /assets/images/profile.jpg
classes: page-webProjects
---

<div class="pageWeb_main" role="main">

  <ul class="box_container">
    {% assign projects = site.web_projects %}
    {% for project in projects reversed %}
      {% include box.html %}
    {% endfor %}
  </ul>
</div>
