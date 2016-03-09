---
layout: post
keywords: blog
description: blog
title: "Gradle自定义你的BuildConfig"
categories: [Android]
tags: [Gradle]
---
{% include codepiano/setup %}

在很早之前我发布了这篇博客[Android BuildConfig.DEBUG的妙用](http://stormzhang.com/android/2013/08/28/android-use-build-config), 提到了Eclipse中通过BuildConfig.DEBUG字段用来调试Log非常好用，但是殊不知在Android Studio中通过Gradle这种用法更加强大。

## BuildConfig.DEBUG

首先在Gradle脚本中默认的debug和release两种模式BuildCondig.DEBUG字段分别为true和false，而且不可更改。该字段编译后自动生成，在Studio中生成的目录在 **app/build/source/BuildConfig/Build Varients/package name/BuildConfig** 文件下。我们以9GAG为例来看下release模式下该文件的内容：

{% highlight ruby %}
public final class BuildConfig {
  public static final boolean DEBUG = false;
  public static final String APPLICATION_ID = "com.storm.9gag";
  public static final String BUILD_TYPE = "release";
  public static final String FLAVOR = "wandoujia";
  public static final int VERSION_CODE = 1;
  public static final String VERSION_NAME = "1.0";
  // Fields from build type: release
  public static final boolean LOG_DEBUG = false;
}
{% endhighlight %}

## 自定义BuildConfig字段

大家看到上述内容的时候发现莫名的有个LOG_DEBUG字段，这个完全是我自定义的一个字段，我来用它控制Log的输出，而没有选择用默认的DEBUG字段。举例一个场景，我们在App开发用到的api环境假设可能会有测试、正式环境，我们不可能所有的控制都通过DEBUG字段来控制，而且有时候环境复杂可能还会有两个以上的环境，这个时候就用到了Gradle提供了自定义BuildConfig字段，我们在程序中通过这个字段就可以配置我们不同的开发环境。

语法很简单：

    buildConfigField "boolean", "API_ENV", "true"

上述语法就定义了一个boolean类型的API_ENV字段，值为true，之后我们就可以在程序中使用BuildConfig.API_ENV字段来判断我们所处的api环境。例如:

{% highlight ruby %}
public class BooheeClient {
    public static final boolean DEBUG = BuildConfig.API_ENV;

    public static String getHost {
        if (DEBUG) {
            return "your qa host";
        }
        return "your production host";
    }
}
{% endhighlight %}


不仅如此，如果遇到复杂的环境，你也可能自定义一个String类型的字段，这种方式免去了发布之前手动更改环境的麻烦，减少出错的可能性，只需要在Gradle配置好debug、release等模式下的环境就好了，打包的之后毫无顾虑。

使用方法很简单，大家如果有问题或者疑问可以直接博客留言。


