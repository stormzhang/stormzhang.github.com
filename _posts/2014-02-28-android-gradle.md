---
layout: post
keywords: gradle
title: "Android Gradle"
categories: [Android]
tags: [Gradle]
---
{% include codepiano/setup %}

Google I/O 2013发布了新的开发工具Android Studio和新的构建系统[Gradle](http://tools.android.com/tech-docs/new-build-system)， Android Studio自不必说，这是Android IDE的未来。这篇文章就来学习下Gradle。

## 什么是Gradle？

Gradle 是以 Groovy 语言为基础，面向Java应用为主，基于DSL语法的自动化构建工具。说到Java的自动化构建工具，大家一定对Ant和Maven都不会陌生，对，Gradle就是这样一种类似的工具，不过它比Ant和Maven强大的多，而且使用起来更加方便简单并且兼容Maven。

下面列举了一些使用Gradle构建Android项目的好处：

* 在IDE环境和命令行下使用同一个构建系统

* 改进的依赖关系管理

* 更容易地集成到自动化构建系统

## 安装Gradle

如果你是用Android Studio，第一次运行的时候需要自动安装Gradle，这个过程很漫长，而且有可能需要翻墙才下载的了，所以很多用户以致于认为死机了，所以最好的办法是手动来安装吧。

由于自己是mac电脑，所以以下仅以OSX系统为例，Windows系统的请自行网上搜索安装过程。

首先去[Gradle](http://www.gradle.org/downloads)官网下载最新版本，目前最新版本是1.11,如下图直接下载并解压gradle-1.11-all.zip放到一个目录下（当然你可以选择直接下载bin），之后建立软连接:

<img src="/image/gradle_download.png">


{% highlight ruby %}
cd /usr/bin
ln -s /Users/storm/gradle/bin/gradle gradle
#-> /Users/storm/gradle/bin/gradle是我放gradle的目录
{% endhighlight %}

之后在命令行下输入gradle -v，如果显示了版本的信息则安装成功了。

{% highlight ruby %}
gradle -v

------------------------------------------------------------
Gradle 1.11
------------------------------------------------------------

Build time:   2014-02-11 11:34:39 UTC
Build number: none
Revision:     a831fa866d46cbee94e61a09af15f9dd95987421

Groovy:       1.8.6
Ant:          Apache Ant(TM) version 1.9.2 compiled on July 8 2013
Ivy:          2.2.0
JVM:          1.6.0_65 (Apple Inc. 20.65-b04-462)
OS:           Mac OS X 10.9.1 x86_64
{% endhighlight %}

## Gradle 基本概念

如果你用Android Studio新建一个项目的时候，默认生成一大堆关于gradle的东西，其中最重要的是一个build.gradle的文件，内容如下：

{% highlight ruby%}
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:0.8.+'
    }
}
apply plugin: 'android'

android {
    compileSdkVersion 19
    buildToolsVersion "19.0.0"

    defaultConfig {
        minSdkVersion 14
        targetSdkVersion 19
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            runProguard false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.txt'
        }
    }
}

dependencies {
    compile 'com.android.support:support-v4:19.0.+'
}
{% endhighlight %}

buildscript节点的内容完全不用动，大概意思就是支持maven，声明Gradle的版本，刚开始很纳闷0.8是什么意思，Gradle的版本不是1.11么，我搜了好久都不知道这个数字和版本有什么关系，后来在[http://tools.android.com/tech-docs/new-build-system](http://tools.android.com/tech-docs/new-build-system)上有一项release note，才大概知道是如何对应起来的。

<img src="/image/gradle_release_note.png">


apply plugin节点声明构建的项目类型，这里当然是android了

android节点设置编译android项目的参数，接下来，我们的构建android项目的所有配置都在这里完成。相信上述都能看懂，就简单的字面意思。

## 构建一个Gradle Android项目

上述算是一个最基本的Android Gradle配置文件了，但是如果项目中引用了一些第三方的jar包，则需要添加些东西,比如项目依赖了一个sunpport_v4的jar包，则完整的build.gradle文件如下：

{% highlight ruby%}
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:0.8.+'
    }
}
apply plugin: 'android'

android {
    compileSdkVersion 19
    buildToolsVersion "19.0.0"

    defaultConfig {
        minSdkVersion 14
        targetSdkVersion 19
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            runProguard false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.txt'
        }
    }
}

dependencies {
	//单文件依赖
    compile files('libs/android-support-v4.jar")
    //某个文件夹下面全部依赖
    compile fileTree(dir: 'libs', include: '*.jar')
}
{% endhighlight %}

接着在命令行cd 到项目目录下

    gradle clean

如果是第一次使用gradle构建，则会下载相关依赖包并且对环境进行初始化，如果出错了，一般可能是下载超时，试多几次即可，最后你会看到如下提示：BUILD SUCCESSFUL
完成以上的步骤，就可以正式使用gralde 构建你的android项目了。

接着执行

    gradle build

就完成了android 项目的构建了。如果，你是照着以上步骤走的话，你将会在项目目录里面看到一个build 的目录，里面就是用gradle 构建android项目的全部东西了。最终打包的apk 就在build/apk 目录下了。然后，你会发现，两个apk 一个是 [项目名]-debug-unaligned [项目名]-release-unsigned，看名字就猜到一个是调试模式没有进行优化的apk（可直接安装），一个是release模式但没有签名的apk（不可直接安装）。

## 打签名包

默认输出 release apk 是没有签名的，那么我们需要签名的很简单，只需要在android{}里面补充加上如下代码即可。

{% highlight ruby %}
signingConfigs {
    myConfig {
        storeFile file("storm.keystore")
        storePassword "storm"
        keyAlias "storm"
        keyPassword "storm"
    }
}
    
buildTypes{
    release {
        signingConfig  signingConfigs.myConfig
        runProguard true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.txt'
    } 
}
{% endhighlight %}

然后，运行

    gradle clean 
    gradle build 

接着在build/apk目录下就生成了我们需要的签名的apk。

## 更多

实际项目中我们的app可以会很复杂，比如不仅引用到一些jar文件，也可能会引用一些Android Library项目以及一些.so文件，而且实际发布的时候我们可能不仅需要发布到一个平台上，目前Android大大小小可能得十几个平台，所以用Gradle就无法解决这些问题呢，答案是否定的，Gradle通过一些其他的配置都可以解决，只是稍微要麻烦些，等待以后有时间有精力的时候再总结下。顺便说下Gradle是Google大力支持的，所以和Android Studio类似，都是Android的未来，作为Android开发者有必要学习并跟上时代的步伐。
