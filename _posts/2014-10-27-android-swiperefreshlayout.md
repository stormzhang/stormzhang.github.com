---
layout: post
keywords: blog
description: blog
title: "Inbox下拉刷新效果"
categories: [Android]
tags: [Inbox, SwipeRefreshLayout]
---
{% include codepiano/setup %}

最近Google发布了Inbox应用，除了拥有gmail的功能之外，还整合了To do list, 提醒， 分类等功能，体验上也是很赞，设计上采用了最新的Material Design. 

这里可以注意到下拉刷新是一个全新的样式，之前我有一篇博客提到Google官方添加了自带的下拉刷新组件[Android SwipeRefreshLayout](http://stormzhang.com/android/2014/03/29/android-swiperefreshlayout)，很自然联想到这次的刷新组件也是自带的么？于是更新了support v4库，果然还是之前的SwipeRefreshLayout，这次更新了样式，使之整体更符合Material Design的风格。效果也很不错，见下图，使用方法和原来一样，具体可以看我在GitHub上关于SwipeRefreshLayout的项目：

GitHub地址：[SwipeRefreshLayoutDemo](https://github.com/stormzhang/SwipeRefreshLayoutDemo)

<img src="https://camo.githubusercontent.com/736dc88d160cc23793bc8193bbbe7b9009d5501e/687474703a2f2f7777332e73696e61696d672e636e2f626d6964646c652f3564343330393737677731656c6b357237736b73756732306234306a726232392e676966" />