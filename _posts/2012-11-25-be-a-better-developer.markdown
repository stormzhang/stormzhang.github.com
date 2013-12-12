---
layout: post
title: "Become a Better Developer You Can"
date: 2012-11-25 14:46
tags: [RubyConf]
categories: [RubyOnRails]
---

> 很荣幸参加了RubyConfChina-2012大会，即第四次Ruby中国大会，第一次参加难免有点激动，
> 更何况还见到了很多国内外的大牛，这次讲师们的演讲也非常精彩，这篇Blog就来整理下Fred Wu的分享，
> 感觉对以后的编程道路有很好的帮助作用。

## Three Stages Of Programmer

1.You discuss tools and editors.三流程序员谈工具

2.You discuss programming techniques.二流程序员谈技术

3.You discuss creative and thought processess.一流程序员谈思想

<!--more-->

## Thoughts On Software Development

* Second system syndrome - avoid total rewrites.

第二系统综合症——避免重写

* Software engineering is like playing Warcraft - always check your mini-map.

软件工程有如魔兽争霸——需经常关注小地图，以大局为重

* Experience is as important as talent, if not more important.

经验与天赋同重要

* Technical debt is a debt, the longer you wait, the more interests you play.

技术债务——拖欠越久，偿还越多

* Choose the application architecture wisely.

谨慎选择软件架构

## Four Simple Rules

Passed all the tests.

Contains no duplication.

Expresses the intent.

Minimises the number of classes and methods.

## Contribution To Open Source Projects

Reading code is just as important as writing code.

阅读代码与编写代码同重要

Learn from the masters.

向大师们学习

Take some, give some - sharing is awesome.

不断收获的同时，别忘了付出

Making things more useful for yourself therefore for others too.

对自己有用的东西，也许对别人也有用

## Refactor In The Wild

Improve code readability and maintainability

A Simple Example

{% highlight ruby %}
def self.search(options = {})
  scope = scoped

  if options.has_key?(:employee_groups)

    employee_group_ids = Array.wrap(options[:employee_groups]).map(&:id)

    scope = scope.includes(:employee_group_dashboard_links)
      .where(:employee_group_dashboard_links => {
      	:employee_group_id => employee_group_ids
      	})
  end

  scope
end
{% endhighlight %}

After Refactor

{% highlight ruby %}
def self.search(options = {})
  result = if options.has_key?(:employee_groups)
    scoped.includes(:employee_group_dashboard_links)
      .where(:employee_group_dashboard_links => {
        :employee_group_id => Array.wrap(options[:employee_groups]).map(&:id)
      })
  end

  result || scoped
end
{% endhighlight %}

A Ruby-China Example

{% highlight ruby %}
# 检查用户是否看过
# result:
#   0 读过
#   1 未读
#   2 最后是用户的回复
def user_readed?(user_id)
  uids = Rails.cache.read("Topic:user_read:#{self.id}")
  if uids.blank?
    if self.last_reply_user_id == user_id || self.user_id == user_id
      return 2
    else
      return 1
    end
  end

  if uids.index(user_id)
    return 0
  else
    if self.last_reply_user_id == user_id || self.user_id == user_id
      return 2
    else
      return 1
    end
  end
end
{% endhighlight %}

After Refactor

{% highlight ruby %}
# 检查用户是否看过
# result:
#   0 读过
#   1 未读
#   2 最后是用户的回复
def user_readed?(user_id)
  user_ids = Rails.cache.read("Topic:user_read:#{self.id}") || []

  if user_id.in?(user_ids)
    0
  elsif user_id.in?([self.last_reply_user_id, self.user_id])
    2
  else
    1
  end
end
{% endhighlight %}

