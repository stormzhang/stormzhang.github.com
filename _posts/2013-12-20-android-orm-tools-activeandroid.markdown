---
layout: post
keywords: activeandroid
title: "ActiveAndroid--Android轻量级ORM框架"
tags: [ORM]
categories: [OpenAndroid, Android, Sqlite]
---
{% include codepiano/setup %}

最近在寻找下Android开发中好用的ORM框架，发现了[ActiveAndroid](https://github.com/pardom/ActiveAndroid)和[ORMLite](http://ormlite.com/), 相信懂Rails开发的一直都对ActiveRecord情有独钟，使用起来真是太方便了。ActiveAndroid听名字就知道就模仿ActiveRecord的一套框架，于是果断学习下。

## 介绍

ActiveAndroid算是一个轻量级的ORM框架，简单地通过如save()和delete()等方法来做到增删改查等操作。配置起来也还算简单。

下面是作者的原话：

    ActiveAndroid is an active record style ORM (object relational mapper). What does that mean exactly? Well, ActiveAndroid allows you to save and retrieve SQLite database records without ever writing a single SQL statement. Each database record is wrapped neatly into a class with methods like save() and delete().

    ActiveAndroid does so much more than this though. Accessing the database is a hassle, to say the least, in Android. ActiveAndroid takes care of all the setup and messy stuff, and all with just a few simple steps of configuration.

## 配置

在AndroidManifest.xml中我们需要添加这两个

* AA_DB_NAME (这个name不能改，但是是可选的，如果不写的话 是默认的"Application.db"这个值）

* AA_DB_VERSION (optional – defaults to 1)

{% highlight ruby %}
<manifest ...>
    <application android:name="com.activeandroid.app.Application" ...>
        ...
        <meta-data android:name="AA_DB_NAME" android:value="your.db" />
       <meta-data android:name="AA_DB_VERSION" android:value="5" />
    </application>
</manifest>
{% endhighlight %}

这个application是必须指定的，但你也可以使用自己的Application,继承自com.activeandroid.app.Application

{% highlight ruby %}
public class MyApplication extends com.activeandroid.app.Application {
    ...
}
{% endhighlight %}

如果你不想或者不能继承com.activeandroid.app.Application的话，那么就这样

{% highlight ruby %}
public class MyApplication extends SomeLibraryApplication {
    @Override
    public void onCreate() {
        super.onCreate();
        ActiveAndroid.initialize(this);
    }
    @Override
    public void onTerminate() {
        super.onTerminate();
        ActiveAndroid.dispose();
    }
}
{% endhighlight %}

ActiveAndroid.initialize(this)；做初始化工作，ActiveAndroid.dispose();做清理工作

## 创建数据库模型

{% highlight xml %}
我们使用@Table(name = "Items")来表示表，使用@Column(name = "Name")来表示列，ActiveAndroid会使用自增长的ID作为主键，然后按照注解描述，将类对应映射为数据库表。
{% endhighlight %}

{% highlight ruby %}
@Table(name = "Items")
public class Item extends Model {
    @Column(name = "Name")
    public String name;
    @Column(name = "Category")
    public Category category;
        public Item(){
                super();
        }
        public Item(String name, Category category){
                super();
                this.name = name;
                this.category = category;
        }
}
{% endhighlight %}

## 依赖关系的数据库表

假如Item和Category是多对一的关系，那么我们可以这样子创建他们的类

{% highlight ruby %}
@Table(name = "Items")
public class Item extends Model {
    @Column(name = "Name")
    public String name;
    @Column(name = "Category")
    public Category category;
}
{% endhighlight %}

{% highlight ruby %}
@Table(name = "Categories")
public class Category extends Model {
    @Column(name = "Name")
    public String name;
    public List<Item> items() {
        return getMany(Item.class, "Category");
    }
}
{% endhighlight %}

## 保存和更新数据到数据库

### 单条插入

保存Category对象

{% highlight ruby %}
Category restaurants = new Category();
restaurants.name = "Restaurants";
restaurants.save();
{% endhighlight %}

分配了一个category并且保存到数据库 Item item = new Item(); item.category = restaurants; item.name = "Outback Steakhouse"; item.save();

### 批量插入

如果你要批量插入数据，最好使用事务(transaction)。

{% highlight ruby %}
ActiveAndroid.beginTransaction();
try {
    for (int i = 0; i < 100; i++) {
        Item item = new Item();
        item.name = "Example " + i;
        item.save();
    }
    ActiveAndroid.setTransactionSuccessful();
}
finally {
    ActiveAndroid.endTransaction();
}
{% endhighlight %}

使用事务的话只用了 40ms，不然的话需要4秒。

### 删除记录

我们有三种方式删除一条记录

{% highlight ruby %}
Item item = Item.load(Item.class, 1);
item.delete();
{% endhighlight %}

{% highlight ruby %}
Item.delete(Item.class, 1);
{% endhighlight %}

{% highlight ruby %}
new Delete().from(Item.class).where("Id = ?", 1).execute();
{% endhighlight %}

很简单吧

## 查询数据库

作者将查询做的非常像SQLite的原生查询语句，几乎涵盖了所有的指令 com.activeandroid.query包下有以下类

* Delete

* From

* Join

* Select

* Set

* Update

我们举例说明吧

{% highlight ruby %}
public static Item getRandom(Category category) {
    return new Select()
        .from(Item.class)
        .where("Category = ?", category.getId())
        .orderBy("RANDOM()")
        .executeSingle();
}
{% endhighlight %}

对应的sqlite查询语句就是 select * from Item where Category = ? order by RANDOM()， 当然还支持其他非常多的指令

* limit

* offset

* as

* desc/asc

* inner/outer/cross join

* group by

* having 等等

## 数据库升级

如果想给现有的表增加或删除column，这个时候只需要把sql脚本放在/assets/migrations文件夹下，然后需要：

1. 增加数据库版本，即增加配置文件下的application种的AA_DB_VERSION

2. 在/assets/migrations文件夹下提供一个NewVersion.sql脚本

ActiveAndroid将会自动执行大于database-version的sql脚本文件

假设需要给Items表增加一个“colour”列，那么需要把AA_DB_VERSION增加到2，并且在/assets/migrations目录下提供一个2.sql的脚本文件，内容如下

{% highlight ruby %}
ALTER TABLE Items ADD COLUMN Color INTEGER;
{% endhighlight %}
