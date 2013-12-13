---
layout: post
title: "mac配置adb环境变量"
tags: [Environment Path]
categories: [Android]
---

android环境搭建完成之后需要配置android环境变量，这对以后的运行调试很有帮助。

下面我将一下mac环境下的配置步骤：

1.在本地目录（home directory）中创建文件.bash_profile

2.在文件中写入以下内容：

{% highlight ruby %}

export ANDROID_HOME=/Users/storm/android_tools/adt-bundle-mac-x86_64-20130522/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

{% endhighlight %}

其中：/Users/storm/android_tools/adt-bundle-mac-x86_64-20130522/sdk不是固定的，它指向android SDK的目录

3.执行如下命令：source .bash_profile

4.验证：输入adb回车。如果未显示command not found，说明此命令有效，环境便亮设置完成。