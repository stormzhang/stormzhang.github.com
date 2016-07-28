---
layout: post
keywords: blog
description: blog
title: "如何发现优秀的开源项目？"
categories: [GitHub]
tags: [GitHub]
---
{% include codepiano/setup %}

之前发过一系列有关 GitHub 的文章，有同学问了，GitHub 我大概了解了，Git 也差不多会使用了，但是 还是搞不清 GitHub 如何帮助我的工作，怎么提升我的工作效率？

问到点子上了，GitHub 其中一个最重要的作用就是发现全世界最优秀的开源项目，你没事的时候刷刷微博、知乎，人家没事的时候刷刷 GitHub ，看看最近有哪些流行的项目，久而久之，这差距就越来越大，那么如何发现优秀的开源项目呢？这篇文章我就来给大家介绍下。

## 1. 关注一些活跃的大牛

GitHub 主页有一个类似微博的时间线功能，所有你关注的人的动作，比如 star、fork 了某个项目都会出现在你的时间线上，这种方式适合我这种比较懒的人，不用主动去找项目，而这种基本是我每天获取信息的一个很重要的方式。不知道怎么关注这些人？那么很简单，关注我 stormzhang ，以及我 GitHub 上关注的一些大牛，基本就差不多了。

![图片描述](/image/github1.png)

## 2. Trending

点击下图的 Explore 菜单到“发现”页面

![图片描述](/image/github2.png)

紧接着点击 Trending 按钮

![图片描述](/image/github3.png)

这个 Trending 页面是干嘛的呢？直译过来就是趋势的意思，就是说这个页面你可以看到最近一些热门的开源项目，这个页面可以算是很多人主动获取一些开源项目最好的途径，可以选择「当天热门」、「一周之内热门」和「一月之内热门」来查看，并且还可以分语言类来查看，比如你想查看最近热门的 Android 项目，那么右边就可以选择 Java 语言。

![图片描述](/image/github4.png)

这样页面推荐大家每隔几天就去看下，主动发掘一些优秀的开源项目。

## 3. Search

除了 Trending ，还有一种最主动的获取开源项目的方式，那就是 GitHub 的 Search 功能。

举个例子，你是做 Android 的，接触 GitHub 没多久，那么第一件事就应该输入 android 关键字进行搜索，然后右上角选择按照 star 来排序，结果如下图：

![图片描述](/image/github_search1.png)

如果你是学习 iOS 的，那么不妨同样的方法输入 iOS 关键字看看结果：

![图片描述](/image/github_search2.png)

可以看到按照 star 数，排名靠前基本是一些比较火的项目，一定是很有用，才会这么火。值得一提的是左侧依然可以选择语言进行过滤。

而对于实际项目中用到一些库，基本上都会第一时间去 GitHub 搜索下有没有类似的库，比如项目中想采用一个网络库，那么不妨输入 android http 关键字进行搜索，因为我只想找到关于 Android 的项目，所以搜索的时候都会加上 android 关键字，按照 star 数进行排序，我们来看下结果：

![图片描述](/image/github_search3.png)

可以看到 Retrofit、OkHttp、android-async-http 是最流行的网络库，只不过 android-async-http 的作者不维护了，之前很多人问我网络库用哪个比较好？哪怕你对每个网络库都不是很了解，那么单纯的按照这种方式你都该优先选择 Retrofit 或者 OkHttp，而目前绝大部分 Android 开发者确实也都是在用这两个网络库，当然还有部分在用 Volley 的，因为 google 没有选择在 GitHub 开源 volley，所以搜不到 volley 的上榜。

除此之外，GitHub 的 Search 还有一些小技巧，比如你想搜索的结果中 star 数大于1000的，那么可以这样搜索：

android http stars:>1000

当然还有其他小技巧，但是我觉得不是很重要，就不多说了。

有些人如果习惯用 Google 进行搜索，那么想搜索 GitHub 上的结果，不妨前面加 GitHub 关键字就ok了，比如我在 google 里输入 GitHub android http ，每个关键字用空格隔开，然后搜索结果如下：

![图片描述](/image/github_search4.png)

可以看到，基本也是我们想要的结果，只不过排序就不是单纯的按照 star 来排序了。

## 福利大放送

相信以上三种方法够大家遨游在 GitHub 的海洋了，最后给大家献上一些福利，这些项目是 GitHub 上影响力很大，同时又对你们很有用的项目：

- [free-programming-books](https://github.com/vhf/free-programming-books)

这个项目目前 star 数排名 GitHub 第三，总 star 数超过6w，这个项目整理了所有跟编程相关的免费书籍，而且全球多国语言版的都有，中文版的在这里：[free-programming-books-zh](https://github.com/vhf/free-programming-books/blob/master/free-programming-books-zh.md)，有了这个项目，理论上你可以获取任何编程相关的学习资料，强烈推荐给你们！

- [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

俗话说，不会用 shell 的程序员不是真正的程序员，所以建议每个程序员都懂点 shell，有用不说，装逼利器啊！而 oh-my-zsh 毫无疑问就是目前最流行，最酷炫的 shell，不多说了，懂得自然懂，不懂的以后你们会懂的！

- [awesome](https://github.com/sindresorhus/awesome)

GitHub 上有各种 awesome 系列，简单来说就是这个系列搜罗整理了 GitHub 上各领域的资源大汇总，比如有 awesome-android, awesome-ios, awesome-java, awesome-python 等等等，就不截图了，你们自行去感受。

- [github-cheat-sheet](https://github.com/tiimgreen/github-cheat-sheet/)

GitHub 的使用有各种技巧，只不过基本的就够我们用了，但是如果你对 GitHub 超级感兴趣，想更多的了解 GitHub 的使用技巧，那么这个项目就刚好是你需要的，每个 GitHub 粉都应该知道这个项目。

- [android-open-project](https://github.com/Trinea/android-open-project)

这个项目是我一个好朋友 Trinea 整理的一个开源项目，基本囊括了所有 GitHub 上的 Android 优秀开源项目，但是缺点就是太多了不适合快速搜索定位，但是身为 Android 开发无论如何你们应该知道这个项目。

- [awesome-android-ui](https://github.com/wasabeef/awesome-android-ui)

这个项目跟上面的区别是，这个项目只整理了所有跟 Android UI 相关的优秀开源项目，基本你在实际开发终于到的各种效果上面都几乎能找到类似的项目，简直是开发必备。

- [Android_Data](https://github.com/Freelander/Android_Data)

这个项目是我的邪教群的一位管理员整理的，几乎包括了国内各种学习 Android 的资料，简直太全了，我为这个项目也稍微做了点力，强烈推荐你们收藏起来。

- [AndroidInterview-Q-A](https://github.com/JackyAndroid/AndroidInterview-Q-A/blob/master/README-CN.md)

这个就不多说了，之前给大家推荐过的，国内一线互联网公司内部面试题库。

- [LearningNotes](https://github.com/GeniusVJR/LearningNotes)

这是一份非常详细的面试资料，涉及 Android、Java、设计模式、算法等等等，你能想到的，你不能想到的基本都包含了，可以说是适应于任何准备面试的 Android 开发者，看完这个之后别说你还不知道怎么面试！

## 总结

GitHub 上优秀开源项目真的是一大堆，就不一一推荐了，授人以鱼不如授人以渔，请大家自行主动发掘自己需要的开源项目吧，不管是应用在实际项目上，还是对源码的学习，都是提升自己工作效率与技能的很重要的一个渠道，总有一天，你会突然意识到，原来不知不觉你已经走了这么远！

觉得不错，不妨随手转发、点赞，都是对我良心张莫大的鼓励！    

<br />

> 关注我的微信公众号 **AndroidDeveloper「googdev」**，第一时间获取文章更新以及更多原创干货分享！

![图片描述](/image/weixinpublic_200.png)

