---
layout: post
title: "设计模式之建造者模式"
tags: [Builder]
categories: [DesignPatterns, Java]
---

Builder模式定义：将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

Builder模式是一步一步创建一个复杂的对象，它允许用户可以只通过指定复杂对象的类型和内容就可以构建它们。用户不知道内部的具体构建细节。Builder模式是非常类似抽象工厂模式，细微的区别大概只有在反复使用中才能体会到。

## 为何使用建造者模式

是为了将构建复杂对象的过程和它的部件解耦。注意：是解耦过程和部件。

因为一个复杂的对象，不但有很多大量组成部分，如汽车，有很多部件：车轮、方向盘、发动机，还有各种小零件等等，部件很多，但远不止这些，如何将这些部件装配成一辆汽车，这个装配过程也很复杂(需要很好的组装技术)，Builder模式就是为了将部件和组装过程分开。

## 如何使用建造者模式

首先假设一个复杂对象是由多个部件组成的，Builder模式是把复杂对象的创建和部件的创建分别开来，分别用Builder类和Director类来表示。

首先,需要一个接口，它定义如何创建复杂对象的各个部件：

{% highlight ruby %}
public interface Builder {
　//创建部件A　　比如创建汽车车轮
　void buildPartA();
　//创建部件B 比如创建汽车方向盘
　void buildPartB();
　//创建部件C 比如创建汽车发动机
　void buildPartC();
　//返回最后组装成品结果 (返回最后装配好的汽车)
　//成品的组装过程不在这里进行,而是转移到下面的Director类中进行.
　//从而实现了解耦过程和部件
　Product getResult();
}
{% endhighlight %}

用Director构建最后的复杂对象，而在上面Builder接口中封装的是如何创建一个个部件(复杂对象是由这些部件组成的)，也就是说Director的内容是如何将部件最后组装成成品：

{% highlight ruby %}
public class Director {
　private Builder builder;
　public Director( Builder builder ) {
　　this.builder = builder;
　}
　// 将部件partA partB partC最后组成复杂对象
　//这里是将车轮 方向盘和发动机组装成汽车的过程
　public void construct() {
　　builder.buildPartA();
　　builder.buildPartB();
　　builder.buildPartC();
　}
}
{% endhighlight %}

Builder的具体实现ConcreteBuilder：
* 通过具体完成接口Builder来构建或装配产品的部件；
* 定义并明确它所要创建的是什么具体东西；
* 提供一个可以重新获取产品的接口。

{% highlight ruby %}
public class ConcreteBuilder implements Builder {
　Part partA, partB, partC;
　public void buildPartA() {
　　//这里是具体如何构建partA的代码
　};
　public void buildPartB() {
　　//这里是具体如何构建partB的代码
　};
　public void buildPartC() {
　　//这里是具体如何构建partB的代码
　};
　public Product getResult() {
　　//返回最后组装成品结果
　};
}
{% endhighlight %}

复杂对象：产品Product：

{% highlight ruby %}
public interface Product { }
{% endhighlight %}

复杂对象的部件：

{% highlight ruby %}
public interface Part { }
{% endhighlight %}

我们看看如何调用Builder模式:

{% highlight ruby %}
ConcreteBuilder builder = new ConcreteBuilder();
Director director = new Director( builder );
director.construct();
Product product = builder.getResult();
{% endhighlight %}

通过上面我们可以看到：建造者模式的好处就是使得建造代码与表示代码分离，由于建造者隐藏了该产品是如何组装的，所以若需要改变一个产品的内部表示，只需要再定义一个具体的建造者就可以了。