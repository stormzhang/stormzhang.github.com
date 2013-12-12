---
layout: post
title: "Ruby闭包: Block, Proc, lambda"
tags: [Ruby]
categories: [RubyOnRails]
---

Ruby中的闭包非常强大，也非常重要，所以决定系统的学习下。

闭包（Closure），是指未绑定到任何对象的自由代码，闭包中的代码与任何对象和全局变量无关，只与执行此段代码的上下文相关。

Ruby中闭包的实现有：Block，Proc，Lambada。在学习它们的区别的时候，网上讲的都不是很全面，突然记起[vincent](http://v.baiyulan.net)在以前的一篇开发周记中专门讲到这个主题，遂又仔细的通读了一遍，讲的非常详细全面，顿时就彻底弄懂了，于是也记录在这里，以便分享与以后查阅。

## 首先，我们来看Block。

{% highlight ruby %}

arr = [1,2,3,4,5]  
arr.each { |item| puts item }

{% endhighlight %}

这段代码，我们使用了Array对象的block方法，将ary中的每个元素打印出来。从例子中我们可以看到block使用起来很方便，想必传统的Java以及C编码，省略掉了冗余的循环，让你更加专注业务代码，这也是ruby的好处之一。

使用block的最大好处就是可以省略重复的冗余的无用的代码，我们再来看一个读文件的例子：

{% highlight ruby %}

File.open(__FILE__) do |f|
  puts f.readlines
end

{% endhighlight %}

对比用Java代码来读文件，每次都很反感那个冗长的try-catch-finally。从上面的ruby代码中我么可以看到，ruby语言给你做了处理，通过block你可以不用写无用的系统代码了。

从上面的例子我们可以看到，Ruby中的Block对开发者来说，不用再写那些冗余无用的系统代码，而是更加专注业务代码，提升开发效率。

## 其次，我们再看Proc。

如果你经常使用Block，你会发现一个问题：代码中会有很多重复的Block，比如好多地方需要打印文件内容。怎么解决呢？你第一个想到的是写一个公共函数，不错，可以解决。但是记住你使用的是ruby语言，不要重新造轮子。Ruby提供了函数化的Block：Proc。

我们看一个简单的Proc例子：

{% highlight ruby %}

p = Proc.new{|f| puts f.readlines}
File.open(__FILE__, &p)

{% endhighlight %}

上面例子可以看到，将Block代码定义为一个Proc对象，然后在使用Block的地方用Proc替换，这样就做到了完美的代码复用。

## 最后我们看看lambda。

Lambda：拉姆达表达式，ruby中可以通过lambda表达式创建Proc对象，可以把它理解成一种匿名函数。我们先看例子：

{% highlight ruby %}

new_p = lambda{|f| puts f.readlines}
File.open(__FILE__, &new_p)

{% endhighlight %}

上面例子中，我们使用系统的lambda方法创建了一个Proc对象，其效果与Proc.new创建出来的是一样的。其实使用lambda与使用Proc.new效果基本是一样的。下面就来讲下他们的区别：

## yield 和 block call 的区别

yield 和 block call 两种都能实现运行闭包，从实际运行效果来说，区别不大。其区别主要在于：

#### 1. 闭包的传递和保存

因为闭包已经传递到参数里，所以可以继续传递或保存起来，例如：

{% highlight ruby %}

class A
  def foo1(&b)
    @proc = b
  end

  def foo2
    @proc.call if @proc
  end
end
   
a = A.new
a.foo1 { puts "proc from foo1" }
a.foo2

{% endhighlight %}

#### 2. 性能

yield不是方法调用，而是 Ruby 的关键字，yield 要比 block call 比快 1 倍左右。

## block 和 proc, lambda 的区别

很简单直接，引入 proc 和 lambda 就是为了复用，避免重复定义，例如在上例中，使用 proc 变量存储闭包，避免重复定义两个 block 。

## proc 和 lambda 的区别

这大概是最让人困惑的地方，从行为上看，他们的效果是一致的，为什么要用两种不同的表达方式。

{% highlight ruby %}

proc = Proc.new { puts "foo in proc" }
lambda_proc = lambda { puts "foo in lambda" }

{% endhighlight %}

确实，对于简单的情况，他们的行为是一致的，但是主要在两个地方有明显差异：

#### 1. 参数检查，lambdas检查参数的个数，Procs不会。

还是例子说话

{% highlight ruby %}

def foo
  x = 100
  yield x
end

proc = Proc.new { |a, b| puts "a is #{a.inspect} b is #{b.inspect}" }
foo(&proc)           #=> a is 100 b is nil

lambda_proc1 = lambda { |a| puts "a is #{a.inspect}" }
foo(&lambda_proc1)   #=> a is 100
lambda_proc2 = lambda { |a, b| puts "a is #{a.inspect} b is #{b.inspect}" }
foo(&lambda_proc2)   #=> ArgumentError: wrong number of arguments (1 for 2)

{% endhighlight %}

可见，proc 不会对参数进行个数匹配检查，而 lambda 会，如果不匹配还会报异常，所以安全起见，建议优先用 lambda。

#### 2. return不同。lambdas的return是返回值给方法，方法会继续执行。 Proc的return会终止方法并返回得到的值。

还是例子说话

{% highlight ruby %}

def foo
	f = Proc.new { return "return from foo from inside proc" }
	f.call # control leaves foo here
	return "return from foo"
end

def bar
  f = lambda { return "return from lambda" }
  puts f.call # control does not leave bar here
  return "return from bar"
end

puts foo  #=> return from foo from inside proc

puts bar  #=> return from lambda
          #=> return from bar

{% endhighlight %}

可见，proc 中，return 相当于执行了闭包环境里的 return，而 lambda 只是返回call 闭包所在环境。

为什么会有这样的不同？

答案在于procedures和methods概念上的不同。
Ruby中的Procs是代码片段(code snippets)，不是方法。因此，Proc的return就是整个方法的return。
但lambdas就像是单独的methods(只不过是匿名的)，所以它要检查参数个数，且不会覆盖整个方法的返回。
因此，最好把lambdas当作另一种methods的写法，一种匿名的方式。

## 总结

闭包是 Ruby 的强大特性，它的几种表达方式block，proc 和 lambda有细微差别。blocks和Procs看起来像在代码中插入代码片段。而lambdas和Methods看起来像方法。通过几个例子和比较，希望能了解如何灵活运用闭包，游刃有余！

