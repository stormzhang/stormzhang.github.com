---
layout: post
keywords: blog
description: blog
title: "Mac下安装和管理Java"
categories: [Android]
tags: [Java]
---
{% include codepiano/setup %}

Mac OSX 10.9以后系统就自带了Java 6的环境，路径在:

{% highlight ruby %}
/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
{% endhighlight %}

如果想要安装升级到Java 7的环境，步骤如下：

* 1.到Oracle官网下载系统对应JDK7的安装包, [地址在这里](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html),安装成功后JDK7默认的路径在:

{% highlight ruby %}
/Library/Java/JavaVirtualMachines/jdk1.7.0_60.jdk/Contents/Home
{% endhighlight %}

* 2.安装成功后配置环境变量

在.bash_profile文件中添加：

{% highlight ruby %}
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH
{% endhighlight %}

需要说明的是Mac OSX 10.5之后苹果就建议设置$JAVA_HOME变量到/usr/libexec/java_home

* 3.设置完成后输入下列命令测试下

{% highlight ruby %}
$java -version
java version "1.7.0_60"
Java(TM) SE Runtime Environment (build 1.7.0_60-b19)
Java HotSpot(TM) 64-Bit Server VM (build 24.60-b09, mixed mode)

# 查看系统安装的java版本
$/usr/libexec/java_home -V
Matching Java Virtual Machines (3):
1.7.0_60, x86_64:	"Java SE 7"	/Library/Java/JavaVirtualMachines/jdk1.7.0_60.jdk/Contents/Home
1.6.0_65-b14-462, x86_64:	"Java SE 6"	/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
1.6.0_65-b14-462, i386:	"Java SE 6"	/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home

# 返回系统安装的java最高版本
$/usr/libexec/java_home
/Library/Java/JavaVirtualMachines/jdk1.7.0_60.jdk/Contents/Home
{% endhighlight %}
