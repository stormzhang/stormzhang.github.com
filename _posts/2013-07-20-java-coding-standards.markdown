---
layout: post
title: "Java编程规范"
tags: [Code Standard]
categories: [Java]
---
{% include codepiano/setup %}

说到编程，就不得不提到编程规范，好的编程规范应该是每个人都要遵守的好习惯，个人觉得也应该是我们从开始学习编程就应该掌握的一个技能，至于为什么要严格遵守编程规范，我就不做过多的解释，这里有一篇文章讲的非常不错[为什么谷歌要执行严格的代码编写规范](http://www.aqee.net/google-coding-standards/)，今天整理了下java领域的编程规范，记录并分享在此。

## 使用Javadoc标准注释

每个文件的开头都应该有一句版权说明。然后下面应该是package包语句和import语句，每个语句块之间用空行分隔，然后是类或接口的定义，在Javadoc注释中，应描述类或接口的用途。

{% highlight ruby %}

/*
 * @creator Storm
 * @created_at 2013-7-16 上午9:54:34
 * Copyright (C) 2013 BOOHEE. All rights reserved.
 */

package com.boohee.recipe;

import org.json.JSONException;
import org.json.JSONObject;

import android.os.Bundle;
import android.widget.ListView;

public class OrderActivity extends PayActivityBase {
    ...
}

{% endhighlight %}

个人不推荐在每个类或者自建的public方法标注过多的Javadoc注释，如果你的方法或者类需要标注非常详细的注释才能让人理解，那么我想你的类或者方法应该考虑进行重构了，或许你应该起一个更好的名字来代替。当然，某些特殊情况，如包含很复杂的业务逻辑与算法，这就不得不标注详细点的Javadoc注释了。

## 编写简短的方法

为了把规模控制在合理范围内，方法应该保持简短和重点突出。不过，有时较长的方法也是合适的，所以对方法的代码长度并没有硬性的限制。如果方法代码超过了15行（最多不应该超过20行），就该考虑是否可以在不损害程序结构的前提下进行分拆。

## 在标准的位置定义字段

字段应该定义在文件开头，或者紧挨着使用这些字段的方法之前。

## 限制变量的作用范围

局部变量的作用范围应该是限制为最小的（Effective Java第29条）。使用局部变量，可以增加代码的可读性和可维护性，并且降低发生错误的可能性。每个变量都应该在最小范围的代码块中进行声明，该代码块的大小只要能够包含所有对该变量的使用即可。

应该在第一次用到局部变量的地方对其进行声明。几乎所有局部变量声明都应该进行初始化。如果还缺少足够的信息来正确地初始化变量，那就应该推迟声明，直至可以初始化为止。

本规则存在一个例外，就是涉及try-catch语句的情况。如果变量是用方法的返回值来初始化的，而该方法可能会抛出一个checked异常，那么必须在try块中进行变量声明。如果需在try块之外使用该变量，那它就必须在try块之前就进行声明了，这时它是不可能进行正确的初始化的。

{% highlight ruby %}

// Instantiate class cl, which represents some sort of Set
Set s = null;
try {
    s = (Set) cl.newInstance();
} catch(IllegalAccessException e) {
    throw new IllegalArgumentException(cl + " not accessible");
} catch(InstantiationException e) {
    throw new IllegalArgumentException(cl + " not instantiable");
}

// Exercise the set
s.addAll(Arrays.asList(args));

{% endhighlight %}

但即便是这种情况也是可以避免的，把try-catch 块封装在一个方法内即可：

{% highlight ruby %}

Set createSet(Class cl) {
	// Instantiate class cl, which represents some sort of Set
	try {
        return (Set) cl.newInstance();
    } catch(IllegalAccessException e) {
        throw new IllegalArgumentException(cl + " not accessible");
    } catch(InstantiationException e) {
        throw new IllegalArgumentException(cl + " not instantiable");
    }
}

// Exercise the set
Set s = createSet(cl);
s.addAll(Arrays.asList(args));

{% endhighlight %}

除非理由十分充分，否则循环变量都应该在for语句内进行声明：

{% highlight ruby %}

for (int i = 0; i < n; i++) {
    doSomething(i);
}

{% endhighlight %}

和

{% highlight ruby %}

for (Iterator i = c.iterator(); i.hasNext(); ) {
    doSomethingElse(i.next());
}

{% endhighlight %}

## 使用空格进行缩进

我们的代码块缩进使用4个空格。尽量不使用制表符tab。如果存在疑惑，与前后的其它代码保持一致即可。
我们用8个空格作为换行后的缩进，包括函数调用和赋值。例如这是正确的：

{% highlight ruby %}

Instrument i = someLongExpression(that, wouldNotFit, on, one, line);

{% endhighlight %}

而这是错误的：

{% highlight ruby %}

Instrument i = someLongExpression(that, wouldNotFit, on, one, line);

{% endhighlight %}

## 遵守字段命名惯例

* 非public的、非static的字段名称以m开头。
* static字段名称以s开头。
* 其它字段以小写字母开头。
* public static final字段（常量）全部字母大写并用下划线分隔。

例如：

{% highlight ruby %}
public class MyClass {
    public static final int SOME_CONSTANT = 42;
    public int publicField;
    private static MyClass sSingleton;
    int mPackagePrivate;
    private int mPrivate;
    protected int mProtected;
}
{% endhighlight %}

## 使用标准的大括号风格

大括号不单独占用一行；它们紧接着上一行书写。就像这样：

{% highlight ruby %}
class MyClass {
    int func() {
        if (something) {
            // ...
        } else if (somethingElse) {
            // ...
        } else {
            // ...
        }
    }
}
{% endhighlight %}

我们需要用大括号来包裹条件语句块。不过也有例外，如果整个条件语句块（条件和语句本身）都能容纳在一行内，也可以（但不是必须）把它们放入同一行中。也就是说，这是合法的：

{% highlight ruby %}
if (condition) {
    body(); 
}
{% endhighlight %}

这也是合法的：

{% highlight ruby %}
if (condition) body();
{% endhighlight %}

但这是非法的：

{% highlight ruby %}
if (condition)
    body();  // bad!
{% endhighlight %}

## 限制代码行的长度
每行代码的长度应该不超过100个字符。

有关本规则的讨论有很多，最后的结论还是最多不超过100个字符。

例外：如果注释行包含了超过100个字符的命令示例或者URL文字，为了便于剪切和复制，其长度可以超过100个字符。

例外：import行可以超过限制，因为很少有人会去阅读它。这也简化了编程工具的写入操作。

## 使用标准的Java Annotation
Annotation应该位于Java语言元素的其它修饰符之前。 简单的marker annotation（@Override等）可以和语言元素放在同一行。 如果存在多个annotation，或者annotation是参数化的，则应按字母顺序各占一行来列出。

对于Java 内建的三种annotation，Android标准的实现如下：

* Deprecated：只要某个语言元素已不再建议使用了，就必须使用Deprecated annotation。如果使用了Deprecated annotation，则必须同时进行deprecated Javadoc标记，并且给出一个替代的实现方式。此外请记住，被Deprecated的方法仍然是能正常执行的。

* Override：只要某个方法覆盖了已过时的或继承自超类的方法，就必须使用Override annotation。

例如，如果方法使用了@inheritdocs Javadoc标记，且继承自超类（而不是interface），则必须同时用@Override标明覆盖了父类方法。

* SuppressWarnings：SuppressWarnings annotation仅用于无法消除编译警告的场合。 如果警告确实经过测试“不可能消除”，则必须使用SuppressWarnings annotation，以确保所有的警告都能真实反映代码中的问题。

当需要使用@SuppressWarnings annotation时，必须在前面加上TODO注释行，用于解释“不可能消除”警告的条件。通常是标明某个令人讨厌的类用到了某个拙劣的接口。比如：

{% highlight ruby %}
// TODO: The third-party class com.third.useful.Utility.rotate() needs generics 
@SuppressWarnings("generic-cast")
List<String> blix = Utility.rotate(blax);
{% endhighlight %}

如果需要使用SuppressWarnings annotation，应该重新组织一下代码，把需要应用annotation的语言元素独立出来。

## 简称等同于单词

Good        Bad

XmlHttpRequest        XMLHTTPRequest

getCustomerId        getCustomerID

class Html        class HTML

String url        String URL

long id        long ID

如何对待简称，JDK和Android底层代码存在很大的差异。因此，你几乎不大可能与其它代码取得一致。别无选择，把简称当作完整的单词看待吧。

## 使用TODO注释

对那些临时性的、短期的、够棒但不完美的代码，请使用TODO注释。

TODO注释应该包含全部大写的TODO，后跟一个冒号：

{% highlight ruby %}
// TODO: Remove this code after the UrlTable2 has been checked in.
{% endhighlight %}

和

{% highlight ruby %}
// TODO: Change this to use a flag instead of a constant.
{% endhighlight %}

## 慎用Log
记录日志会对性能产生显著的负面影响。如果日志内容不够简炼的话，很快会丧失可用性。日志功能支持五种不同的级别。以下列出了各个级别及其使用场合和方式。

* ERROR: 该级别日志应该在致命错误发生时使用，也就是说，错误的后果能被用户看到，但是不明确删除部分数据、卸装程序、清除数据区或重新刷机（或更糟糕）就无法恢复。该级别总是记录日志。需要记录ERROR级别日志的事件一般都应该向统计信息收集（statistics-gathering ）服务器报告。

* WARNING: 该级别日志应该用于那些重大的、意外的事件，也就是说，错误的后果能被用户看到，但是不采取明确的动作可能就无法无损恢复，从等待或重启应用开始，直至重新下载新版程序或重启设备。该级别总是记录日志。需记录WARNING级别日志的事件也可以考虑向统计信息收集服务器报告。

* INFORMATIVE: 该级别的日志应该用于记录大部分人都会感兴趣的事件，也就是说，如果检测到事件的影响面可能很广，但不一定是错误。应该只有那些拥有本区域内最高级别身份认证的模块才能记录这些日志（为了避免级别不足的模块重复记录日志）。该级别总是记录日志。

* DEBUG: 该级别的日志应该用于进一步记录有关调查、调试意外现象的设备事件。应该只记录那些有关控件运行所必需的信息。如果debug日志占用了太多的日志空间，那就应该使用详细级别日志（verbose）才更为合适。

即使是发行版本（release build），该级别也会被记录，并且需用if (LOCAL_LOG)或if (LOCAL_LOGD)语句块包裹，这里的LOCAL_LOG[D]在你的类或子控件中定义。这样就能够一次性关闭所有的调试日志。因此在if (LOCAL_LOG)语句块中不允许存在逻辑判断语句。所有日志所需的文字组织工作也应在if (LOCAL_LOG)语句块内完成。如果对记录日志的调用会导致在if (LOCAL_LOG)语句块之外完成文字组织工作，那该调用就必须控制在一个方法内完成。

还存在一些代码仍然在使用if (localLOGV)。这也是可以接受的，虽然名称不是标准的。

* VERBOSE: 该级别日志应用于所有其余的事件。该级别仅会在调试版本（debug build）下记录日志，并且需用if (LOCAL_LOGV)语句块（或等效语句）包裹，这样该部分代码默认就不会编译进发行版本中去了。所有构建日志文字的代码将会在发行版本中剥离出去，并且需包含在if (LOCAL_LOGV)语句块中。

注意：

除了VERBOSE级别外，在同一个模块中同一个错误应该尽可能只报告一次：在同一个模块内的一系列层层嵌套的函数调用中，只有最内层的函数才返回错误；并且只有能为解决问题提供明显帮助的时候，同一模块中的调用方才写入一些日志。

除了VERBOSE级别外，在一系列嵌套的模块中，当较低级别的模块对来自较高级别模块的非法数据进行检测时，应该只把检测情况记录在DEBUG日志中，并且只记录那些调用者无法获取的信息。特别是不需要记录已经抛出异常的情况（异常中应该包含了全部有价值的信息），也不必记录那些只包含错误代码的信息。当应用程序与系统框架间进行交互时，这一点尤为重要。系统框架已能正确处理的第三方应用程序，也不应该记录大于DEBUG级别的日志。仅当一个模块或应用程序检测到自身或来自更低级别模块的错误时，才应该记录INFORMATIVE及以上级别的日志。

如果一个通常要记录日志的事件可能会多次发生，则采取一些频次限制措施或许是个好主意，以防日志被很多重复（或类似）的信息给撑爆了。

网络连接的丢失可被视为常见现象，也是完全可以预见的，不应该无缘无故就记录进日志。影响范围限于应用程序内部的网络中断应该记录在DEBUG或VERBOSE级别的日志中（根据影响的严重程度及意外程度，再来确定是否在发行版本中也记录日志）。

有权访问的文件系统或第三方应用程序发起的系统空间满，应该记录大于INFORMATIVE级别的日志。

来自任何未授信源的非法数据（包括共享存储上的任何文件，或来自任何网络连接的数据）可被视为可预见的，如果检测到非法数据也不应该记录大于DEBUG级别的日志（即使记录也应尽可能少）。

请记住，对字符串使用+操作符时，会在后台以默认大小（16个字符）缓冲区创建一个StringBuilder对象，并且可能还会创建一些其它的临时String对象。换句话说，显式创建StringBuilders对象的代价并不会比用'+'操作符更高（事实上效率还将会提高很多）。还要记住，即使不会再去读取这些日志，调用Log.v()的代码也将编译进发行版中并获得执行，包括创建字符串的代码。

所有要被人阅读并存在于发行版本中的日志，都应该简洁明了、没有秘密、容易理解。这里包括所有DEBUG以上级别的日志。

只要有可能，日志就应该一句一行。行长最好不超过80或100个字符，尽可能避免超过130或160个字符（包括标识符）的行。

报告成功的日志记录绝不应该出现在大于VERBOSE级别的日志中。

用于诊断难以重现事件的临时日志应该限于DEBUG或VERBOSE级别，并且应该用if语句块包裹，以便在编译时能够一次全部关闭。

小心日志会泄漏隐私。应该避免将私人信息记入日志，受保护的内容肯定也不允许记录。这在编写系统框架级代码时尤为重要，因为很难预知哪些是私人信息和受保护信息。

绝对不要使用System.out.println() （或本地代码中的printf()）。System.out 和 System.err会重定向到/dev/null，因此print语句不会产生任何可见的效果。可是，这些调用中的所有字符串创建工作都仍然会执行。

日志的黄金法则是：你的日志记录不会导致其它日志的缓冲区溢出，正如其他人的日志也不会让你的溢出一样。

## 保持一致
我们的最终想法是：保持一致。如果你正在编写代码，请花几分钟浏览一下前后的其它代码，以确定它们的风格。如果它们在if语句前后使用了空格，那你也应该遵循。如果它们的注释是用星号组成的框框围起来的，那也请你照办。

保持风格规范的重点是有一个公共的代码词汇表，这样大家就可以把注意力集中于你要说什么，而不是你如何说。我们在这里列出了全部的风格规范，于是大家也知道了这些词汇。不过本地化的风格也很重要。如果你要加入的代码和已存在的代码风格迥异，那就会突然打破阅读的节奏。请努力避免这种情况的发生。