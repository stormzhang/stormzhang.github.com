---
layout: post
title: "Android Manifest.xml中的meta-data属性"
tags: [meta-data]
categories: [Android]
---
{% include codepiano/setup %}

## 语法

{% highlight ruby %}
<meta-data android:name="string"
           android:resource="resource specification"
           android:value="string" />
{% endhighlight %}

这是该元素的基本结构.可以包含在activity, activity-alias, service, receiver四个元素中。

这个名字值是额外的任意的可以提供给父组件的数据。一个组件元素能够包含任意数量的meta-data子元素。它们所有的值都会被收集在Bundle对象中并且使其可以作为组件的 PackageItemInfo.metaData 字段。

一般的值可以通过value属性来指定，但是如果要指定一个资源id作为一个值，那么就要用resource属性来代替。例如：下面的代码就是指定存储在@string/kangaroo 资源中的zoo名字。

{% highlight ruby %}
<meta-data android:name="zoo" android:value="@string/kangaroo" />
{% endhighlight %}

另一方面，利用resource属性将指定zoo的资源id号，并不是存储在资源中的资源值。

{% highlight ruby %}
<meta-data android:name="zoo" android:resource="@string/kangaroo" />
{% endhighlight %}

当要给组件提供多个复杂的数据时，在这里并不推荐使用多重meta-data元素，推荐你存储这些数据在一个资源文件中并且利用resource属性来通知它的id给组件。

android:name

元数据项的名字，为了保证这个名字是唯一的，采用java风格的命名规范。例如：
com.example.project.activity.fred  

android:resource

资源的一个引用，指定给这个项的值是该资源的id。该id可以通过方法Bundle.getInt()来从meta-data中找到。

android:value

指定给这一项的值。可以作为值来指定的数据类型并且组件用来找回那些值的Bundle方法列在了下面的表中。

## 工具类

自己写了个工具类来获取meta-data字段值：

{% highlight ruby %}
public class Util {
	public static String getMetaValue(Context context, String metaKey) {
		Bundle metaData = null;
		String metaValue = null;
		if (context == null || metaKey == null) {
			return null;
		}
		try {
			ApplicationInfo ai = context.getPackageManager().getApplicationInfo(
					context.getPackageName(), PackageManager.GET_META_DATA);
			if (null != ai) {
				metaData = ai.metaData;
			}
			if (null != metaData) {
				metaValue = metaData.getString(metaKey);
			}
		} catch (NameNotFoundException e) {

		}
		return metaValue;
		}
}
{% endhighlight %}