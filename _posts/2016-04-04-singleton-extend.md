---
layout: post
keywords: blog
description: blog
title: "单例模式的一些注意点"
categories: [DesignPattern]
tags: [DesignPattern]
---
{% include codepiano/setup %}

昨天的文章不少人表示很不错，但是也有一些人给我留言给我一些反馈，那么今天这篇文章就做下一些注意事项的总结吧。


## 双重校验锁的坑

{% highlight ruby %}
public class Singleton {
 
    private static volatile Singleton instance = null;
 
    private Singleton(){
    }
 
    public static Singleton getInstance() {
        // if already inited, no need to get lock everytime
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
 
        return instance;
    }
}
{% endhighlight %}

从语义角度来看，并没有什么问题。但是其实还是有坑。说这个坑之前我们要先来看看volatile这个关键字。其实这个关键字有两层语义。第一层语义相信大家都比较熟悉，就是可见性。可见性指的是在一个线程中对该变量的修改会马上由工作内存（Work Memory）写回主内存（Main Memory），所以会马上反应在其它线程的读取操作中。顺便一提，工作内存和主内存可以近似理解为实际电脑中的高速缓存和主存，工作内存是线程独享的，主存是线程共享的。volatile的第二层语义是禁止指令重排序优化。大家知道我们写的代码（尤其是多线程代码），由于编译器优化，在实际执行的时候可能与我们编写的顺序不同。编译器只保证程序执行结果与源代码相同，却不保证实际指令的顺序与源代码相同。这在单线程看起来没什么问题，然而一旦引入多线程，这种乱序就可能导致严重问题。volatile关键字就可以从语义上解决这个问题。

注意，前面反复提到“从语义上讲是没有问题的”，但是很不幸，禁止指令重排优化这条语义直到jdk1.5以后才能正确工作。此前的JDK中即使将变量声明为volatile也无法完全避免重排序所导致的问题。所以，在jdk1.5版本前，双重检查锁形式的单例模式是无法保证线程安全的。

## 枚举类单例模式

不管饿汉式、懒汉式、双重校验锁还是静态内部类都有两个共同的缺点：

* 都需要额外的工作(Serializable、transient、readResolve())来实现序列化，否则每次反序列化一个序列化的对象实例时都会创建一个新的实例。

* 可能会有人使用反射强行调用我们的私有构造器（如果要避免这种情况，可以修改构造器，让它在创建第二个实例的时候抛异常）。

而枚举类很好的解决了这两个问题，使用枚举除了线程安全和防止反射强行调用构造器之外，还提供了自动序列化机制，防止反序列化的时候创建新的对象。因此，Effective Java推荐尽可能地使用枚举来实现单例。

但是在Android中却不推荐这种用法，在Android官网[Managing Your App's Memory](http://developer.android.com/training/articles/memory.html)中有这样一段话：

Enums often require more than twice as much memory as static constants. You should strictly avoid using enums on Android.

意思就是枚举类这种写法虽然简单方便，但是内存占用上是静态变量的两倍以上，所以尽可能的避免这种写法。

然而我的建议是，如果你的程序不是大量采用枚举，那么这种性能的体现是很小的，基本不会受到影响，不用特别在意。当然如果你的App出现了性能问题，理论上这个地方就是一个可以优化的性能优化点。

最后，不管采取何种方案，请时刻牢记单例的三大要点：

* 线程安全

* 延迟加载

* 序列化与反序列化安全


