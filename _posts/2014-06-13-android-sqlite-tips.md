---
layout: post
keywords: blog
description: blog
title: "Android Sqlite Tips"
categories: [Android, SQLite]
tags: [SQLite]
---
{% include codepiano/setup %}

分享下自己积累并整理的一些SQLite常用操作以及Tips:

## 1. Add column

    ALTER TABLE {tableName} ADD COLUMN COLNew {type};

## 2. Delete column, Rename column

sqlite3不允许直接delete, rename column，只能进行以下操作

1. create new table as the one you are trying to change,
2. copy all data,
3. drop old table,
4. rename the new one.

example:

    create table temp(id integer PRIMARY KEY, code varchar(255));
    insert into temp(id, code) select id, code from t;

## 3. Rename table

    alter table foo rename to bar

## 4. Copy data from one sqlite file to another


    attach 'database2file' as db2;
    insert into TABLENAME select * from db2.TABLENAME;

## 5. 导出sql

    sqlite3 data.db
    >.output dd.sql
    >.dump

## 6. 导入

    sqlite3 mydb.db
    >.read dd.sql

## 7. 释放空间

有时候我们1M的sliqte数据库，我们删除了一部分数据后它的空间可能还是会1M，这时候执行下如下命令就可以释放空间

    vacuum

## 一些SQLite命令

.databases 列出数据库文件名

.tables ?PATTERN? 列出?PATTERN?匹配的表名

.import FILE TABLE 将文件中的数据导入的文件中

.dump ?TABLE? 生成形成数据库表的SQL脚本

.output FILENAME 将输出导入到指定的文件中

.output stdout 将输出打印到屏幕

.mode MODE ?TABLE?     设置数据输出模式(csv,html,tcl…

.nullvalue STRING 用指定的串代替输出的NULL串

.read FILENAME 执行指定文件中的SQL语句

.schema ?TABLE? 打印创建数据库表的SQL语句

.separator STRING 用指定的字符串代替字段分隔符

.show 打印所有SQLite环境变量的设置

.quit 退出命令行接口
