---
layout: post
title: Mac OS X "open Eclipse, you need a Java SE 6 runtime"
tags: [JDK7]
categories: [Android, Java]
---

今天把OS X升级到10.9 Mavericks，居然java环境出错了，于是趁这个机会顺便把jdk升级到1.7，下载安装jdk1.7一切搞定之后打开eclipse时竟然弹出提示：

    To open “Eclipse，” you need a Java SE 6 runtime. Would you like to install one now?

经过查找和实验，把解决方案记录分享在此。 

1. 修改Java安装目录的Info.plist文件：

如，我的系统上是修改：/Library/Java/JavaVirtualMachines/jdk1.7.0_45.jdk/Contents/Info.plist 文件，将这部分

{% highlight ruby %}
<key>JVMCapabilities</key>
    <array>
<string>CommandLine</string>
</array>
{% endhighlight %}

改为如下：（主要是添加了4行东东）

{% highlight ruby %}
<key>JVMCapabilities</key>
<array>
    <string>JNI</string>
    <string>BundledApp</string>
    <string>WebStart</string>
    <string>Applets</string>
    <string>CommandLine</string>
</array>
{% endhighlight %}

修改后，重启系统，再打开Eclipse这样的软件就会正常启动了。