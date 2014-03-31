---
layout: post
keywords: blog
description: blog
title: "Android SwipeRefreshLayout"
categories: [Android]
tags: [SwipeRefreshLayout]
---
{% include codepiano/setup %}


今天在Google+上看到了SwipeRefreshLayout这个名词，遂搜索了下，发现竟然是刚刚google更新sdk新增加的一个widget，于是赶紧抢先体验学习下。

## SwipeRefreshLayout

SwipeRefreshLayout字面意思就是下拉刷新的布局，继承自ViewGroup，在support v4兼容包下，但必须把你的support library的版本升级到19.1。 提到下拉刷新大家一定对ActionBarPullToRefresh比较熟悉，而如今google推出了更官方的下拉刷新组件，这无疑是对开发者来说比较好的消息。利用这个组件可以很方便的实现Google Now的刷新效果，见下图：

<img src="/image/SwipeRefreshLayout.gif">

## 主要方法

* setOnRefreshListener(OnRefreshListener): 为布局添加一个Listener

* setRefreshing(boolean): 显示或隐藏刷新进度条

* isRefreshing(): 检查是否处于刷新状态

* setColorScheme(): 设置进度条的颜色主题，最多能设置四种

## xml布局文件

布局文件很简单，只需要在最外层加上SwipeRefreshLayout，然后他的child是可滚动的view即可，如ScrollView或者ListView。如：

{% highlight xml %}
<android.support.v4.widget.SwipeRefreshLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/swipe_container"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
 
    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent">
 
        <TextView
            android:text="@string/hello_world"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:gravity="center"/>
    </ScrollView>
 
</android.support.v4.widget.SwipeRefreshLayout>
{% endhighlight %}

## Activity代码

{% highlight ruby %}
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
 
    swipeLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_container);
    swipeLayout.setOnRefreshListener(this);
    swipeLayout.setColorScheme(android.R.color.holo_blue_bright, 
            android.R.color.holo_green_light, 
            android.R.color.holo_orange_light, 
            android.R.color.holo_red_light);
}
 
public void onRefresh() {
    new Handler().postDelayed(new Runnable() {
        @Override public void run() {
            swipeLayout.setRefreshing(false);
        }
    }, 5000);
}
{% endhighlight %}

上面的代码很简单，只需要给SwipeRefreshLayout添加一个listener，值得说明的是setColorScheme方法是设置刷新进度条的颜色，最多只能设置4种循环显示，默认第一个是随用户手势加载的颜色进度条。

## 源码

写了的小demo在github上，地址在：[SwipeRefreshLayoutDemo](https://github.com/stormzhang/SwipeRefreshLayoutDemo)

## 总结

google在不断完善自己的sdk，推出越来越多的组件，其目的是让开发更简单，设计上更统一，这可能是google未来的方向，不管怎样，这对开发者来说无疑是非常好的消息。

