---
layout: post
keywords: blog
description: blog
title: "Android Volley"
categories: [Android]
tags: [Volley]
---
{% include codepiano/setup %}

## 背景

[Volley](https://android.googlesource.com/platform/frameworks/volley)是Google I/O 2013推出的网络通信库，在volley推出之前我们一般会选择比较成熟的第三方网络通信库，如：

* [android-async-http](http://loopj.com/android-async-http/)

* [retrofit](http://square.github.io/retrofit/)

* [okhttp](http://square.github.io/okhttp/)

他们各有优劣，之前个人则比较喜欢用android-async-http, 如今Google推出了官方的针对Android平台上的网络通信库，能使网络通信更快，更简单，更健壮，Volley在提供了高性能网络通讯功能的同时，对网络图片加载也提供了良好的支持，完全可以满足简单REST客户端的需求, 我们没有理由不跟上时代的潮流。

## 使用Volley

下载Volley源码并build jar包。

    $ git clone https://android.googlesource.com/platform/frameworks/volley
    $ cd volley
    $ android update project -p
    $ ant jar

然后把生成的jar包引用到我们的项目中，extras目录下则包含了目前最新的volley源码。

## 用法

在github上创建了一个学习Volley的项目，讲的再多不如代码来的直接，具体见项目这里：[AndroidVolley](https://github.com/stormzhang/AndroidVolley)