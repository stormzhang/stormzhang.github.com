---
layout: post
keywords: blog
description: blog
title: "Java String Format"
categories: [Java]
tags: [String]
---
{% include codepiano/setup %}

在Android开发中，经常会用到和后端Api进行交互，而目前基本上都是REST风格的Api，会经常遇到拼接Url的情况，例如下面一个api：

{% highlight ruby %}
GET /api/v1/posts/:id.json?page=2&token=asdfghjkl
{% endhighlight %}

这里url里的id以及参数page和token都是动态的，这时候最好的做法就是用String.format()方法.

{% highlight ruby %}
final String POST = "/api/v1/posts/%1$d.json?page=%2$d&token=%3$s"
System.out.println(String.format(POST, 12, 1, "asdfghjkl"));

#=> /api/v1/posts/12.json?page=1&token=asdfghjkl
{% endhighlight %}

很方便吧，String.format是在JDK1.5中新增的静态方法，功能强。它主要功能是格式化数据，大致分为这些类（常规类型、字符类型、数值类型、日期类型）。它的语法如下： 
常规类型、字符类型和数值类型的格式说明符的语法：%[参数索引位置$][转换标识符][最小官渡][.保留精度位数]转换方式

如上述1$, 2$代表参数索引位置，而d, s则是转换标示符，关于更多的转换标示符见下面：

* %s    字符串类型    如"mingrisoft"

* %c    字符类型    'm'

* %b    布尔类型    true

* %d    整数类型（十进制）    99

* %x    整数类型（十六进制）    FF

* %o    整数类型（八进制）    77

* %f    浮点类型    99.99

* %a    十六进制浮点类型    FF.35AE

* %e    指数类型    9.38e+5

* %g    通用浮点类型（f和e类型中较短的）

* %%    百分比类型    ％

* %n    换行符

* %tx    日期与时间类型(x代表不同的日期与时间转换符)

这里只介绍一些简单的用法，String.format尤其对日期类型格式化的时候更加强大，更多用法详见JDK api.
