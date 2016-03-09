---
layout: post
keywords: blog
description: blog
title: "Android Studio系列教程三--快捷键"
categories: [DevTools]
tags: [AndroidStudio]
---
{% include codepiano/setup %}

>> 本文为个人原创，欢迎转载，但请务必在明显位置注明出处！

## Android Studio 1.0正式版发布啦

今天是个大日子，Android Studio 1.0 终于发布了正式版， 这对于Android开发者来说简直是喜大普奔的大消息啊，那么就果断来下载使用。

<img src="/image/studio1.0.png" />

官方下载地址： [http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html)

如果你之前已经使用其他版本的Studio，那么直接覆盖就好了，如果是第一次使用，那么参照[Android Studio系列教程一](http://stormzhang.com/devtools/2014/11/25/android-studio-tutorial1)进行安装配置。

于此同时一起更新的还有SDK Tools等，打开SDK Manager进行更新就OK。如果之前有在使用RC版本的Studio，更新覆盖之后应该会出错，那是因为Stuido 1.0默认使用1.0的Gradle插件，所以只需到项目根目录的 **build.gradle** 更新成如下代码然后同步下就OK了

<img src="/image/update_gradle.png" />

## 快捷键

对于很多Eclipse转过来的同学，不适应的最主要就是快捷键部分了，Studio默认的快捷键和Eclipse差别很大，但是Studio强大的地方在于通过设置你可以一直沿用Eclipse风格的快捷键，这样对于那些Eclipse过渡来的同学省了很多学习成本。

**Preferences** -> **Keymap** 然后就可以选择你想要的快捷键，这里不止可以选择Eclipse，还可以选择 **Emacs**、**Net Beans** 等编辑器的快捷键

<img src="/image/keymap.png" />

对于新手们或者对Eclipse没有好感的同学们，肯定想学习默认的Studio快捷键，下面整理了下常用的一些快捷键，更多的快捷键还需要大家自己去习惯适应。（我自己选择的是Mac OS X 10.5+）

Action             |     Mac OSX     |     Win/Linux
-------------------|-----------------|--------------
注释代码(//)        | Cmd + /         | Ctrl + /
注释代码(/**/)      | Cmd + Option + /   | Ctrl + Shift + /
格式化代码          | Cmd + Option + L   | Ctrl + Alt + L
清除无效包引用      | Option + Control + O | Alt + Ctrl + O
查找               | Cmd + F          | Ctrl + F
查找+替换           | Cmd + R         | Ctrl + R
上下移动代码        | Option + Shift + Up/Down  | Alt + Shift + Up/Down
删除行              | Cmd + Delete    | Ctrl + Y
扩大缩小选中范围     | Option + Up/Down    | Ctrl + W/Ctrl + Shift + W
快捷生成结构体      | Cmd + Option + T      | Ctrl + Alt + T
快捷覆写方法        | Cmd + O        | Ctrl + O
快捷定位到行首/尾   | Cmd + Left/Right | Ctrl + Left/Right
折叠展开代码块      |   Cmd + Plus,Minus | Ctrl + Plus/Minus
折叠展开全部代码块 | Cmd + Shift + Plus,Minus  | Ctrl + Shift + Plus,Minus
文件方法结构 | Cmd + F12 | Ctrl + F12
查找调用的位置 | Ctrl + Option + H | Ctrl + Alt + H
大小写转换     |  Cmd + Shift + U  |  Ctrl + Shift + U

**(PS: 以上快捷键没有在win平台尝试确认，欢迎反馈错误与补充)**

## 自动导包

最后再介绍一个最有用的设置，我们只有每次引用一些类的时候必须要导包，而Studio可以通过设置自动导包，简直太实用了.

到 **Preferences** -> **Editor** -> **Auto Import** -> **Java** 把以下选项勾上就OK了

<img src="/image/auto_import.png" />

从此世界清静了。。。

至此Android Studio的基本使用相信大家都已经会了，从下一系列开始介绍Gradle语法以及基本配置与多渠道打包等，敬请期待！
