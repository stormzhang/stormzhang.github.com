---
layout: post
title: "Active Record Associations"
tags: [Rails, ActiveRecord]
categories: [RubyOnRails]
---
{% include codepiano/setup %}

## 为什么要关联？

为什么我们需要在两个model之间建立关联？因为它让通用操作变得简单和容易。例如，考虑有一个rails应用程序包含一个customer model和一个order model。每一个customer有很多的order。没有关联时，model声明如下：

{% highlight ruby %}

class Customer < ActiveRecord::Base
end

class Order < ActiveRecord::Base
end

{% endhighlight %}

现在，假设我们想为一个已存在的客户添加一个新的订单，我们需要像这样做：

{% highlight ruby %}

@order = Order.create(:order_date => Time.now, :customer_id => @customer.id)

{% endhighlight %}

再考虑在删除一个客户时，确保他的订单也被删除了。

{% highlight xml %}
@orders = Order.find_by_customer_id(@customer.id)

@orders.each do |order|
    order.destroy
end

@customer.destroy
{% endhighlight %}

使用Active Record关联，我们通过声明告诉Rails在这两个model之间存在的关联使这些及其他一些操作流线化，这里是建立customer model和order model的改进代码

{% highlight ruby %}

class Customer < ActiveRecord::Base
  has_many :orders, :dependent => :destroy
end

class Order < ActiveRecord::Base
  belongs_to :customer
end

{% endhighlight %}

有了这些改变，很容易实现为一个特定的客户创建一个订单

{% highlight ruby %}

@order = @customer.orders.create(:order_date => Time.now)

{% endhighlight %}

删除一个客户和它的订单则更加容易 

{% highlight ruby %}

@customer.destroy

{% endhighlight %}

## Rails中的关联类型

在Rails中，关联是两个Active Record Model之间的连接，关联通过macro-style的调用来实现的，因此你可以声明来添加特性到你的model。例如，通过声明一个model belongs_to另一个，你的Rails指令去维护在两个model的实例之间的primay_key, foreign_key信息，然后你同时有许多有用的方法添加到了你的model中。Rails支持六种类型的关联：

* belongs_to 从属关系
* has_one 拥有（一对一）
* has_many 拥有（一对多）
* has_many :through 一对多，通过中间关联
* has_one :through 一对一，通过中间关联
* has_and_belongs_to_many 多对多

### belongs_to关联

belongs_to关联与另一个model建立一对一联系，这样子声明的模型的每一个实例belongs_to其他模型的一个实例。例如，如果你的应用程序包含客户和订单，且每一个订单会被精确的分配给一个客户，你可像这样声明这个订单model：

{% highlight ruby %}

class Order < ActiveRecord::Base  
  belongs_to :customer  
end

{% endhighlight %}

<img src="http://guides.rubyonrails.org/images/belongs_to.png">

### has_one关联

has_one关联同样是与另一个model建立一对一关联，但语义上有些不同（还有结果）。这种关联表明每一个model实例包含或者持有另一个model的实例。例如，如果你的应用程序里的每一个供应商仅拥有一个账号，你可像这样声明供应商model：

{% highlight ruby %}

class Supplier < ActiveRecord::Base  
  has_one :account  
end

{% endhighlight %}

<img src="http://guides.rubyonrails.org/images/has_one.png">

### has_many关联

has_many关联表明与另一个model的一对多关系。你会经常在belongs_to关系的“另一边”找到这种关系。这种关系表明这种model的每个实例拥有0或多个的另一个model的实例。例如，在一个应用程序里包含客户和订单，客户model可以这样声明：

{% highlight ruby %}

class Customer < ActiveRecord::Base  
  has_many :orders  
end

{% endhighlight %}

<img src="http://guides.rubyonrails.org/images/has_many.png">

### has_many :through关联

has_many :through关联通常用于和另一个model建立多对多关联。这种关系表明这样声明的model可以通过through处理匹配0或多个另一个model的实例。例如，考虑一个有关病人预约内科医生的医学练习，相关的声明可能像这样：

{% highlight ruby %}

class Physician < ActiveRecord::Base
  has_many :appointments
  has_many :patients, :through => :appointments
end
  
class Appointment < ActiveRecord::Base
  belongs_to :physician
  belongs_to :patient
end
  
class Patient < ActiveRecord::Base
  has_many :appointments
  has_many :physicians, :through => :appointments
end

{% endhighlight %}

<img src="http://guides.rubyonrails.org/images/has_many_through.png">

has_many :through关联同样有益于建立"快捷方式"通过嵌套的has_many关联。例如，如果一个文章有多个章节，而每个章节有很多段落，你也许有时想得到一个文档中所有段落的简单集合。你可以这种方式设置：

{% highlight ruby %}

class Document < ActiveRecord::Base
  has_many :sections
  has_many :paragraphs, :through => :sections
end  
  
class Section < ActiveRecord::Base
  belongs_to :document
  has_many :paragraphs
end  
  
class Paragraph < ActiveRecord::Base
  belongs_to :section
end

{% endhighlight %}
