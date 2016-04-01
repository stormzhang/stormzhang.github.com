---
layout: post
keywords: blog
description: blog
title: "Android设计模式之单例模式"
categories: [DesignPattern]
tags: [DesignPattern]
---
{% include codepiano/setup %}

经常有人问我说Android学习如何进阶？不管你怎么走，设计模式可谓是进阶必备，对设计模式的理解与运用对你之后的代码书写与架构设计有很多的帮助作用，那么从今天开始我就抽时间来给大家分享下设计模式系列。

什么是设计模式？其实简单的理解就是前人留下来的一些经验总结而已，然后把这些经验起了个名字叫Design Pattern，翻译过来就是设计模式的意思，通过使用设计模式可以让我们的代码复用性更高，可维护性更高，让你的代码写的更优雅。设计模式理论上有23种，但是我只会针对Android平台上常用的一些设计模式做分享，今天就先来分享下最常用的单例模式。

## 饿汉式

{% highlight ruby %}
public class Singleton{

    private static Singleton instance = new Singleton();

    private Singleton(){}

    public static Singleton newInstance(){
        return instance;
    }
}
{% endhighlight %}

**饿汉式** 是最简单的实现方式，这种实现方式适合那些在初始化时就要用到单例的情况，这种方式简单粗暴，如果单例对象初始化非常快，而且占用内存非常小的时候这种方式是比较合适的，可以直接在应用启动时加载并初始化。
但是，如果单例初始化的操作耗时比较长而应用对于启动速度又有要求，或者单例的占用内存比较大，再或者单例只是在某个特定场景的情况下才会被使用，而一般情况下是不会使用时，使用**饿汉式**的单例模式就是不合适的，这时候就需要用到**懒汉式**的方式去按需延迟加载单例。

## 懒汉式

{% highlight ruby %}
public class Singleton{
    private static Singleton instance = null;

    private Singleton(){}

    public static Singleton newInstance(){
        if(null == instance){
            instance = new Singleton();
        }
        return instance;
    }
}
{% endhighlight %}


**懒汉式**与**饿汉式**的最大区别就是将单例的初始化操作，延迟到需要的时候才进行，这样做在某些场合中有很大用处。比如某个单例用的次数不是很多，但是这个单例提供的功能又非常复杂，而且加载和初始化要消耗大量的资源，这个时候使用**懒汉式**就是非常不错的选择。

## 多线程下的单例模式

上面介绍了一些单例模式的基本应用方法，但是上面所说的那些使用方式都是有一个隐含的前提，那就是他们都是应用在单线程条件下，一旦换成了多线程就有出错的风险。

如果在多线程的情况下，**饿汉式**不会出现问题，因为JVM只会加载一次单例类，但是**懒汉式**可能就会出现重复创建单例对象的问题。为什么会有这样的问题呢？因为**懒汉式**在创建单例时是 线程不安全的，多个线程可能会并发调用他的**newInstance**方法导致多个线程可能会创建多份相同的单例出来。

那有没有办法，使**懒汉式**的单利模式也是线程安全的呢？答案肯定是有的，就是使用加同步锁的方式去实现。

## 懒汉式同步锁

{% highlight ruby %}
public class Singleton {
 
    private static Singleton instance = null;
 
    private Singleton(){
    }
 
    public static Singleton getInstance() {
        synchronized (Singleton.class) {
            if (instance == null) {
                instance = new Singleton();
            }
        }
 
        return instance;
    }
}
{% endhighlight %}

这种是最常见的解决同步问题的一种方式，使用同步锁synchronized (Singleton.class)防止多线程同时进入造成instance被多次实例化。举个在Android使用这种方式的例子：

## InputMethodManager示例

{% highlight ruby %}
public final class InputMethodManager {
    //内部全局唯一实例  
    static InputMethodManager sInstance;
   
    //对外api  
    public static InputMethodManager getInstance() {
        synchronized (InputMethodManager.class) {
            if (sInstance == null) {
                IBinder b = ServiceManager.getService(Context.INPUT_METHOD_SERVICE);
                IInputMethodManager service = IInputMethodManager.Stub.asInterface(b);
                sInstance = new InputMethodManager(service, Looper.getMainLooper());
            }
            return sInstance;
        }
    }
}  
{% endhighlight %}

以上是Android源码中输入法类相关的单例使用方式。

但其实还有一种更好的方式如下：

## 双重校验锁

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

可以看到上面在synchronized (Singleton.class)外又添加了一层if，这是为了在instance已经实例化后下次进入不必执行synchronized (Singleton.class)获取对象锁，从而提高性能。

以上两种方式还是挺麻烦的，我们不禁要问，有没有更好的实现方式呢？答案是肯定的。 我们可以利用JVM的类加载机制去实现。在很多情况下JVM已经为我们提供了同步控制，比如：

* 在static{}区块中初始化的数据

* 访问final字段时

* 等等

因为在JVM进行类加载的时候他会保证数据是同步的，我们可以这样实现：

采用内部类，在这个内部类里面去创建对象实例。这样的话，只要应用中不使用内部类 JVM 就不会去加载这个单例类，也就不会创建单例对象，从而实现**懒汉式**的延迟加载和线程安全。

实现代码如下：

## 静态内部类

{% highlight ruby %}
public class Singleton{
    //内部类，在装载该内部类时才会去创建单利对象
    private static class SingletonHolder{
        public static Singleton instance = new Singleton();
    }

    private Singleton(){}

    public static Singleton newInstance(){
        return SingletonHolder.instance;
    }

    public void doSomething(){
        //do something
    }
}
{% endhighlight %}


这样实现出来的单例类就是线程安全的，而且使用起来很简洁，麻麻再也不用担心我的单例不是单例了。

然而这还不是最简单的方式，**Effective Java**中推荐了一种更简洁方便的使用方式，就是使用枚举。

## 枚举类型单例模式

{% highlight ruby %}
public enum Singleton{
    //定义一个枚举的元素，它就是Singleton的一个实例
    instance;

    public void doSomething(){
        // do something ...
    }    
}
{% endhighlight %}

使用方法如下：

{% highlight ruby %}
public static void main(String[] args){
   Singleton singleton = Singleton.instance;
   singleton.doSomething();
}
{% endhighlight %}

默认枚举实例的创建是线程安全的.(创建枚举类的单例在JVM层面也是能保证线程安全的),
所以不需要担心线程安全的问题，所以理论上枚举类来实现单例模式是最简单的方式。

## 总结

一般单例模式包含了5种写法，分别是饿汉、懒汉、双重校验锁、静态内部类和枚举。相信看完之后你对单例模式有了充分的理解了，根据不同的场景选择最你最喜欢的一种单例模式吧！

---

## 参考

[你真的会用单例模式吗](http://tedyin.me/2016/03/13/singlton-pattern/)

本文大量参考了上面我一位同事的文章，并在此进行了补充与总结，感谢。



