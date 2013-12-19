---
layout: post
title: "小米2S开启USB调试模式"
tags: [Debug]
categories: [Android]
---

拿了同事的新买的小米2S来调试应用程序，没想到已经在设置->开发者选项里已经打开了“USB调试模式”，但是不管是在eclipse的DDMS上还是在命令行下输入adb devices都找不到设备，最后google了才知道原来小米2s提供了另一种方法来开启USB模式，故记录在此：

1.首先在【设置】→【全部设置】→【开发者选项】→【调试】下开启【USB 调试】模式
2.然后打开手机拨号界面，在拨号界面按	

{% highlight ruby %}
*#*#717717#*#*
{% endhighlight %}
	
即可使 USB 接口生效，设置成功后会在当前界面弹出吐司 Diag USB port enable。

设置成功后即可查看设备的信息了，