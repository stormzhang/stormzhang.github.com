---
layout: post
keywords: blog
description: blog
title: "onSaveInstanceState & onRestoreInstanceState"
categories: [Android]
tags: [Activity]
---
{% include codepiano/setup %}

前面两节主要详细讲解了Activity的生命周期方法以及一些特定的场景，其中涉及到onSaveInstanceState和onRestoreInstanceState这两个方法没有讲解，这篇博客就来分析下这两个方法的作用。

## onSaveInstanceState

onSaveInstanceState字面理解就是保存实例的状态，当某个activity变得“容易”被系统销毁时，该activity的onSaveInstanceState就会被执行，除非该activity是被用户主动销毁的，例如当用户按BACK键的时候。

注意上面的双引号，何为“容易”？言下之意就是该activity还没有被销毁，而仅仅是一种可能性。这种可能性有这么几种情况：

* 1、当用户按下HOME键时

这是显而易见的，系统不知道你按下HOME后要运行多少其他的程序，自然也不知道activity A是否会被销毁，故系统会调用onSaveInstanceState，让用户有机会保存某些非永久性的数据。以下几种情况的分析都遵循该原则

* 2、长按HOME键，选择运行其他的程序时。

* 3、按下电源按键（关闭屏幕显示）时。

* 4、从activity A中启动一个新的activity时。

* 5、屏幕方向切换时，例如从竖屏切换到横屏时。

在屏幕切换之前，系统会销毁activity A，在屏幕切换之后系统又会自动地创建activity A，所以onSaveInstanceState一定会被执行

总而言之，onSaveInstanceState的调用遵循一个重要原则，即当系统“未经你许可”时销毁了你的activity，则onSaveInstanceState会被系统调用，这是系统的责任，因为它必须要提供一个机会让你保存你的数据（当然你不保存那就随便你了）。

## onRestoreInstanceState

onSaveInstanceState字面理解就是恢复实例的状态, 需要注意的是，onSaveInstanceState方法和onRestoreInstanceState方法“不一定”是成对的被调用的，onRestoreInstanceState被调用的前提是，activity A“确实”被系统销毁了，而如果仅仅是停留在有这种可能性的情况下，则该方法不会被调用，例如，当正在显示activity A的时候，用户按下HOME键回到主界面，然后用户紧接着又返回到activity A，这种情况下activity A一般不会因为内存的原因被系统销毁，故activity A的onRestoreInstanceState方法不会被执行。

不过大多数情况下也是很少使用onRestoreInstanceState方法的，经常我们还是在onCreate方法里直接恢复状态的，onCreate方法里本身会有一个Bundle参数的，很多时候我们是这样使用的。（onCreate在onStart之前调用，而onRestoreInstanceState是在onStart之后调用）

{% highlight ruby %}
protected void onSaveInstanceState(Bundle savedInstanceState) {
    super.onSaveInstanceState(icicle);
    savedInstanceState.putLong("param", value);
}
{% endhighlight %}

{% highlight ruby %}
public void onCreate(Bundle savedInstanceState) {
    if (savedInstanceState != null){
        value = savedInstanceState.getLong("param");
    }
}
{% endhighlight %}


