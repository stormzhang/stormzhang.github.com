---
layout: post
keywords: blog
description: blog
title: "Android开源项目推荐之「图片加载到底哪家强」"
categories: [OpenSource]
tags: [Image]
---
{% include codepiano/setup %}

图片加载几乎是任何 Android 项目中必备的需求，而图片加载的开源库也越来越多，我们姑且在 GitHub 上搜索下 android image 关键字，出来的前五个按照 Star 数排序的项目如下：

![图片描述](/image/github_image_loader.jpg)

可以看到前四个是大家比较熟知的图片加载库，有 UniversalImageLoader、Picasso、Fresco、Glide，至于第五个 ion 其实是一个网络库，只不过也提供了图片加载的功能，跟 Volley 类似，也提供图片加载的功能，但是如果图片加载是一个强需求的话，我更喜欢专注的库，所以本文只讨论单纯的图片加载库。

我相信大家很纠结到底该选择哪一个呢？貌似它们在GitHub上都有自己的一席之地，Star 数都蛮高的，确实很难抉择，那么今天我就来给大家分析下，图片加载到底该怎么选择！

## 1. UniversalImageLoader

[https://github.com/nostra13/Android-Universal-Image-Loader](https://github.com/nostra13/Android-Universal-Image-Loader)

UIL可以算是老牌最火的图片加载库了，使用过这个开源库的项目可以说是多的令人发指，即使到现在 GitHub 上他的 Star 数仍然是众多图片加载库最多的。

可惜的是该作者在项目中说明，从去年的9月份，他就已经停止了对该项目的维护。这就意味着以后任何的 bug 都不会修复，任何的新特性都不会再继续开发，所以毫无疑问 UIL 不推荐在项目中使用了。

## 2. Picasso

[https://github.com/square/picasso](https://github.com/square/picasso)

Picasso 是 Square 公司的大作，名字起的也这么文艺，叫「毕加索」，意为加载图片就像画画一样，是一门艺术。这个库是我之前一直很喜欢的，因为他不仅具备图片加载应有尽有的强大功能，他的调用也是如此简洁文艺：

    Picasso.with(context).load("http://i.imgur.com/DvpvklR.png").into(imageView);

以上代码就是给一个 ImageView 加载远程图片的一个示例，是不是很简洁？

当然不止如此，他还提供更多的用法，足以满足你实际项目中的各种需求，具体这些用法本文就不提了，可以去官网自行研究。

## 3. Glide

https://github.com/bumptech/glide

Glide 是 Google 一位员工的大作，他完全是基于 Picasso 的，沿袭了 Picasso 的简洁风格，但是在此做了大量优化与改进。

Glide 默认的 Bitmap 格式是 RGB_565 格式，而 Picasso 默认的是 ARGB_8888 格式，这个内存开销要小一半。

在磁盘缓存方面，Picasso 只会缓存原始尺寸的图片，而 Glide 缓存的是多种规格，也就意味着 Glide 会根据你 ImageView 的大小来缓存相应大小的图片尺寸，比如你 ImageView 大小是200*200，原图是 400*400 ，而使用 Glide 就会缓存 200*200 规格的图，而 Picasso 只会缓存 400*400 规格的。这个改进就会导致 Glide 比 Picasso 加载的速度要快，毕竟少了每次裁剪重新渲染的过程。

最重要的一个特性是 Glide 支持加载 Gif 动态图，而 Picasso 不支持该特性。

除此之外，还有很多其他配置选项的增加。

总体来说，Glide 是在 Picasso 基础之上进行的二次开发，各个方面做了不少改进，不过这也导致他的包比 Picasso 大不少，不过也就不到 500k，Picasso 是100多k，方法数也比 Picasso 多不少，不过毕竟级别还是蛮小的，影响不是很大。

## 4. Fresco

[https://github.com/facebook/fresco](https://github.com/facebook/fresco)

Fresco 是 Facebook 出品，他是新一代的图片加载库，我们知道 Android 应用程序可用的内存有限，经常会因为图片加载导致 OOM，虽然我们有各种手段去优化，尽量减少出现 OOM 的可能性，但是永远没法避免，尤其某些低端手机 OOM 更是严重。而 Facebook 就另辟蹊径，既然没法在 Java 层处理，我们就在更底层的 Native 堆做手脚。于是 Fresco 将图片放到一个特别的内存区域叫 Ashmem 区，就是属于 Native 堆，图片将不再占用 App 的内存，Java 层对此无能为力，这里是属于 C++ 的地盘，所以能大大的减少 OOM。

所以此库很强大，不过用起来也比较复杂，包也比较大，貌似有2、3M，底层涉及到的 C++ 领域，想读源码也比较困难。

## 5. 总结

综合来看，毫无疑问 Glide 与 Picasso 之间优先推荐选择 Glide，尤其是如果你的项目想要支持 Gif 动态图，那更该选择 Glide 。

但是如果你的项目使用了 Square 公司的全家桶，如 Retrofit 或者 OkHttp ，那么搭配 Picasso 一起使用也不是不可，兼容性可能会更好些，占用体积也会少些。

对于一般的 App 使用 Fresco 未免有些大材小用了，大部分情况 Glide 都能满足你的需求了，但是如果你的 App 中大量使用图片，比如是类似 Instagram 一类的图片社交 App ，那么推荐使用 Fresco ，虽然稍复杂，但是还是推荐使用 Fresco ，对提升你 App 的性能与体验有不少帮助，值得花时间去研究并应用到自己的 App 上来。

