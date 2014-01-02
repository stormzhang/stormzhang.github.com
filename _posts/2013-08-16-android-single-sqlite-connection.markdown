---
layout: post
title: "Android Single Sqlite Connection"
categories: [Android, Sqlite]
tags: [SqliteConnection]
---

最近在做数据同步的功能，其中在用户第一次同步时会下载数据，如果数据量比较大的话会比较耗时，十几秒的时间很是正常，但是下载数据的时候让用户在那干等不让他进行任何操作用户体验是很差的，那这个时候就只有新开一个线程，让下载数据的一系列动作在后台进行。

所谓下载数据就是把数据从网络取回来的时候把输入insert到本地sqlite数据库中，这时候问题就来了，如果在下载数据的同时用户也在进行数据库的操作（如记录等），这个时候就会有冲突并报出异常，解决的办法是始终让整个Application保持一个database连接，这样的话即使多线程同时访问sqlite，database对象使用java锁会保持访问的序列化。那么如果保持Application是一个database连接呢？

我们一般都是用SqliteOpenHelper来管理数据库，而一个Helper实例会产生一个database连接，所以我们只需要让整个Application产生一个SqliteOpenHelper的实例就ok了，没错，就是单例模式，废话不多说，看代码：

{% highlight ruby %}
public class DBHelper extends SQLiteOpenHelper {
    private static final String DB_NAME = "food.db";
    private static final int DB_VERSION = 4;
    private static DBHelper helper;

    public static synchronized DBHelper getInstance(Context context) {
        if (helper == null) {
            helper = new DBHelper(context);
        }
        return helper;
    }

    private DBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }
}
{% endhighlight %}

接下来就是在你的Application类或者Activity类调用了。值得一说的是下面这个代码是不正确的：

{% highlight ruby %}
public class MyApplication extends Application {
    private Context context;
    private DBHelper dbHelper;

    public void onCreate() {
        super.onCreate();
        context = getApplicationContext();
        dbHelper = DBHelper.getInstance(context);
    }

    public void onTerminate() {
        super.onTerminate();
        dbHelper.close();
    }
}
{% endhighlight %}

因为onTerminate()方法并不会一直执行，在由于异常退出的时候这个方法就不会执行。所以我的解决方案是在主ActivityGroup的onDestroy方法里也会执行一次数据库的关闭，确保万无一失。

参考资料:
[http://stackoverflow.com/questions/2493331/what-are-the-best-practices-for-sqlite-on-android](http://stackoverflow.com/questions/2493331/what-are-the-best-practices-for-sqlite-on-android)