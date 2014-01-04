---
layout: post
title: "Android BuildConfig.DEBUG的妙用"
categories: [Android]
tags: [BuildConfig]
---

在Android开发中，我们使用android.util.Log来打印日志，方便我们的开发调试。但是这些代码不想在发布后执行，我们并不想在软件发布后调试日志被其他开发者看到，现在我的方法是设置一个全局变量，标记软件为Debug模式还是Release模式。来看下代码：

{% highlight ruby %}
public class Log {
    private static final boolean DEBUG = true;

    public static void i(String tag, String msg) {
        if (DEBUG)
            android.util.Log.i(tag, msg);
    }

    public static void e(String tag, String msg) {
        if (DEBUG)
            android.util.Log.e(tag, msg);
    }

    public static void d(String tag, String msg) {
        if (DEBUG)
            android.util.Log.d(tag, msg);
    }

    public static void v(String tag, String msg) {
        if (DEBUG)
            android.util.Log.v(tag, msg);
    }

    public static void w(String tag, String msg) {
        if (DEBUG)
            android.util.Log.w(tag, msg);
    }
}
{% endhighlight %}

这样打包发布之前只要改下DEBUG=false就行了，但是每次在发布之前都要手动去改这个变量，不是很方便，而且不排除开发者忘记改的情况。那么有没有更好更方便的做法呢？

ADT(r17)发布以后，Google为我们提供了一种新的调试机制，即BuildConfig.DEBUG。

ADT 17.0.0的New build features第二条如下描述:

> Added a feature that allows you to run some code only in debug mode. Builds now generate a class called BuildConfig containing a DEBUGconstant that is automatically set according to your build type. You can check the (BuildConfig.DEBUG) constant in your code to run debug-only functions.

即：新增了一个特性，允许开发者只在Debug模式下运行部分代码。Builds会生成一个叫做BuildConfig的类，该类包含一个名为DEBUG的常量，其常量值会依据开发者的Build类型自动设定。如此，便可以利用BuildConfig.DEBUG来实现只在Debug模式下运行的代码。

如果你的ADT已经更新到17及以上版本，可以尝试在Eclipse中新建一个Android工程，你会发现和R.java同级目录下多了一个叫做BuildConfig.java的类，其内容如下：

{% highlight ruby %}
/** Automatically generated file. DO NOT MODIFY */
package com.boohee.one;

public final class BuildConfig {
    public final static boolean DEBUG = true;
}
{% endhighlight %}

这样只需要改动一行代码就ok了，

{% highlight ruby %}
private static final boolean DEBUG = BuildConifg.DEBUG;
{% endhighlight %}

在上面提到，DEBUG会根据Build类型自动设定。那么Build类型又从哪里区分呢？很简单，点开Eclipse的Project菜单便可见分晓，如下图：

<img src="/image/eclipse_build1.jpg">
<img src="/image/eclipse_build2.jpg">

可见，Build类型分为Build Project和Build Automatically，即手动和自动。

 需要注意的是，如果直接通过Eclipse运行Project，则不论Build是手动还是自动，DEBUG均不会被设定为false。这是为什么呢？这就牵涉到Android 签名的问题，这里只简单提一下，不赘述：直接通过Eclipse运行Project，Eclipse会在工程Build完毕后在bin目录下生成一个apk，这个apk的签名是调试模式（debug mode），和发布模式（release mode）签名生成的apk略有不同。如此，该问题产生原因便浮出水面。

 此时肯定会有人说，直接使用Android Tools-->Export Signed Application Package导出的release mode apk，其DEBUG就是false。这是不对的。在生成Release版时，需要区分Build的类型。如果选择的是自动Build，那么DEBUG仍然会被设定为true。所以在生成Release版时，请按照下面这个步骤进行打包，BuildConfig.DEBUG会被修改为false：

 1. Project -> Build Automatically，即取消Build Automatically

 2. Project -> Clean

 3. Project -> Build
 
 4. Android Tools -> Export Android application