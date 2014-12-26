---
layout: post
keywords: blog
description: blog
title: "Android AdapterView setEmptyView"
categories: [Android]
tags: [AdapterView]
---
{% include codepiano/setup %}

当我们使用ListView或GridView的时候，当列表为空的时候，我们往往需要一个Loading或者一段提示文字又或者一个特殊的View来提示用户操作，这个时候就用到了setEmptyView()方法。

setEmptyView()其实是AdapterView的方法，而我们开发中常用到的ListView, GridView, ExpandableListView等都是继承于AdapterView的，所以可以直接调用这个方法，下面来看看具体的如何使用：

以默认显示一个提示文字的TextView为例,一般有以下两种用法：

## 1. Empty View和ListView在同一个布局文件里

{% highlight ruby %}
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android" 
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ListView 
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/list_view" />

    <TextView 
        android:id="@+id/tv_empty"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Loading data..." />

</FrameLayout>
{% endhighlight %}

{% highlight ruby %}
ListView listView = (ListView)findViewById(R.id.list_view);
listView.setEmptyView(findViewById(R.id.tv_empty));
{% endhighlight %}

## 2. Empty View在单独的布局文件里，这种一般适用于比较复杂的View或者打算在多个地方复用

setEmptyView()这个方法是有限制的，这个View必须在当前的View hierarchy的节点上，所以当我们写在外面单独的布局文件里时，需要把View添加到当前的View hierarchy的节点上。所以就需要下面的用法：

{% highlight ruby %}
View emptyView = View.inflate(R.layout.empty_view, null);
((ViewGroup)list.getParent()).addView(emptyView);
ListView listView = (ListView)findViewById(R.id.list_view);
listView.setEmptyView(emptyView); 
{% endhighlight %}
