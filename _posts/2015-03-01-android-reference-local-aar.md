---
layout: post
keywords: blog
description: blog
title: "Android模块化编程之引用本地的aar"
categories: [Android]
tags: [Gradle]
---
{% include codepiano/setup %}

随着项目越来越多，代码的复用就变得异常重要，这时候就要进行模块化编程，就是把一些通用的组件或者类库做成单独的模块，其他项目直接进行引用就好。针对Android开发最常见的就是Android Library，在Gradle出现之前引用Android Library的方式也很繁琐，但是有了Gradle一切变得非常简单方便。

## aar

何为aar？大家都知道jar文件把，如果你有一个Android Library项目，可以很容易的导出jar文件，然后在其他项目中很方便的引用，aar和jar类似，区别就是一个Android Library项目导出的jar文件不能包含资源文件，比如一些drawable文件、xml资源文件之类的，所以这就有很大的限制，在gradle之前我们要引用带资源文件的Android Library必须要把整个library导入进来进行引用，但是有了gradle之后，Android Library项目可以直接导出成aar，然后其他项目像引用jar的方式直接方便的引用。

## 导出aar

首先Android Library项目的gradle脚本只需要在开头声明

    apply plugin: 'com.android.library'

之后就和导出apk文件一样的方法，执行 **./gradlew assembleRelease**，然后就可以在 **build/outputs/aar** 文件夹里生成aar文件

## 引用本地的aar

生成aar之后下一步就是如何引用本地的aar文件？本地的aar文件并没有像引用jar文件这么简单，官方也没有提供解决方案。好在国外的一些前辈总结出了方法，下面就以test.aar文件为例来详述下方法

1、把aar文件放在一个文件目录内，比如就放在libs目录内

2、在app的build.gradle文件添加如下内容

{% highlight ruby %}
repositories {
    flatDir {
        dirs 'libs' //this way we can find the .aar file in libs folder
    }
}
{% endhighlight %}

3、之后在其他项目中添加一句gradle依赖便方便的引用了该library

{% highlight ruby %}
dependencies {
    compile(name:'test', ext:'aar')
}
{% endhighlight %}

以上方法亲测有效。

## 总结

当然通过gradle最普遍的方法是把aar上传到mavenCentral或者jcenter，引用的话更方便，但是对于一些公司内部library不想公开，而传统的引用library方式又太繁琐，引用本地的aar文件这种方式会非常方便合适，之后通用的模块只需要做成library，不管更新还是修改只需要打包成aar，然后供其他项目使用就好了，对Android开发来说这是提升代码复用非常有效的一个手段。
