---
layout: post
title: "搭建Octopress"
tags: [Octopress]
categories: [Other]
---

准备开一个博客，但是一直犹豫在哪里开，是在CSDN，博客园，新浪，网易...纠结中，但是一直觉得以上平台要么不适合做技术博客，要么觉得不太高端，门槛太低。于某一天终于发现了Octopress，欣喜过望，这就是我想要的，有一定门槛，需要ruby，git等技术。终于可以像黑客一样写博客了，哈哈，很兴奋。下面记录下搭建的过程。

## 1.安装Octopress

{% highlight ruby %}

git clone git://github.com/imathis/octopress.git octopress
cd octopress
bundle update    # 安装依赖的组件
rake install     # 安装默认的Octopress主题

{% endhighlight %}

## 2.配置Git

值得注意的是这里git的origin已经存在，并且指向octopress的master分支的，这里为了方便进行了更改：

{% highlight ruby %}

git remote rm origin
git remote add origin git@github.com:stormzhang/stormzhang.github.com.git
git remote add octopress git://github.com/imathis/octopress.git  # 为了octopress的升级而添加

{% endhighlight %}

## 3.配置github

在github上创建一个仓库，注意仓库名称要以下这种格式yourname.github.com，这样代码发布后自动这个url就可以访问了（此处一定要注意哦，我刚开始没注意，死活没得到想要的效果）。 例如你的 GitHub 帐号是 jack 就将 Repository 命名为 jack.github.com， 完成后会得到一组 GitHub Pages URL http://yourname.github.com/ (注意不能用 https协议，必须用 http协议)。

设定 GitHub Pages

{% highlight ruby %}

rake setup_github_pages

{% endhighlight %}

以上执行后会要求 read/write url for repository ： 

git@github.com:yourname/yourname.github.com.git 

{% highlight ruby %}

rake generate
rake deploy

{% endhighlight %}

等待几分钟后，github上会收到一封信：“{yourname.github.com} Page build successful”，第一次发布后等比较久，之后每次都会直接更新。 当你发布之后，你就可以到 http://yourname.github.com 上看到你的博客了.

## 4.将 source 也加入 git

{% highlight ruby %}

git add .
git commit -m 'initial source commit'
git push origin source

{% endhighlight %}

## 5.更新 Octopress

{% highlight ruby %}

git remote add octopress git://github.com/imathis/octopress.git
git pull octopress master     # Get the latest Octopress
bundle install                # Keep gems updated
rake update_source            # update the template's source
rake update_style             # update the template's style

{% endhighlight %}

## 6.发表新文章

{% highlight ruby %}

rake new_post["新文章名称"]
rake preview

{% endhighlight %}

用浏览器打开 http://localhost:4000 就可以看到效果了。

## 7.发布

{% highlight ruby %}

rake gen_deploy
rake deploy                 #若发布后无效果可试试此命令

{% endhighlight %}
