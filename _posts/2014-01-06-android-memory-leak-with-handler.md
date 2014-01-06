---
layout: post
title: "Handler引起的内存泄露"
categories: [Android]
tags: [Handler]
---
{% include codepiano/setup %}

如果你在Activity中定义了一个内部Handler类，如下代码：

{% highlight ruby %}
public class MainActivity extends Activity {
 
    private  Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            //TODO handle message...
        }
    };
 
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mHandler.sendMessageDelayed(Message.obtain(), 60000);
 
        //just finish this activity
        finish();
    }
}
{% endhighlight %}

然后运行Android Lint工具会有一个内存泄露警告:

    This Handler class should be static or leaks might occur (com.example.ta.MainActivity.1)
    Issue: Ensures that Handler classes do not hold on to a reference to an outer class
    Id: HandlerLeak
    In Android, Handler classes should be static or leaks might occur. Messages enqueued on the application thread’s MessageQueue also retain their target Handler. If the Handler is an inner class, its outer class will be retained as well. To avoid leaking the outer class, declare the Handler as a static nested class with a WeakReference to its outer class.

原因是：

* 当Android应用启动的时候，会先创建一个应用主线程的Looper对象，Looper实现了一个简单的消息队列，一个一个的处理里面的Message对象。主线程Looper对象在整个应用生命周期中存在。

* 当在主线程中初始化Handler时，该Handler和Looper的消息队列关联。发送到消息队列的Message会引用发送该消息的Handler对象，这样系统可以调用 Handler#handleMessage(Message) 来分发处理该消息。

* 在Java中，非静态(匿名)内部类会引用外部类对象。而静态内部类不会引用外部类对象。

* 如果外部类是Activity，则会引起Activity泄露 。

当Activity finish后，延时消息会继续存在主线程消息队列中1分钟，然后处理消息。而该消息引用了Activity的Handler对象，然后这个Handler又引用了这个Activity。这些引用对象会保持到该消息被处理完，这样就导致该Activity对象无法被回收，从而导致了上面说的 Activity泄露。

要修改该问题，只需要按照Lint提示的那样，把Handler类定义为静态即可，然后通过WeakReference 来保持外部的Activity对象。

{% highlight ruby %}
private Handler mHandler = new MyHandler(this);
private static class MyHandler extends Handler{
    private final WeakReference<Activity> mActivity;
    public MyHandler(Activity activity) {
        mActivity = new WeakReference<Activity>(activity);
    }
    @Override
    public void handleMessage(Message msg) {
        System.out.println(msg);
        if(mActivity.get() == null) {
            return;
        }
    }
}
{% endhighlight %}

所以，当你在Activity中使用内部类的时候，需要时刻考虑您是否可以控制该内部类的生命周期，如果不可以，则最好定义为静态内部类。

参考文章： http://blog.chengyunfeng.com/?p=468
