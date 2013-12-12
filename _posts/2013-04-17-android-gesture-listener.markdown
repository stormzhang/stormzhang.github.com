---
layout: post
title: "Android手势"
tags: [Gesture]
categories: [Android]
---
{% include codepiano/setup %}

之前做的App是完全没有任何手势支持的，对于现在的程序来说，如果没有一些手势的支持，感觉实在是有点落后了，支持手势的App才叫cool。于是在这次重新搭建ifood for android框架的同时下决心让自己的App完全支持手势。下面就来看下自己实现的一个全局滑动切换窗口的例子。

在android系统中，手势的识别是通过 GestureDetector.OnGestureListener接口来实现的。如果要自定义手势需要重写这个接口里的一些方法，废话不多说，下面上代码：

自定义的一个GestureLisntener:

{% highlight ruby %} MyGestureListener.java
public class MyGestureListener implements OnGestureListener {

	static final String TAG = "MyGestureListener";

	private static final int SWIPE_MAX_OFF_PATH = 100;
	private static final int SWIPE_MIN_DISTANCE = 100;
	private static final int SWIPE_THRESHOLD_VELOCITY = 100;
	
	public Context context;
	
	public MyGestureListener(Context context) {
		this.context = context;
	}

	@Override
	public boolean onDown(MotionEvent e) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onShowPress(MotionEvent e) {
		// TODO Auto-generated method stub
		Log.e(TAG, "onShowPress");
	}

	@Override
	public boolean onSingleTapUp(MotionEvent e) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
			float distanceY) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onLongPress(MotionEvent e) {
		// TODO Auto-generated method stub
		Log.e(TAG, "onLongPress");
	}

	@Override
	public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
			float velocityY) {
		if (Math.abs(e1.getY() - e2.getY()) > SWIPE_MAX_OFF_PATH)
			return false;

		if ((e1.getX() - e2.getX()) > SWIPE_MIN_DISTANCE
				&& Math.abs(velocityX) > SWIPE_THRESHOLD_VELOCITY) {
			Log.e(TAG, "onFling left");

		} else if ((e2.getX() - e1.getX()) > SWIPE_MIN_DISTANCE
				&& Math.abs(velocityX) > SWIPE_THRESHOLD_VELOCITY) {
			Log.e(TAG, "onFling right");
			((Activity) context).finish();
			
		}
		return true;
	}

}
{% endhighlight %}

在这个类中的onFling()方法中从左向右滑动时实现了界面的切换，如果有更复杂的手势支持，同样可以在这个基类中进行添加。

接下来新建一个GestureActivity实现Gesture滑动切换界面，让支持手势的Activity继承它，这样就继承了它的手势支持功能，提高代码复用。

{% highlight ruby %} GestureActivity.java
public class GestureActivity extends ActivityBase {

	MyGestureListener listener = new MyGestureListener(this);
	protected GestureDetector gestureDetector = new GestureDetector(listener);
	
	public boolean onTouchEvent(MotionEvent event) {
        if (gestureDetector.onTouchEvent(event))
            return true;
        else  
            return false;
    }
	
}

{% endhighlight %}

这样就实现了一个简单的滑动切换页面的框架，如果想支持更多的手势，只需要重写MyGestureListener的方法就可以了。

不过不要高兴的太早，在一般的Activity手势支持是正常的，可是碰到一些包含ScrollView或者ListView的Activity时，手势就不相应了。原因是因为这些滑动的组件本身就已经具有了手势的支持，这样就会产生了冲突，导致自定义的手势没有被识别到。google了很久，似乎也没个具体的方法，后来看到说用dispatchTouchEvent(MotionEvent ev) 的方法，果然可以。于是在GestureActivity里就多了这样一个方法：

{% highlight ruby %}

public boolean dispatchTouchEvent(MotionEvent ev) {
    gestureDetector.onTouchEvent(ev);
    return super.dispatchTouchEvent(ev);
}

{% endhighlight %}

此时再试一下，果然所有Activity都实现了自定义的手势事件。但是为什么加上这个方法就可以了呢，必须要搞明白。

android中的事件类型分为按键事件和屏幕触摸事件，Touch事件是屏幕触摸事件的基础事件，有必要对它进行深入的了解。

一个最简单的屏幕触摸动作触发了一系列Touch事件：ACTION_DOWN->ACTION_MOVE->ACTION_MOVE->ACTION_MOVE...->ACTION_MOVE->ACTION_UP

当屏幕中包含一个ViewGroup，而这个ViewGroup又包含一个子view，这个时候android系统如何处理Touch事件呢？到底是ViewGroup来处理Touch事件，还是子view来处理Touch事件呢？答案是：不一定。

android系统中的每个View的子类都具有下面三个和TouchEvent处理密切相关的方法：

1.public boolean dispatchTouchEvent(MotionEvent ev)  这个方法用来分发TouchEvent

2.public boolean onInterceptTouchEvent(MotionEvent ev) 这个方法用来拦截TouchEvent

3.public boolean onTouchEvent(MotionEvent ev) 这个方法用来处理TouchEvent

当TouchEvent发生时，首先Activity将TouchEvent传递给最顶层的View， TouchEvent最先到达最顶层 view 的 dispatchTouchEvent ，然后由  dispatchTouchEvent 方法进行分发，如果dispatchTouchEvent返回true ，则交给这个view的onTouchEvent处理，如果dispatchTouchEvent返回 false ，则交给这个 view 的 interceptTouchEvent 方法来决定是否要拦截这个事件，如果 interceptTouchEvent 返回 true ，也就是拦截掉了，则交给它的 onTouchEvent 来处理，如果 interceptTouchEvent 返回 false ，那么就传递给子 view ，由子 view 的 dispatchTouchEvent 再来开始这个事件的分发。如果事件传递到某一层的子 view 的 onTouchEvent 上了，这个方法返回了 false ，那么这个事件会从这个 view 往上传递，都是 onTouchEvent 来接收。而如果传递到最上面的 onTouchEvent 也返回 false 的话，这个事件就会“消失”，而且接收不到下一次事件。

看到这终于清楚了上面的疑问，dispatchTouchEvent()方法直接将触摸事件交给了gestureDetector的触摸事件，这样就解决了冲突问题。