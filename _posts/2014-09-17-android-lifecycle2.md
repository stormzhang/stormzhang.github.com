---
layout: post
keywords: blog
description: blog
title: "Activity生命周期详解二"
categories: [Android]
tags: [Activity]
---
{% include codepiano/setup %}

上一篇总体讲解了Activity的生命周期的一些方法，这篇来结合一些特定的使用场景来分析下Activity的生命周期。

## 首次启动

onCreate --> onStart --> onResume

## 按下返回按键

onPause --> onStop --> onDestroy

## 按Home键

onPause --> onSaveInstanceState --> onStop

## 再次打开

onRestart --> onStart --> onResume

## 屏幕旋转

* 如果你不做任何配置

启动Activity会执行如下方法：

onCreate --> onStart --> onResume

之后旋转屏幕，则Activity会被销毁并重新创建，之后便会执行如下方法：

onPause --> onSaveInstanceState --> onStop --> onDestroy --> onCreate --> onStart --> onRestoreInstanceState --> onResume

* 在AndroidManifest配置文件里声明android:configChanges属性

默认屏幕旋转会重新创建，当然可以通过在配置文件里加上如下代码：

{% highlight ruby %}
android:configChanges="keyboardHidden|orientation|screenSize"（sdk>13时需加上screenSize）
{% endhighlight %}

这个时候再旋转屏幕便不会销毁Activity，这时候再旋转屏幕可以看到只会执行onConfigurationChanged方法，有什么在屏幕旋转的逻辑可以重写这个方法：

{% highlight ruby %}
public void onConfigurationChanged(Configuration newConfig) {
    if (newConfig.orientation == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) {
        // TODO:
    }
    super.onConfigurationChanged(newConfig);
}
{% endhighlight %}

## FirstActivity打开SecondActivity

FirstActivity打开SecondActivity，这时候FirstActivity生命周期的方法是这样的： onPause --> onSaveInstanceState --> onStop, 这个时候在SecondActivity按返回键，FirstActivity会有以下集中情况：

* 正常情况下会执行： onRestart -> onStart -> onResume

* 当系统由于要回收内存而把 activity 销毁时

Activity在onPause或者onStop状态下都有可能遇到由于突发事件系统需要回收内存，之后的onDestroy方法便不会再执行，这时候会执行： onCreate --> onStart --> onRestoreInstanceState --> onResume

