---
layout: post
title: "Android Asynchronous Http Client"
tags: [Http Library]
categories: [Android]
---

在Android的SDK中封装一些请求http的包，其中最常用的便是使用HttpClient了，我们一般都是自己定义一个http的工具类，然后把get和post方法封装起来，然后自己手动处理一些http的异常，值得注意的是http请求在android中是阻碍UI主线程的，所以必须开启新的线程在后台请求，所以这一来，发现只是发起一个http的请求就必须要做这么多事，而且自己封装的工具类也不一定是最好用的。

上面便是我以前的做法，本周在做moya的app时，重新审视了以前的代码，进行了一些重构。其中的一个地方便是使用了一个比较成熟的组件android-async-http来代替自己封装的http工具类，使用起来非常方便，省去了一些臃肿的代码，使代码总体看起来比较清晰。

## Overview

android-async-http是基于Apache的HttpClient异步Http请求封装类，全部request都是脱离UI主线程的。这个包已经非常成熟了，国外有名的Instagram，Pinterest等apps都在使用。

## Installation & Basic Usage

下载最新的.jar文件，在自己的android app中引用。


{% highlight ruby %}
import com.loopj.android.http.*;
{% endhighlight %}

创建一个新的AsyncHttpClient实例并发起一个请求:


{% highlight ruby %}
AsyncHttpClient client = new AsyncHttpClient();
client.get("http://www.google.com", new AsyncHttpResponseHandler() {
    @Override
    public void onSuccess(String response) {
        System.out.println(response);
    }
});
{% endhighlight %}

## 建议的用法：创建一个静态基类Http Client

{% highlight ruby %}
import com.loopj.android.http.*;

public class BooheeClient {
  private static final String BASE_URL = "http://www.boohee.com/api/";

  private static AsyncHttpClient client = new AsyncHttpClient();

  public static void get(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
      client.get(getAbsoluteUrl(url), params, responseHandler);
  }

  public static void post(String url, RequestParams params, AsyncHttpResponseHandler responseHandler) {
      client.post(getAbsoluteUrl(url), params, responseHandler);
  }

  private static String getAbsoluteUrl(String relativeUrl) {
      return BASE_URL + relativeUrl;
  }
}
{% endhighlight %}

然后在整个工程的其他地方便很方便的调用:

{% highlight ruby %}
import org.json.*;
import com.loopj.android.http.*;

class BooheeClientUsage {
    public void getPublicTimeline() throws JSONException {
        BooheeClient.get("moya_video", null, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(JSONObject video) {
                // Pull out the first event on the public timeline
                String normal_url = video.getString("normal_url");

                // Do something with the response
                System.out.println(normal_url);
            }
        });
    }
}

{% endhighlight %}

上面的例子看到，对于json数据的处理也非常方便。不仅如此，还有其他更多的用法，如处理cookie，上传、下载文件等。github项目地址：[android-async-http](https://github.com/stormzhang/android-async-http)