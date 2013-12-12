---
layout: post
title: "SQLite加密--SQLCipher"
tags: [Sqlite, SQLCipher]
categories: [Android, Sqlite]
---
{% include codepiano/setup %}

最近项目中要预先放置一部分food的sqlite数据在程序里，android项目资源文件的破译非常简单，出于安全的考虑，要对sqlite文件进行加密处理，于是就用到了SQLCipher。

SQLCipher is an open source library that provides transparent, secure 256-bit AES encryption of SQLite database files.

虽然SQLCipher是开源的，但是仅仅是开源的而已——你要自己编译，不想自己编译就得付费购买已经编译好的二进制文件~~木有钱，只好自己编译了，这里来讲下编译过程。

## 1.下载源代码

官方源代码：[https://github.com/sqlcipher/sqlcipher](https://github.com/sqlcipher/sqlcipher)

## 2.编译

进入源代码目录：

{% highlight ruby %}
./configure --enable-tempstore=yes CFLAGS="-DSQLITE_HAS_CODEC" LDFLAGS="-lcrypto"
make
{% endhighlight %}

注意：由于SQLCipher是SQLite的另外一个版本，所以为了不影响系统的SQLite，和其他SQLCipher版本间的兼容问题，所以不能将编译生成的直接install到系统，可以做符号链接等方式来管理二进制版本。我这里建立了一个软链接：

{% highlight ruby %}
ln -s /Users/storm/sqlcipher/sqlite3 /usr/bin/sqlcipher
{% endhighlight %}

## 3.验证编译是否成功

创建一个加密的数据，密码是aaa：

{% highlight ruby %}
$ sqlcipher test.sqlite
SQLite version 3.7.14.1 2012-10-04 19:37:12
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite> PRAGMA key = 'aaa';
sqlite> create table a(ind int);
sqlite> .tables
a
sqlite> .quit
{% endhighlight %}

尝试不输入密码，直接读取数据库，理论上是读不到数据，或者报错：

{% highlight ruby %}
$ sqlcipher test.sqlite
SQLite version 3.7.14.1 2012-10-04 19:37:12
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite> .tables
sqlite> .quit
{% endhighlight %}

尝试正确输入密码，应该成功读取：

{% highlight ruby %}
$ sqlcipher test.sqlite
SQLite version 3.7.14.1 2012-10-04 19:37:12
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite> PRAGMA key = 'aaa';
sqlite> .tables
a
sqlite> .quit
{% endhighlight %}

上面三个流程都过说明编译成功！

## 给现有数据进行加密

如何给现有的sqlite文件进行加密，没有别的简单的方法：

1.先把数据导出：
{% highlight ruby %}
$ sqlite3 ifood.sqlite
>.output ifood.sql
>.dump
{% endhighlight %}

2.创建一个新的加密的数据库：
{% highlight ruby %}
$ sqlcipher ifood_lock.sqlite
sqlite> PRAGMA key = 'abcdef'; # 设置密码
{% endhighlight %}

3.导入数据
{% highlight ruby %}
>.read ifood.sql
{% endhighlight %}
如果项目中经常用到数据加密，可以写个脚步。

## SQLCipher For Android

SQLCipher官网有详细的android项目中的使用教程，地址在：[http://sqlcipher.net/sqlcipher-for-android/](http://sqlcipher.net/sqlcipher-for-android/)

实际项目中遇到的问题是密码设置不要含单引号，不然会解密不对。而且加密过后有一个弊端，就是程序会增加将近4M左右的大小，使你的apk包看起来比较大，但是为了数据安全，这点牺牲还是值得的！