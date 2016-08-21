---
layout: post
keywords: blog
description: blog
title: "让你变懒的 Android Studio Live Templates"
---
{% include codepiano/setup %}

俗话说，不想偷懒的程序员不是好程序员！那么今天就教大家偷懒下！

先举个例子，我们在 Android 开发中输入 Toast ，然后会有如下如下的快速操作：

![](/image/live_templates1.gif)

是不是很方便？

有同学问，这不就是自动补全么？错了，乍一看是自动补全，其实不然。自动补全是对一个方法或类名的补全，比如你输入 find 然后就会有 findViewById 方法提示你，你可以快速输入，但是我们一般还需要对它强制转型，然后加上 R.id.** 之类的，但是你可以试着输入 fbc 会更方便。

这个叫做 Live Template ，如果真要翻译就叫做实时模板，在 AS 中有两种模板，一种就是你在新建一个 Activity 的时候可以选择 Empty Activity、FullScreen Activity 之类的，还有一种就是本篇要介绍的 Live Template 。

打开设置->Editor->Live Templates ，可以看到默认已经有很多 Live Templates 了，可以看下我的截图 Android 分类下有如下这些模板：

![](/image/live_templates2.png)

你都可以输入那些快捷方式来启用这些模板，比如快速定义一个常量，快速设置 View 为 gone ，快速启动一个 Activity 等，那具体是如何实现的呢？我们不妨点击 starter ，有如下代码：

``` ruby
public static void start(Context context) {
    Intent starter = new Intent(context, $ACTIVITY$.class);
    starter.putExtra($CURSOR$);
    context.startActivity(starter);
}
```

其中 $ACTIVITY$ 代表当前所在的类名，$CURSOR$ 代表当前鼠标定位位置，同理 newInstance 可以帮你在 Fragment 中快速声明一个新建 Fragment 的方法，它的代码如下：

``` ruby
public static $fragment$ newInstance($args$) {
    $nullChecks$
    Bundle args = new Bundle();
    $addArgs$
    $fragment$ fragment = new $fragment$();
    fragment.setArguments(args);
    return fragment;
}
```

是不是很容易理解呢？如果理解了那么就可以来根据习惯定义自己的 Live Templates 了.

