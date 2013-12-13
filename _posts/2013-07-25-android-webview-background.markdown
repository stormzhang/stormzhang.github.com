---
layout: post
title: "Android设置WebView背景透明"
tags: [WebView]
categories: [Android]
---

Android4.0环境下WebView背景一直都是白色的，和App的整体风格不一致，所以需要把背景设为透明，本来以为非常简单的一个background属性设为透明就好了，可事情并没有这么简单，经过一番周折最后终于搞定，在这里记录下来。

## 网上的解决方案

{% highlight ruby %}

android:layerType="software"（没效果）
mWebView.setBackgroundColor(0);（没效果）
mWebView.setBackgroundDrawable(R.drawable.main_bg);（没效果）

{% endhighlight %}

## 总结方法

1. 首先检查配置文件里application设置android:hardwareAccelerated="false"，自己尝试后必须这样设置才行；
2. 在loadUrl后设置mWebView.setBackgroundColor(0);
3. 检查xml布局文件里的WebView的父层布局，也要设置背景为透明的；（之前也因为这个问题没发现，绕了很大一个圈）