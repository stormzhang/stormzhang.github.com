---
layout: post
keywords: blog
description: blog
title: "打造我的酷炫终端"
categories: [DevTools]
tags: [Terminal]
---
{% include codepiano/setup %}

![](/image/github11.jpg)

之前的这篇文章「[从0开始学习 GitHub 系列之「Git速成」](http://stormzhang.com/github/2016/05/30/learn-github-fromzero3/)」就有人给我留言说，张哥你的终端怎么这么酷炫，碉堡了，简直跟你本人一样帅，能告诉我是用了什么牛逼的工具么？你以为说我帅我就会告诉你了么？真是太天真了，我准备单独写篇文章告诉你！

## 1. iTerm2

我用的电脑是 Mac ，大家都知道 Mac 上自带的终端打开是白乎乎的一片，而且难用的要死，很多人给我留言就说为毛我的终端这么 low ，那是因为你用的系统自带的终端啊。今天我就来给你们推荐一款号称 Mac 上最好用的终端「iTerm2」，我推荐的，那绝对好用，来先给你们看看我的截图：

![](/image/iterm2.png)

是不是很屌？主题可以设置，而且同时可以像上图一样开多个窗口，尤其配合一个大显示器，装逼利器啊！不管你代码写的厉不厉害，反正给人的感觉就是你已经很厉害了！

别问我具体怎么设置，给你一个官网的下载链接，去官网找文档学习。

地址：[http://iterm2.com/](http://iterm2.com/)

## 2. Oh My Zsh

iTerm2 只是一个终端，可以设置终端的主题，但是终端里的命令行、代码显示等主题是属于 Shell 级别的。

什么是 Shell ？
Shell 是 Linux/Unix 的一个外壳，你理解成衣服也行。负责接收用户指令，然后把这些指令转化成系统可以理解的语言进而与 Linux 内核进行交互。什么是内核？你可以理解成是汽车的引擎，是真正干活的。

Linux/Unix 提供了很多种 Shell ，有sh、bash、csh等，你可以通过执行 more /etc/shells 命令来查看当前系统支持哪些 Shell ，以下是我的系统支持的 Shell 截图：

![](/image/shells.png)

为什么要有这么多 Shell 呢？因为我刚说了，Shell 就跟衣服一样，程序员看这件衣服不爽了，就接着发明另一件衣服，都觉得不够好，然后你发明这个，我发明那个，然后就有现在这么多了，但是一直到 zsh ，大家公认为「终极 Shell」终于来了，zsh 堪称史上最屌，太牛逼了。但是配置实在太过于复杂，一直不温不火，很多人想要尝试一下，都被那复杂的配置吓到了。

直到有一天，有一位很无聊的程序员，把这么多复杂的配置全都整合到一起了，简直是让你1分钟就配置好你的 zsh ，而且还开源了，给他起个名字叫 「oh my zsh」，没错，我的那些主题就是用的「oh my zsh」，它提供了上百种主题，我随便上几个主题你们感受下：

![](/image/zsh1.png)

![](/image/zsh2.png)

![](/image/zsh3.png)

![](/image/zsh4.png)

![](/image/zsh5.png)

![](/image/zsh6.png)

![](/image/zsh7.jpg)


除此之外，他还支持多的令人发指的插件，默认就支持了上百种，比如 git、bundler、osx、rake、ruby 等，所以这里你几乎不用另行配置。这里也就不做过多介绍，你们自行搜索研究。反正用过之后你就爱不释手！

地址：[https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

以上，**iTerm2 + Oh My Zsh** 就打造了我的酷炫终端，如果你还是 vim 粉，那就更完美了，有了这个终端，你学命令行都有动力了，而且一旦习惯，你会越来越喜欢命令行，我曾经试图用命令行去写 Android ，发现屌是屌，但就是效率太低了。但是我之前写 Ruby 的时候，给我一个终端，其他别无他求了！

技术可以很菜，但是代码一定要写的够帅！

就跟我打篮球时的态度一样，可以不进球，但是姿势一定要帅！对了，今天 9：00 勇士对阵雷霆G7，上一场G6我都多少年没看过这么精彩的比赛的了，看的那叫一个惊心动魄啊，比赛几乎是从头喊到尾的。今天上班的时候别忘记偷偷看比赛，我反正是提醒了我们团队的篮球迷记得看比赛的，偷偷的！


<br />

> 本文原创发布于微信公众号 **AndroidDeveloper「googdev」**，转载请务必注明出处！

![图片描述](/image/weixinpublic.jpg)

