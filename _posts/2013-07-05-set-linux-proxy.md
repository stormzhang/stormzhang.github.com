---
layout: post
title: linux下proxy设定的一般方法
keywords: linux,proxy
description: 在linux下设置proxy的一般方法
tags: [Linux, Proxy]
---
{% include codepiano/setup %}

<p class="paragraph">
在linux下配置测试环境时，经常遇到代理服务器配置的相关问题，在这里总结一些，为以后节省些时间。
也希望对需要的人有所帮助。
</p>

linux下proxy的常规设置
----------------------

<p class="paragraph">
一般是把如下环境变量的设置放到/etc/profile.d/proxy.sh文件中。
对于没有系统权限的用户，可以将下面的内容添加到自己用户目录下的.profile文件中。
这样登录后，大多数的应用程序都可以正常上网。
</p>

{% highlight sh %}

#proxy=http://用户名:密码@ProxyURL或IP地址:端口号
proxy=http://ProxyURL或IP地址:端口号
export http_proxy=$proxy
export https_proxy=$proxy
export ftp_proxy=$proxy

export no_proxy=以逗号分隔的除外列表

{% endhighlight %}

CentOS的yum工具的proxy设置
--------------------------

<p class="paragraph">
CentOS下，设置了上述proxy后，yum还是有不能正确下载有些资源包的情况，可以通过在
/etc/yum.conf文件中添加如下内容来单独设置proxy。
</p>

{% highlight sh %}

proxy=http://ProxyURL或IP地址:端口号
proxy_username=用户名
proxy_password=密码

{% endhighlight %}