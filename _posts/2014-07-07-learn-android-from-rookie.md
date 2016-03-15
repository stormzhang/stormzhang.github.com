---
layout: post
keywords: blog
description: blog
title: "Android学习之路"
categories: [Android]
tags: [Android]
---
{% include codepiano/setup %}

    欢迎转载，但请务必在明确位置注明出处！http://stormzhang.com/android/2014/07/07/learn-android-from-rookie

推荐大家加我的微信公众账号：googdev， 技术分享，绝对干货，博客更新第一时间知晓

<img src="/image/weixinpublic.jpg" />

## 这篇博客背后的故事

一路走来很不容易，刚好知乎上被人邀请回答[如何自学android编程](http://www.zhihu.com/question/26417244)， 就借这个机会在知乎上记录一路走来的历程，很励志，希望能给那些正在或准备走编程行业的人一些正能量，内容有点长，感兴趣的可以当做励志小说阅读吧。

<!--more-->

---

收到一些朋友的微博私信，说能不能给Android新手们一些指导，我只能说指导谈不上，毕竟我也很多东西正在学习中，与此同时一大学同学准备转行Android，可以说是从头开始，那么我就姑且以一个过来人的身份给一些建议吧，只希望在学习的过程中能够少走写弯路吧。

## 硬件

* 电脑--推荐Mac

首先声明我不是果粉，个人Windows，Linux，Mac OX系统均用过， 只能说Windows上面的开发工具简直难以恭维，尤其命令行超级难用，而Linux自己必须得花不少时间在折腾中，更是不适合新手了，Max OS是我认为迄今为止最好用的系统，没有之一， 所以如果你不差钱的话，强烈建议入手一台Mac，推荐Pro系列， 当然它的价格确实比较昂贵，如果暂时入手有困难，推荐以后手头宽裕的时候再入手吧，会带给你质的体验。(Google的工程师们都在用Mac，应该比较有说服力吧)

* 手机--推荐Nexus 5

做Android开发最难以忍受的就是那龟速的模拟器，强烈推荐入手我Google的Nexus系列，原生rom，性价比超高，有条件的推荐再入手一台小米或三星之类的，不是因为他们有多好用，而是因为目前市场上这两个品牌的手机份额最大，实际开发中可能需要进行适配与测试，总之你需要有台Android手机。你可能还需要知道魅族手机有个SmartBar的东东，虽然我认为确实很SB。最后你实在还是要用模拟器的话，那么姑且就给你推荐一款比较快速的模拟器吧----Genymotion, 具体的见我这篇博客[一个强大的Android模拟器Genymotion](http://stormzhang.com/android/2013/12/04/android-genymotion)

## 书籍

书不在多，适合你就好，其实市面上的书籍大部分都差不多，没有本质的区别，所以书必要要有，但不推荐一次性买太多。这里推荐几本我认为比较好的书籍，点击可以直接购买。

* [第一行代码](http://redirect.simba.taobao.com/rd?w=unionnojs&f=http%3A%2F%2Fai.taobao.com%2Fauction%2Fedetail.htm%3Fe%3Df8oGURBCqIi6k0Or%252B%252BH4tGcqVOHLHTPypvhC2iAi0c2LltG5xFicOdXrTUTgh9sMDPIwxrc30rgx5xFFx04TdUkC8scULPWFEdRP1L4O1tAHbU39aISQG1Rmtaud%252B0v%252BvoIRmNqqTFnQQxOy9T69zQ%253D%253D%26ptype%3D100010%26from%3Dbasic&k=5ccfdb950740ca16&c=un&b=alimm_0&p=mm_105752214_8212618_27816125)

郭神的最新力作，郭神的博客很棒，书我也买了看了一部分，非常棒，适合新手，而且是针对Android 4.0进行讲解的。

* [疯狂Android讲义第二版](http://redirect.simba.taobao.com/rd?w=unionnojs&f=http%3A%2F%2Fai.taobao.com%2Fauction%2Fedetail.htm%3Fe%3DgrXsbPZNK1DghojqVNxKsUpLFKJHzWl4gp1Jf7hv%252FcmLltG5xFicOdXrTUTgh9sMDPIwxrc30rgx5xFFx04TdUkC8scULPWFEdRP1L4O1tAHbU39aISQG1Rmtaud%252B0v%252Bji5PXRRaYfGFnCv8qWGxHA%253D%253D%26ptype%3D100010%26from%3Dbasic&k=5ccfdb950740ca16&c=un&b=alimm_0&p=mm_105752214_8212618_27816125)

当年我学习的时候就看的这本书，现在出了第二版了，这本书的优点是讲的很细，代码较多，你可以跟着代码一步步敲，缺点就是篇幅太多，导致书太厚了，携带不方便，书中最后的几个实例教程不是那么好，不知道第二版更改没。

* [Thinking In Java中文版](http://redirect.simba.taobao.com/rd?w=unionnojs&f=http%3A%2F%2Fai.taobao.com%2Fauction%2Fedetail.htm%3Fe%3DzBqhej1TSvC6k0Or%252B%252BH4tFzbR25iLs%252BQ8nBOXRi6ylDlL1tPWpvWRP7gvmtLyoa3Dlg3nJM8sR9roPAB877mV0X91EzKR9ZCbXyZbUPW4kmGIpXDPBJEB23abJM7sDg28ZPfsQmmNK1siZ7sxXrr%252BQ%253D%253D%26ptype%3D100010%26from%3Dbasic&k=5ccfdb950740ca16&c=un&b=alimm_0&p=mm_105752214_8212618_27816125)

Thinking In Java是Java的经典书籍，这是一本值得反复看的书籍，针对有一定Java基础的人，可以说是学习Java语言必备的书籍。

* [Effective Java中文第二版](http://redirect.simba.taobao.com/rd?w=unionnojs&f=http%3A%2F%2Fai.taobao.com%2Fauction%2Fedetail.htm%3Fe%3DJT0ci%252BHeZfDghojqVNxKsTGWoJvkBKvwAdcPAzm7QvSLltG5xFicOdXrTUTgh9sMDPIwxrc30rgx5xFFx04TdUkC8scULPWFEdRP1L4O1tAHbU39aISQG1Rmtaud%252B0v%252BvoIRmNqqTFmAtSSB6kybGQ%253D%253D%26ptype%3D100010%26from%3Dbasic&k=5ccfdb950740ca16&c=un&b=alimm_0&p=mm_105752214_8212618_27816125)

Effective Java是Java进阶必备书籍，看后绝对会让你对Java有了更深的认识。

补充：鉴于很多小伙伴让推荐Java学习的初级资料，Thinking In Java确实是本好书，但好书一般都不是针对初学者的，所以如果你没有任何编程经验，那么我来给你推荐几本Java基础书籍，就不提供购买链接了，大家自行搜索去购买。

* 《疯狂Java讲义》(李刚)，《JAVA面向对象编程》(孙卫琴),《Java开发实战经典》(李兴华)，《Core Java》

这几本书都是针对初学者的，我都没有看过，但是我自己稍微做了了解，最后，这些书买一本就够了，然后配合视频学习，小白入门不是梦。

## 开发环境

* [Android Studio](http://developer.android.com/sdk/installing/studio.html)

目前强烈推荐Android开发者使用，抛弃Eclipse拥抱未来吧！这是Google最新推出的Android开发工具，基于IDEA，编译依赖[Gradle](http://www.gradle.org/)，目前已经推出1.0正式版，这是Android开发工具的未来，所以身为Android开发者有必要花点时间去学习使用它，亲身经历，自从使用它之后再也不想去碰Eclipse。

为此我也推出了Android Studio的一些列学习教程，堪称史上最详细：

[Android Studio系列教程一 ---- 下载与安装](http://stormzhang.com/devtools/2014/11/25/android-studio-tutorial1)

[Android Studio系列教程二 ---- 基本设置与运行](http://stormzhang.com/devtools/2014/11/28/android-studio-tutorial2)

[Android Studio系列教程三 ---- 快捷键](http://stormzhang.com/devtools/2014/12/09/android-studio-tutorial3)

[Android Studio系列教程四 ---- Gradle基础](http://stormzhang.com/devtools/2014/12/18/android-studio-tutorial4)

[Android Studio系列教程五--Gradle命令详解与导入第三方包](http://stormzhang.com/devtools/2015/01/05/android-studio-tutorial5)

[Android Studio系列教程六--Gradle多渠道打包](http://stormzhang.com/devtools/2015/01/15/android-studio-tutorial6)

## 翻墙

俗话说，不会翻墙的程序员不是好程序员，尤其最近Google各项服务被屏蔽，以上IDE的下载也就都需要翻墙，这里推荐一个靠谱的VPN吧，支持多设备MAC, Windows, Android, iPhone等， 如果和小伙伴们一起合买的话每月只要几块钱，圈内的朋友们都在用，如果你通过下面链接购买的话，你和我的账户都会增加10元钱。

[云梯VPN](http://refyt.com/?r=a9b90a505050781a)

如果无论如何你都不想翻墙的话，这里github上可以直接下载以上Android开发工具

[AndroidDevTools](http://www.androiddevtools.cn/)

## Google Android官方教程

[Android Training Course in Chinese](http://hukai.me/android-training-course-in-chinese/index.html)

## 视频推荐

在这里我必须强烈推荐新手们结合视频学习，身为过来人我的很清楚一开始入门很难，只是看书或者资料难以理解，而这时候结合视频讲解，加上自己的书籍与实战，会起到事半功倍的效果。所以不要小看了视频的作用，当然现阶段的我完全不需要去看视频，因为视频讲解的有些慢，但是对于新手们的作用非常巨大。视频学习有很多，但大都差不多，我也没法推荐最好的给你，只是以我自己的角度觉得质量还不错，推荐如下Android视频学习。

[Android视频学习推荐](http://www.jikexueyuan.com/event/android.html?hmsr=stormzhang_index_word_03.20)

## Android基础

上面可能是一个比较全面系统的培训教程，对于新手们可能对某些需要着重掌握的东西比较迷茫，于是整理下个人认为新手们必须要掌握的知识点，顺便也会附带相应觉得不错的讲解博客地址。

* [两分钟彻底让你明白Android Activity生命周期(图文)!](http://blog.csdn.net/android_tutor/article/details/5772285)

Activity实际开发中使用频率最高，这个必须要理解

* [Android四大基本组件介绍与生命周期](http://www.cnblogs.com/bravestarrhu/archive/2012/05/02/2479461.html)

Android中的四大组件必须得知道，也是面试常问到的

* [ListView的基本使用与优化](http://www.cnblogs.com/noTice520/archive/2011/12/05/2276379.html)

ListView是所有控件中最常使用且对新手来说比较复杂的用法，各种Adapter的使用以及ListView的优化都是必须掌握的

* [Android系统用于Activity的标准Intent](http://blog.csdn.net/zhangjg_blog/article/details/10901293)

Intent解决了Android中四大组件的通讯，非常有用，这篇博客收集整理了系统的标准Intent

* [Android 屏幕适配](http://stormzhang.com/android/2014/05/16/android-screen-adaptation)

介绍一些Android屏幕适配的基础

* [Android中SQLite应用详解](http://blog.csdn.net/liuhe688/article/details/6715983)

Android中的SQLite需要掌握，这篇博客很适合新手

* [Android Fragment完全解析](http://blog.csdn.net/guolin_blog/article/details/8881711)

3.0之后新加的Fragment，必须要掌握，目前使用的场景也是越来越普遍了

## Android中级

* [Android应用程序的生命周期](http://blog.csdn.net/android_tutor/article/details/4952960)

Android的应用程序的生命周期需要理解，面试也是经常会被问的

* [带你一步步深入了解View](http://blog.csdn.net/guolin_blog/article/details/12921889)

View做为UI开发中最常用到的，必须要深入理解

* [Android Service完全解析](http://blog.csdn.net/guolin_blog/article/details/11952435)

Service作为Android四大组件之一，在每一个应用程序中都扮演着非常重要的角色

* [Android Gson](http://stormzhang.com/android/2014/05/22/android-gson)

目前比较常用比较流行的数据格式就是json了，这篇博客教你如何使用Google Gson库来进行json解析

* [Android 布局优化](http://stormzhang.com/android/2014/04/10/android-optimize-layout)

Android开发中经常会用到xml布局，那么布局优化方面的知识更是需要掌握的了

* [Android中Intent传递对象的两种方法(Serializable,Parcelable)](http://blog.csdn.net/android_tutor/article/details/5740845)

详细讲解了Android中Intent中如何传递对象

* [Android异步消息处理机制完全解析](http://blog.csdn.net/guolin_blog/article/details/9991569)

Android开发中异步操作是经常使用的，必须理解掌握

* [Android AsyncTask完全解析](http://blog.csdn.net/guolin_blog/article/details/11711405)

Android异步操作的另一种方法

* [Android Custom Loading](http://stormzhang.com/openandroid/2013/11/15/android-custom-loading)

很早的一个小demo，教你如何做一个App的Loading动画

## Android进阶

* [Android Gradle](http://stormzhang.com/android/2014/02/28/android-gradle)

Google官方Android新的构建系统，可以很方便的管理依赖、编译打包等

* [Android 性能优化](http://www.trinea.cn/android/android-performance-demo/)

一系列的性能调优教程，让你的代码以及App更畅通！

* [一个完整的开源项目--9GAG](https://github.com/stormzhang/9GAG)

一个开源客户端，教你使用Studio、Gradle以及一些流行的开源库快速开发一个不错的Android客户端

* [整理的Android开发资源](http://stormzhang.com/android/2014/06/05/android-awesome-resources)

自己整理的一些Android开发资源，包括开发、工具、设计等，相信会对你有用的

## Android设计

在开发一款Android App之前，你需要了解下Android平台的设计规范，这里有Google最新推出的Material Design中文翻译版

* [Material Design](http://design.1sters.com/)

## Android兼容库

在了解了设计规范准备着手开发你的App时，你还需要考虑你的App支持的版本，如果是全新的App，从目前的市场份额来看，建议直接支持4.0+，虽然2.3的份额仍然有一部分，但是这部分真正用来使用App的人又能有多少呢。当然如果你的公司必须要求支持2.x的版本，那么也不用担心，下面整理了几个满足你适配的一些兼容库:

* [ActionBarSherlock](https://github.com/JakeWharton/ActionBarSherlock)

大神JakeWharton的一个ActionBar的兼容库，支持在2.x版本使用ActionBar

* [ActionBar Compact](http://stormzhang.com/android/2013/12/13/android-actionbar-compact)

在这之前使用ActionBar基本都会使用上述JakeWharton的兼容库，但是目前Google有了自己的一套ActionBar兼容库，推荐使用ActionBar Compact，具体介绍及使用方法详见我的这篇博客

* [NineOldAndroids](http://nineoldandroids.com/)

Android 3.0之前开放的一些新的动画api--Property Animation，大神JakeWharton的又一大作，可以让你在2.x版本的sdk可以使用属性动画.

* [Android Support V4](http://developer.android.com/reference/android/support/v4/app/package-summary.html)

如果需要兼容2.x的版本，在使用如下类的时候你需要使用v4包下的，如Fragment, FragmentManager, FragmentActivity, FragmentPagerAdapter, CursorLoader, LoaderManager, AsyncTaskLoader

当然v4包下面除了以上还有一些新的控件你必须知道

[Navigation Drawer(导航抽屉)](http://blog.chengyunfeng.com/?p=493)

在这之前在Android上实现一个抽屉导航你可能会用到[SlidingMenu](https://github.com/jfeinstein10/SlidingMenu)开源库，如今你可以使用官方的DrawerLayout控件很容易实现

[SlidingPaneLayout](http://my.oschina.net/summerpxy/blog/211835)

SlidingPaneLayout是V4包中新添加的组件，可以实现两列面板的切换, 具体使用与效果见博客链接

[SwipeRefreshLayout](https://github.com/stormzhang/SwipeRefreshLayoutDemo)

SwipeRefreshLayout是Google在support v4 19.1版本的library更新的一个下拉刷新组件,使用起来很方便,可以很方便的实现Google Now的效果

## Android开发必知的一些开源库

说到开源库就不得不提[GitHub](https://github.com/)，只能说是目前最活跃的开源社区，不知道的赶紧去注册个账号使用起来，绝对是你快速提升技术的利器。

#### [Volley](https://android.googlesource.com/platform/frameworks/volley)

App开发中免不了要和服务端进行交互，而volley是Google官方推出的一个开源的网络通信库，它能使网络通信更简单，更快速。


* [Volley完全解析](http://blog.csdn.net/guolin_blog/article/details/17482095)

* [Android volley sample](https://github.com/stormzhang/AndroidVolley)

#### [ActiveAndroid](http://github.com/pardom/ActiveAndroid)

ActiveAndroid算是一个轻量级的ORM(对象关系映射(Object Relation Mapping))框架，简单地通过如save()和delete()等方法来做到增删改查等操作。

* [ActiveAndroid--Android轻量级ORM框架](http://stormzhang.com/openandroid/android/sqlite/2013/12/20/android-orm-tools-activeandroid)

#### [Retrofit](http://square.github.io/retrofit/)

Retrofit和Java领域的ORM概念类似， ORM把结构化数据转换为Java对象，而Retrofit 把REST API返回的数据转化为Java对象方便操作。同时还封装了网络代码的调用。

* [Retrofit – Java(Android) 的REST 接口封装类库](http://blog.chengyunfeng.com/?p=491)

#### [Android-Universal-Image-Loader](https://github.com/nostra13/Android-Universal-Image-Loader)

Android-Universal-Image-Loader是一个强大的开源图片异步加载库，该项目的目的是提供一个可重复使用的仪器为异步图像加载，缓存和显示。

* [Android-Universal-Image-Loader](http://stormzhang.com/android/openandroid/2013/12/01/android-universal-image-loader)

#### [Android开源项目分类汇总](https://github.com/Trinea/android-open-project)

非常全面的GitHub开源项目汇总，不需要重复发明轮子，尽情遨游在开源世界里吧

## 关于我

非科班转投编程，Android开发者，Google脑残粉，热爱开源，分享Android方面的知识、技术、见闻

* GitHub: [stormzhang](https://github.com/stormzhang)

* Weibo: [googdev](http://weibo.com/zhangqi8)

* 知乎: [stormzhang](http://www.zhihu.com/people/stormzhang)

* 更多我的消息: [关于我](http://stormzhang.com/about.html)

## Android微信公众账号

推荐大家关注我的微信公众账号googdev, 专注Android技术分享，保证绝对干货！

<img src="/image/weixinpublic.jpg" />


