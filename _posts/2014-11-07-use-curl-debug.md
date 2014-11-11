---
layout: post
keywords: blog
description: blog
title: "使用curl来调试你的应用"
categories: [DevTools]
tags: [curl]
---
{% include codepiano/setup %}

我们在客户端开发过程中总免不了和后端进行api对接，有时候需要对返回的数据格式进行调试，有时候每次运行客户端来发送请求，这个未免效率太低，这里就来介绍一个好用的工具--curl。

## curl

curl是一个向服务器传输数据的工具，它支持http、https、ftp、ftps、scp、sftp、tftp、telnet等协议，这里只针对http进行讲解一些常用的用法，具体安装请自行搜索。

## 打开百度

    curl http://www.baidu.com

接着你就会看到百度的页面源代码输出。

如果要把这个网页保存下来，可以这样：

    curl http://www.baidu.com > /tmp/baidu.html

你会看到一条进度条，然后源码就被重定向到了/tmp/baidu.html。

或者：

    curl -o /tmp/baidu.html http://www.baidu.com

## GET请求

默认直接请求一个url就是发出一个get请求，参数的话直接拼接在url里就好了，如

    curl http://www.baidu.com/s?wd=curl

上述请求会上百度发起一条查询请求，参数是wd=url

## POST请求

    curl -d "name=test&page=1" http://www.baidu.com

**-d** 参数指定表单以POST的形式执行。

## 只展示Header

    curl -I  http://www.baidu.com

可以看到只返回一些header信息

    HTTP/1.1 200 OK
	Date: Fri, 07 Nov 2014 09:48:58 GMT
	Content-Type: text/html; charset=utf-8
	Connection: Keep-Alive
	Vary: Accept-Encoding
	Set-Cookie: BAIDUID=E9DB2F0AC95CB6BFDAD9D5CFDCED0A12:FG=1; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
	Set-Cookie: BAIDUPSID=E9DB2F0AC95CB6BFDAD9D5CFDCED0A12; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
	Set-Cookie: BDSVRTM=0; path=/
	Set-Cookie: BD_HOME=0; path=/
	Set-Cookie: H_PS_PSSID=9725_9165_1465_7800_9452_9498_6504_9509_6018_9700_9757_9531_9478_7798_9453_9793_9024; path=/; domain=.baidu.com
	P3P: CP=" OTI DSP COR IVA OUR IND COM "
	Cache-Control: private
	Cxy_all: baidu+3057b288b211c770a1463cc8519b62a8
	Expires: Fri, 07 Nov 2014 09:48:17 GMT
	X-Powered-By: HPHP
	Server: BWS/1.1
	BDPAGETYPE: 1
	BDQID: 0xfa28eff900012706
	BDUSERID: 0

## 显示通信过程

-v参数可以显示一次http通信的整个过程，包括端口连接和http request头信息

    curl -v www.baidu.com

    * Adding handle: conn: 0x7ffe4b003a00
	* Adding handle: send: 0
	* Adding handle: recv: 0
	* Curl_addHandleToPipeline: length: 1
	* - Conn 0 (0x7ffe4b003a00) send_pipe: 1, recv_pipe: 0
	* About to connect() to www.baidu.com port 80 (#0)
	*   Trying 61.135.169.125...
	* Connected to www.baidu.com (61.135.169.125) port 80 (#0)
	> GET / HTTP/1.1
	> User-Agent: curl/7.30.0
	> Host: www.baidu.com
	> Accept: */*
	>
	< HTTP/1.1 200 OK
	< Date: Fri, 07 Nov 2014 09:49:49 GMT
	< Content-Type: text/html; charset=utf-8
	< Transfer-Encoding: chunked
	< Connection: Keep-Alive
	< Vary: Accept-Encoding
	< Set-Cookie: BAIDUID=062E02D23FBB651CF8455B699DF02B64:FG=1; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
	< Set-Cookie: BAIDUPSID=062E02D23FBB651CF8455B699DF02B64; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
	< Set-Cookie: BDSVRTM=0; path=/
	< Set-Cookie: BD_HOME=0; path=/
	< Set-Cookie: H_PS_PSSID=7744_1429_7801_9583_9499_6506_6018_9769_9699_9757_9532_9477_7799_9453_9716_9023; path=/; domain=.baidu.com
	< P3P: CP=" OTI DSP COR IVA OUR IND COM "
	< Cache-Control: private
	< Cxy_all: baidu+7dcb6b3c03d32c334d42f311919a14d6
	< Expires: Fri, 07 Nov 2014 09:49:20 GMT
	< X-Powered-By: HPHP
	* Server BWS/1.1 is not blacklisted
	< Server: BWS/1.1
	< BDPAGETYPE: 1
	< BDQID: 0xadb706860000088f
	< BDUSERID: 0

如果你觉得上面的信息还不够，那么下面的命令可以查看更详细的通信过程。

    curl --trace output.txt www.baidu.com

或者

    curl --trace-ascii output.txt www.baidu.com

运行后，请打开output.txt文件查看。

## HTTP方法

curl默认的HTTP方法是GET，使用-X参数可以支持其他动词。

    curl -X POST www.example.com

    curl -X DELETE www.example.com

## Referer字段

有时你需要在http request头信息中，提供一个referer字段，表示你是从哪里跳转过来的。

    curl --referer http://www.example.com http://www.example.com

## User Agent字段

这个字段是用来表示客户端的设备信息。服务器有时会根据这个字段，针对不同设备，返回不同格式的网页，比如手机版和桌面版。

iPhone4的User Agent是

    Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7

curl可以这样模拟：

    curl --user-agent "[User Agent]" [URL]

## 增加头信息

有时需要在http request之中，自行增加一个头信息。--header参数就可以起到这个作用。

    curl --header "Content-Type:application/json" http://example.com



