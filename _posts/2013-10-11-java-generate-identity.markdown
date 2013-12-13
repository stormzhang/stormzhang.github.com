---
layout: post
title: "Android生成唯一标识符UUID"
date: 2013-10-11 21:13
tags: [UUID, Java]
categories: [Android]
---
{% include codepiano/setup %}

在这次新版本的app开发中，其中增加了游客账号访问，但需要为该游客生成一个唯一标识符identity，最初考虑通过mac地址或者imei来唯一标识，但是后面有一项需求，游客账号可以升级，升级之后退出重新游客访问的话就需要生成新的identity，这样一来就必须手动生成唯一的identity了，好在java提供了生成UUID唯一标示符。

{% highlight ruby %}

java.util.UUID.randomUUID().toString();

{% endhighlight %}

如果未升级的游客账号退出重新登录这个时候再重新访问还是用原来的identity，解决方法也很简单，把第一次生成的identity存起来，下次就直接取值了，看下代码吧：

{% highlight ruby %}

public String getIdentity() {
    SharedPreferences preference = PreferenceManager.getDefaultSharedPreferences(context);
    String identity = preference.getString("identity", null);
    if (identity == null) {
        identity = java.util.UUID.randomUUID().toString();
        preference.edit().putString("identity", identity);
    }
    return identity;
}

{% endhighlight %}

然后只需要在升级成功后把identity remove掉就ok。