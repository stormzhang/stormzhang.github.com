---
layout: post
keywords: blog
description: blog
title: "Android Studio 2.0来啦"
categories: [Android]
tags: [AndroidStudio]
---
{% include codepiano/setup %}

就在昨天Google官方发布了Android Studio 2.0稳定版，来来来，一起来围观这次到底有哪些更新。

- Instant Run - For every developer who loves faster build speeds. Make changes and see them appear live in your running app. With many build/run accelerations ranging from VM hot swapping to warm swapping app resources, Instant Run will save you time every day.

- Android Emulator - The new emulator runs ~3x faster than Android’s previous emulator, and with ADB enhancements you can now push apps and data 10x faster to the emulator than to a physical device. Like a physical device, the official Android emulator also includes Google Play Services built-in, so you can test out more API functionality. Finally, the new emulator has RICH new features to manage calls, battery, network, GPS, and more.

- Cloud Test Lab Integration - Write once, run anywhere. Improve the quality of your apps by quickly and easily testing on a wide range of physical Android devices in the Cloud Test Lab right from within Android Studio.
App Indexing Code Generation & Test - Help promote the visibility your app in Google Search for your users by adding auto-generated URLS with the App Indexing feature in Android Studio. With a few click you can add indexable URL links that you can test all within the IDE.

- GPU Debugger Preview - For those of you developing OpenGL ES based games or apps, you can now see each frame and the GL state with the new GPU debugger. Uncover and diagnosis GL rendering issues by capturing and analyzing the GPU stream from your Android device.

- IntelliJ 15 Update - Android Studio is built on the world class Intellij coding platform. Check out the latest Intellij features here.

以上是官方的一些说法，英语好的不妨看原版，英语不好的别着急，让我这个英语渣试着给大家稍微翻译下，翻译的不好估计你们也看不出来，反正你们英语也不好。

## Instant Run

快速启动，这里做了大幅优化，之前我们代码做了改动，重新编译运行，然后安装，整个过程很慢的，现在如果你的代码做了改动，会自动的分析，避免重复发布、安装的过程，总之就是让你的启动速度更快了。不过需要你的API环境在14以上。评：很有用。

<img src="http://mmbiz.qpic.cn/mmbiz/159icnNTXChMDgqEgwTkgvHzqCq7Ac4G4RGOqE3lsWxGRqgpzc2xxSg3D7DXrq4AfQrL4TTUTib2ZBTedr3ugoyQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1" />

## Android Emulator
模拟器，一句话，官方的说法是大幅优化性能，启动、运行模拟器更快了。评：然而模拟器的速度还是很慢，我还是选择继续用真机调试。

<img src="http://mmbiz.qpic.cn/mmbiz/159icnNTXChMDgqEgwTkgvHzqCq7Ac4G48ejJZhGplIWbfDt9fVxW37iaVxbgJQ8zQEZljnRcFJqDaEREhleCz4A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1" />

## Cloud Test Lab

云测试实验室，说白了就是上传你的app，在云端帮你测试兼容性、崩溃之类的，感兴趣的可以试一下。评：再好用的Google服务在国内都有替代品，比如国内Testin云测试做的很早了。

<img src="http://mmbiz.qpic.cn/mmbiz/159icnNTXChMDgqEgwTkgvHzqCq7Ac4G4S59sTyWHKrmdYynb9DWlicM8ic3Y95QL49icAjMpurQjzq1oX6AeHlKUw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1" />

## App Indexing

如果你用了Google的App Indexing API，那么用户在使用Google搜索的时候很容易搜到你的App，而AS 2.0集成了Google App Indexing Test的功能，方便你测试并预览相关效果。评：这功能在天朝没卵用！

<img src="http://mmbiz.qpic.cn/mmbiz/159icnNTXChMDgqEgwTkgvHzqCq7Ac4G4xCKUadrTHk4TvgX6wMf2x6PAJHIPon4jicV2XWkTNObLx5Jy97lkb3A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1" />

## GPU Debugger Preview

Google这次发布了一个调试GPU的工具，只需要简单的下载并集成进来就可以方便查看GPU的各种信息，很有用。评：这功能针对OpenGL ES的游戏开发或者强图形渲染的App有用，普通的App开发基本用不到。

<img src="http://mmbiz.qpic.cn/mmbiz/159icnNTXChMDgqEgwTkgvHzqCq7Ac4G42q83Nt2tKxqCuZh5KMlkfV8EjGJ9CbEMvTF3jU5CcN5q4KTlEO2BRA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1" />

以上就是本次Android Studio 2.0版本的主要更新内容，如果翻译不对或者有不同一间还请大家留言指正。

最后英语好的直接看视频：

<embed src="http://v.qq.com/iframe/player.html?vid=n0192ttzkzc&amp;width=670&amp;height=502.5&amp;auto=0" allowFullScreen="true" quality="high" width="580" height="480" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"/>

另外需要说明的是Android Studio 2.0需要你的Gradle的版本升级到2.10，总体体验下来速度确实比之前快了不少。

我博客很早之前有一个AS系列的教程，堪称国内最早的一批入门AS教程了，具体可以 [到这里](http://stormzhang.com/devtools/2015/06/17/android-studio-all/) 查看，只不过很早没更新了，你们如果需要的话抽个时间更新下该系列的文章。

最最后，我知道不少人翻墙有困难，我这种注重用户体验的人早就为你们考虑好了，AS 2.0的Windows、Mac版本都已经给你们下载好了，到我的公众号 AndroidDeveloper 回复「1024」免费获取福利！


