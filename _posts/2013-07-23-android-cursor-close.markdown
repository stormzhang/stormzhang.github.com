---
layout: post
title: "Android中Cursor关闭的问题"
tags: [Cursor]
categories: [Android]
---

Cursor是Android查询数据后得到的一个管理数据集合的类，正常情况下，如果查询得到的数据量较小时不会有内存问题，而且虚拟机能够保证Cusor最终会被释放掉。

然而如果Cursor的数据量特表大，特别是如果里面有Blob信息时，应该保证Cursor占用的内存被及时的释放掉，而不是等待GC来处理。并且Android明显是倾向于编程者手动的将Cursor close掉，因为在源代码中我们发现，如果等到垃圾回收器来回收时，会给用户以错误提示。

所以我们使用Cursor的方式一般如下：

{% highlight ruby %}
Cursor cursor = null;
try {
    cursor = mContext.getContentResolver().query(uri,null,null,null,null);
    if(cursor != null){
        cursor.moveToFirst();
    	//do something
    }
} catch(Exception e) {
      e.printStatckTrace();
} finally {
    if(cursor != null) {
        cursor.close();
    }
}
{% endhighlight %}

有一种情况下，我们不能直接将Cursor关闭掉，这就是在CursorAdapter中应用的情况，但是注意，CursorAdapter在Acivity结束时并没有自动的将Cursor关闭掉，因此，你需要在onDestroy函数中，手动关闭。

{% highlight ruby %}
@Override  
protected void onDestroy() {        
    if (mAdapter != null && mAdapter.getCurosr() != null) {  
        mAdapter.getCursor().close();  
    }  
    super.onDestroy();   
}
{% endhighlight %}
CursorAdapter中的changeCursor函数，会将原来的Cursor释放掉，并替换为新的Cursor，所以你不用担心原来的Cursor没有被关闭。

你可能会想到使用Activity的managedQuery来生成Cursor，这样Cursor就会与Acitivity的生命周期一致了，多么完美的解决方法！然而事实上managedQuery也有很大的局限性。

managedQuery生成的Cursor必须确保不会被替换，因为可能很多程序事实上查询条件都是不确定的，因此我们经常会用新查询的Cursor来替换掉原先的Cursor。因此这种方法适用范围也是很小。