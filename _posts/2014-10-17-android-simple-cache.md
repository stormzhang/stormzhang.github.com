---
layout: post
keywords: blog
description: blog
title: "Android轻量缓存框架--ASimpleCache"
categories: [Android]
tags: [Cache]
---
{% include codepiano/setup %}

做Android应用开发的同学们相信对“缓存”这个词不陌生，缓存可能有多方面的概念，这里大概列举下程序开发的缓存大概有哪些：

* 1.服务端控制缓存

如volley请求库，便是通过服务端的“Cache-Control”和“max-age”来告诉客户端有没有缓存以及缓存的时间，也是推荐的使用方式，但是需要服务端配合，比较灵活。

* 2.客户端直接控制缓存

有些时候不需要服务端来支持的话，客户端可以直接做一层缓存，思路就是请求之后把数据缓存在本地，最常见的是直接以文件缓存在本地就好了，当然你可以缓存在本地的sqlite，以sqlite文件的形式缓存数据处理更灵活点，然后客户端自己处理缓存的时间，过期则直接清除数据。对于一些不太经常变化的页面，采用这种缓存可以减少客户端流量，同时减少服务器并发量。

对于一些新闻类或者timeline这种，数据变化是非常频繁的，针对这种情况可能就不太适合设置缓存时间，这种情况可以考虑让页面每次进来都会自动刷新一次以获取最新数据，如果网络不好或者断开时可以直接读取本地缓存，增加用户体验。当然如果想要更复杂的处理可以配合时间来判断当前页面要不要刷新。

今天就介绍一种简易的缓存框架，使用起来非常简单。

## ASimpleCache

ASimpleCache 是一个为android制定的 轻量级的 开源缓存框架。轻量到只有一个java文件（由十几个类精简而来）。

## 它可以缓存什么东西？

普通的字符串、JsonObject、JsonArray、Bitmap、Drawable、序列化的java对象，和 byte数据。

## 如何使用 ASimpleCache？

{% highlight ruby %}
ACache mCache = ACache.get(this);
mCache.put("test_key1", "test value");
mCache.put("test_key2", "test value", 10);//保存10秒，如果超过10秒去获取这个key，将为null
mCache.put("test_key3", "test value", 2 * ACache.TIME_DAY);//保存两天，如果超过两天去获取这个key，将为null
{% endhighlight %}

获取数据

{% highlight ruby %}
ACache mCache = ACache.get(this);
String value = mCache.getAsString("test_key1");
{% endhighlight %}

最后此项目的开源地址： [ASimpleCache](https://github.com/yangfuhai/ASimpleCache)

