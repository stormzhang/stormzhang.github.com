---
layout: post
title: "Ruby: eval && binding"
tags: [Ruby]
categories: [RubyOnRails]
---
{% include codepiano/setup %}

Ruby语言中有许多方法，灵活的运用这些方法，可以帮助我们轻松的掌握Ruby的编程技巧。最近遇到eval与binding，对于我这个ruby新手来说很陌生，于是就学习了下，并在这里记录并分享下来。

## eval

其实eval方法很简单，就是把字符串当作ruby程序来执行并返回结果，例子说话：

{% highlight ruby %}

a = 1
str = "if a == 1 then puts true else puts false end"
eval(str)     #=> true

{% endhighlight %}

## binding

生成并返回Binding对象。该对象包含变量、方法等的环境信息，它通常用作Eval的第二参数。来看官方提供示例：

# Example1

{% highlight ruby %}

class Demo
  def initialize(n)
    @secret = n
  end

  def get_binding
    return binding
  end
end

k1 = Demo.new(99)
b1 = k1.get_binding
k2 = Demo.new(-3)
b2 = k2.get_binding

eval("@secret", b1)   #=> 99
eval("@secret", b2)   #=> -3
eval("@secret")       #=> nil

{% endhighlight %}

# Example2

{% highlight ruby %}

def get_binding(param)
  binding
end
b = get_binding("hello")
b.eval("param")   #=> "hello"
{% endhighlight %}

至此，eval和binding应该理解什么意思了，又一次体现了ruby语法的灵活性。
