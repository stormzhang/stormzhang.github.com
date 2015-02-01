---
layout: post
keywords: blog
description: blog
title: "Android自定义ScrollView"
categories: [Android]
tags: [ScrollView]
---
{% include codepiano/setup %}

Android中的ScrollView其实是很简陋的，竟然没有和ListView一样的可以设置一个OnScrollListener，不过没有关系，我们可以继承自ScrollView来自定义一个。废话不多说，直接上代码：

{% highlight ruby %}
public class ObservableScrollView extends ScrollView {

    public ObservableScrollView(Context context) {
        super(context);
    }

    public ObservableScrollView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public ObservableScrollView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public interface OnScrollChangedListener {
        public void onScrollChanged(int x, int y, int oldX, int oldY);
    }

    private OnScrollChangedListener onScrollChangedListener;

    public void setOnScrollListener(OnScrollChangedListener onScrollChangedListener) {
        this.onScrollChangedListener = onScrollChangedListener;
    }

    @Override
    protected void onScrollChanged(int x, int y, int oldX, int oldY) {
        super.onScrollChanged(x, y, oldX, oldY);
        if (onScrollChangedListener != null) {
            onScrollChangedListener.onScrollChanged(x, y, oldX, oldY);
        }
    }
}
{% endhighlight %}

上述代码很简单，相信大家都能看得懂，使用的时候只需要调用setOnScrollListener方法就可以了，这里面有四个参数，最常用的比如你想判断ScrollView的滑动方向，那么只需要判断 **y > oldY**即为向下滑动，反之向上滑动。除此之外，还可以做点其他有意思的事，比如判断ScrollView滑动到某个特定位置然后做些动画之类的，更加有创意的就靠大家自己去思考了。

