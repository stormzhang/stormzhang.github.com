---
layout: post
title: "设计模式之TemplateMethod"
tags: [Template]
categories: [DesignPatterns]
---

最近开始看《Ruby设计模式》一书，结合“追mm与设计模式”，虽然有些YD，不过也有助于帮助理解设计模式 ，边学习边记录一下吧。Template method模式是最简单的一种设计模式了.

Template method——看过《如何说服女生上床》这部经典文章吗？女生从认识到上床的不变的步骤分为巧遇、打破僵局、展开追求、接吻、前戏、动手、爱抚、进去八大步骤(Template method)，但每个步骤针对不同的情况，都有不一样的做法，这就要看你随机应变啦(具体实现)；

## 模板方法模式

模板方法模式准备一个抽象类，将部分逻辑以具体方法以及具体构造子的形式实现，然后声明一些抽象方法来迫使子类实现剩余的逻辑。不同的子类可以以不同的方式实现这些抽象方法，从而对剩余的逻辑有不同的实现。先制定一个顶级逻辑框架，而将逻辑的细节留给具体的子类去实现。

## 实例

以一个例子来说， 写一个输出一个不同格式的report generater。可以输出html格式，也可以输出纯文本的内容。

这个例子是hard-coded输出html格式的report类，但是无法处理纯文本格式。

{% highlight ruby %}
class Report
  def initialize
    @title = 'Monthly Report'
    @text =  [ 'Things are going', 'really, really well.' ]
  end

  def output_report
    puts('<html>')
    puts('  <head>')
    puts("    <title>#{@title}</title>")
    puts('  </head>')
    puts('  <body>')

    @text.each do |line|
       puts("    <p>#{line}</p>" )
    end

    puts('  </body>')
    puts('</html>')
  end
end
{% endhighlight %}

如果你要处理纯文本，那么只能重新写一个类：

{% highlight ruby %}
class Report
  def initialize
    @title = 'Monthly Report'
    @text =  ['Things are going', 'really, really well.']
  end

  def output_report(format)
    if format == :plain
      puts("*** #{@title} ***")
    elsif format == :html
      puts('<html>')
      puts('  <head>')
      puts("    <title>#{@title}</title>")
      puts('  </head>')
      puts('  <body>')
    else
      raise "Unknown format: #{format}"
    end

    @text.each do |line|
      if format == :plain
        puts(line)
      else
        puts("    <p>#{line}</p>" )
      end
    end

    if format == :html
      puts('  </body>')
      puts('</html>')
    end
  end
end
{% endhighlight %}

上面的代码是可以工作的，但是如果将来又有需要让你处理其他格式呢，再重写一遍啊？这个时候template method就起作用了。我们可以把公共的部分抽象出来，也就是说先制定一个顶级逻辑框架，而将逻辑的细节留给具体的子类去实现。Ruby本身并没有抽象类，那么我们可以像下面方式一样去模拟：

{% highlight ruby %}
class Report
  def initialize
    @title = 'Monthly Report'
    @text =  ['Things are going', 'really, really well.']
  end

  def output_report
    output_start
    output_head
    output_body_start
    output_body
    output_body_end
    output_end
  end

  def output_body
    @text.each do |line|
      output_line(line)
    end
  end

  def output_start
    raise 'Called abstract method: output_start'
  end

  def output_head
    raise 'Called abstract method: output_head'
  end

  def output_body_start
    raise 'Called abstract method: output_body_start'
  end

  def output_line(line)
    raise 'Called abstract method: output_line'
  end

  def output_body_end
    raise 'Called abstract method: output_body_end'
  end

  def output_end
    raise 'Called abstract method: output_end'
  end
end
{% endhighlight %}

那么我们可以实现处理html的子类了：

{% highlight ruby %}
class HTMLReport < Report
  def output_start
    puts('<html>')
  end

  def output_head
   puts('  <head>')
   puts("    <title>#{@title}</title>")
   puts('  </head>')
 end

 def output_body_start
   puts('<body>')
 end

 def output_line(line)
   puts("  <p>#{line}</p>")
 end

 def output_body_end
   puts('</body>')
 end

 def output_end
   puts('</html>')
 end
end
{% endhighlight %}

同样，处理文本的子类：

{% highlight ruby %}
class PlainTextReport < Report
  def output_start
  end
 
  def output_head
    puts("**** #{@title} ****")
    puts
  end

  def output_body_start
  end

	def output_line(line)
	  puts(line)
	end

  def output_body_end
  end

  def output_end
  end
end
{% endhighlight %}

看看结果：

{% highlight ruby %}
report = HTMLReport.new
report.output_report
#=>
<html>
<head>
  <title>Monthly Report</title>
</head>
<body>
<p>Things are going</p>
<p>really, really well.</p>
</body>
</html>


report = PlainTextReport.new
report.output_report
#=>
** Monthly Report ****
Things are going
really, really well.
{% endhighlight %}