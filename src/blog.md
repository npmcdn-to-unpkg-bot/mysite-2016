---
layout: default
title: Blog
permalink: /blog/
---

<div class="blog wrapper-sm mt3">
  <h1 class="page-heading">Blog Posts</h1>
  <div class="page-border"></div>

  <ul class="post-list">
    {% for post in site.posts %}
      <li class="post-item">
        <h2>
          <a class="post-link" href="{{ post.url }}">{{ post.title }}</a>
        </h2>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        {{ post.excerpt }}
      </li>
    {% endfor %}
  </ul>

  <!-- <p class="rss-subscribe">subscribe <a href="{{ "feed.xml" }}">via RSS</a></p> -->
</div>
