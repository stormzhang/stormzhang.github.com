---
layout: post
keywords: blog
description: blog
title: "从0开始学习 GitHub 系列之「初识 GitHub」"
categories: [GitHub]
tags: [GitHub]
group: archive
icon: file-alt
---
{% include codepiano/setup %}

## 1. 写在前面
我一直认为 GitHub 是程序员必备技能，程序员应该没有不知道 GitHub 的才对，没想到这两天留言里给我留言最多的就是想让我写关于 GitHub 的教程，说看了不少资料还是一头雾水，我转念一想，我当初接触 GitHub 也大概工作了一年多才开始学习使用，我读者里很多是初学者，而且还有很多是在校大学生，所以不会用 GitHub 也就不奇怪了，所以我觉得写一写关于 GitHub 的教程就非常有必要了！

## 2. 为什么还要造轮子
很多人难免要问这个问题，说网上关于 GitHub 的资料很多，为什么还要写呢？讲真，网上关于 Android 的资料更多，为什么你们还喜欢看我写的文章呢？是因为哪怕同样的内容，我写出来之后就有了我的风格，除了我的幽默以及我的帅，关键的是我有办法让你们看的轻松易懂，并且还有我个人的一些见解与指导，这大概是一种特殊的魅力吧！

我是从小白一路过来的，很能理解你们内心的感受与困惑，因为这些阶段都是我自己亲身经历过的，所以我写的文章都会从你们的角度去出发，并且我对文章高要求，除了排版、配图很用心外，文章的内容每次写完我都会亲自看三四遍，确保不会出现误导以及你们理解不了的情况，你们看的很轻松易懂的文章其实因为我背后做了很多的功课。

所以，为了你们，我觉得有必要用我的风格去教你们如何从0开始，跟着我一步步学习 GitHub ！

## 3. 什么是 GitHub
确切的说 GitHub 是一家公司，位于旧金山，由 Chris Wanstrath, PJ Hyett 与 Tom Preston-Werner 三位开发者在2008年4月创办。这是它的 Logo：

![图片描述](/image/Octocat.png)

2008年4月10日，GitHub正式成立，地址：How people build software · GitHub ，主要提供基于git的版本托管服务。一经上线，它的发展速度惊为天人，截止目前，GitHub 已经发展成全球最大的开（同）源（性）社区。

## 4. GitHub 与 Git 的关系
这个我还专门在群里调查过，很多人以为 GitHub 就是 Git，其实这是一个理解误区。

Git 是一款免费、开源的分布式版本控制系统，他是著名的 Linux 发明者 Linus Torvalds 开发的。说到版本控制系统，估计很多人都用过 SVN ，只不过 Git 是新时代的产物，如果你还在用 SVN 来管理你的代码，那就真的有些落伍了。不管是学习 GitHub ，还是以后想从事编程行业，Git 都可以算是必备技能了，所以从现在开始建议你先去学习熟悉下 Git ，后面我会有文章推荐一些适合新手的 Git 学习资料给你们。

而 GitHub 上面说了，主要提供基于 git 的版本托管服务。也就是说现在 GitHub 上托管的所有项目代码都是基于 Git 来进行版本控制的，所以 Git 只是 GitHub 上用来管理项目的一个工具而已，GitHub 的功能可远不止于此！

## 5. GitHub 的影响力
上面我说了 GitHub 现在毫无疑问基本是全球最大的开源社区了，这样说你们可能认为未免有点浮夸，且听我一一举证：

#### 全球顶级科技公司纷纷加入 GitHub ，并贡献他们自己的项目代码

- Google: [https://github.com/google](https://github.com/google)
- 苹果: [https://github.com/apple](https://github.com/apple)
- Facebook: [https://github.com/facebook](https://github.com/facebook)
- Twitter：[https://github.com/twitter](https://github.com/twitter)
- 微软：[https://github.com/microsoft](https://github.com/microsoft)
- Square：[https://github.com/square](https://github.com/square)
- 阿里：[https://github.com/alibaba](https://github.com/alibaba)
- ...

#### 全球顶级开源项目都优先选择在 GitHub 上开源

- Linux：[https://github.com/torvalds/linux](https://github.com/torvalds/linux)
- Rails：[https://github.com/rails/rails](https://github.com/rails/rails)
- Nodejs：[https://github.com/nodejs/node](https://github.com/nodejs/node)
- Swift：[https://github.com/apple/swift](https://github.com/apple/swift)
- CoffeeScript：[https://github.com/jashkenas/coffeescript](https://github.com/jashkenas/coffeescript)
- Ruby：[https://github.com/ruby/ruby](https://github.com/ruby/ruby)
- ...

#### 全球顶级编程大牛加入GitHub

- Linux 发明者 Linus Torvalds：[https://github.com/torvalds](https://github.com/torvalds)

![图片描述](/image/linus.png)

- Rails 创始人 DHH：[https://github.com/dhh](https://github.com/dhh)

![图片描述](/image/dhh.png)

- 被称为「Android之神」的 JakeWharton：[https://github.com/JakeWharton](https://github.com/JakeWharton) ， 你们用的很多开源库如 ButterKnife、OkHttp、 Retrofit、 Picasso、ViewPagerIndicator 等都是出自他之手！

![图片描述](/image/jake.png)

其他就不一一列举了，GitHub 上活跃的很多是 Google 、Square、阿里等公司的员工，有些甚至还是Google Android Team组的，所以在这里你可以接触到全球顶级编程大牛！

## 6. GitHub 有什么用

- 学习优秀的开源项目

开源社区一直有一句流行的话叫「不要重复发明轮子」，某种意义上正是因为开源社区的贡献，我们的软件开发才能变得越来越容易，越来越快速。试想你在做项目时，如果每一模块都要自己去写，如网络库、图片加载库、ORM库等等，自己写的好不好是一回事，时间与资源是很大的成本。对于大公司可能会有人力与资源去发明一套自己的轮子，但是对于大部分互联网创业公司来说时间就是一切。而且你在使用开源项目的过程也可以学习他们优秀的设计思想、实现方式，这是最好的学习资料，也是一份提升自己能力的绝佳方式！

- 多人协作

如果你想发起一个项目，比如翻译一份不错的英文文档，觉得一个人的精力不够，所以你需要更多的人参与进来，这时候 GitHub 是你的最佳选择，感兴趣的人可以参与进来，利用业余时间对这个项目做贡献，然后可以互相审核、合并，简直不要太棒！

- 搭建博客、个人网站或者公司官网

这个就不用多说了，现在越来越多的博客都是基于 GitHub Pages 来搭建的了，你可以随心所欲的定制自己的样式，可以给你博客买个逼格高的域名，再也不用忍受各大博客网站的约束与各式各样的广告了！

- 写作

如果你喜欢写作，而且基于 Markdown， 并准备出版书籍，那么推荐你用 Gitbook ，技术写作人的最爱！

- 个人简历

如果你有一个活跃的 GitHub 账号，上面有自己不错的开源项目，还经常给别的开源项目提问题，push 代码，那么你找工作将是一个非常大的优势，现在程序员的招聘很多公司都很看中你 GitHub 账号，某种意义上 GitHub 就可以算是你的简历了。而且不仅国内，很多国外的科技公司都会通过 GitHub 来寻找优秀的人才，比如我甚至通过 GitHub 收到过 Facebook 的邀请邮件！

- 其他

当然 GitHub 能做的还远不止这些，我见过很多在 GitHub 搞的一些有意思的项目，有找男朋友的，甚至还有利用 GitHub 的 commit 丧心病狂的秀恩爱的，没错，那个丧心病狂的人就是我，如果你前段日子关注了我的 GitHub ，那么能看到这么一个壮观的景象：

![图片描述](/image/stormzhang.jpg)

## 7. 加入 GitHub
读完我的文章，我相信你已经蠢蠢欲动了，从现在开始，立刻、马上去注册个 GitHub 「[https://github.com/](https://github.com/)」，去体验一番，不会用不要紧，接下来我会有一系列详细的文章，来教你学会使用 GitHub ！

但是为了保证文章的质量，我要做很多准备工作，我没法保证每天都会连载，但是我会尽力尽快更新这个系列，让你们从0开始一步步一起来学习，如果周围有同学或者朋友想要学习的，那赶紧转发或者推荐他关注这个系列的文章，毕竟有个小伙伴一起学会更有氛围，后续除了理论我还会考虑结合实践，我不信你学不会！

<br />

> 本文原创发布于微信公众号 **AndroidDeveloper「googdev」**，转载请务必注明出处！

![图片描述](/image/weixinpublic_200.png)
