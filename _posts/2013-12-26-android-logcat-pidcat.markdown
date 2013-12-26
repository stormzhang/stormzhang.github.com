---
layout: post
title: "Android Debug Tool -- pidcat"
categories: [DevTools]
tags: [Logcat]
---
{% include codepiano/setup %}

在Android开发的过程中我们会用Logcat来查看应用程序的log信息，而我们一般都是在Eclipse集成好的DDMS上直接使用，调试应用非常方便。但总觉得Logcat并不适合所有场景，Logcat比较适合开发过程中的调试，而且依赖Eclipse也比较重，如果不是开发效率的限制，个人还是更倾向于vim或者Sublime Text这种轻量的编辑器。还好发现了一个命令行环境下的调试工具pidcat。

pidcat其实就是一个python脚本，运行后可以很清晰在命令行下查看应用的log信息，不必依赖eclipse而且可以查看某一单个应用的log信息，运行前请先确保装了python，mac下是自带python的.

项目地址: [https://github.com/stormzhang/pidcat](https://github.com/stormzhang/pidcat)

运行:

{% highlight ruby %}
./pidcat.py com.boohee.one
{% endhighlight %}

下面是我机器上运行的截图

<img src="/image/pidcat.png">