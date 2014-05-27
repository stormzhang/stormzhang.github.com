---
layout: post
keywords: blog
description: blog
title: "认识一下Sketch"
categories: [Design]
tags: [Sketch]
---
{% include codepiano/setup %}

Jean-Marc Denis（原文作者，前Sparrow设计师，现在在Google工作）在参加WWDC 2013时认识了Sketch的开发团队，所以在第一时间尝试了Sketch，当时由于一些功能的缺失，所以还是折回去使用Photoshop了。过了一段时间，他发现设计师社区开始疯狂着迷于这款新的设计工具，所以决定再试一试，想看看迭代了一段时间的Sketch现在能完成多少原先他需要用Photoshop来做的工作。现在，他80%的设计工作都是由Sketch来完成的，所以写了这篇文章来帮助大家一起了解Sketch。

## Photoshop并不是一款合适的界面设计工具

为什么我们会期待一个新的设计工具？因为当我们更多的关注效率和关注协作，就越发现Photoshop已经不足以满足我们的期待了。下面看看具体的理由：

* 并非为设计师打造

Photoshop是为图像处理开发的，诸如路径和矢量工具都是后期才加上去的，所以如果你关心一下Photoshop的更新路径，用户界面设计师完全不是Adobe做这条产品时关心的用户群。所以，如果抛去那些复杂的功能，一个为用户界面设计师打造的设计工具完全可以做得更简单，更高效。

* 不适合移动时代

相信我们都会觉得为不同的设备输出不同分辨率的素材而痛苦不已吧。或许，你会使用一些第三方插件或是启用一些模板来处理这些事，但依然是很浪费时间的。

* 引擎太过陈旧

Photoshop的引擎是上个世纪为图像处理而打造的，非常的耗费资源，即使是启动一下都要等很久，更别说一次移动多个分组了。话说回来，由于要兼顾Mac和Windows平台，能做到这样已经不容易了。

* 越来越跟不上时代

大公司的执行效率实在太低。不知道大伙是不是和我一样，非常痛苦地等了好几个月才等到Photoshop对Retina屏幕的支持。诸如自动对齐的等功能我已经不做期待了。

## 为什么Sketch确实值得尝试

* 自动保存和多版本控制

有没有梦想过拜托机械的手动保存？Sketch可以做到。Sketch在工作的时候会不断地自动保存成果，并且允许你回复到此前的任一版本。

<img src="https://d262ilb51hltx0.cloudfront.net/max/800/0*-4cYKm2z-PiOVFnk.png" />

* 矢量作图并且像素级的完美

矢量图意味着可以任意扩展。你没有必要不断地去调整素材的尺寸，Sketch会自动就帮你维持一个像素级完美的作品。如果有的时候你必须用像素点来作图，比如说是画图标或者是插画设计，Sketch 也提供了从矢量切换到像素视图的功能。

<img src="https://d262ilb51hltx0.cloudfront.net/max/1600/0*55Ko51isBD3VVcSL.png" />

* 智能标尺

你喜欢xScope吗？还是正在用选框工具来进行测量？又或者是难用的网格？Sketch的智能标尺可以帮你轻松地把设计元素的对齐方式、内外间距都调整完美。就我个人而言，这个功能非常节省时间而且避免了复杂的人工计算，是我觉得最有用的功能之一。

<img src="https://d262ilb51hltx0.cloudfront.net/max/800/0*DOaquv046FxhhUz6.gif" />

* 随时随地编辑元素

在Sketch里我们可以随时随地修改一个元素的圆角、高度和宽度。只需要简单地修改数值就可以轻松调整元素，对于刚从Photoshop切换过来的设计师而言非常好用。甚至会让你产生强烈的依赖。

* 图形拼接

在Sketch 里你可以很轻松地把多个图形合并，构成一个新的图形。并且Sketch在提供了多种图形合并模式的同时，还允许你随时修改已经合并图形的子图形。这项功能使得你可以很轻松地管理和创造更复杂的图形。

<img src="https://d262ilb51hltx0.cloudfront.net/max/800/0*4piteVCDqPNzWS3V.jpeg" />

* 每个图层都可以有多种混合效果

在Photoshop里想要让一个图层有多种混合效果是很困难的。但在Sketch里，你可以很容易给一个图层加上多种混合效果，看看下面的示例就知道了。

<img src="https://d262ilb51hltx0.cloudfront.net/max/800/0*UWRr3uQgedzzHtS6.png" />

* 自动选择最接近的像素边界

自动选择最接近的像素边界可以让一个图形或者是图层自动修正边距到一个像素级完善的位置。比如可以把一个宽度是5.3px的图形自动修正到5px，这样就不会有模糊的像素点和粗糙的图形了。我自己给这项功能设了一个快捷键（Command+Opitons+x），来确保我做出的每一个图形都像素级完美。这比人工一个一个按照网格修改图形高效得多。

<img src="https://d262ilb51hltx0.cloudfront.net/max/800/0*me1mYlEw5C1JKAKY.jpeg" />

* 样式链接

有的时候你会做一些充斥文字的设计，样式链接可以帮助你设定一个固定的样式来快速地应用在新的文字上。如果你修改了其中任何一处的样式，那么所有链接该样式的文字都会自动更新到新的样式。并且，这项功能也可以应用在图形上。

<img src="https://d262ilb51hltx0.cloudfront.net/max/774/0*bTuYN8VIHPDImDXh.gif" />

* 导出素材

用Photoshop的时候，最痛苦的事莫过于切割元素，然后到处素材。Sketch则可以帮助你快速地导出各种分辨率和格式（pdf, eps, svg, png, jpg, tiff）的素材，通常导出只需要一个点击，并且不用借助任何第三方应用程序。

<img src="https://d262ilb51hltx0.cloudfront.net/max/914/0*Qjf-7dLH9R7H-yOk.png" />

* 分布式布局

作富文本设计的时候，布局会变得非常重要，这项功能可以帮助你快速地试验不同的方案。

* 网格

其实可以把网格功能理解成按照纵横两个维度自动地结构化布局内容。这个对于排版布局而言，非常方便。

<img src="https://d262ilb51hltx0.cloudfront.net/max/800/0*7TrwZwsBKN-hGLxk.jpeg" />

* 出色的文字渲染

Sketch的文字渲染引擎非常出色，可以用来做很出色的文字布局和字体设计。因此，你可以放心地放弃Photoshop的抗锯齿功能。

<img src="https://d262ilb51hltx0.cloudfront.net/max/800/0*2wahLljvKwgbT_Ws.png" />

* CSS样式导出

如果你在做一些网页设计，Sketch可以帮助你快速地把你的成果到处成CSS样式。

<img src="https://d262ilb51hltx0.cloudfront.net/max/800/0*qgh086TCiTWrVOl9.png" />

<img src="https://d262ilb51hltx0.cloudfront.net/max/800/0*NxQ0xvJylnXQbGVm.png" />

* 旋转副本

这是一项小功能，但是确实可以节约你很多时间和精力。

* Sketch Mirror

Sketch Mirror是一个Universal App，可以方便你在iPhone或是iPad上查看自己的成果。（作者撰写这个文章的时候Sketch还没有推出官方的镜像工具，所以这一段是译者补充的）。

## 快速响应是杀手锏

Sketch是一个小团队，发展非常快速。简单扫一眼Sketch的升级日志，你会发现每一个更新都会带来新的功能。
我非常建议你去使用Beta版本，你会见证Sketch快速的升级。
Sketch团队非常善于聆听用户的诉求，因而软件不断地变得更好。你可以去tenderapp上向他们提出新功能的要求。

## 相关链接

* [下载试用版](http://www.bohemiancoding.com/download/sketch.zip)

* [Mac App Store下载地址](http://www.bohemiancoding.com/sketch/buy)

* [Ment To 的博文](http://blog.mengto.com/topic/sketch/)

* [Sketch 技巧分享博客](http://sketchtips.tumblr.com/)

* [Sketch 资源下载](http://www.sketchappsources.com/)

* [Sketch 豆瓣中文小组](http://www.douban.com/group/sketchapp/)

* [Sketch 中文社区](http://community.sketchcn.com/)

原文来自[http://jianshu.io/p/7e8905b18620](http://jianshu.io/p/7e8905b18620)

