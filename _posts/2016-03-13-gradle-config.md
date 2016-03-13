---
layout: post
keywords: blog
description: blog
title: "Gradle依赖的统一管理"
categories: [Android]
tags: [Gradle]
---
{% include codepiano/setup %}

我想大部分人应该都在使用Gradle来依赖管理，还没有使用的去面壁思过，Gradle使用起来简直太好用了，举个例子，我们想依赖个support-v4包，直接一句话：

    compile 'com.android.support:support-v4:23.1.1'

不要太方便好么？

但是不知道你们发现一些问题没有？比如以后v4版本号如果升级了怎么办？你可能会说直接手动改下版本号就好了，又不费多少精力。是的，只有这一个地方当然很简单，假设你项目里引用了三四个module，而这些module里也引用了v4包，那就要把所有依赖v4的包全部手动更改，这是一个项目，而如果你又是多个项目呢？这还只是一个v4包，假设又有多处地方依赖okhttp呢？而且下次所有的compileSdkVersion跟buildToolsVersion都要跟着升级呢？每次版本更新都要手动更改简直太麻烦了，而且还容易遗漏某些地方。那么今天就来给大家提供一种解决方案完全解决这种问题。

我们如果根本性的解决这个问题肯定会想有没有一种通过一个配置文件来管理所有的Gradle依赖呢？哈哈，聪明，还真有这种方法，就不绕弯了，直接告诉你终极解决方案。

我们以我在GitHub开源的项目9GAG为例，首先我们在项目的根目录创建一个gradle配置文件config.gradle，内容如下：

<img src="/image/gradle_config1.png" />

可以看到这里包含了一些android和依赖的基本配置，以上都是gradle支持的语法，也许这里包含了所有你觉得好用的库，但是项目中只用到3、4个库也没关系，有了这个配置文件，以后所有的buildToolsVersion的升级还是依赖库的版本升级都在这里统一进行配置管理，所有的module以及主项目都从这里统一读取就ok了，那么接下来项目中怎么依赖这里的配置文件呢？

其次看下项目根目录的build.gradle文件内容：

<img src="/image/gradle_config2.png" />

只需在最顶部加上上面一行代码，意思就是所有的子项目或者所有的modules都可以从这个配置文件里读取内容。

最后在到app目录下的build.gradle文件里看下具体如何读取的呢？

android节点下的读取：

<img src="/image/gradle_config3.png" />

denpendencies节点下的读取：

<img src="/image/gradle_config4.png" />

是不是很简单方便呢？以后所有的版本号或者配置的更改直接更改这个文件就好了，而且可以把所有项目中使用到或者可能使用到的第三方库都塞到这里管理，用到了就依赖，用不到就放里面就好了。

所谓配置在手，天下我有！




