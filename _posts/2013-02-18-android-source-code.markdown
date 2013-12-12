---
layout: post
title: "Android Source Code"
tags: [Source Code]
categories: [Android]
---

我们知道，源代码是最好的学习资料，所以今天就来记录下android中下载并查看源代码的方法：

1. 安装Git，如果你还没有用Git，那么建议去Google下学习下相关知识，Git是现如今最流行的版本控制工具，没有之一。

2. 新建源代码文件夹：

{% highlight ruby %}

mkdir android_4.0_src
cd android_4.0_src

{% endhighlight %}

3. 克隆sdk 远程仓库

{% highlight ruby %}

git clone http://android.googlesource.com/platform/frameworks/base.git

{% endhighlight %}

4. 找到android sdk里的android.jar所在目录, 在此目录下新建sources文件夹, 将下载的源码中的core/android和core/com目录复制到source文件夹里, 重启Eclipse. 即可查看SDK中的Java源码.

或者直接到[这里](http://repository.grepcode.com/java/ext/com/google/android/android/)也可以直接下载jar文件