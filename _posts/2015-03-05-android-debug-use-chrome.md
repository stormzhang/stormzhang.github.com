---
layout: post
keywords: blog
description: blog
title: "使用Chrome来调试你的Android App"
categories: [Android]
tags: [Chrome, Stetho]
---
{% include codepiano/setup %}

个人一直对Chrome情有独钟，Chrome除了更快之外，对开发者的支持更友好。内置强大的Developer Tools，相信Web开发简直爱不释手！而且Chrome Store里提供各种各样的插件，没有你用不到，只有你想不到。现在任何事基本Chrome全部办的到，有时候就在想，如果可以用Chrome调试Android App该多方便，而如今Facebook刚刚开源了一个工具[Stetho](http://facebook.github.io/stetho/)，从此Chrome调试Android不再是梦。

## 调试工具

在Android开发中除了一些官方自带的一些调试工具外，还有两个工具我认为是必备的。

* 抓包工具

windows平台最好用的应该是Fiddle， mac上最好用的应该是Charles。这个应该是App开发必备，不管是Android还是iOS。

* Sqlite查看

这个工具就多了，除了自带的sqlite3工具之外，还是需要一些GUI方面的工具更方便，就不一一列举了，大家自行搜索找到自己喜欢的工具就行了，有一些浏览器插件，也有一些各个平台的客户端。需要知道的是如果想查看App内的sqlite文件需要root。

## Stetho

抓包工具虽然好用，但是每次都要在手机设置代理，也挺麻烦的，查看sqlite文件必须要root这点更麻烦。但是有了stetho，这些工具全部自带了，使用方便，无须root，下面就来看下官方demo介绍的使用用法。

* 首先Gradle进行依赖

{% highlight ruby %}
dependencies {
  compile 'com.facebook.stetho:stetho:1.0.1'
}
{% endhighlight %}

* 然后在你的App的Application类里进行配置

{% highlight ruby %}
public class MyApplication extends Application {
  public void onCreate() {
    super.onCreate();
    Stetho.initialize(
      Stetho.newInitializerBuilder(this)
        .enableDumpapp(
            Stetho.defaultDumperPluginsProvider(this))
        .enableWebKitInspector(
            Stetho.defaultInspectorModulesProvider(this))
        .build());
  }
}
{% endhighlight %}

然后就可以运行App进行调试，基本上可以满足调试需求了。

* Chrome调试

打开Chrome，输入 **chrome://inspect** 然后就可以在列表里看到有你的app可以用stetho进行调试的app，facebook官方也提供了一个基本的sample，以下是它的sample提供的调试截图

<img src="/image/stetho_inspect.png"/>

## 基本功能使用

// to be continue

## 注意事项

// to be continue

