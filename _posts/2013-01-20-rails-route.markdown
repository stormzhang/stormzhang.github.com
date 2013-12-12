---
layout: post
title: "Rails3 Route常用用法"
tags: [Rails]
categories: [RubyOnRails]
---

我们都知道在Rails中的config/route.rb文件定义了路由的设定，这次充分学习了Rails3中Route的常用用法，整理并分享在这里。

## 默认路由：

{% highlight ruby %}

match '/:controller(/:action(/:id))'

{% endhighlight %}

## 自定义路由：

{% highlight ruby %}

match 'products/:id', :to => 'catalog#view'

{% endhighlight %}

## 命名路由:

{% highlight ruby %}

match 'logout', :to => 'sessions#destroy', :as => 'logout'

{% endhighlight %}

## 根路由:

{% highlight ruby %}

root :to => 'welcome#show'

{% endhighlight %}

## 路由简写技巧：

### :to 键的省略

{% highlight ruby %}

match 'account' => 'account#index'

# 相当于:

match 'account', :to => 'account#index'
  
match 'info' => 'projects#info', :as => 'info'

{% endhighlight %}

注意：
:as 在rails3中是改变 helper， 在rails2中是改变 path

当路径和控制器(及action)一至时，可省略指派控制器部分

{% highlight ruby %}

match 'account/overview'
# 相当于：  
match 'account/overview', :to => 'account#overview'

{% endhighlight %}

## Verb路由

当需要限制http请求方法的时候通过键 :via ，也可以直接把方法写在最前面：

{% highlight ruby %}

get 'account/overview'
# 相当于：  
match 'account/overview', :via => 'get'
  
match 'account/setup', :via => [:get, :post]
# 支持get\post\put\delete四种HTTP方法

{% endhighlight %}

## scope路由

### :path 改变Path，:module 改变Controller, :name_prefix || :as 改变  helper

{% highlight ruby %}

scope 'admin' do
  resources :posts
end
# 行当于:
scope :path => 'admin' do
  resources :posts
end

{% endhighlight %}

生成路由：

{% highlight ruby %}

posts  GET  /admin/posts(.:format)  {:controller=>"posts", :action=>"index"}

posts  POST  /admin/posts(.:format)  {:controller=>"posts", :action=>"create"}

new_post  GET  /admin/posts/new(.:format)  {:controller=>"posts", :action=>"new"}

edit_post  GET  /admin/posts/:id/edit(.:format)  {:controller=>"posts", :action=>"edit"}

post  GET  /admin/posts/:id(.:format)  {:controller=>"posts", :action=>"show"}

post  PUT  /admin/posts/:id(.:format)  {:controller=>"posts", :action=>"update"}

post  DELETE  /admin/posts/:id(.:format)  {:controller=>"posts", :action=>"destroy"}

scope :module => 'admin' do
  resources :posts
end
# 相当于:
resources :posts, :module => 'admin'

{% endhighlight %}

生成路由：

{% highlight ruby %}

posts  GET  /posts(.:format)  {:controller=>"admin/posts", :action=>"index"}

posts  POST  /posts(.:format)  {:controller=>"admin/posts", :action=>"create"}

new_post  GET  /posts/new(.:format)  {:controller=>"admin/posts", :action=>"new"}

edit_post  GET  /posts/:id/edit(.:format)  {:controller=>"admin/posts", :action=>"edit"}

post  GET  /posts/:id(.:format)  {:controller=>"admin/posts", :action=>"show"}

post  PUT  /posts/:id(.:format)  {:controller=>"admin/posts", :action=>"update"}

post  DELETE  /posts/:id(.:format)  {:controller=>"admin/posts", :action=>"destroy"}

scope :name_prefix => 'admin' do
  resources :posts
end
# 相当于：
resources :posts, :name_prefix => 'admin'

{% endhighlight %}

生成路由：

{% highlight ruby %}

admin_posts  GET  /posts(.:format)  {:controller=>"posts", :action=>"index"}

admin_posts  POST  /posts(.:format)  {:controller=>"posts", :action=>"create"}

new_admin_post  GET  /posts/new(.:format)  {:controller=>"posts", :action=>"new"}

edit_admin_post  GET  /posts/:id/edit(.:format)  {:controller=>"posts", :action=>"edit"}

admin_post  GET  /posts/:id(.:format)  {:controller=>"posts", :action=>"show"}

admin_post  PUT  /posts/:id(.:format)  {:controller=>"posts", :action=>"update"}

admin_post  DELETE  /posts/:id(.:format)  {:controller=>"posts", :action=>"destroy"}

scope 'admin', :module => 'admin', :name_prefix => 'admin' do
  resources :posts
end
# 相当于：
namespace 'admin' do
  resources :posts
end

{% endhighlight %}

生成路由：

{% highlight ruby %}

admin_posts  GET  /admin/posts(.:format)  {:controller=>"admin/posts", :action=>"index"}

admin_posts  POST  /admin/posts(.:format)  {:controller=>"admin/posts", :action=>"create"}

new_admin_post  GET  /admin/posts/new(.:format)  {:controller=>"admin/posts", :action=>"new"}

edit_admin_post  GET  /admin/posts/:id/edit(.:format)  {:controller=>"admin/posts", :action=>"edit"}

admin_post  GET  /admin/posts/:id(.:format)  {:controller=>"admin/posts", :action=>"show"}

admin_post  PUT  /admin/posts/:id(.:format)  {:controller=>"admin/posts", :action=>"update"}

admin_post  DELETE  /admin/posts/:id(.:format)  {:controller=>"admin/posts", :action=>"destroy"}

{% endhighlight %}

## 在路由中定义跳转：

{% highlight ruby %}
match "/posts/github" => redirect("http://github.com/rails.atom")

# 地址 /foo/1 会自动跳转到 /bar/1s
match "/foo/:id", :to => redirect("/bar/%{id}s")
  
# /account/proc/inosin 会自动跳转到 /inosins
match 'account/proc/:name', :to => redirect {|params|
"/#{params[:name].pluralize}" }
  
match "/stories" => redirect {|p, req| "/posts/#{req.subdomain}" }
{% endhighlight %}

## 路由中的限制：

{% highlight ruby %}
# 限制 id 只能为数字  
match "/posts/show/:id", :to => "posts#index", :id => /\d+/  
match "/posts/show/:id", :to => "posts#index", :constraints => {:id => /\d+/}  
  
# 限制子域名  
match "photos", :constraints => {:subdomain => "admin"}   
  
# 限制访问者 IP  
constraints(:ip => /127.0.0.1/) do  
  match  '/questions', :to => redirect("http://www.stackoverflow.com/")  
end  
  
# 当访问者 ip 是 192.168.1.* 的来访者访问 子域名为 "test"  
match "/ttt" => proc{|env| [200, {}, ["hello test"]]}, \  
    :constraints => {:subdomain => "test", :ip => /192\.168\.1\.\d+/}
{% endhighlight %}

## 路由通配符：

{% highlight ruby %}
resources :photos, :id => /\d+/  
match 'photos/*other' => 'photos#unknown'  
#上面这两行路由则会把不符合7种path的其他url全部解析到PhotoController#unknown中去处理，params[:other]可得到path中/photos/之后的部分，注意这两行的顺序不能颠倒  
  
match 'books/*section/:title' => 'books#show'   
# 例如：books/some/section/last-words-a-memoir 中 params[:section] = "some/section", params[:title] = "last-words-a-memoir".  
  
match '*a/foo/*b' => 'test#index'   
# 例如：zoo/woo/foo/bar/baz 中 params[:a] = "zoo/woo", params[:b] = "bar/baz"
{% endhighlight %}