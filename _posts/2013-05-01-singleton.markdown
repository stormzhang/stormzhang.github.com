---
layout: post
title: "设计模式之单例模式"
tags: [Singleton]
categories: [DesignPatterns]
---
{% include codepiano/setup %}

## 单例模式解释

单例模式是一种对象创建性模式，使用单例模式，可以保证为一个类只生成唯一的实例对象。也就是说，在整个程序空间中，该类只存在一个实例对象。

单例模式的要点有三个：一是某个类只能有一个实例；而是必须自行创建整个实例；三是它必须自行向整个系统提供整个实例。

英文定义为：Ensure a class only has one instance, and provide a global point of access to it.

## 单例模式深入分析

单例模式适合一个类只有一个实例的情况， 比如窗口管理器，打印缓冲池和文件系统，它们都是原型的例子。典型的情况是，那些对象的类型被遍及一个软件系统的不同对象访问，因此需要一个全局的访问指针，这便是总所周知的单例模式的应用。当然这只有在你确信你不再需要任何多于一个的实例的情况下。

## 使用场景及代码实现

下面就举例来说明下：

单例模式的第一个版本，“饿汉式”，也就是当类加载进来的就立即实例化对象，但是这种方式比较的消耗计算机资源。如下：


{% highlight ruby %}
public class Foo {
    // 在类被加载进入内存的时候就创建单一的Foo对象
    public static final Foo foo = new Foo();

    // 构造函数私有化
    private Foo() {

    }

    // 提供一个全局的静态方法
    public static Foo getFoo() {
        return foo;
    }
}
{% endhighlight %}

单例模式的第二个版本，“懒汉式”，在单线程下能够非常好的工作，但是在多线程下存在线程安全问题，如下：

{% highlight ruby %}
// 这种方式在需要使用的时候才实例化
public class Foo {
    private static Foo foo;

    // 构造函数私有化
    private Foo() {

    }

    // 提供一个全局的静态方法
    public static Foo getFoo() {
        if (foo == null) {
            foo = new Foo();
        }
        return foo;
    }
}
{% endhighlight %}

单例模式的第三个版本，为解决多线程问题，采用了对函数进行同步的方式，但是比较浪费资源，因为每次都要进行同步检查，而实际中真正需要检查只是第一次实例化的时候，如下：

{% highlight ruby %}
public class Foo {
    private static Foo foo;

    // 构造函数私有化
    private Foo() {
    }

    // 提供一个全局的静态方法，使用同步方法
    public static synchronized Foo getFoo() {
        if (foo == null) {
            foo = new Foo();
        }
        return foo;
    }
}
{% endhighlight %}

单例模式的第四个版本，既解决了”懒汉式“的多线程问题，又解决了资源浪费的现象，看上去是一种不错的选择，如下：

{% highlight ruby %}
public class Foo {
    private static Foo foo;

    // 构造函数私有化
    private Foo() {
    }

    // 提供一个全局的静态方法
    public static Foo getFoo() {
        if (foo == null) {
            synchronized (Foo.class) {
                if (foo == null) {
            	    foo = new Foo();
                }
            }
        }
        return foo;
    }
}
{% endhighlight %}

## 单例模式的优缺点分析

优点：客户端使用单例模式的实例的时候，只需要调用一个单一的方法即可生成一个唯一的实例，有利于节约资源。

缺点：首先单例模式很难实现序列化，这就导致采用单例模式的类很难被持久化，当然也很难通过网络传输；其次由于单例采用静态方法，无法在继承结构中使用。