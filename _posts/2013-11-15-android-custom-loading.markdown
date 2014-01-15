---
layout: post
title: "Android Custom Loading"
tags: [Loading]
categories: [OpenAndroid]
---

Android开发中我们经常会用到各种各样的loading，于是自己总结了常用的loading并分享出来。首先来看下具体效果图：

完整源码参见：[stormzhang / CustomLoading](https://github.com/stormzhang/CustomLoading)

<img src="https://raw.github.com/stormzhang/CustomLoading/master/snap.jpg">

<!-- more -->

下面主要说下代码的关键部分：

## 1. Frame Loading

第一个就是在app中常见的loading效果，主要是用帧动画实现的，所谓帧动画就是一组组图片顺序播放；
下面直接看下代码实现:

首先在drawable文件夹下建立一个xml文件，内容如下：

{% highlight ruby %} frame_loading.xml
<?xml version="1.0" encoding="UTF-8"?>
<animation-list xmlns:android="http://schemas.android.com/apk/res/android"
    android:oneshot="false" >

    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_01"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_02"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_03"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_04"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_05"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_06"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_07"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_08"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_09"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_10"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_11"
            android:gravity="left" />
    </item>
    <item android:duration="150">
        <clip
            android:clipOrientation="horizontal"
            android:drawable="@drawable/loading_12"
            android:gravity="left" />
    </item>

</animation-list>
{% endhighlight %}

注意上面item下得clip标签，这个是必须的，不然不同的屏幕尺寸适配会有问题。然后在布局文件里这样调用：

{% highlight ruby %}
<ProgressBar
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:indeterminateDrawable="@drawable/frame_loading" />
{% endhighlight %}

## 2. Rotate Loading

第二种主要是用rotate动画来实现的，具体代码如下：

{% highlight ruby %} rotate_loading.xml
<rotate xmlns:android="http://schemas.android.com/apk/res/android"
    android:fromDegrees="0"
    android:interpolator="@android:anim/accelerate_decelerate_interpolator"
    android:pivotX="50%"
    android:pivotY="50%"
    android:toDegrees="360" >

    <bitmap
        android:antialias="true"
        android:filter="true"
        android:src="@drawable/loading_360" />

</rotate>
{% endhighlight %}

然后调用方法和第一种一样。

{% highlight ruby %}
<ProgressBar
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:indeterminateDrawable="@drawable/rotate_loading" />
{% endhighlight %}

## 3. Clip Loading

第三种loading的是自定义了一个组件，主要用到了ClipDrawable的setLevel()方法，代码如下：

{% highlight ruby %}
public class CustomClipLoading extends FrameLayout {

	private static final int MAX_PROGRESS = 10000;
	private ClipDrawable mClipDrawable;
	private int mProgress = 0;
	private boolean running;
	private Handler handler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			// 如果消息是本程序发送的
			if (msg.what == 0x123) {
				mClipDrawable.setLevel(mProgress);
			}
		}
	};

	
	public CustomClipLoading(Context context) {
		this(context, null, 0);
	}

	public CustomClipLoading(Context context, AttributeSet attrs) {
		this(context, attrs, 0);
	}

	public CustomClipLoading(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
		init(context);
	}

	private void init(Context context) {
		View view = LayoutInflater.from(context).inflate(layout.custom_loading, null);
		addView(view);
		ImageView imageView = (ImageView) findViewById(id.iv_progress);
		mClipDrawable = (ClipDrawable) imageView.getDrawable();
		
		Thread s = new Thread(r);
		s.start();
	}

	public void stop() {
		mProgress = 0;
		running = false;
	}

	Runnable r = new Runnable() {
		@Override
		public void run() {
			running = true;
			while (running) {
				handler.sendEmptyMessage(0x123);
				if (mProgress > MAX_PROGRESS) {
					mProgress = 0;
				}
				mProgress += 100;
				try {
					Thread.sleep(18);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	};
}
{% endhighlight %}

其中custom_loading布局文件的内容如下：

{% highlight ruby %} custom_loading.xml
<?xml version="1.0" encoding="utf-8"?>
<ImageView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/iv_progress"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:background="@drawable/loading_bg"
    android:paddingLeft="3dp"
    android:paddingTop="3dp"
    android:scaleType="centerInside"
    android:src="@drawable/clip_loading" />
{% endhighlight %}

然后clip_loading的内容如下：

{% highlight ruby %} clip_loading.xml
<?xml version="1.0" encoding="utf-8"?>
<clip xmlns:android="http://schemas.android.com/apk/res/android"
    android:clipOrientation="vertical"
    android:drawable="@drawable/loading_progress"
    android:gravity="bottom" >
</clip>
{% endhighlight %}

至此这个组件就定义好了，那么接下来就是在avtivity布局文件的使用了：

{% highlight ruby %}
<com.storm.ui.CustomClipLoading
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
{% endhighlight %}

## 4. Progress Wheel

第四和第五种loading只要是用到了一个开源的项目[ProgressWheel](https://github.com/Todd-Davies/ProgressWheel),使用方法也很简单，具体见项目说明。
