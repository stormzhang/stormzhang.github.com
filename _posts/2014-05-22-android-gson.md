---
layout: post
keywords: blog
description: blog
title: "Android Gson"
categories: [Android]
tags: [Gson]
---
{% include codepiano/setup %}

目前的客户端大都有和服务端进行交互，而数据的格式基本就是json了，于是在Android开发中就经常用到json解析，方便的是Google已经为我们提供了一个很棒的json解析库--gson，那么今天就来总结分享下gson的各种用法。

gson的官方下载地址：[google-gson](https://code.google.com/p/google-gson/)

## 单个对象

首先我们来看一个最简单的用法，假设json的数据格式是这样的：

{% highlight ruby %}
{
    "id": 100,
    "body": "It is my post",
    "number": 0.13,
    "created_at": "2014-05-22 19:12:38"
}
{% endhighlight %}

那么我们只需要定义对应的一个类:

{% highlight ruby %}
public class Foo {
    public int id;
    public String body;
    public float number;
    public String created_at;
}
{% endhighlight %}

使用起来只需如下几行代码就行了：
{% highlight ruby %}
public static final String JSON_DATA = "...";
Foo foo = new Gson().fromJson(JSON_DATA, Foo.class);
{% endhighlight %}

这里是最简单的用法，created_at直接定义了String类型，如果你想要Date类型的也可以，就变成下面的例子：

{% highlight ruby %}
public class Foo {
    public int id;
    public String body;
    public float number;
    public Date created_at;
}

public static final String JSON_DATA = "...";
GsonBuilder gsonBuilder = new GsonBuilder();
gsonBuilder.setDateFormat("yyyy-MM-dd HH:mm:ss");
Gson gson = gsonBuilder.create();
Foo foo = gson.fromJson(JSON_DATA, Foo.class);
{% endhighlight %}

有人说created_at不是java风格，java编程规范是驼峰结构，那么ok，Gson很人性化的也提供注解的方式，只需要把Foo对象改成这样就ok了：

{% highlight ruby %}
public class Foo {
    public int id;
    public String body;
    public float number;

    @SerializedName("created_at")
    public String createdAt;
}
{% endhighlight %}

然后用法不变，是不是很方便。

## 对象的嵌套

假设要返回如下数据：
{% highlight ruby %}
{
    "id": 100,
    "body": "It is my post",
    "number": 0.13,
    "created_at": "2014-05-22 19:12:38",
    "foo2": {
        "id": 200,
        "name": "haha"
    }
}
{% endhighlight %}

那么对象的定义是这样的

{% highlight ruby %}
public class Foo {
    public int id;
    public String body;
    public float number;
    public String created_at;
    public ChildFoo foo2;

    public class ChildFoo {
        public int id;
        public String name;
    }
}
{% endhighlight %}

## 对象数组

假如返回的是json数组，如下：

{% highlight ruby %}
[{
    "id": 100,
    "body": "It is my post1",
    "number": 0.13,
    "created_at": "2014-05-20 19:12:38"
},
{
    "id": 101,
    "body": "It is my post2",
    "number": 0.14,
    "created_at": "2014-05-22 19:12:38"
}]
{% endhighlight %}

这种解析有两种方法：

* 1、解析成数组

{% highlight ruby %}
public static final String JSON_DATA = "...";
Foo[] foos = new Gson().fromJson(JSON_DATA, Foo[].class);
// 这时候想转成List的话调用如下方法
// List<Foo> foosList = Arrays.asList(foos);
{% endhighlight %}

* 2、解析成List

{% highlight ruby %}
public static final String JSON_DATA = "...";
Type listType = new TypeToken<ArrayList<Foo>>(){}.getType();
ArrayList<Foo> foos = new Gson().fromJson(JSON_DATA, listType);
{% endhighlight %}

## 总结

上面基本就总结到开发中常用到的几种类型，用法很简单方便，主要需要json数据抽象成对应的数据模型就ok了。不过阿里也有一套自己的开源json解析库--FastJson，据说性能更佳，但是实际应用中感觉Gson的解析已经相当快了，而且更习惯用Google官方的东西，所以对[FastJson](https://github.com/alibaba/fastjson)没有怎么研究，以后有时间使用体验一下。
