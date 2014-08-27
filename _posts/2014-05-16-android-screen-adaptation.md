---
layout: post
keywords: blog
description: blog
title: "Android 屏幕适配"
categories: [Android]
tags: [屏幕适配]
---
{% include codepiano/setup %}

众所周知，Android机型尺寸各种各样，于是屏幕适配就成了Android开发中很重要的一环。Android屏幕适配可能一些开发者都会遇到这样的问题，今天就来分享下屏幕适配，你会发现其实Android屏幕适配也可以很简单。

## 基本概念

Android屏幕适配必须要理解的一些概念，这部分可能比较枯燥，但是俗话说的好“工欲善其事，必先利器”，翻译过来就是“有什么样的枪，决定你打什么样的鸟”，一旦这些概念你理解掌握了，屏幕适配你自然而然就觉得简单多了。

- px

是英文单词pixel的缩写，意为像素，屏幕上的点。我们通常所说的分辨率如480X800就是指的像素。

在设计领域中，像素是用来计算数码影像的最小单位。计算机中显示的图像并非连续的线条组成，而是由许多肉眼看不见的小点组成。如果把影像放大数倍，会发现这些连续色调其实是由许多色彩相近的小点所组成，这些小点就是构成影像的最小单位“像素”。由于是最小的独立显示单位，px均为整数，不会出现0.5px的情况。如：

看这个色彩鲜艳的LED灯（原图大小）

<img src="/image/pixel_origin.png" />

你能想象这才是他的本来面目吗？（放大之后）

<img src="/image/pixel_scale.jpeg" />

* in

表示英寸，是屏幕的物理尺寸。每英寸等于2.54厘米。例如我们经常说的手机屏幕大小有，5（英）寸、4（英）寸就是指这个单位。这些尺寸是屏幕的对角线长度。如果手机的屏幕是4英寸，表示手机的屏幕（可视区域）对角线长度是4 X 2.54 = 10.16厘米。

* dpi

dpi是Dots Per Inch的缩写, 每英寸点数，即每英寸包含像素个数。比如320X480分辨率的手机，宽2英寸，高3英寸, 每英寸包含的像素点的数量为320/2=160dpi（横向）或480/3=160dpi（纵向），160就是这部手机的dpi，横向和纵向的这个值都是相同的，原因是大部分手机屏幕使用正方形的像素点。

* density

屏幕密度，density和dpi的关系为 density = dpi/160

* dp

也即dip，设备独立像素，device independent pixels的缩写，Android特有的单位，在屏幕密度dpi = 160屏幕上，1dp = 1px。

* sp

和dp很类似，一般用来设置字体大小，和dp的区别是它可以根据用户的字体大小偏好来缩放。

## Android Drawable

我们新建一个Android项目后应该可以看到很多drawable文件夹，分别对应不同的dpi

* drawable-ldpi (dpi=120, density=0.75)

* drawable-mdpi (dpi=160, density=1)

* drawable-hdpi (dpi=240, density=1.5)

* drawable-xhdpi (dpi=320, density=2)

* drawable-xxhdpi (dpi=480, density=3)

市面上的一些Android教程大多都是教的是为每种dpi都出一套图片资源，这个固然是一种解决办法，但同时也是一种非常笨的方法，为美工或者设计增加了不少的工作量不说，同时也会让你的apk包变的很大。那么有没有什么好的方法既能保证屏幕适配，又可以最小占用设计资源，同时最好又只使用一套dpi的图片资源呢？下面就来讲解下项目中总结出来的这个方法。

首先必须清楚一个自动渲染的概念，Android SDK会自动屏幕尺寸选择对应的资源文件进行渲染，如SDK检测到你手机dpi是160的话会优先到drawable-mdpi文件夹下找对应的图片资源，注意只是优先，假设你手机dpi是160，但是你只在xhpdi文件夹下有对应的图片资源文件，程序一样可以正常运行。所以理论上来说只需要提供一种规格的图片资源就ok了，如果只提供ldpi规格的图片，对于大分辨率的手机如果把图片放大就会不清晰，所以需要提供一套你需要支持的最大dpi的图片，这样即使用户的手机分辨率很小，这样图片缩小依然很清晰。

## xhdpi成为首选

上面说了只需要提供一套大的dpi的图片就ok了，现在市面手机分辨率最大可达到1080X1920的分辨率，如Nexus5，dpi属于xxhdpi，但是毕竟还没普及，目前市面上最普遍的高端机的分辨率还多集中在720X1080范围，也就是多集中在xhdpi，所以目前来看xhpdi规格的图片成为了首选。当然随着技术规格的提高以后发展，以后可能市场上xxdpi的手机会越来越普遍，但这是后话。

## 设计资源紧张怎么办？

在现在的App开发中，基本都会有iOS和Android版本，有些公司为了保持App不同版本的体验交互一致，还有些公司的设计资源可能比较紧张，这些情况下iOS和Android版本基本是一个设计师主导，而大多数情况下设计师可能更会以iPhone手机为基础进行设计，包括后期的切图之类的。这个时候身为Android开发人员你是否还要求设计师单独为Android端切一套图片资源呢？这会让你们的设计师崩溃的，下面就来告诉一个项目中总结的更棒的方法。

相信设计师们一般都会用最新的iPhone5（5s和5的尺寸以及分辨率都一样）来做原型设计，而iPhone5的屏幕分辨率为640X1164, 屏幕尺寸为4英寸，根据勾股定理(a^2 + b^2 = c^2)640^2+1164^2=1764496, 然后再对其开根号可求出屏幕对角线的分辨率为：1328，除以4可得出iphone5的dpi：1328/4≈332
可以看出iPhone5的屏幕的dpi约等于320, 刚好属于xhdpi，所以你可以很自豪的像你们的设计师说不用专门为Android端切图，直接把iPhone的那一套切好的图片资源放入drawable-xhdpi文件夹里就ok了。

## wrap_content VS dp

wrap_content和dp都是在Android开发中应该经常用到的，然后它们冥冥中是有关系的。

假设你看了这篇文章后都是统一有xhdpi的资源，那么你用wrap_content完全没有问题，Android会自动为其他规格的dpi屏幕适配,比如你在xhdpi放了一张120X120px大小的图片，那么在在hdpi屏幕上显示的就只有120/2*1.5=90px大小，但是如果你不小心同样把这张图片也放入了mdpi了，这个时候用wrap_content显示就会有问题，具体看下面的例子：

例如假设你只在drawable_xhdpi文件夹下放了test图片，xhdpi的设备会去xhdpi文件夹下找到test图片并直接显示，而mdpi的设备优先会去mdpi文件夹里查找test图片，但是没找到，最后在xhdpi文件夹下找到，然后会自动根据density计算并缩放显示出来，实际显示出来的大小是120/2=60px, 所以整体的显示比例才会看起来比较正常

* mdpi

<img src="/image/mdpi_test.png" />

* xhdpi

<img src="/image/xhdpi_test.png" />

但是如果你在mdpi文件夹里也放入了同样的图片，那么mdpi的设备会直接去mdpi文件夹里寻找到test图片，并直接显示，而这时候显示不会缩放，实际显示大小就是120X120,在mdpi的屏幕上看起来就会比较大，如图：

<img src="/image/mdpi_test2.png" />

通过上面整个过程，大家应该理解了Android加载资源的整个过程, wrap_content同样可以用dp来代替，就拿上面这个例子，在xhdpi文件夹内放入了一张120X120像素的test图片，宽高直接除density就得出dp的数值，即这种情况下以下代码是等同的.

{% highlight ruby %}
<ImageView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:src="@drawable/test" />
{% endhighlight %}


{% highlight ruby %}
<ImageView
    android:layout_width="60dp"
    android:layout_height="60dp"
    android:src="@drawable/test" />
{% endhighlight %}

## 总结

相信通过以上的讲解，对Android UI中的一些基本概念有个很好的理解，实际开发工作中也有一些高效的方法可以参考，应该可以应对大部分的屏幕适配工作。但是项目中仍然有一些比较特殊的适配需求满足不了，以后会针对一些特殊的需求进行示例讲解。

