---
layout: post
keywords: blog
description: blog
title: "Android Studio系列教程二--基本设置与运行"
categories: [DevTools]
tags: [AndroidStudio]
---
{% include codepiano/setup %}

>> 本文为个人原创，欢迎转载，但请务必在明显位置注明出处！

上面一篇博客，介绍了Studio的优点与1.0 RC的安装与上手体验，没想到google的更新速度这么快，已经出了RC 2版本，主要是修复一些bug。那么今天就带大家预览下Stduio的界面与基本功能。

## 项目结构

当我们新建一个项目的目录结构默认是这样的

<img src="/image/summary1.png" />

可以看到和Eclipse的目录结构有很大区别，Studio一个窗口只能有一个项目，而Eclipse则可以同时存在很多项目，如果你看着不习惯可以点击左上角进行切换

<img src="/image/summary2.png" />

切换到“project”模式下的目录结构是这样的，我个人也更习惯这种格式

<img src="/image/summary3.png" />

和Eclipse的区别有如下：

* 1、Studio中有Project和Module的概念，前面说到Studio中一个窗口只能有一个项目，即Project，代表一个workspace，但是一个Project可以包含多个Module，比如你项目引用的Android Library, Java Library等，这些都可以看做是一个Module;

* 2、上述目录中将java代码和资源文件（图片、布局文件等）全部归结为src，在src目录下有一个main的分组，同时划分出java和res两个文件夹，java文件夹则相当于Eclipse下的src文件夹，res目录结构则一样.

## 偏好设置

进入后你也许发现字体大小或者样式不符合你的习惯，比如我是觉得代码太小看起来伤眼，Darcular主题默认的字体是12，我个人更习惯14的字体大小。没关系，到 **Preferences** (设置)页面搜索 **Font** 找到 **Colors&Fonts** 下的 **Font** 选项，我们可以看到默认字体大小是12，但是无法修改，需要先保存才可以修改，点击 **Save as** 输入一个名字，比如 **MyDarcular**，然后就可以修改字体大小和字体样式了.

<img src="/image/preference_font1.png" />

点击确定之后再回到页面发现字体是变大了，但是Studio默认的一些字体大小如侧边栏等确没有变化，看起来很不协调，如下图

<img src="/image/preference_font2.png" />

强迫症的你肯定无法忍受，没关系，这里也同样可以设置，到 **Preferences** -> **Appearance** 修改如图所示就ok，这里同样不仅可以更改字体大小，也可以选择不同的字体,点击OK，这次页面字体就完全对你胃口了。

<img src="/image/preference_font3.png" />

调整之后再看下效果

<img src="/image/preference_font4.png" />

## 运行

接下来运行程序，运行和 **Eclipse** 中比较像，点击菜单栏的绿色箭头直接运行

<img src="/image/menu1.png" />

**Studio** 默认安装会启动模拟器，如果想让安装到真机上可以配置一下。在下拉菜单中选择 **Edit Configurations** 选择提示或者是USB设备。

<img src="/image/menu2.png" />

<img src="/image/menu3.png" />

## 常用功能

在Studio菜单栏的右边有这样几个常用的功能，如图分别是 **Gradle同步**、**AVD Manager**、**SDK Manager**、**DDMS**

<img src="/image/menu4.png" />

**Gradle同步** 在你项目运行或者更改Gradle配置的时候都要点击下这个按钮，会下载相应的依赖

**AVD Manager** 模拟器管理

**SDK Manager** 就是管理你的SDK版本

**DDMS** 即 Dalvik Debug Monitor Service，Dalvik调试监控服务。

## 创建模拟器

建议在创建模拟器前把 **SDK Manager** 中的 **Tools**、**Extras** 都更新到最新。

点击 **AVD Manager** 按钮

<img src="/image/avd1.png" />

点击图中的创建按钮

<img src="/image/avd2.png" />

选择一个设备，这里我选择 Nexus 5，然后Next

<img src="/image/avd3.png" />

这里选择一个系统版本，这里以5.0为例，然后Next

<img src="/image/avd4.png" />

由于各位的屏幕尺寸不一样，建议这里Scale一栏选择Auto，然后点击Finish接着可以看到我们已经创建好一个5.0的模拟器了

<img src="/image/avd5.png" />

这次我们再运行，选择模拟器启动看下最终效果（模拟器的启动很慢，大家耐心等待）

<img src="/image/select_avd.png" />

<img src="/image/avd6.png" />
