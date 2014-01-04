---
layout: post
title: "Android批量插入数据性能优化"
categories: [Android, Sqlite]
tags: [SqliteTransaction]
---

最近做数据同步时遇到一个问题，在下载数据时需要批量的向sqlite插入数据，虽然数据不算多，但是实际测试中每插入一条数据需要将近50ms的时间，这意味着100条数据就需要花费5s左右的时间，对于用户来说，体验太差了，必须要优化。

在google了之后，发现了sqlite的事务处理问题，在sqlite插入数据的时候默认一条语句就是一个事务，有多少条数据就有多少次磁盘操作。明白了这个，解决方案就有了，在批量插入数据的时候，只开启一个事务，这样只会进行一次磁盘操作，代码如下：

{% highlight xml %}
db.beginTransaction();
try {
    for (...) {
        db.execSQL("...", new Object[]{});
    }
    db.setTransactionSuccessful();
} catch (Exception e) {

} finally {
    db.endTransaction();
}
{% endhighlight %}

使用事务后性能有明显的提升，以批量操作100条为例，由原来的5s优化成了现在的1s。