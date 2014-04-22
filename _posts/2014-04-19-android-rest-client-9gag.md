---
layout: post
keywords: blog
description: blog
title: "我心中的Android REST Client--9gag"
categories: [Android, OpenAndroid]
tags: [9gag]
---
{% include codepiano/setup %}

## What is a good app

作为一名Android Developer，一直都想Make A Good App。很多次的我都在反问自己，我心中的Good App应该是什么样的呢？为了寻找答案，自己一直在产品、设计以及技术上都花了不少时间探索与研究。如今可能有点雏形，我心中的Good App可能需要满足以下几个方面：

* 产品上要追求功能简洁至上，坚持认为Simple is beautiful!

* 设计上要满足平台特性，遵循Android Design，交互简单，多注意细节。

* 技术上要时刻紧跟潮流，利用新的架构，新的特性，新的工具来让你的产品更稳固，更酷炫。

但是在公司的话就有这么一个矛盾点，新的技术，新的架构就意味着有很多的不确定因素，如果一味的追求潮流，尝鲜，从公司的角度来说风险是相当大的。之前可能也吃过类似的亏，所以一直认为公司的App一定要以稳为前提，稳中求新，稳中求酷！

## 紧跟潮流的9Gag

作为一名潮人，必须想要体验并尝试最新的架构与技术，于是9Gag这个项目就诞生了。遵循Android Design的一款简洁的App。

麻雀虽小，五脏俱全，这款App主要使用Android方面最新的IDE，新的技术、新特性，以及一些流行的开源库快速开发一个不错的REST Client，亲自实践了如何Make A Good App!

<img src="https://raw.github.com/stormzhang/9GAG/master/art/9gag.jpg" />

## 应用架构

整个应用的架构是遵循Google I/O 2013提出的REST架构。

<img src="/image/android_rest.png">

## 网络请求库

网络请求采用了[Volley](https://github.com/stormzhang/AndroidVolley)，也是Google I/O 2013发布的网络请求库，优势在于除了提供了高性能的网络请求外，还可以统一管理请求，可以在整个App中只维持一个请求队列示例。

{% highlight ruby %}
public static RequestQueue mRequestQueue = Volley.newRequestQueue(App.getContext());
{% endhighlight %}

并且Volley还提供了中段特定请求的方法，利用这个特性可以在Activity或Fragment关闭时中断该页面的请求，节省有限资源的消耗，节流省电，顶Google！

{% highlight ruby %}
public static void addRequest(Request<?> request, Object tag) {
    if (tag != null) {
        request.setTag(tag);
    }
    mRequestQueue.add(request);
}

public static void cancelAll(Object tag) {
    mRequestQueue.cancelAll(tag);
}
{% endhighlight %}

在加上Volley是官方的，还有比用官方的库更放心的么?

## 图片加载

其实Volley本身对网络图片也提供了良好的支持，完全可以满足简单REST客户端的需求， 而且提供了本地缓存，但需要自己定义内存缓存算法。实现起来也比较简单，具体可以参见BitmapLruCache.java文件。但是Volley的图片加载不提供加载进度回调，所以从这点来说加载网络图片还是推荐使用[UniversalImageLoader](https://github.com/nostra13/Android-Universal-Image-Loader),目前最流行的图片加载库，配置强大，使用简单，绝对能满足你的各种需求！

## ContentProvider & CursorLoader

CursorLoader是Loader的子类，是在Android 3.0新增的类。它提供了一套在UI的主线程中异步加载数据的框架。使用Loader可以非常简单的在Activity或者Fragment中异步加载数据，一般适用于大量的数据查询，或者需要经常修改并及时展示的数据显示到UI上，这样可以避免查询数据的时候，造成UI主线程的卡顿。

CursorLoader监听数据源，当数据改变的时候，将新的数据发布到UI上。CursorLoader还有一个更为强劲的功能，就是在接到数据变更的通知时会重新query一次，这样就保证了Cursor的数据始终与数据库同步。配合LoaderManager，使用CursorLoader是目前在Activity&Fragment中异步读取ContentProvider的最佳方案。

ContentProvider着实让人很头痛，实际上Android文档中提到，如果没有跨进程的需求，或者向其他应用分享数据的需求就不必使用ContentProvider。但ContentProvider为数据库的管理提供了更清晰的接口，并且为了使用CursorLoader，ContentProvider是必须构建的。

## 开源库

自己接触开源也有一些时日了，9gag项目中也引用了一些比较成熟的开源库。在开源世界一直流行一句话：不要重复发明轮子。因此在一些开发资源有限的情况下，开源世界就成了你最大的资源，很多成熟很酷的开源库都可以直接拿来用，把精力放在自己的核心业务与功能上，能够快速实现开发。开源让无数人受益，在我们受益的同时也应该感谢那些开源世界的贡献者，如果有机会也应该为开源世界贡献自己的一份力，这样开源才能持续壮大发展下去，于是也决定将此项目开源出来。

github地址：[9GAG](https://github.com/stormzhang/9GAG)

