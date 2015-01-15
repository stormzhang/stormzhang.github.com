---
layout: post
keywords: blog
description: blog
title: "Android Studio系列教程一--下载与安装"
categories: [DevTools]
tags: [AndroidStudio]
---
{% include codepiano/setup %}

>> 本文为个人原创，欢迎转载，但请务必在明显位置注明出处！

## 背景

相信大家对Android Studio已经不陌生了，Android Studio是Google于2013 I/O大会针对Android开发推出的新的开发工具，目前很多开源项目都已经在采用，Google的更新速度也很快，明显能感觉到这是Android开发的未来，那么我们还有什么理由不去拥抱未来呢？

虽然推出了很久，但是国内貌似普及的程度并不高，鉴于很多朋友求studio的详细教程，那么今天我就手把手教大家下载、安装、使用，Studio之路从这里开始。

## Android Studio VS Eclipse

相信目前国内用Eclipse的还是大多数，那么首先就来说一下Studio的一些优点，比较才能更有说服力，才能说明为什么我们要从Eclipse迁移到Studio。

* 1、Google推出的

毫无疑问，这个是它的最大优势，Android Stuido是Google推出，专门为Android“量身订做”的，是Google大力支持的一款基于IntelliJ IDEA改造的IDE，这个应该能说明为什么它是Android的未来

* 2、速度更快

Eclipse的启动速度、响应速度、内存占用一直被诟病，相信大家这点应该深有体会，而且经常遇到卡死状态。Studio不管哪一个方面都全面领先Eclipse

* 3、UI更漂亮

I/O上演示的那款黑色主题真是太棒了，极客范，Stuido自带的Darcula主题的炫酷黑界面实在是高大上，相比而言Eclipse下的黑色主题太low了

* 4、更加智能

提示补全对于开发来说意义重大， Studio则更加智能，智能保存，从此再也不用每次都 Ctrl + S了。熟悉Studio以后效率会大大提升。

* 5、整合了Gradle构建工具

Gradle是一个新的构建工具，自Studio亮相之处就支持Gradle，可以说Gradle集合了Ant和Maven的优点，不管是配置、编译、打包都非常棒。

* 6、强大的UI编辑器

Android Studio的编辑器非常的智能，除了吸收Eclipse+ADT的优点之外，还自带了多设备的实时预览，相对这对Android开发者来说简直是神器啊。

* 7、内置终端

Studio内置终端，这对于习惯命令行操作的人来说简直是福音啊，再也不用来回切换了，一个Studio全部搞定。

* 8、更完善的插件系统

Studio下支持各种插件，如Git、Markdown、Gradle等等，你想要什么插件，直接搜索下载。

* 9、完美整合版本控制系统

安装的时候就自带了如GitHub, Git, SVN等流行的版本控制系统，可以直接check out你的项目。

大家看完以上是不是很动心呢，优点是很多，但是大家学习的时候会遇到很多问题，如Studio和Eclipse的目录结构、快捷键等等完全不一样，需要适应一段时间，Gradle同样增加了学习成本，虽然Google的更新速度已经相当快了，但是目前最新的是1.0RC版本，仍未推出正式版，说明可能会有一些小问题等，Studio官方解释暂未支持NDK，所以如果你的项目用到了NDK最好也不要使用Studio。

但是相信Google会越来越完善的，学习成本与适应阶段是我们做技术一直要保持的心态，一旦上手相信你要离不开它了。

最后这里先上一张我本地Studio的截图：

<img src="/image/studio_preview.png" />

## 准备

因为Google Android的一些官方网站在国内访问有限制，原因你懂得。所以在开始下载安装Studio之前，你需要自备梯子，关于如何翻墙有很多种方法，这里就不做过多介绍，私以为作为一个Android开发者，不懂翻墙基本没法做下去。所以这点投入是值得的，这里推荐大家直接购买VPN吧，因为我曾经折腾了很多翻墙的玩意，要么不稳定，要么速度慢，后来想通了，凡是花点钱能解决的问题都不是问题，这里推荐[云梯VPN](https://www.ytvpn.com/?r=a9b90a505050781a)，价格算是很便宜的了，别再问我速度、稳定性如何，我已经使用并续费快两年了。（通过这个链接购买的，你的账户可以优惠10元）

## 下载

官方下载有两个地方，均需要翻墙。

* [Android Developer官网](http://developer.android.com/sdk/installing/studio.html)

Android开发者官网的网站，可直接下载，但是这个网站貌似只更新Beta和正式版，目前只更新到Beta 0.8.14版本。

* [Android Tools Project Site](http://tools.android.com/download/studio/canary)

Android开发工具的网站，上面链接是Studio的canary渠道，列出了Studio各种实时预览版等，目前最新的是1.0RC版本。

## 创建HelloWorld项目

至于安装就没什么可说的了，点击直接运行了。这里我以Mac系统的1.0RC版本为例，来创建第一个HelloWorld项目。其他平台基本上差不多，在这之前假设你已经配置好了JDK和Android SDK环境，并且你是第一次安装Studio。

* 1、首先运行时的欢迎画面

<img src="/image/studio_splash.png" />


* 2、之后第一次的话会进入到设置向导页


<img src="/image/studio_wizard1.png" />


点击Next进入选择设置类型向导页


<img src="/image/studio_wizard2.png" />


这里有两个选项“Standard”和“Custom”，即标准和自定义，如果你本机的Android SDK没有配置过，那么建议直接选择“Standard”, 点击“Finish”按钮

因为我本地已经下载SDK并配置好了环境变量，所以我选择"Custom"，然后到下一步：


<img src="/image/studio_wizard3.png" />


这一步选择你本地SDK的位置，可以看到有个2.25GB的SDK要下载，那是因为Studio 1.0默认要下载5.0的SDK以及一些Tools之类的，然后点击"Finish"按钮

（PS: 这个选择并下载2.25G的组件是studio的一个bug，评论里有人提醒，感谢这位同学。如果网速不行想跳过这步的可以在bin目录的idea.properties增加一行：disable.android.first.run=true就行了，mac平台的右键安装包->Show Package Contents 就找到bin目录了。）

* 3、下载依赖组件

<img src="/image/studio_wizard4.png" />

之后便到下载组件页面，这个过程需要翻墙，而且依赖你的网速，时间有点久，大家耐心等待...

<img src="/image/studio_wizard5.png" />

下载完成后点击"Finish"按钮

* 4、新建项目

<img src="/image/studio_wizard6.png" />

在这个页面我们可以新建项目，也可以导入项目本地或者GitHub上的项目等，左边可以查看最近打开的项目等，这里我直接新建项目

然后到如下界面

<img src="/image/studio_wizard7.png" />

我们填上项目名称和报名以及项目路径等然后"Next"

<img src="/image/studio_wizard8.png" />

这个页面支持你适配TV、Wear、Glass等，我们只选择第一项就ok，选好最小SDK然后"Next"

<img src="/image/studio_wizard9.png" />

这个页面选择一个Activity模板，和Eclipse很像，我们直接选择一个Blank Activity好了

<img src="/image/studio_wizard10.png" />

点击"Finish"后等一会出来如下一个进度条，很多人容易卡在这里，这里需要下载Gradle，只第一次会下载，有点慢，需要翻墙，大家也耐心等待下

<img src="/image/studio_wizard11.png" />

下载成功后变看到如下完整的项目界面

<img src="/image/setup.png" />

至此一个简单的Studio项目就完成了，图片中也可以看到默认是一个白色主题，不够酷炫？Studio默认自带一款高大上的黑色主题，只需要简单修改下就OK。

到Preference -> Appearance下更改主题到Darcula

<img src="/image/studio_theme.png" />

之后我们再来看一下更改后的主题

<img src="/image/setup2.png" />

很酷炫有木有？至此第一期的Studio简单介绍就到这里，后面会介绍目录结构、快捷键、导入项目、集成GitHub、Gradle等等，敬请期待。
