---
layout: post
title: "Rails Cache"
tags: [Rails, Cache]
categories: [RubyOnRails]
---

这周修改bug的时候有一个是由于缓存机制引起的，遂系统的学习了下rails的缓存，在这里记录下。

Rails的Cache分四种:
1.Page Cache - Fastest 
2.Action Cache - Next Fastest 
3.Fragment Cache - Least Fastest 
4.ActiveRecord Cache - Only available in Edge Rails 

## Page Cache

如果开发阶段要使用cache，则需要先设置好config/environments/development.rb: 

{% highlight ruby %}
config.action_controller.perform_caching = true
{% endhighlight %}

而production环境下默认是开启cache功能的 
Page Cache是Rails中最快的cache机制，使用Page Cache的前提一般为: 
1.需要cache的page对所有用户一致 
2.需要cache的page对public可访问，不需要authentication 
Page Cache使用起来很简单: 

{% highlight ruby %}
class BlogController < ApplicationController  
  caches_page :list, :show  
  
  def list  
    Post.find(:all, \:order => "created_on desc", :limit => 10)  
  end  
  
  def show  
    @post = Post.find(params[:id])  
  end  
end
{% endhighlight %}

这样我们就对BlogController的list和show页面进行了缓存 
这样做的效果是第一次访问list和show页面时生成了public/blog/list.html和public/blog/show/5.html这两个html页面
对于分页情况下的cache，我们需要把url的page参数改写成"blog/list/:page"这种形式，而不是"blog/list?page=1"这种形式 
这样cache的html页面即为public/blog/list/1.html 
当数据更改时我们需要清除旧的缓存，我们采用Sweepers来做是非常不错的选择，这把在BlogController里清除缓存的代码分离出来 
首先编辑config/environment.rb:

{% highlight ruby %}
Rails::Initializer.run do |config|  
  # ...  
  config.load_paths += %w(#{RAILS_ROOT}/app/sweepers)  
  # ...
{% endhighlight %}

这告诉Rails加载#{RAILS_ROOT}/app/sweepers目录下的文件 
我们为BlogController定义app/sweepers/blog_sweeper.rb: 

{% highlight ruby %}
class BlogSweeper < ActionController::Caching::Sweeper  
  observe Post # This sweeper is going to keep an eye on the Post model  
  
  # If our sweeper detects that a Post was created call this  
  def after_create(post)  
    expire_cache_for(post)  
  end  
  
  # If our sweeper detects that a Post was updated call this  
  def after_update(post)  
    expire_cache_for(post)  
  end  
  
  # If our sweeper detects that a Post was deletedcall this  
  def after_destroy(post)  
    expire_cache_for(post)  
  end  
  
  private  
  def expire_cache_for(record)  
    # Expire the list page now that we posted a new blog entry  
    expire_page(:controller => 'blog', :action => 'list')  
  
    # Also expire the show page, in case we just edit a  blog entry  
    expire_page(:controller => 'blog', :action => 'show', :id => record.id)  
  end  
end
{% endhighlight %}

然后我们在BlogController里加上该sweeper即可:

{% highlight ruby %}
class BlogController < ApplicationController  
  caches_page :list, :show  
  cache_sweeper :blog_sweeper, \:only => [:create, :update, :destroy]  
  # ...  
end
{% endhighlight %}

我们可以配置cache的静态html文件的存放位置，这在config/environment.rb里设置: 

{% highlight ruby %}
config.action_controller.page_cache_directory = RAILS_ROOT + "/public/cache/"
{% endhighlight %}

然后我们设置Apache/Lighttpd对于静态html文件render时不接触Rails server即可 
所以Page Cache就是最快的Cache，因为它不与Rails server打交道，直接load静态html 

## Action Cache

Action Cache相关的helper方法是caches_action和expire_action，其他基本和Page Cache一样 
另外我们还可以运行rake tmp:cache:clear来清空所有的Action Cache和Fragment Cache

{% highlight ruby %}
class BlogController < ApplicationController  
  before_filter :authentication  
  caches_action :list, :show  
  cache_sweeper :blog_sweeper, \:only => [:create, :update, :destroy]
{% endhighlight %}

如上代码所示，我们将authentication这个filter放在caches_action之前声明，这样我们的Action Cache在执行之前会先访问authentication方法 
这样可以弥补Page Cache不能对需要登录认证的Page进行Cache的缺点 
生成的cache文件为tmp/cache/localhost:3000/blog/list.cache，这样对不同subdomain的访问页面可以cache到不同的目录 
由于每次访问Action Cache时都需要与Rails server打交道，并且要先运行filters，所以比Page Cache的效率稍低

## Fragment Cache

Fragment Cache用于处理rhtml页面中的部分需要cache的模块，如app/views/blog/list.rhtml: 

{% highlight ruby %}
<strong>My Blog Posts</strong>  
<% cache do %>  
  <ul>  
    <% for post in @posts %>  
      <li><%= link_to post.title, :controller => 'blog', :action => 'show', :id => post %></li>  
    <% end %>  
  </ul>  
<% end %>
{% endhighlight %}

生成的cache文件为/tmp/cache/localhost:3000/blog/list.cache
我们需要在BlogController的list方法里加上一行判断，如果是读取Fragment Cache，则不必再查询一次数据库:

{% highlight ruby %}
def list  
  unless read_fragment({})  
    @post = Post.find(:all, \:order => 'created_on desc', :limit => 10)  
  end  
end
{% endhighlight %}

Fragment分页时的Cache: 

{% highlight ruby %}
def list  
  unless read_fragment({:page => params[:page] || 1}) # Add the page param to the cache naming  
    @post_pages, @post = paginate :posts, :per_page => 10  
  end  
end
{% endhighlight %}

rhtml页面也需要改写: 

{% highlight ruby %}
<% cache ({:page => params[:page] || 1}) do %>  
  ... All of the html to display the posts ...  
<% end %>
{% endhighlight %}

生成的cahce文件为/tmp/cache/localhost:3000/blog/list.page=1.cache 
从分页的Fragment Cache可以看出，Fragment Cache可以添加类似名字空间的东西，用于区分同一rhtml页面的不同Fragment Cache，如: 

{% highlight ruby %}
cache ("turkey") => "/tmp/cache/turkey.cache"  
cache (:controller => 'blog', :action => 'show', :id => 1) => "/tmp/cache/localhost:3000/blog/show/1.cache"  
cache ("blog/recent_posts") => "/tmp/cache/blog/recent_posts.cache"  
cache ("#{request.host_with_port}/blog/recent_posts") => "/tmp/cache/localhost:3000/blog/recent_posts.cache"
{% endhighlight %}

清除Fragment Cache的例子:

{% highlight ruby %}
expire_fragment(:controller => 'blog', :action => 'list', :page => 1)  
expire_fragment(%r{blog/list.*})
{% endhighlight %}

## ActiveRecord Cache

Rails Edge中ActiveRecord已经默认使用SQl Query Cache，对于同一action里面同一sql语句的数据库操作会使用cache