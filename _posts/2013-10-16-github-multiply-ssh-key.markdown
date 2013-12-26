---
layout: post
title: "多个github帐号的SSH key切换"
tags: [ssh]
categories: [Other]
---
{% include codepiano/setup %}

## 背景

今天给我女朋友弄了个github账号，由于准备全部在一台mbp上管理，当准备给新的github账号添加ssh key的时候提示我该ssh key已经使用过了，因为我之前已经把该ssh key添加到我的github账号上了。

## 原因

<p>
github使用SSH与客户端连接。如果是单用户（first），生成密钥对后，将公钥保存至github，每次连接时SSH客户端发送本地私钥（默认~/.ssh/id_rsa）到服务端验证。单用户情况下，连接的服务器上保存的公钥和发送的私钥自然是配对的。但是如果是多用户（first，second），我们在连接到second的帐号时，second保存的是自己的公钥，但是SSH客户端依然发送默认私钥，即first的私钥，那么这个验证自然无法通过。不过，要实现多帐号下的SSH key切换在客户端做一些配置即可。
</p>

## 解决方案

首先，在新增私钥的时候，通过指定不同的文件名来生成不同的私钥文件

{% highlight xml %}
ssh-keygen -t rsa -f ~/.ssh/id_rsa_second -C "second@mail.com"
{% endhighlight %}

默认SSH只会读取id_rsa，所以为了让SSH识别新的私钥，需要将其添加到SSH agent

{% highlight xml %}
ssh-add ~/.ssh/id_rsa_second
{% endhighlight %}

该命令如果报错：Could not open a connection to your authentication agent.无法连接到ssh agent，可执行ssh-agent bash命令后再执行ssh-add命令。

<p>
完成以上步骤后在~/.ssh目录创建config文件，该文件用于配置私钥对应的服务器。内容如下：
</p>

{% highlight xml %}
# first.github (first@gmail.com)
Host github.com
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa

# second (second@gmail.com)
Host github-second
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_second
{% endhighlight %}

Host随意即可，方便自己记忆，后续在添加remote是还需要用到。

配置完成后，在连接非默认帐号的github仓库时，远程库的地址要对应地做一些修改，比如现在添加second帐号下的一个仓库origin，则需要这样添加：

{% highlight ruby %}
git remote add origin git@github-second:second/test.git
# 并非原来的git remote add origin git@github.com:second/test.git
{% endhighlight %}

这样每次连接都会使用id_rsa_second与服务器进行连接。至此，大功告成！

注意：github根据配置文件的user.email来获取github帐号显示author信息，所以对于多帐号用户一定要记得将user.email改为相应的email(second@mail.com)。

### 参考github帮助文档：

* [http://help.github.com/win-set-up-git/](http://help.github.com/win-set-up-git/)

* [http://help.github.com/multiple-ssh-keys/](http://help.github.com/multiple-ssh-keys/)