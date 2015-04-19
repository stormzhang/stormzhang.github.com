---
layout: post
keywords: blog
description: blog
title: "Android Studio Tips -- 自定义Logcat"
categories: [devtools]
tags: [AndroidStudio]
---
{% include codepiano/setup %}

我们都知道Logcat是我们Android开发调试最常用的一个工具，但是Android Studio默认的Logcat调试的颜色是一样的，我们不好区分verbose、debug、error等分类信息，今天就来教大家自定义Logcat的提示信息。

打开Preference->Editor->Colors & Fonts->Android Logcat（或者搜索logcat），如果我们默认选择的是Darcula主题会看到如下界面：

<img src="/image/default_logcat.png"/>

这个默认的是无法更改，我们可以点击“Save As”为我们的新Logcat风格取个名字，比如MyDarcula，之后双击右边的Foregound图标就可以为每种分类设定特定的颜色了

<img src="/image/custom_logcat1.png"/>

<img src="/image/custom_logcat2.png"/>

颜色更改之后在底部就可以实时预览logcat的效果图。

OK，这个小Tips很简单，但是很实用！