---
layout: post
title: "Android Handler"
tags: [Hander]
categories: [Android]
---

## Handler的定义

Handler主要接受子线程发送的数据， 并用此数据配合主线程更新UI。 当应用程序启动时，Android首先会开启一个主线程 (也就是UI线程) ，主线程为管理界面中的UI控件，进行事件分发, 比如说,你要是点击一个 Button ,Android会分发事件到Button上，来响应你的操作。如果此时需要一个耗时的操作，例如: 联网读取数据，或者读取本地较大的一个文件的时候，你不能把这些操作放在主线程中，如果你放在主线程中的话，界面会出现假死现象, 如果5秒钟还没有完成的话，会收到Android系统的一个错误提示 "强制关闭"。

这个时候我们需要把这些耗时的操作，放在一个子线程中，因为子线程涉及到UI更新，Android主线程不是线程安全的，也就是说，更新UI只能在主线程中更新，子线程中操作是危险的。这个时候，Handler就出现了，来解决这个复杂的问题。Handler运行在主线程中(UI线程中)，它与子线程可以通过Message对象来传递数据，这个时候，Handler就承担着接受子线程传过来的(子线程用sedMessage()方法传递)Message对象(里面包含数据)，把这些消息放入主线程队列中，配合主线程进行更新UI。

## Handler的一些特点

Handler 为Android操作系统中的线程通信工具，包为android.os.Handler。

与Handler绑定的有两个队列，一个为消息队列，另一个为线程队列。Handler可以通过这两个队列来分别：

1.发送、接受、处理消息–消息队列；

2.启动、结束、休眠线程–线程队列；

Android OS中，一个进程被创建之后，主线程(可理解为当前Activity)创建一个消息队列，这个消息队列维护所有顶层应用对象(Activities, Broadcast receivers等)以及主线程创建的窗口。你可以在主线程中创建新的线程，这些新的线程都通过Handler与主线程进行通信。通信通过新线程调用 Handler的post()方法和sendMessage()方法实现，分别对应功能：

1.post()  将一个线程加入线程队列；

2.sendMessage() 发送一个消息对象到消息队列；

当然，post()方法还有一些变体，比如
    post(Runnable)
    postAtTime(Runnable,long)
    postDelayed(Runnable long)
    sendEmptyMessage(int)
    sendMessage(Message)
    sendMessageAtTime(Message,long)
    sendMessageDelayed(Message,long)

## Handler实例

{% highlight ruby %}
public class MyHandlerActivity extends Activity {
    Button button;
    MyHandler myHandler;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.handlertest);

        button = (Button) findViewById(R.id.button);
        myHandler = new MyHandler();
        // 当创建一个新的Handler实例时, 它会绑定到当前线程和消息的队列中,开始分发数据
        // Handler有两个作用, (1) : 定时执行Message和Runnalbe 对象
        // (2): 让一个动作,在不同的线程中执行.

        // 它安排消息,用以下方法
        // post(Runnable)
        // postAtTime(Runnable,long)
        // postDelayed(Runnable,long)
        // sendEmptyMessage(int)
        // sendMessage(Message);
        // sendMessageAtTime(Message,long)
        // sendMessageDelayed(Message,long)
      
        // 以上方法以 post开头的允许你处理Runnable对象
        //sendMessage()允许你处理Message对象(Message里可以包含数据,)

        MyThread m = new MyThread();
        new Thread(m).start();
    }

    /**
    * 接受消息,处理消息 ,此Handler会与当前主线程一块运行
    * */

    class MyHandler extends Handler {
        public MyHandler() {
        }

        public MyHandler(Looper L) {
            super(L);
        }

        // 子类必须重写此方法,接受数据
        @Override
        public void handleMessage(Message msg) {
            // TODO Auto-generated method stub
            Log.d("MyHandler", "handleMessage......");
            super.handleMessage(msg);
            // 此处可以更新UI
            Bundle b = msg.getData();
            String color = b.getString("color");
            MyHandlerActivity.this.button.append(color);

        }
    }

    class MyThread implements Runnable {
        public void run() {

            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            Log.d("thread.......", "mThread........");
            Message msg = new Message();
            Bundle b = new Bundle();// 存放数据
            b.putString("color", "我的");
            msg.setData(b);

            MyHandlerActivity.this.myHandler.sendMessage(msg); // 向Handler发送消息,更新UI

        }
    }

} 
{% endhighlight %}

简单的说，Activity的onCreate方法里启动一个线程，在这个线程的run方法里使用一个Message对象并使用Handler的sendMessage方法发送到队列中，最后在Activity里new一个Handler的内部类实现handMessage方法，使用这个方法把队列中的Message对象取出来以实现异步操作。

然后是post的例子，这里稍微说一下，直接使用new Handler().post(Runnable)这样的写法并没有新开线程，也就是说依然是在主线程中执行，相当于简单调用了线程的run方法而不是start方法。这个有人说是android的bug，解决方案是这样使用：

{% highlight ruby %}
HandlerThread handlerThread = new HandlerThread("myHandlerThread");  
handlerThread.start();  
handler = new Handler(handlerThread.getLooper()); 
{% endhighlight %}

来看一个完整的post例子：

{% highlight ruby %}
public class MyThread extends Activity {    
    private Handler handler = null;    
    @Override    
    public void onCreate(Bundle savedInstanceState) {    
        super.onCreate(savedInstanceState);    
        HandlerThread handlerThread = new HandlerThread("myHandlerThread");    
        handlerThread.start();    
        handler = new Handler(handlerThread.getLooper());    
        handler.post(new MyRunnable());    
        System.out.println("Oncreate---The Thread id is :"    
                + Thread.currentThread().getId());    
        setContentView(R.layout.main);    
    }    
    private class MyRunnable implements Runnable {    
        public void run() {    
            System.out.println("Runnable---The Thread is running");    
            System.out.println("Runnable---The Thread id is :"    
                    + Thread.currentThread().getId());    
            try {    
                Thread.sleep(6000);    
            } catch (InterruptedException e) {    
                // TODO Auto-generated catch block    
                e.printStackTrace();    
            }    
        }    
    }    
}   
{% endhighlight %}

在这个demo中,用到了HandlerThread,在HandlerThread对象中可以通过getLooper方法获取一个Looper对象控制句柄，我们可以将其这个Looper对象映射到一个Handler中去来实现一个线程同步机制。于是就有以下结果;

1：控制台的输出：

Oncreate---The Thread id is :1

Runnable---The Thread is running

Runnable---The Thread id is :10

2：程序启动后,我们立刻看到main.xml中的内容。
这样就达到了多线程的结果。