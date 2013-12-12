---
layout: post
title: "8个常用的Android开发工具"
tags: [Developer Tools]
categories: [Android]
---
{% include codepiano/setup %}

周末发现一些比较有用的android开发常用的工具，里面大部分是自己经常用的，还有一些暂时很少用，暂且在这里记录下，以后一定同样会经常用到的。

## 1 [The SDK and AVD Manager](http://developer.android.com/sdk/exploring.html)

这个工具是用来添加、更新Android SDK的组件的，例如新的API。

<img src="http://static.oschina.net/uploads/img/201110/05010012_nJHi.png">

## 2 [Android ADT](http://developer.android.com/tools/sdk/eclipse-adt.html)

这是Eclipse的Android开发者查件，为Android开发提供了一个可视化的集成开发环境。

<img src="http://static.oschina.net/uploads/img/201110/05010014_f3IY.png">

## 3 [Android DDMS](http://developer.android.com/tools/debugging/ddms.html)

在Android开发工具包当中有一个调试工具，Dalvik Debug Monitor Server (DDMS)。这个工具提供了端口转发，截屏，堆栈，进程信息，日志，信号状态信息，模拟来电，短信，模拟地理位置信息等。

<img src="http://static.oschina.net/uploads/img/201110/05010015_Hf0J.png">

## 4 [Logcat](http://developer.android.com/tools/help/logcat.html)

这是Android提供的日志系统。这个系统提供了一个收集、查看系统调试信息的机制。不同的App，不同的系统组件生成的日志将被同一收集、存储起来。我们可以通过logcat的命令去筛选，查看日志信息。

## 5 [Hierarchy Viewer](http://developer.android.com/tools/help/hierarchy-viewer.html)

这个工具可以帮助开发者调试、优化用户界面。它可以为App的用户界面结构生成一个图形的展示方式，并且提供了显示的放大功能。

<img src="http://static.oschina.net/uploads/img/201110/05010016_VJQP.png">

## 6 [Zipalign](http://developer.android.com/tools/help/zipalign.html)

这个工具可以优化Android程序文件（.apk)，可以使应用程序运行更快。在Android平台中，数据文件存储在apk文件中，可以多进程的访问，如果你开发过Win32可能知道程序的粒度对齐问题，不错虽然不是PE格式的文件，在Zip中一样，资源的访问可以通过更好的对其优化，而zipalign使用了4字节的边界对齐方式来影射内存，通过空间换时间的方式提高执行效率。

## 7 [Emulator](http://developer.android.com/tools/help/emulator.html)

这个很简单啦，就是模拟器！

## 8 [Android Debug Bridge](http://developer.android.com/tools/help/adb.html)

Android Debug Bridge(adb) 是一个通用的命令行工具用来和模拟器或者连接到计算机的Android设备通信。

ADB常用的几个命令

1.查看设备

{% highlight ruby %}
adb devices
{% endhighlight %}

这个命令是查看当前连接的设备, 连接到计算机的android设备或者模拟器将会列出显示

2.安装软件

{% highlight ruby %}
adb install <apk文件路径>
{% endhighlight %}

这个命令将指定的apk文件安装到设备上

3.卸载软件

{% highlight ruby %}
adb uninstall <软件名>
adb uninstall -k <软件名>
{% endhighlight %}

如果加 -k 参数,为卸载软件但是保留配置和缓存文件.

4.登录设备shell

{% highlight xml %}
adb shell
adb shell <command>
{% endhighlight %}

这个命令将登录设备的shell.
后面加command将是直接运行设备命令, 相当于执行远程命令

5.从电脑上发送文件到设备

{% highlight ruby %}
adb push <本地路径> <远程路径>
{% endhighlight %}

用push命令可以把本机电脑上的文件或者文件夹复制到设备(手机)

6.从设备上下载文件到电脑

{% highlight ruby %}
adb pull <远程路径> <本地路径>
{% endhighlight %}

用pull命令可以把设备(手机)上的文件或者文件夹复制到本机电脑

7.重新挂载文件系统

{% highlight ruby %}
adb remount
{% endhighlight %}

8.重启手机

{% highlight ruby %}
adb reboot
{% endhighlight %}

9.重启到Recovery界面

{% highlight ruby %}
adb reboot recovery
{% endhighlight %}

10.显示帮助信息

{% highlight ruby %}
adb help
{% endhighlight %}

这个命令将显示帮助信息