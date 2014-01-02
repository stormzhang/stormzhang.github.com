---
layout: post
title: "Android Sqlite Database Upgrade"
categories: [Android, Sqlite]
tags: [SqliteUpgrade]
---

本周着手开发数据同步的功能，但首先要解决的就是sqlite数据库升级的问题，关于数据库升级有蛮多方面涉及到，也许你是新增加了功能，所以新建了表，也许你为某些表增加了些字段，也许你是重构了数据模型与数据结构，不管如何升级，必须要满足用户正常升级的情况下原来的数据不会丢失。关于正确的数据库升级做法网上资料比较少，这次就来介绍下看到的国外一位大牛总结的数据库升级的正确做法。

## Version 1 of your database

大多数我们都是用android提供的SQLiteOpenHelper来创建和管理数据库，如下代码：

{% highlight ruby %}
public class DbHelper extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "mysample.db";
    private static final int DATABASE_VERSION = 1;

    private static final String DATABASE_CREATE_SAMPLE_TABLE = "CREATE TABLE tblSample (_id integer primary key autoincrement, name varchar(32);";

    public DbHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase database) {
        database.execSQL(DATABASE_CREATE_SAMPLE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Do nothing for now
    }
}
{% endhighlight %}

上述代码每次执行的时候都会检查当前版本的数据库是否存在，如果不存在则会执行onCreate方法来创建新的数据库，然后会把数据库的名字和版本号存储起来；如果已经存在，则会比较当前版本和DATABASE_VERSION的大小，然后就会去执行onUpgrade方法。

## Version 2 of your database

问题是，最好的处理升级的方法是什么，这里认为最好的方法是循环处理每一个版本的数据库变化，看示例：

假设下一版本想为tblSample表新增一个“address”的字段，新的创建语句应该像这样：

{% highlight ruby %}
CREATE TABLE tblSample
(
    _id integer primary key autoincrement,
    name varchar(32),
    address varchar(128)
); 
{% endhighlight %}

那么看下新的代码会是什么样的：

{% highlight ruby %}
public class DbHelper extends SQLiteOpenHelper {
    private static final String DATABASE_NAME = "mysample.db";
    private static final int DATABASE_VERSION = 2;

    private static final String DATABASE_CREATE_SAMPLE_TABLE = "CREATE TABLE tblSample (_id integer primary key autoincrement, name varchar(32), address varchar(128);";

    public DbHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase database) {
        database.execSQL(DATABASE_CREATE_SAMPLE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        for (int i = oldVersion; i < newVersion; i++) {
            switch (i) {
                case 1:
            	    db.execSQL("ALTER TABLE tblSample ADD address varchar(128)");
            	    break;
            }
        }
    }
}
{% endhighlight %}

代码逻辑很简单，就是一个for循环加上switch...case...语句，然后上述代码却能处理所有的数据库升级，不管你是从版本1升级到版本9也好，还是从版本4升级到版本5也好，都可以从容的解决，确切的说，它将能解决从之前的所有版本升级到当前最新的版本。

须要说明的是，如果有些莫名其妙的用户从高版本升级到低版本（确切的说是降级），例如从版本3不小心降级到版本1了，这种情况下如果只是有了上述代码则就会抛出异常，造成系统崩溃。android中数据库降级则会执行onDowngrade方法，为防止有这种情况发生，同样须要重新这个方法防止程序的异常。

