---
layout: post
keywords: actionbar
title: "Android ActionBar Compact"
tags: [ActionBar, IO2013]
categories: [Android]
---
{% include codepiano/setup %}

## 介绍

自Action Bar设计概念在Android 3.0(API 11) 中被Google引入以后，在4.0版本之后更是被Google纳入设计规范中，从Google的各大App中都可以看到这种设计。

但Action Bar虽好，它出现之初Android官方版本的ActionBar 只支持Android 3.0 (API 11)及以后的系统版本。而由于Android众所周知的碎片化问题，当开发者试图在minSdkVersion小于11的系统上使用Action Bar时只好使用大名鼎鼎的JakeWharton发布的[ActionBarSherlock](https://github.com/JakeWharton/ActionBarSherlock)。

还好，在Google I/O 2013后，官方版本的兼容 Android 2.1(API 7)及其以后版本的ActionBarCompat终于发布了 （包含在Support Library v7 r18中）。原本使用ActionBarSherlock的一众应用们也开始了升级至ActionBarCompat的工作。这篇博客就来分享下如何使用ActionBarCompat实现Action Bar。

<!-- more -->

首先确认了开发环境中Android SDK已经安装了Support Library r18或以上，目前最新的是19, 接下来，开始实际建立一个ActionBar的开发实例。实现一个含有Action Bar Icon, Title, Action Item 以及Action Overflow的ActionBar Hello World应用。效果如下

<img src="http://bcs.duapp.com/mobiletuts//blog/201310//actionbar_sample.png">

Eclipse+Android ADT环境下:

## 1. Create a blank Android Project

创建一个空的Android项目，这里具体就不再赘述。

## 2. 将Support V7 appcompat Library添加至工程

a. 导入ActionBarCompat工程(这个工程是个Library)

    ActionBarCompat的source code位置是:<Android SDK目录>/extras/android/support/v7/appcompat

这样我们就得到一个名叫android-support-v7-appcompat 的library project

b. 接着在自己新建的project点击右键->选择Properties->选择Android选项

<img src="http://bcs.duapp.com/mobiletuts//blog/201310//add_library_eclipse.png">

点Add, 然后选择 android-support-v7-appcompat

<img src="http://bcs.duapp.com/mobiletuts//blog/201310//android-support-v7-appcompat.png">

点击OK 搞定。

## 3. Update Style Resources

刚才说了ActionBarCompat在使用中会调用一些资源文件，尤其是基于Theme.AppCompat的主题(Theme)用来规范Action Bar的显示。如果使用Action Bar的Activity没有使用基于Theme.AppCompat的主题，程序就不知道该如何配置Action Bar的显示，就会报错导致程序退出。

在AndroidManifest中讲Application的 android:theme属性设置为Theme.AppCompat系列Theme。

{% highlight ruby %}

<application
    android:label="@string/app_name"
    android:icon="@drawable/ic_launcher"
    android:theme="@style/Theme.AppCompat.Light">

{% endhighlight %}

如果你在使用自定义的Theme，则该Theme的parent应设置为Theme.AppCompat系列Theme.

{% highlight ruby %}
<!-- Application theme. -->
<style name="AppTheme" parent="@style/Theme.AppCompat.Light">
    <item name="android:windowNoTitle">true</item>
    <item name="android:windowBackground">@color/global_main_bg</item>
</style>
{% endhighlight %}

## 4. Extend ActionBarActivity

当要在Activity中使用ActionBar，并要求兼容Android 2.1~3.0之间的系统时，我们不能像往常那样extend Activity，而应extend ActionBarActivity（原因如上所属，Android 3.0以前的系统中Activity API里是没有ActionBar接口的 自然也就无法调用。为了向下兼容，必须使用ActionBarActivity）。

{% highlight ruby %}
import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;

public class MainActivity extends ActionBarActivity {

    private ActionBar actionBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        actionBar=getSupportActionBar();
        //actionBar operation
        actionBar.setTitle("ActionBar");
        //....
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
}
{% endhighlight %}

## 5. 修改menu/main.xml (也就是Action Bar中的Action Items)

你的project中会有一个默认的main.xml，为了向Action Bar中添加几个功能按钮(也就是Action Items)，我们需要对menu/main.xml进行些修改：

* 在root element中添加一个attribute

* 添加新的item项

如下：

{% highlight ruby %}
<menu
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <item android:id="@+id/action_settings"
        android:title="@string/action_settings"
        android:orderInCategory="100"
        app:showAsAction="always" />
    <item android:id="@+id/action_search"
        android:title="@string/action_search"
        android:orderInCategory="1"
        android:icon="@drawable/action_search"
        app:showAsAction="always" />
</menu>
{% endhighlight %}

Action Items广泛使用的一些icon，你可以从[Download the Action Bar Icon Pack](http://commondatastorage.googleapis.com/androiddevelopers/design/Android_Design_Icons_20130926.zip)下载到。

<img src="http://bcs.duapp.com/mobiletuts//blog/201310//action_bar_icons.png">

最后，如果需要在程序中对ActionBar进行操作，可以通过getSupportActionBar()来实现。

{% highlight ruby %}
actionBar = getSupportActionBar();
//actionBar operation
actionBar.setTitle("ActionBar");
{% endhighlight %}