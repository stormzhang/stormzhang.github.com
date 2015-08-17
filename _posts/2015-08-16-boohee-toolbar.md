---
layout: post
keywords: blog
description: blog
title: "薄荷Toolbar(ActionBar)的适配方案"
categories: [Android]
tags: [Archive]
group: archive
---
{% include codepiano/setup %}

一晃好久没更新博客了，最近的几个月确实非常忙，公司在准备C轮融资的事情，而我自己也在全力在我负责的业务上冲刺，好在现在来看C轮进入尾声，各项目进展还算顺利。之前很久之前就准备分享的一篇我们薄荷App上的一个Toolbar的适配方案，这里分享出来。

另外先打个广告，以后博客更新准备第一时间更新在我的微信公众号: **AndroidDeveloper** 上，方便大家第一时间通知到大家，大家可以扫码关注下。

<img src="/image/weixinpublic.jpg" />

## 背景

在Toolbar刚出来不久，我就准备尝鲜并准备在薄荷Android版把ActionBar全部替换到Toolbar。至于Toolbar的优势以及它的使用方法我这里就不一一介绍了，网上一大堆。这里经过评估发现Toolbar的适配有以下几个难点：


1. 遵循各版本的Android设计

我们的App一向是尽量遵循Android的设计，比如顶部的导航栏，我们知道在4.4版本之前Android是不可以自定义状态栏的，在4.4版本Android推出了一个透明状态栏的概念，使手机最顶部的状态栏的颜色全透明，并且颜色可以定义，而5.0推出了Material Design，这个时候的状态栏就变成了半透明的颜色，具体可见下图。

**4.4版本**

<img src="/image/nexus5_api19.png"/>

**5.0版本**

<img src="/image/nexus5_api21.png"/>

**而4.4之前版本顶部的状态栏默认是黑色的，这里就不截图了，看微信Android版就知道了**


2. 全局替换ActionBar

我们知道ActionBar默认在是每个页面包含了，而Toolbar是需要你手动写一个布局然后include进去的，如果想要全部替换成Toolbar，则需要改动每一个布局文件，这样改动难免太大了。

## 一键适配所有版本的状态栏

我们先来解决第一个问题，这里也是经过自己研究利用的一个小技巧。废话不多说，直接上代码与解决方案。

1. 首先Toolbar是在appcompact-v7包下面，所以第一步需要依赖该库，方式很简单，gradle依赖加入如下代码：

    compile 'com.android.support:appcompat-v7:22.2.1'

2. 之后我们创建一个Toolbar的布局文件toolbar_layout.xml

{% highlight ruby %}
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.Toolbar xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/toolbar"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:paddingTop="@dimen/toolbar_padding_top"
    android:background="@color/primary_color"
    android:minHeight="?attr/actionBarSize"
    app:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
    app:popupTheme="@style/ThemeOverlay.AppCompat.Light" />
{% endhighlight %}

这里给它设一个id与你app的主颜色，然后关于其他属性android:minHeight、app:theme、app:popupTheme等就不在解释，关键是在这里加了一个paddingTop的属性。看到这里可能已经有同学猜到我的解决方案了，是的解决方案就是利用状态栏的高度，在4.4以上的版本给Toolbar设置一个paddingTop的属性为status_bar的高度，然后让他“全屏”，Toolbar就自然的延伸到了status_bar的位置，而且在4.4系统status_bar默认就是透明，在5.0以上status_bar是半透明。而至于status_bar的高度从源码查看得知为25dp，不信的话大家可以通过以下代码获取像素转成dp试试

{% highlight ruby %}
public int getStatusBarHeight() {  
    int result = 0;
    int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
    if (resourceId > 0) {
        result = getResources().getDimensionPixelSize(resourceId);
    }  
  return result;
}  
{% endhighlight %}

然后我们还需要在values, values-v19两个文件夹下分别声明toolbar_padding_top变量，values文件夹下值为0，而values-v19文件夹下值为25.

3. 最后在values-v19文件夹下声明AppTheme为透明状态栏，代码如下

{% highlight ruby %}
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <!-- Customize your theme here. -->
    <item name="android:windowTranslucentStatus">true</item>
</style>
{% endhighlight %}

这句话意为在api大于等于19以上版本为状态栏透明

以上便解决了第一个问题，那么接下来第二个问题的解决方案就是抽象成一个BaseActivity，直接上代码相信大家就明白了。

{% highlight ruby %}
package com.stormzhang.booheetoolbar;

import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.LinearLayout;

public class BaseActivity extends AppCompatActivity {

    private LinearLayout rootLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 这句很关键，注意是调用父类的方法
        super.setContentView(R.layout.activity_base);
        // 经测试在代码里直接声明透明状态栏更有效
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WindowManager.LayoutParams localLayoutParams = getWindow().getAttributes();
            localLayoutParams.flags = (WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS | localLayoutParams.flags);
        }
        initToolbar();
    }

    private void initToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        if (toolbar != null) {
            setSupportActionBar(toolbar);
        }
    }

    @Override
    public void setContentView(int layoutId) {
        setContentView(View.inflate(this, layoutId, null));
    }

    @Override
    public void setContentView(View view) {
        rootLayout = (LinearLayout) findViewById(R.id.root_layout);
        if (rootLayout == null) return;
        rootLayout.addView(view, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        initToolbar();
    }
}
{% endhighlight %}

而activity_base.xml的布局内容如下

{% highlight ruby %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/root_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <include layout="@layout/toolbar_layout" />

</LinearLayout>
{% endhighlight %}

这里需要强调的是BaseActivity里的这段内容

{% highlight ruby %}
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    WindowManager.LayoutParams localLayoutParams = getWindow().getAttributes();
    localLayoutParams.flags = (WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS | localLayoutParams.flags);
}
{% endhighlight %}

其实和在主题样式里声明
{% highlight ruby %}
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <!-- Customize your theme here. -->
    <item name="android:windowTranslucentStatus">true</item>
</style>
{% endhighlight %}

是一个意思，但是实际测试中发现在国产某些rom上，xml声明的会不起作用，所以建议在代码里直接声明更有效。

最后每一个Activity或者Fragment只需要调用getSupportActionBar()方法，均和ActionBar的使用方法一致。

最后我这边写了一个完整的demo放在GitHub供大家理解使用。

GitHub地址：[https://github.com/stormzhang/BooheeToolbar](https://github.com/stormzhang/BooheeToolbar)
