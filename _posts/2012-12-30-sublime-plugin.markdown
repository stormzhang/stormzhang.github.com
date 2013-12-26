---
layout: post
title: "Sublime Text 2 Plugin"
tags: [Sublime]
categories: [DevTools]
---
{% include codepiano/setup %}

之前做android开发一直用eclipse做编辑器，之后接触ruby之后便开始用Sublime Text 2，渐渐的才发现此等编辑器的好处，也越来越依赖它。

Sublime Text 2是一个轻量、简洁、高效、跨平台的编辑器，方便的配色以及兼容vim快捷键等各种优点博得了很多前端开发人员的喜爱。之前也不并知道它有这么多插件的扩展与支持，直到vincent问到有没有在用cTags插件，才知道原来Sublime通过插件也可以实现一些大型IDE的功能，遂google一下，本篇Blog就来介绍下Sublime下经常使用的插件。

## 安装包控制（Package Control）

打开Sublime Text 2，点击 Tools -> Command Palette 调出控制台Console；

将以下代码粘贴进命令行中并回车：

{% highlight ruby %}

import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())

{% endhighlight %}

重启 Sublime Text 2，如果在 Preferences -> Package Settings中见到Package Control这一项，就说明安装成功了。

## 安装Alignment插件

对于某些喜欢整齐的程序员来说，看到下面这种情况可能是让其无法忍受的：

{% highlight ruby %}

var joe = 'joe';
var johnny = 'johnny';
var quaid = 'quaid';

{% endhighlight %}

一定要改成这样才会安心：

{% highlight ruby %}

var joe    = 'joe';
var johnny = 'johnny';
var quaid  = 'quaid';

{% endhighlight %}

Sublime Text 2 之中，一个 Sublime Alignment 插件也可以轻松实现。

1.按下 Ctrl + Shift + P 调出命令面板。

2.输入 install 调出 Package Control: Install Package 选项，按下回车。

3.在列表中找到 Alignment，按下回车进行安装。

4.重启 Sublime Text 2 使之生效。现在通过选中文本并按 Ctrl + Shift + A  就可以进行对齐操作了。

## Vim模式

是的，Sublime Text 2已经支持 Vim 的编辑模式了，如果更喜欢 Vim 的编辑模式，可以通过以下方法来激活 Vintage mode：

1.按下 Ctrl + Shift + P 调出命令面板。

2.输入 settings user 调出 Preferences：Settings - User，并按下回车。

3.这时会打开一个 Preferences.sublime-settings 的文件， 如果是第一次修改，它应该是个空文件，把以下文本粘贴进去：

{% highlight ruby %}

{
  "ignored_packages": []
}

{% endhighlight %}

4.保存这个文件，这时按下 ESC 键，再按下一些你熟悉的 Vim 命令，是不是很有亲切感？

## 安装 Soda 主题

这里所讲的主题不同于针对代码的 Color Scheme，是指针对 Sublime 程序本身的主题，目前可以安装的是 Ian Hill 的 Soda。

因为源中已经添加，所以这款主题的安装同样可以通过 Package Control，非常方便。目前 Soda 主题提供了明暗两种风格。

激活方法，同样要修改 Preferences：Settings - User：

1.按下 Ctrl + Shift + P 调出命令面板。

2.输入 user settings 调出 Preferences：Settings - User，并按下回车。

3.添加以下代码激活 Soda Light 主题：

{% highlight ruby %}

{
  "theme": "Soda Light.sublime-theme"
}

{% endhighlight %}

添加以下代码激活 Soda Dark 主题：

{% highlight ruby %}

{
  "theme": "Soda Dark.sublime-theme"
}

{% endhighlight %}

4.保存生效。

## 安装cTags插件

这个插件能跨文件跳转，实现像eclipse可那样以追踪函数的功能，从此更喜欢上Sublime了。安装方法:

1.按下 Ctrl + Shift + P 调出命令面板。

2.输入 install 调出 Package Control: Install Package 选项，按下回车。

3.在列表中找到 ctags，按下回车进行安装。

4.ubuntu下安装运行命令：sudo apt-get install exuberant-ctags。

5.在sublime项目文件夹右键， 会出现Ctag:Rebuild Tags 的菜单。点击它，然后会生成.tags的文件。

然后在你代码中， 光标放在某个函数上， 点击ctrl+shift+鼠标左键 就可以跳转到函数声明的地方。

## Zen Coding

如果经常要写一些前端的代码，这个插件也是必不可少的，还不知道ZenCoding的同学推荐去看一下：[《Zen Coding: 一种快速编写HTML/CSS代码的方法》](http://www.qianduan.net/zen-coding-a-new-way-to-write-html-code.html)

## Git

一个整合GIT和Sublime Text的插件，执行了很多你需要使用的命令。
