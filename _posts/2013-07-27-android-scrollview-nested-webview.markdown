---
layout: post
title: "Android中ScrollView嵌套WebView"
tags: [ScrollView]
categories: [Android]
---

Android中WebView用来加载html页面，自带滑动效果。ScrollView同样也是自带滑动效果，在项目中如果需要WebView和一些其他view比如TextView一起滑动的话就必须外面嵌套一层ScrollView，这时问题就来了，嵌套之后ScrollView的滑动和WebView的滑动就会有冲突，WebView的滑动不流畅。下面就是解决方案：

自定义一个ScrollView

{% highlight ruby %}
public class MyScrollView extends ScrollView {
    private GestureDetector mGestureDetector;
    View.OnTouchListener mGestureListener;

    public MyScrollView(Context context, AttributeSet attrs) {
        super(context, attrs);
        mGestureDetector = new GestureDetector(context, new YScrollDetector());
        setFadingEdgeLength(0);
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        return super.onInterceptTouchEvent(ev) && mGestureDetector.onTouchEvent(ev);
    }

    // Return false if we're scrolling in the x direction
    class YScrollDetector extends SimpleOnGestureListener {
    	@Override
    	public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
            if (Math.abs(distanceY) > Math.abs(distanceX)) {
            	return true;
            }
            return false;
    	}
    }
}
{% endhighlight %}

上面代码中onInterceptTouchEvent方法是关键，重写这个方法使如果ScrollView有touch事件时不被拦截，这样只要ScrollView有touch事件优先处理，这样就保证了滑动的流畅。

之后就在自己的xml布局文件里用MyScrollView代替ScrollView来布局就ok了。如：

{% highlight ruby %}
<com.boohee.widgets.MyScrollView
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:background="@drawable/main_bg"
    android:layout_marginTop="@dimen/default_shadow_margin" >

    <LinearLayout
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical" >

        <RelativeLayout
            android:layout_width="fill_parent"
            android:layout_height="180dp" >

            <android.support.v4.view.ViewPager
                android:id="@+id/vp_top_show"
                android:layout_width="fill_parent"
                android:layout_height="fill_parent" />

            <LinearLayout
                android:id="@+id/dot_layout"
                android:layout_width="fill_parent"
                android:layout_height="wrap_content"
                android:layout_alignParentBottom="true"
                android:gravity="center_horizontal"
                android:orientation="horizontal"
                android:padding="10dp" >
            </LinearLayout>
        </RelativeLayout>

        <WebView
            android:id="@+id/wv_show"
            android:layout_width="fill_parent"
            android:layout_height="fill_parent"
            android:layerType="software"
            android:scrollbars="none" />
    </LinearLayout>
</com.boohee.widgets.MyScrollView>
{% endhighlight %}