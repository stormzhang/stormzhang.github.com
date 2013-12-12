---
layout: post
title: "迁移到jekyll"
tags: [Jekyll]
categories: [Other]
---
{% include codepiano/setup %}

把博客从Octopress迁移到Jekyll， 虽然Octopress也是基于Jekyll的，但是感觉有点臃肿，而且之前的主题也不怎么喜欢，于是也换了一个简约的主题。

## 1. Create a Post

{% highlight ruby %}

$ rake post title="Hello World"

{% endhighlight %}


## 2. Create a Page

{% highlight ruby %}

$ rake page name="about.md"

{% endhighlight %}

## 3. Create a nested page

{% highlight ruby %}

$ rake page name="pages/about.md"

{% endhighlight %}