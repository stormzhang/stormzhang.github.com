---
layout: post
keywords: blog
description: blog
title: "Android Support兼容包详解"
categories: [Android]
tags: [SupportLibrary]
---
{% include codepiano/setup %}

## 背景

来自于知乎上邀请回答的一个问题[Android中AppCompat和Holo的一个问题？](http://www.zhihu.com/question/28865999/answer/42375337), 看来很多人还是对这些兼容包搞不清楚，那么干脆写篇博客吧.

## Support Library

我们都知道Android一些SDK比较分裂，为此google官方提供了Android Support Library package 系列的包来保证高版本sdk开发的向下兼容性, 所以你可能经常看到v4，v7，v13这些数字，首先我们就来理清楚这些数字的含义，以及它们之间的区别。

* support-v4

用在API lever 4(即Android 1.6)或者更高版本之上。它包含了相对更多的内容，而且用的更为广泛，例如：Fragment，NotificationCompat，LoadBroadcastManager，ViewPager，PageTabStrip，Loader，FileProvider 等

Gradle引用方法： 

    compile 'com.android.support:support-v4:21.0.3'

* support-v7

这个包是为了考虑API level 7(即Android 2.1)及以上版本而设计的，但是v7是要依赖v4这个包的，v7支持了Action Bar以及一些Theme的兼容。

Gradle引用方法:

    compile 'com.android.support:appcompat-v7:21.0.3'

* support-v13

这个包的设计是为了API level 13(即Android 3.2)及更高版本的，一般我们都不常用，平板开发中能用到，这里就不过多介绍了。

## Theme

回到知乎上的这个问题，我们来介绍下各种Theme的概念。

* Hoho Theme

在4.0之前Android可以说是没有设计可言的，在4.0之后推出了Android Design，从此Android在设计上有了很大的改善，而在程序实现上相应的就是Holo风格，所以你看到有类似 **Theme.Holo.Light**、 **Theme.Holo.Light.DarkActionBar** 就是4.0的设计风格，但是为了让4.0之前的版本也能有这种风格怎么办呢？这个时候就不得不引用v7包了，所以对应的就有 **Theme.AppCompat.Light**、 **Theme.AppCompat.Light.DarkActionBar**，如果你的程序最小支持的版本是4.0，那么可以不用考虑v7的兼容。

* Material Design Theme

今年的5.0版本，Android推出了Material Design的概念，这是在设计上Android的又一大突破。对应的程序实现上就有 **Theme.Material.Light**、 **Theme.Material.Light.DarkActionBar**等，但是这种风格只能应用在在5.0版本的手机，如果在5.0之前应用Material Design该怎么办呢？同样的引用appcompat-v7包，这个时候的**Theme.AppCompat.Light**、 **Theme.AppCompat.Light.DarkActionBar**就是相对应兼容的Material Design的Theme。

## 注意事项

* gradle引用appcompat-v7包的时候就不需要引用v4了，因为v7里默认包含了v4包；

* **compile 'com.android.support:appcompat-v7:21.0.3'** 中的21代表API level 21推出的兼容包，所以如果你引用的是21之前的版本，则默认这些**Theme.AppCompat.Light**是Holo风格的，从21开始的版本默认是Material风格

* 使用appcompat之后，你的所有的Activity应该继承自ActionBarActivity，而ActionBarActivity继承自FragmentActivity，所以放心的使用Fragment；


最后，相信已经讲的很清楚了，大家有问题可直接博客留言。如果英语好的，可直接移步官方最权威的解释[https://developer.android.com/tools/support-library/features.html](https://developer.android.com/tools/support-library/features.html)
