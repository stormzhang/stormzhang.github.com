---
layout: post
keywords: blog
description: blog
title: "git submodule的使用"
categories: [Git]
tags: [Submodule]
---
{% include codepiano/setup %}

开发过程中经常用到的Git操作在这篇博客[Git常用命令备忘](http://stormzhang.com/git/2014/01/27/git-common-command)有介绍，但是没有涉及到submodule的命令，这也是比较常用的命令，这篇博客就介绍下git submodule的用法.

开发过程中，经常会有一些通用的部分希望抽取出来做成一个公共库来提供给别的工程来使用，而公共代码库的版本管理是个麻烦的事情。而且一旦更新了就要同步到多个引用的系统中，这个时候使用git submodule，然后执行: git submodule update就全部搞定了。

下面就以Android开发为例，讲述下submodule的具体用法。

假设一个Android Demo的目录是这样的：app, extras。其中app是程序的主要目录，extras目录是引用的一些library， 比如程序中引用了volley的library.

## 添加

为当前工程添加submodule，命令如下：

{% highlight ruby %}
git submodule add 仓库地址 路径
即
git submodule add https://android.googlesource.com/platform/frameworks/volley extras
{% endhighlight %}

命令执行完成，会在当前工程根路径下生成一个名为“.gitmodules”的文件，其中记录了子模块的信息。添加完成以后，再将子模块所在的文件夹添加到工程中即可。

## 更新

如果过了一段时间volley库有更新，这时候我们的app也需要更新，命令如下：

{% highlight ruby %}
git submodule update
{% endhighlight %}

## 删除

ubmodule的删除稍微麻烦点：首先，要在“.gitmodules”文件中删除相应配置信息。然后，执行“git rm –cached ”命令将子模块所在的文件从git中删除。

## 下载的工程带有submodule

当使用git clone下来的工程中带有submodule时，初始的时候，submodule的内容并不会自动下载下来的，此时，只需执行如下命令：

{% highlight ruby %}
git submodule update --init --recursive
{% endhighlight %}

即可将子模块内容下载下来后工程才不会缺少相应的文件。