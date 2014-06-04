---
layout: post
keywords: blog
description: blog
title: "Android Memory Debug"
categories: [Android]
tags: [GC_CONCURRENT]
---
{% include codepiano/setup %}

在Android开发中经常看到LogCat日志上打印系统回收的东西，但是却又不知道什么意思，这篇博客就来讲讲这些调试信息的含义。

一般Java虚拟机要求支持verbosegc选项，输出详细的垃圾收集调试信息。dalvik虚拟机很安静的接受verbosegc选项，然后什么都不做。dalvik虚拟机使用自己的一套LOG机制来输出调试信息。

如果在Linux或者Mac下运行adb logcat命令，可以看到如下的输出：

D/dalvikvm( 5809):GC_CONCURRENT freed 319K, 41% free 3465K/8453K, external 4703K/5261K, paused 7ms+18ms

其中D/dalvikvm表示由dalvikvm输出的调试信息，括号后的数字代表dalvikvm所在进程的pid。

GC_CONCURRENT表示触发垃圾收集的原因，有以下几种：

* GC_MALLOC, 内存分配失败时触发

* GC_CONCURRENT，当分配的对象大小超过384K时触发

* GC_EXPLICIT，对垃圾收集的显式调用(System.gc)

* GC_EXTERNAL_ALLOC，外部内存分配失败时触发

freed 319K: 表示本次垃圾收集释放了199K的内存

41% free 3465K/8453K: 其中8453K表示当前内存总量，3465K表示可用内存，41%表示可用内存占总内存的比例

external 4703K/5261K: 表示可用外部内存/外部内存总量

paused 7ms+18ms: garbage collection 总共花费了 (7 + 18) ms (启动花费时间+结束花费时间)
