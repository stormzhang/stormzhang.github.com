---
layout: post
keywords: blog
description: blog
title: "Android 布局优化"
categories: [Android]
tags: [Layout]
---
{% include codepiano/setup %}

在开发过程中我们经常说性能优化，但性能优化是一个比较宽泛的概念。在Android开发中性能优化可能包括：Java代码优化， 算法优化， SQLite优化， 布局优化等。那么这篇博客就来总结并分享下Android开发中的布局优化。

## 布局原则

在Android UI布局过程中，通过遵守一些惯用、有效的布局原则，我们可以制作出高效且复用性高的UI，概括来说包括如下几点：

* 尽量多使用RelativeLayout和LinearLayout, 不要使用绝对布局AbsoluteLayout，在布局层次一样的情况下， 建议使用LinearLayout代替RelativeLayout, 因为LinearLayout性能要稍高一点，但往往RelativeLayout可以简单实现LinearLayout嵌套才能实现的布局。

* 将可复用的组件抽取出来并通过include标签使用；

* 使用ViewStub标签来加载一些不常用的布局；

* 使用merge标签减少布局的嵌套层次；

## RelativeLayout VS LinearLayout

第一条原则说了布局层次一样的情况下LinearLayout比RelativeLayout要好， 但往往RelativeLayout可以简单实现LinearLayout嵌套才能实现的布局。假如需要实现如下布局：

<img src="http://progx.org/users/Gfx/android/relativelayout_wire_1.png">

用LinearLayout来实现xml代码如下：

{% highlight xml %}
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="?android:attr/listPreferredItemHeight"
    android:padding="6dip">
    
    <ImageView
        android:id="@+id/icon"
        android:layout_width="wrap_content"
        android:layout_height="fill_parent"
        android:layout_marginRight="6dip"
        android:src="@drawable/icon" />

    <LinearLayout
        android:orientation="vertical"
        android:layout_width="0dip"
        android:layout_weight="1"
        android:layout_height="fill_parent">

        <TextView
            android:layout_width="fill_parent"
            android:layout_height="0dip"
            android:layout_weight="1"
            android:gravity="center_vertical"
            android:text="My Application" />
            
        <TextView  
            android:layout_width="fill_parent"
            android:layout_height="0dip"
            android:layout_weight="1" 
            android:singleLine="true"
            android:ellipsize="marquee"
            android:text="Simple application that shows how to use RelativeLayout" />
            
    </LinearLayout>

</LinearLayout>
{% endhighlight %}

而用RelativeLayout实现代码如下：

{% highlight xml %}
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="?android:attr/listPreferredItemHeight"
    android:padding="6dip">
    
    <ImageView
        android:id="@+id/icon"
        android:layout_width="wrap_content"
        android:layout_height="fill_parent"
        android:layout_alignParentTop="true"
        android:layout_alignParentBottom="true"
        android:layout_marginRight="6dip"
        android:src="@drawable/icon" />

    <TextView  
        android:id="@+id/secondLine"
        android:layout_width="fill_parent"
        android:layout_height="26dip" 
        android:layout_toRightOf="@id/icon"
        android:layout_alignParentBottom="true"
        android:layout_alignParentRight="true"
        android:singleLine="true"
        android:ellipsize="marquee"
        android:text="Simple application that shows how to use RelativeLayout" />

    <TextView
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_toRightOf="@id/icon"
        android:layout_alignParentRight="true"
        android:layout_alignParentTop="true"
        android:layout_above="@id/secondLine"
        android:layout_alignWithParentIfMissing="true"
        android:gravity="center_vertical"
        android:text="My Application" />

</RelativeLayout>
{% endhighlight %}

可以看到用RelativeLayout实现，布局层次明显少了，所以大多数时候优先推荐使用RelativeLayout。

## 查看布局层次

如何查看布局层次呢？有两种办法：一是通过手机的开发者选项，4.0及以上Android版本可通过设置->开发者选项->显示布局边界打开页面布局显示，看看是否有不必要的节点和嵌套。第二种就是利用SDK自带的UI性能检测工具HierarchyViewer。
进入sdk目录下的tools文件夹下，找到HierarchyViewer并运行（此时保持你的模拟器或真机正在运行需要进行分析的App），双击我们正在显示的这个App所代表的进程。接下来便会进入hierarchyviewer的界面，我们可以在这里很清晰看到正在运行的UI的布局层次结构以及它们之间的关系。大概的显示如下图：

<img src="http://ryantang.me/images/2014/01/android_optimise_layout/4.png" />

通过布局图我们可以看到根节点DecorView下包含一个LinearLayout， 这个LinearLayout就是包含Activity布局和状态栏的整个屏幕显示的布局父节点，这个LinearLayout有两个子节点， 一个是FrameLayout, FrameLayout就是Activity布局中默认的父布局节点, 这个节点下面就包含了我们自己写的xml布局， 还有一个子节点就是ViewStub，关于这个节点我们在后面会详细介绍。
