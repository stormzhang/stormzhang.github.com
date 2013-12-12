---
layout: post
title: "Ruby Range"
tags: [Ruby]
categories: [RubyOnRails]
---

最近一直在做“生理周期”，不过不要担心，这里只会探讨技术领域，不会涉及到神圣的MC领域。在做生理周期指数预测、周期日报的时候大量用到了Range对象，所以干脆就把Range对象系统的学习下，在这里记录并分享出来。

## Ruby Range

Range在概念上很直观，即范围，但是在实际使用中可能会遇到一些容易混淆的东西，看下面代码：

{% highlight ruby %}
# 注意：..操作符将包含上限，而...不包含上限。
(-1 .. -5).to_a      #=> []
(-5 .. -1).to_a      #=> [-5, -4, -3, -2, -1]
('a' .. 'e').to_a    #=> ["a", "b", "c", "d", "e"]
('a' ... 'e').to_a   #=> ["a", "b", "c", "d"]
{% endhighlight %} 
## begin/end first/last

使用first和last方法(或同义方法begin和end)，可以获取一个Range的开始和结束元素：

{% highlight ruby %}
r1 = 3 .. 6
r2 = 3 ... 6
r1a, r1b = r1.first, r1.last    #=> 3, 6
r1c, r1d = r1.begin, r1.end     #=> 3, 6
r2a, r2b = r2.begin, r2.end     #=> 3, 6 (注意：不是3和5)
r1.first(2)                     #=> [3, 4]
{% endhighlight %}

## exclude_end?
exclude_end?方法可以得到Range是否排除上限项(即是否是...的Range)

{% highlight ruby %}
r1 = 3 .. 6
r2 = 3 ... 6
r1.exclude_end?   #=> false
r2.exclude_end?   #=> true
{% endhighlight %}

## include?/cover?

include?方法（同义方法member?）或者cover?方法可以判断一个值是否处在当前的Range中：

{% highlight ruby %}
r = 1 .. 5
r.include?(1)     #=> true
r.include?(0)     #=> false
r.cover?(1)       #=> true
r.cover?(0)       #=> false
{% endhighlight %}

区别：include?方法是把Range的元素迭代取出进行比较，而cover?方法只是把给出的值和该Range的上下限做比较得出的，所以cover?性能比include?要好。

## step

如果我们想要从0 .. 20中取出这样的元素0，5，10，20怎么办？这时候step方法就用到了

{% highlight ruby %}
r = 0 .. 20
r.step(5).to_a     #=> [0, 5, 10, 15, 20]
{% endhighlight %}

## 浮点数的Range

浮点数的Range可以进行迭代么？我们来看一下：

{% highlight ruby %}
fr = 2.0..2.2
fr.each {|x| puts x }   #=> TypeError: can't iterate from Float
{% endhighlight %}

为什么浮点数不可以迭代呢？是因为不能实现么？理论上，这是没有问题的，但是，实际上，如果浮点数Range迭代，这有可能出现：很小的一个范围，将产生非常庞大的迭代量。这对语言的实现有非常高的要求。况且，这样的功能，极少有用到。

## 反向的Range

我们讨论下限大于上限的Range，如：

{% highlight ruby %}
r = 6..3
x = r.begin              #=> 6
y = r.end                #=> 3
flag = r.end_excluded?   #=> false
{% endhighlight %}

它确实是个合法的Range，但是，它包含的内容却并不是我们想像的那样：

{% highlight ruby %}
arr = r.to_a       #=> []
r.each {|x| p x}   #=> 无结果
r.include?(5)      #=> false
{% endhighlight %}

那么说反向Range是没有什么用处的咯？那倒不是，我们可以在字符串和数组中使用反向Range：

{% highlight ruby %}
string = "flowery"
str1   = string[0..-2]   #=> "flower"
str2   = string[1..-2]   #=> "lower"
str3   = string[-5..-3]  #=> "owe" (其实这是个正向的Range)
{% endhighlight %}