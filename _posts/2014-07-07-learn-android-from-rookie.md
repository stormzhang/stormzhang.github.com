---
layout: post
keywords: blog
description: blog
title: "Android学习之路"
categories: [Android]
tags: [Android]
---
{% include codepiano/setup %}

    欢迎转载，但请务必在明确位置注明出处！http://stormzhang.github.io/android/2014/07/07/learn-android-from-rookie/

#### QQ交流群：383323653 (入群理由填写Android学习之路)

收到一些朋友的微博私信，说能不能给Android新手们一些指导，我只能说指导谈不上，毕竟我也很多东西正在学习中，与此同时一大学同学准备转行Android，可以说是从头开始，那么我就姑且以一个过来人的身份给一些建议吧，只希望在学习的过程中能够少走写弯路吧。

## 硬件

* 电脑--推荐Mac

首先声明我不是果粉，个人Windows，Linux，Mac OX系统均用过， 只能说Windows上面的开发工具简直难以恭维，尤其命令行超级难用，而Linux自己必须得花不少时间在折腾中，更是不适合新手了，Max OS是我认为迄今为止最好用的系统，没有之一， 所以如果你不差钱的话，强烈建议入手一台Mac，推荐Pro系列， 当然它的价格确实比较昂贵，如果暂时入手有困难，推荐以后手头宽裕的时候再入手吧，会带给你质的体验。(Google的工程师们都在用Mac，应该比较有说服力吧)

* 手机--推荐Nexus 5

做Android开发最难以忍受的就是那龟速的模拟器，强烈推荐入手我Google的Nexus系列，原生rom，性价比超高，有条件的推荐再入手一台小米或三星之类的，不是因为他们有多好用，而是因为目前市场上这两个品牌的手机份额最大，实际开发中可能需要进行适配与测试，总之你需要有台Android手机。你可能还需要知道魅族手机有个SmartBar的东东，虽然我认为确实很SB。最后你实在还是要用模拟器的话，那么姑且就给你推荐一款比较快速的模拟器吧----Genymotion, 具体的见我这篇博客[一个强大的Android模拟器Genymotion](http://stormzhang.github.io/android/2013/12/04/android-genymotion/)

## 开发环境

* [Eclipse ADT](http://developer.android.com/sdk/index.html)

Google帮你集成了一个完整的Android开发环境，包含一个定制的Eclipse + ADT plugin，以及最新的SDK及源码

* [IntelliJ IDEA](http://www.jetbrains.com/idea/)

相比与Eclipse更推荐使用IDEA，以后可以无缝过渡到Android Studio

* [Android Studio](http://developer.android.com/sdk/installing/studio.html)

首先说明这个不适合新手们使用，但是你必须知道这是Google最新推出的Android开发工具，基于IDEA，编译依赖[Gradle](http://www.gradle.org/)，目前还没有推出1.0的正式版，但是你依然可以业余项目熟悉了解下，因为这也许是Android开发工具的未来

## 翻墙

俗话说，不会翻墙的程序员不是好程序员，尤其最近Google各项服务被屏蔽，以上IDE的下载也就都需要翻墙，这里推荐一个靠谱的VPN吧，支持多设备MAC, Windows, Android, iPhone等， 如果和小伙伴们一起合买的话每月只要几块钱，圈内的朋友们都在用，如果你通过下面链接购买的话，你和我的账户都会增加10元钱。

[云梯VPN](http://refyt.com/?r=a9b90a505050781a)

如果无论如何你都不想翻墙的话，这里github上可以直接下载以上Android开发工具

[AndroidDevTools](https://github.com/inferjay/AndroidDevTools/)

## Google Android官方教程

[Android Training Course in Chinese](http://hukai.me/android-training-course-in-chinese/index.html)

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

* [Android 屏幕适配](http://stormzhang.github.io/android/2014/05/16/android-screen-adaptation/)

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

* [Android Gson](http://stormzhang.github.io/android/2014/05/22/android-gson/)

目前比较常用比较流行的数据格式就是json了，这篇博客教你如何使用Google Gson库来进行json解析

* [Android 布局优化](http://stormzhang.github.io/android/2014/04/10/android-optimize-layout/)

Android开发中经常会用到xml布局，那么布局优化方面的知识更是需要掌握的了

* [Android中Intent传递对象的两种方法(Serializable,Parcelable)](http://blog.csdn.net/android_tutor/article/details/5740845)

详细讲解了Android中Intent中如何传递对象

* [Android异步消息处理机制完全解析](http://blog.csdn.net/guolin_blog/article/details/9991569)

Android开发中异步操作是经常使用的，必须理解掌握

* [Android AsyncTask完全解析](http://blog.csdn.net/guolin_blog/article/details/11711405)

Android异步操作的另一种方法

* [Android Custom Loading](http://stormzhang.github.io/openandroid/2013/11/15/android-custom-loading/)

很早的一个小demo，教你如果做一个App的Loading动画

## Android进阶

* [Android Gradle](http://stormzhang.github.io/android/2014/02/28/android-gradle/)

Google官方Android新的构建系统，可以很方便的管理依赖、编译打包等

* [Android 性能优化](http://www.trinea.cn/android/android-performance-demo/)

一系列的性能调优教程，让你的代码以及App更畅通！

* [一个完整的开源项目--9GAG](https://github.com/stormzhang/9GAG)

一个开源客户端，教你使用Studio、Gradle以及一些流行的开源库快速开发一个不错的Android客户端

* [整理的Android开发资源](http://stormzhang.github.io/android/2014/06/05/android-awesome-resources/)

自己整理的一些Android开发资源，包括开发、工具、设计等，相信会对你有用的

## Android设计

在开发一款Android App之前，你需要了解下Android平台的设计规范，这里有一系列关于Android Design的讲解以及Google最新推出的Material Design中文翻译版

* [Android Design](http://www.geekpark.net/tag/Android%20Design)

* [Material Design](http://design.1sters.com/)

## Android兼容库

在了解了设计规范准备着手开发你的App时，你还需要考虑你的App支持的版本，如果是全新的App，从目前的市场份额来看，建议直接支持4.0+，虽然2.3的份额仍然有一部分，但是这部分真正用来使用App的人又能有多少呢。当然如果你的公司必须要求支持2.x的版本，那么也不用担心，下面整理了几个满足你适配的一些兼容库:

* [ActionBarSherlock](https://github.com/JakeWharton/ActionBarSherlock)

大神JakeWharton的一个ActionBar的兼容库，支持在2.x版本使用ActionBar

* [ActionBar Compact](http://stormzhang.github.io/android/2013/12/13/android-actionbar-compact/)

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

* [ActiveAndroid--Android轻量级ORM框架](http://stormzhang.github.io/openandroid/android/sqlite/2013/12/20/android-orm-tools-activeandroid/)

#### [Retrofit](http://square.github.io/retrofit/)

Retrofit和Java领域的ORM概念类似， ORM把结构化数据转换为Java对象，而Retrofit 把REST API返回的数据转化为Java对象方便操作。同时还封装了网络代码的调用。

* [Retrofit – Java(Android) 的REST 接口封装类库](http://blog.chengyunfeng.com/?p=491)

#### [Android-Universal-Image-Loader](https://github.com/nostra13/Android-Universal-Image-Loader)

Android-Universal-Image-Loader是一个强大的开源图片异步加载库，该项目的目的是提供一个可重复使用的仪器为异步图像加载，缓存和显示。

* [Android-Universal-Image-Loader](http://stormzhang.github.io/android/openandroid/2013/12/01/android-universal-image-loader/)

#### [Android开源项目分类汇总](https://github.com/Trinea/android-open-project)

非常全面的GitHub开源项目汇总，不需要重复发明轮子，尽情遨游在开源世界里吧

## 关于我

非科班转投编程，Android开发者，Google脑残粉，热爱开源，分享Android方面的知识、技术、见闻

* Weibo: [googdev](http://weibo.com/zhangqi8)

* GitHub: [stormzhang](https://github.com/stormzhang)

* Company & App: [薄荷](http://www.boohee.com/app/)

## Donate

如果觉得这篇博客对您有很大帮助，拿起您的手机，打开支付宝扫描如下二维码，buy me a coffee! 感谢您的慷慨捐赠，这将是我持续更新并维护本博客的动力。

<img src="/image/zhifubao.jpg" />
