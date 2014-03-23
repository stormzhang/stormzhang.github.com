---
layout: post
keywords: blog
description: blog
title: "Android WebView播放视频问题"
categories: [Android]
tags: [WebView]
---
{% include codepiano/setup %}

此次的方案用到WebView，而且其中会有视频嵌套，在默认的WebView中直接播放视频会有问题，而且不同的SDK版本情况还不一样，网上搜索了下解决方案，在此记录下.

    webView.getSettings.setPluginState(PluginState.ON);
    webView.setWebChromeClient(new WebChromeClient());

然后在webView的Activity配置里面加上：

    android:hardwareAccelerated="true"

以上可以正常播放视频了，但是webview的页面都finish了居然还能听到视频播放的声音，于是又查了下发现webview的
onResume方法可以继续播放，onPause可以暂停播放，
但是这两个方法都是在Added in API level 11添加的，所以需要用反射来完成。

停止播放：在页面的onPause方法中使用：

    webView.getClass().getMethod("onPause").invoke(webView,(Object[])null);

继续播放：在页面的onResume方法中使用：

    webView.getClass().getMethod("onResume").invoke(webView,(Object[])null);

这样就可以控制视频的暂停和继续播放了。