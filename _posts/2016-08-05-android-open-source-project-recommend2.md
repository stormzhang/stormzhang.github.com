---
layout: post
keywords: blog
description: blog
title: "Android开源项目推荐之「网络请求哪家强」"
categories: [OpenSource]
tags: [Http]
---
{% include codepiano/setup %}


不少人老催这个系列，好吧，今天就更新一篇干货给你们。网络请求这个话题基本是所有 App 开发都会遇到的，这也难怪之前很多人留言让我写写网络请求到底该怎么选择，今天就来说说网络请求到底哪家强！    


## 1. 原则            

   
本篇说的网络请求专指 http 请求，在选择一个框架之前，我个人有个习惯，就是我喜欢选择专注的库，其实在软件设计领域有一个原则叫做 「单一职责原则」，跟我所说的「专注」不谋而合，一个库能把一件事做好就很不错了。现如今有很多大而全的库，比如这个库可以网络请求，同时又可以图片加载，又可以数据存储，又可以 View 注解等等，我们使用这种库当然方便了，但是你有没有想过？这样会使得你整个项目对它依赖性太强，万一以后这个库不维护了，或者中间某个模块出问题了，这个影响非常大，而且我一直认为大而全的框架可能某一块都做的不够好，所以我在选择的时候更喜欢专注某一领域的框架。    

   
在上面原则的基础上，所以目前来说单纯的网络请求库就锁定在了 Volley、OkHttp、Retrofit 三个，android-async-http 的作者已经不维护，所以这里就不多说了，下面我们分别来说说这三个库的区别。    

   
   
## 2. OkHttp            

   
我们知道在 Android 开发中是可以直接使用现成的 api 进行网络请求的，就是使用 HttpClient、HttpUrlConnection 进行操作，目前 HttpClient 已经被废弃，而 android-async-http 是基于 HttpClient 的，我想可能也是因为这个原因作者放弃维护。    

   
而 OkHttp 是 Square 公司开源的针对 Java 和 Android 程序，封装的一个高性能 http 请求库，所以它的职责跟 HttpUrlConnection 是一样的，支持 spdy、http 2.0、websocket ，支持同步、异步，而且 OkHttp 又封装了线程池，封装了数据转换，封装了参数使用、错误处理等，api 使用起来更加方便。可以把它理解成是一个封装之后的类似 HttpUrlConnection 的一个东西，但是你在使用的时候仍然需要自己再做一层封装，这样才能像使用一个框架一样更加顺手。    

   
OkHttp 的具体使用方法这里就不赘述，地址在这里：    

   
[http://square.github.io/okhttp/](http://square.github.io/okhttp/)

   
   
## 3. Volley            


Volley 是 Google 官方出的一套小而巧的异步请求库，该框架封装的扩展性很强，支持 HttpClient、HttpUrlConnection，甚至支持 OkHttp，具体方法可以看 Jake 大神的这个 Gist 文件：
   
   
[https://gist.github.com/JakeWharton/5616899](https://gist.github.com/JakeWharton/5616899) 

   
而且 Volley 里面也封装了 ImageLoader ，所以如果你愿意你甚至不需要使用图片加载框架，不过这块功能没有一些专门的图片加载框架强大，对于简单的需求可以使用，对于稍复杂点的需求还是需要用到专门的图片加载框架。    

   
Volley 也有缺陷，比如不支持 post 大数据，所以不适合上传文件。不过 Volley 设计的初衷本身也就是为频繁的、数据量小的网络请求而生！    
关于 Volley 的具体用法可以见我很早在 GitHub 的一个 demo ：    

   
[https://github.com/stormzhang/AndroidVolley](https://github.com/stormzhang/AndroidVolley )

   
   
## 4. Retrofit            

   
Retrofit 是 Square 公司出品的默认基于 OkHttp 封装的一套 RESTful 网络请求框架，不了解 RESTful 概念的不妨去搜索学习下，RESTful 可以说是目前流行的一套 api 设计的风格，并不是标准。Retrofit 的封装可以说是很强大，里面涉及到一堆的设计模式，你可以通过注解直接配置请求，你可以使用不同的 http 客户端，虽然默认是用 http ，可以使用不同 Json Converter 来序列化数据，同时提供对 RxJava 的支持，使用 Retrofit + OkHttp + RxJava + Dagger2 可以说是目前比较潮的一套框架，但是需要有比较高的门槛。    

Retrofit 的具体使用方法与地址在这里：    

   
[http://square.github.io/retrofit/](http://square.github.io/retrofit/)

   
   
## 5. Volley VS OkHttp            

   
毫无疑问 Volley 的优势在于封装的更好，而使用 OkHttp 你需要有足够的能力再进行一次封装。而 OkHttp 的优势在于性能更高，因为 OkHttp 基于 NIO 和 Okio ，所以性能上要比 Volley更快。    

   
估计有些读者不理解 IO 和 NIO 的概念，这里姑且简单提下，这两个都是 Java 中的概念，如果我从硬盘读取数据，第一种方式就是程序一直等，数据读完后才能继续操作，这种是最简单的也叫阻塞式 IO，还有一种就是你读你的，我程序接着往下执行，等数据处理完你再来通知我，然后再处理回调。而第二种就是 NIO 的方式，非阻塞式。    

   
所以 NIO 当然要比 IO 的性能要好了， 而 Okio 是 Square 公司基于 IO 和 NIO 基础上做的一个更简单、高效处理数据流的一个库。    

   
理论上如果 Volley 和 OkHttp 对比的话，我更倾向于使用 Volley，因为 Volley 内部同样支持使用 OkHttp ，这点 OkHttp 的性能优势就没了，而且 Volley 本身封装的也更易用，扩展性更好些。    

   
   
## 6. OkHttp VS Retrofit            

   
毫无疑问，Retrofit 默认是基于 OkHttp 而做的封装，这点来说没有可比性，肯定首选 Retrofit。    

   
   
## 7. Volley VS Retrofit            

   
这两个库都做了非常不错的封装，但是 Retrofit 解耦的更彻底，尤其 Retrofit 2.0 出来，Jake 对之前 1.0 设计不合理的地方做了大量重构，职责更细分，而且 Retrofit 默认使用 OkHttp ，性能上也要比 Volley 占优势，再有如果你的项目如果采用了 RxJava ，那更该使用 Retrofit 。    

   
所以说这两个库相比，Retrofit 毫无疑问更有优势，你在能掌握两个框架的前提下该优先使用 Retrofit。但是个人认为 Retrofit 门槛要比 Volley 稍高些，你要理解他的原理，各种用法，想彻底搞明白还是需要花些功夫的，如果你对它一知半解，那还是建议在商业项目使用 Volley 吧。    

   
   
## 8. 总结            

   
所以综上，如果以上三种网络库你都能熟练掌握，那么优先推荐使用 Retrofit ，前提是最好你们的后台  api 也能遵循 RESTful 的风格，其次如果你不想使用或者没能力掌握 Retrofit ，那么推荐使用 Volley ，毕竟 Volley 你不需要做过多的封装，当然如果你们需要上传大数据，那么不建议使用 Volley，否则你该采用 OkHttp 。    

   
最后，我知道可能有些人会纠结 Volley 与 OkHttp 的选择，那是因为我认为 OkHttp 还是需要一定的能力做一层封装的，如果你有能力封装的话那不如直接用 Retrofit 了，如果没能力封装还是乖乖的用 Volley 吧，如果你能有一些不错的基于 OkHttp 封装好的开源库，那么另说了，Volley 与 OkHttp 怎么选择随你便呗。    

   
最最后，以上只是我一家之言，如有误导，概不负责！欢迎讨论与交流。 

#### 相关文章

[Android开源项目推荐之「图片加载到底哪家强」](http://stormzhang.com/opensource/2016/06/26/android-open-source-project-recommend1/) 


<br />

> 本文原创发布于微信公众号 **AndroidDeveloper「googdev」**，转载请务必注明出处！

![图片描述](/image/weixinpublic.jpg)


  