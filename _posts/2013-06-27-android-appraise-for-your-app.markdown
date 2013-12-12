---
layout: post
title: "android中调用App市场对自身App评分"
tags: [Appraise]
categories: [Android]
---
{% include codepiano/setup %}

苹果的app评价很容易，直接请求AppStore的一个链接就好了，android市场这么多，请求一个链接肯定不行。之前一直以为很麻烦，也没有仔细研究，今天竟然发现原来很简单。上代码：

{% highlight ruby %}
Uri uri = Uri.parse("market://details?id=" + context.getPackageName());
Intent goToMarket = new Intent(Intent.ACTION_VIEW, uri);
try {
    startActivity(goToMarket);
} catch (ActivityNotFoundException e) {
    Toast.makeText(context, "Couldn't launch the market !", Toast.LENGTH_SHORT).show();
}
{% endhighlight %}