---
layout: post
keywords: blog
description: blog
title: "java.lang.ExceptionInInitializerError"
categories: [Java]
tags: [Java]
---
{% include codepiano/setup %}

最近开发的过程中遇到这个错误，Google才找到原因，后面才恍然大悟还有这个小细节没有注意，遂记录在此。

这个错误是说变量初始化出现问题，通常出现在静态变量尤其是单例模式。这种问题往往是初始化顺序不对造成的，下面举个简单的例子来解释：

{% highlight ruby %}
import java.util.HashMap;  
import java.util.Map;  
  
public class Foo {  
  
    private static Foo foo = new Foo();
      
    private static Map<Integer,Boolean> test =  new HashMap<Integer, Boolean>();
      
    private Foo() {
        test.put(1, true);  
    }
      
    public static Foo getInstance() {
        return foo;
    }
}
{% endhighlight %}

如果你在别的类调用getInstance，就会报错ExceptionInInitializerError。这是因为类加载时不会为实例变量赋值，对象创建时不会为静态变量赋值。我们调用getInstance时，此类就开始加载，加载的时候不会为实例变量赋值，但是会按顺序给静态变量赋值，所以先为foo赋值，然后为test赋值即初始化。但为foo赋值时出现了个小插曲，它会调用构造方法创建一个对象。对象创建时不会为静态变量test赋值，而构造器内却已经调用test，于是报错了。

改为：

{% highlight ruby %}
private static Map<Integer,Boolean> test = new HashMap<Integer, Boolean>();
private static Foo foo = new Foo();
{% endhighlight %}
