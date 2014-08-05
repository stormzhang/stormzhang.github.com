---
layout: post
title: "Android为自定义View添加属性"
tags: [AttributeSet]
categories: [Android]
---

Android 自定义View 己经不是什么新鲜话题，Android Api提供了一大堆基础组件给我们，需要什么特定功能还需要我们继承它们然后定制更加丰富的功能。那么如何给自定义的View添加一些自定义xml属性呢，如one:textTitle="",不仅如此，我们知道xml中有一个android:onClick="onClickMethod",这样在Activity中就不需要给该View设置监听器了，那么有没有类似的自定义listener的属性呢？答案是肯定的。

先来看下我们最后想要定义的格式：

{% highlight ruby %}
<com.boohee.view.Navbar
    android:id="@+id/navbar"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    one:textTitle="@string/tab_more_text"
    one:onAction="onAction" />
{% endhighlight %}

接着便会有如下的效果：

<img src="/image/one_navbar.png">

其中textTitle是定义navbar的标题，onAction是navbar上“保存”按钮的事件。好了，下面就来看下代码实现：

## 定义attrs.xml

{% highlight ruby %}
<?xml version="1.0" encoding="utf-8"?>
<resources>

    <declare-styleable name="Navbar">
        <attr name="textTitle" format="string|reference" />
        <attr name="onAction" format="string" />
    </declare-styleable>

</resources>
{% endhighlight %}
上面attrs.xml文件中定义了两个属性，关于自定义属性格式，见这篇blog[Android中自定义属性格式详解](/android/2013/07/30/android-custome-attribute-format/)

## 自定义View的初始化下添加代码

{% highlight ruby %}
public class Navbar extends FrameLayout {
	private Context ctx;
	private Button left_btn, right_btn;
	private TextView title;

	public Navbar(Context context) {
		super(context);
		setUp();
	}

	public Navbar(Context context, AttributeSet attrs) {
		super(context, attrs);
		setUp();
		TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.Navbar);
		final int N = a.getIndexCount();
		for (int i = 0; i < N; ++i) {
			int attr = a.getIndex(i);
			switch (attr) {
			case R.styleable.Navbar_textTitle:
				title.setText(a.getString(attr));
				break;
			case R.styleable.Navbar_onAction:
				...
				break;
			}
		}
		a.recycle();
	}

	void setUp() {
		ctx = getContext();
		addView(LayoutInflater.from(this.getContext()).inflate(R.layout.navbar, null));
		left_btn = (Button) findViewById(R.id.left_btn);
		title = (TextView) findViewById(R.id.title);
		right_btn = (Button) findViewById(R.id.right_btn);
	}
}
{% endhighlight %}
## 在XML布局文件中使用

{% highlight ruby %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:one="http://schemas.android.com/apk/res/com.boohee.one"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:background="@drawable/main_bg"
    android:orientation="vertical" >

    <com.boohee.myview.Navbar
        android:id="@+id/navbar"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        one:textTitle="@string/tab_more_text" />

</LinearLayout>
{% endhighlight %}
需要注意的是根布局要加上命名空间xmlns:one="http://schemas.android.com/apk/res/com.boohee.one"

## 添加一个回调属性

上面说明了如何自定义一些基础属性，那么如何像android:onClick属性一样自定义一个方法回调属性呢，这个一开始实在不晓得如何下手，还好android是开源的，通过看源码后终于有了方法，废话不多说，看代码：

{% highlight ruby %}
case R.styleable.Navbar_onAction:
	if (context.isRestricted()) {
		throw new IllegalStateException();
	}

	right_btn.setVisibility(View.VISIBLE);
	final String handlerName = a.getString(attr);
	if (handlerName != null) {
		right_btn.setOnClickListener(new OnClickListener() {
			private Method mHandler;

			public void onClick(View v) {
				if (mHandler == null) {
					try {
						mHandler = getContext().getClass().getMethod(handlerName,
								View.class);
					} catch (NoSuchMethodException e) {
						throw new IllegalStateException("NoSuchMethodException");
					}
				}

				try {
					mHandler.invoke(getContext(), right_btn);
				} catch (IllegalAccessException e) {
					throw new IllegalStateException();
				} catch (InvocationTargetException e) {
					throw new IllegalStateException();
				}
			}
		});
	}
	break;
{% endhighlight %}

代码倒是不难理解，只是上述代码用到了java的反射机制，这篇blog则讲述了[java的反射机制](/blog/2013/07/29/java-reflection/)
