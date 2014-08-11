---
layout: post
keywords: blog
description: blog
title: "Java String StringBuilder StringBuffer"
categories: [Java]
tags: [String]
---
{% include codepiano/setup %}

## 概览

在Android/Java开发中，用来处理字符串常用的类有3种: String、StringBuilder、StringBuffer。

它们的异同点：

* 1) 都是 final 类, 都不允许被继承;

* 2) String 长度是不可变的, StringBuffer、StringBuilder 长度是可变的;

* 3) StringBuffer 是线程安全的, StringBuilder 不是线程安全的。

## String VS StringBuffer

String 类型和StringBuffer的主要性能区别：String是不可变的对象, 因此在每次对String 类型进行改变的时候，都会生成一个新的 String 对象，然后将指针指向新的 String 对象，所以经常改变内容的字符串最好不要用 String ，因为每次生成对象都会对系统性能产生影响，特别当内存中无引用对象多了以后， JVM 的 GC 就会开始工作，性能就会降低。

使用 StringBuffer 类时，每次都会对 StringBuffer 对象本身进行操作，而不是生成新的对象并改变对象引用。所以多数情况下推荐使用 StringBuffer ，特别是字符串对象经常改变的情况下。

在某些特别情况下， String 对象的字符串拼接其实是被 Java Compiler 编译成了 StringBuffer 对象的拼接，所以这些时候 String 对象的速度并不会比 StringBuffer 对象慢，例如：

{% highlight ruby %}
String s1 = “This is only a” + “ simple” + “ test”;
StringBuffer Sb = new StringBuilder(“This is only a”).append(“ simple”).append(“ test”);
{% endhighlight %}

生成 String s1对象的速度并不比 StringBuffer慢。其实在Java Compiler里，自动做了如下转换：

Java Compiler直接把上述第一条语句编译为：

{% highlight ruby %}
String s2 = “This is only a”;  
String s3 = “ simple”;  
String s4 = “ test”;  
String s1 = s2 + s3 + s4;
{% endhighlight %}

这时候，Java Compiler会规规矩矩的按照原来的方式去做，String的concatenation（即+）操作利用了StringBuilder（或StringBuffer）的append方法实现，此时，对于上述情况，若s2，s3，s4采用String定义，拼接时需要额外创建一个StringBuffer（或StringBuilder），之后将StringBuffer转换为String；若采用StringBuffer（或StringBuilder），则不需额外创建StringBuffer。

## StringBuilder

StringBuilder是5.0新增的。此类提供一个与 StringBuffer 兼容的 API，但不保证同步。该类被设计用作 StringBuffer 的一个简易替换，用在字符串缓冲区被单个线程使用的时候（这种情况很普遍）。如果可能，建议优先采用该类，因为在大多数实现中，它比 StringBuffer 要快。两者的方法基本相同。

## 使用策略

* 1) 基本原则：如果要操作少量的数据，用String ；单线程操作大量数据，用StringBuilder ；多线程操作大量数据，用StringBuffer。

* 2) 不要使用String类的"+"来进行频繁的拼接，因为那样的性能极差的，应该使用StringBuffer或StringBuilder类，这在Java的优化上是一条比较重要的原则。例如：

{% highlight ruby %}
String result = "";  
for (String s : hugeArray) {  
    result = result + s;  
}  
  
// 使用StringBuilder  
StringBuilder sb = new StringBuilder();  
for (String s : hugeArray) {  
    sb.append(s);  
}  
String result = sb.toString();
{% endhighlight %}

当出现上面的情况时，显然我们要采用第二种方法，因为第一种方法，每次循环都会创建一个String result用于保存结果，除此之外二者基本相同.

* 3) StringBuilder一般使用在方法内部来完成类似"+"功能，因为是线程不安全的，所以用完以后可以丢弃。StringBuffer主要用在全局变量中。

* 4) 相同情况下使用 StirngBuilder 相比使用 StringBuffer 仅能获得 10%~15% 左右的性能提升，但却要冒多线程不安全的风险。而在现实的模块化编程中，负责某一模块的程序员不一定能清晰地判断该模块是否会放入多线程的环境中运行，因此：除非确定系统的瓶颈是在 StringBuffer 上，并且确定你的模块不会运行在多线程模式下，才可以采用StringBuilder；否则还是用StringBuffer。

