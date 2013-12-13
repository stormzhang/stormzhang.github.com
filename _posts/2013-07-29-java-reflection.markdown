---
layout: post
title: "java反射机制"
tags: [Reflection]
categories: [Java]
---

Java 反射是Java语言的一个很重要的特征，它使得Java具体了“动态性”。

在Java运行时环境中，对于任意一个类，能否知道这个类有哪些属性和方法？对于任意一个对象，能否调用它的任意一个方法？答案是肯定的。这种动态获取类的信息以及动态调用对象的方法的功能来自于Java 语言的反射（Reflection）机制。

Java 反射机制主要提供了以下功能：

* 在运行时判断任意一个对象所属的类。
* 在运行时构造任意一个类的对象。
* 在运行时判断任意一个类所具有的成员变量和方法。
* 在运行时调用任意一个对象的方法。

Reflection 是Java被视为动态（或准动态）语言的一个关键性质。这个机制允许程序在运行时透过Reflection APIs取得任何一个已知名称的class的内部信息，包括其modifiers（诸如public, static 等等）、superclass（例如Object）、实现之interfaces（例如Serializable），也包括fields和methods的所有信息，并可于运行时改变fields内容或调用methods。

一般而言，开发者社群说到动态语言，大致认同的一个定义是：“程序运行时，允许改变程序结构或变量类型，这种语言称为动态语言”。从这个观点看，Perl，Python，Ruby是动态语言，C++，Java，C#不是动态语言。

尽管在这样的定义与分类下Java不是动态语言，它却有着一个非常突出的动态相关机制：Reflection。这个字的意思是“反射、映象、倒影”，用在Java身上指的是我们可以于运行时加载、探知、使用编译期间完全未知的classes。换句话说，Java程序可以加载一个运行时才得知名称的class，获悉其完整构造（但不包括methods定义），并生成其对象实体、或对其fields设值、或唤起其methods。这种“看透class”的能力（the ability of the program to examine itself）被称为introspection（内省、内观、反省）。Reflection和introspection是常被并提的两个术语。

在JDK中，主要由以下类来实现Java反射机制，这些类都位于java.lang.reflect包中：

* Class类：代表一个类。
* Field 类：代表类的成员变量（成员变量也称为类的属性）。
* Method类：代表类的方法。
* Constructor 类：代表类的构造方法。
* Array类：提供了动态创建数组，以及访问数组的元素的静态方法。

下面给出几个例子看看Reflection API的实际运用：

## 1.得到某个对象的属性

{% highlight ruby %}
public Object getProperty(Object owner, String fieldName) throws Exception {  
     Class ownerClass = owner.getClass();  
     Field field = ownerClass.getField(fieldName);  
     Object property = field.get(owner);  
     return property;  
}
{% endhighlight %}
Class ownerClass = owner.getClass()：得到该对象的Class。

Field field = ownerClass.getField(fieldName)：通过Class得到类声明的属性。

Object property = field.get(owner)：通过对象得到该属性的实例，如果这个属性是非公有的，这里会报IllegalAccessException。

## 2.得到某个类的静态属性

{% highlight ruby %}
public Object getStaticProperty(String className, String fieldName)  
             throws Exception {  
     Class ownerClass = Class.forName(className);  
     Field field = ownerClass.getField(fieldName);  
     Object property = field.get(ownerClass);  
     return property;  
}
{% endhighlight %}
Class ownerClass = Class.forName(className) ：首先得到这个类的Class。

Field field = ownerClass.getField(fieldName)：和上面一样，通过Class得到类声明的属性。

Object property = field.get(ownerClass) ：这里和上面有些不同，因为该属性是静态的，所以直接从类的Class里取。

## 3.执行某对象的方法

{% highlight ruby %}
public Object invokeMethod(Object owner, String methodName, Object[] args) throws Exception {  
     Class ownerClass = owner.getClass();  
     Class[] argsClass = new Class[args.length];  
     for (int i = 0, j = args.length; i < j; i++) {  
         argsClass[i] = args[i].getClass();  
     }  
     Method method = ownerClass.getMethod(methodName,argsClass);  
     return method.invoke(owner, args);  
}
{% endhighlight %}

Class owner_class = owner.getClass() ：首先还是必须得到这个对象的Class。

5～9行：配置参数的Class数组，作为寻找Method的条件。

Method method = ownerClass.getMethod(methodName, argsClass)：通过methodName和参数的argsClass（方法中的参数类型集合）数组得到要执行的Method。

method.invoke(owner, args)：执行该Method.invoke方法的参数是执行这个方法的对象owner，和参数数组args，可以这么理解：owner对象中带有参数args的method方法。返回值是Object，也既是该方法的返回值。

## 4.执行某个类的静态方法

{% highlight ruby %}
public Object invokeStaticMethod(String className, String methodName,  
             Object[] args) throws Exception {  
     Class ownerClass = Class.forName(className);  
     Class[] argsClass = new Class[args.length];  
     for (int i = 0, j = args.length; i < j; i++) {  
         argsClass[i] = args[i].getClass();  
     }  
     Method method = ownerClass.getMethod(methodName,argsClass);  
     return method.invoke(null, args);  
 }
{% endhighlight %}

基本的原理和实例3相同，不同点是最后一行，invoke的一个参数是null，因为这是静态方法，不需要借助实例运行。

## 5.新建实例

{% highlight ruby %}
public Object newInstance(String className, Object[] args) throws Exception {  
     Class newoneClass = Class.forName(className);  
     Class[] argsClass = new Class[args.length];  
     for (int i = 0, j = args.length; i < j; i++) {  
         argsClass[i] = args[i].getClass();  
     }  
     Constructor cons = newoneClass.getConstructor(argsClass);  
     return cons.newInstance(args);  
} 
{% endhighlight %}

这里说的方法是执行带参数的构造函数来新建实例的方法。如果不需要参数，可以直接使用newoneClass.newInstance()来实现。

Class newoneClass = Class.forName(className)：第一步，得到要构造的实例的Class。

第5～第9行：得到参数的Class数组。

Constructor cons = newoneClass.getConstructor(argsClass)：得到构造子。

cons.newInstance(args)：新建实例。

## 6.判断是否为某个类的实例

{% highlight ruby %}
public boolean isInstance(Object obj, Class cls) {  
     return cls.isInstance(obj);  
}
{% endhighlight %}

## 7.得到数组中的某个元素

{% highlight ruby %}
public Object getByArray(Object array, int index) {  
     return Array.get(array,index);  
}
{% endhighlight %}