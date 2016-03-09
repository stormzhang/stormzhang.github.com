---
layout: post
keywords: blog
description: blog
title: "Android ViewFinder"
categories: [Android, AndroidTips]
tags: [ViewFinder]
---
{% include codepiano/setup %}

在Android获取一个View一般都是通过如下方式：

    TextView textView = (TextView) findViewById(R.id.textview);

相信大家都写过无数次findViewById了吧，每次都要Cast一下是否很不爽啊。今天就来介绍三种简便的方法避免这种Cast

## 第一种

在项目基类BaseActivity中添加如下函数:

{% highlight ruby %}
@SuppressWarnings(“unchecked”)
public final <E extends View> E getView (int id) {
    try {
        return (E) findViewById(id);
    } catch (ClassCastException ex) {
        Log.e(TAG, “Could not cast View to concrete class.”, ex);
        throw ex;
    }
}
{% endhighlight %}

然后就可以通过如下方式获取View了:

{% highlight ruby %}
TextView textView = getView(R.id.textview);
Button button = getView(R.id.button);
ImageView image = getView(R.id.imageview);
注意：如果级联调用getView 函数，则还是需要Cast的，如下示例：
private static void myMethod (ImageView img) {
    //Do nothing
}
@Override
public void onCreate (Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    myMethod(getView(R.id.imageview)); //这样无法通过编译
    myMethod((ImageView) getView(R.id.imageview)); //需要Cast才可以
}
{% endhighlight %}

## 第二种

第一种方法只在Activity里有效，其实我们经常在其他View或者Fragment里也常用findViewById方法，当然你可以把上述方法copy一遍，但是这违反了面向对象基本的封装原则，有大神封装了一个ViewFinder类，具体代码可以见我Gist上的文件[ViewFinder.java](https://gist.github.com/stormzhang/37dc0b94be61eb6c015c), 使用的时候你只需要在你的Activity或者View里这样使用:

{% highlight ruby %}
ViewFinder finder = new ViewFinder(this);
TextView textView = finder.find(R.id.textview);
{% endhighlight %}

## 第三种

前两种方法本质上是利用了泛型，还有一种利用注解的方式，使用起来更方便，不仅省事的处理了findViewById，甚至包括setOnClickListener这种方法也能很方便的调用，具体见我这篇博客[ButterKnife--View注入框架](http://stormzhang.com/openandroid/android/2014/01/12/android-butterknife)。

注意：如果你是使用的Eclipse引用该library，你需要参考这里[Eclipse Configuration](http://jakewharton.github.io/butterknife/ide-eclipse.html)做一些配置，否则会运行出错。
