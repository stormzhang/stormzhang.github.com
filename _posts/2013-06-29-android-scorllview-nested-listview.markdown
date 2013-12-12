---
layout: post
title: "Android中ScrollView嵌套ListView"
tags: [ScrollView]
categories: [Android]
---
{% include codepiano/setup %}

这几天项目需要在ScrollView中放入ListView，一开始还以为很轻松的，就是一个xml的布局问题。但是实际操作才发现问题，会发现ListView会显示不完全，它的高度始终有问题。网上同样有很多人遇到这样的问题，大多数人不推荐这样的设计，因为默认情况下Android是禁止在ScrollView中放入另外的ScrollView的，它的高度是无法计算的。

但是既然已经有这样的需求，就要实现。StackOverFlow真是个好东西，发现已经有牛人解决了这个问题，经过试验是可以解决这个问题的，它的思路就是在设置完ListView的Adapter后，根据ListView的子项目重新计算ListView的高度，然后把高度再作为LayoutParams设置给ListView，这样它的高度就正确了，以下是源码：

{% highlight ruby %}
public class UIHelper {
    public static void setListViewHeightBasedOnChildren(ListView listView) {
	    ListAdapter listAdapter = listView.getAdapter();
	    if (listAdapter == null) {
	        // pre-condition
	        return;
	    }

		int totalHeight = 0;
		for (int i = 0; i < listAdapter.getCount(); i++) {
			View listItem = listAdapter.getView(i, null, listView);
			listItem.measure(0, 0);
			totalHeight += listItem.getMeasuredHeight();
		}

		ViewGroup.LayoutParams params = listView.getLayoutParams();
		params.height = totalHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));
		listView.setLayoutParams(params);
    }
}
{% endhighlight %}

只要在设置ListView的Adapter后调用此静态方法即可让ListView正确的显示在其父ListView的ListItem中。但是要注意的是，子ListView的每个Item必须是LinearLayout，不能是其他的，因为其他的Layout(如RelativeLayout)没有重写onMeasure()，所以会在onMeasure()时抛出异常。

在ScrollView中嵌套ListView(或者ScrollView)的另外一个问题就是，子ScrollView中无法滑动的(如果它没有显示完全的话)，因为滑动事件会被父ScrollView吃掉，如果想要让子ScrollView也可以滑动，只能强行截取滑动事件，有牛人在论坛中发过代码说可以。虽然我没有亲自试过，但估计是可行的。

虽然在ScrollView中显示ScrollView在技术上的难题可以攻破，但是这样的设计却是非常差的用户体验因为用户会不容易看到和操作子ScrollView中的内容。比如好的设计是，父ListView的每个Item只显示概括性的描述，然后点击其Item会进入另外一个页面来详细描述和展示以及对这个Item的操作。

参考资料：[http://stackoverflow.com/questions/3495890/how-can-i-put-a-listview-into-a-scrollview-without-it-collapsing](http://stackoverflow.com/questions/3495890/how-can-i-put-a-listview-into-a-scrollview-without-it-collapsing)