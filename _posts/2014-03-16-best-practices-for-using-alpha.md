---
layout: post
keywords: blog
description: blog
title: "Best Practices for Using Alpha"
categories: [Android]
tags: [Tips]
---
{% include codepiano/setup %}

Alpha是图形界面开发中常用的特效，通常我们会使用以下代码来实现Alpha特效：

{% highlight ruby %}
view.setAlpha(0.5f);
View.ALPHA.set(view, 0.5f);
ObjectAnimator.ofFloat(view, "alpha", 0.5f).start();
view.animate().alpha(0.5f).start();
view.setAnimation(new AlphaAnimation(1.0f, 0.5f));
{% endhighlight %}

其效果都等同于：

{% highlight ruby %}
canvas.saveLayer(l, r, t, b, 127, Canvas.CLIP_TO_LAYER_SAVE_FLAG);
{% endhighlight %}

所以常见的alpha特效是通过将图像绘制到offscreen buffer中然后显示出来，这样的操作是非常消耗资源的，甚至可能导致性能问题，在开发过程中我们可以通过其他方式避免创建offsreen buffer。

## TextView

对于TextView我们通常需要文字透明效果，而不是View本身透明，所以，直接设置带有alpha值的TextColor是比较高效的方式。

{% highlight ruby %}
 // Not this
textView.setAlpha(alpha);

// 以下方式可以避免创建 offscreen buffer
int newTextColor = (int) (0xFF * alpha) << 24 | baseTextColor & 0xFFFFFF;
textView.setTextColor(newTextColor);
{% endhighlight %}

## ImageView

同样的对于只具有src image的ImageView，直接调用setImageAlpha()方法更为合理。

{% highlight ruby %}
// Not this, setAlpha方法由View继承而来，性能不佳
imageView.setAlpha(0.5f);

// 使用以下方式时，ImageView会在绘制图片时单独为图片指定Alpha
// 可以避免创建 offScreenBuffer
imageView.setImageAlpha((int) alpha * 255);
{% endhighlight %}

## CustomView

类似的，自定义控件时，应该直接去设置paint的alpha。

{% highlight ruby %}
// Not this
customView.setAlpha(alpha);

// But this
paint.setAlpha((int) alpha * 255);
canvas.draw*(..., paint);
{% endhighlight %}

同时Android提供了hasOverlappingRendering()接口，通过重写该接口可以告知系统当前View是否存在内容重叠的情况，帮助系统优化绘制流程，原理是这样的：对于有重叠内容的View，系统简单粗暴的使用 offscreen buffer来协助处理。当告知系统该View无重叠内容时，系统会分别使用合适的alpha值绘制每一层。

{% highlight ruby %}
/**
 * Returns whether this View has content which overlaps. This function, intended to be
 * overridden by specific View types, is an optimization when alpha is set on a view. If
 * rendering overlaps in a view with alpha < 1, that view is drawn to an offscreen buffer
 * and then composited it into place, which can be expensive. If the view has no overlapping
 * rendering, the view can draw each primitive with the appropriate alpha value directly.
 * An example of overlapping rendering is a TextView with a background image, such as a
 * Button. An example of non-overlapping rendering is a TextView with no background, or
 * an ImageView with only the foreground image. The default implementation returns true;
 * subclasses should override if they have cases which can be optimized.
 *
 * @return true if the content in this view might overlap, false otherwise.
 */
public boolean hasOverlappingRendering() {
    return true;
}
{% endhighlight %}

最后引用Chet Haase的一句话作为总结

> “You know what your view is doing, so do the right thing for your situation.”

Via [Android Tips: Best Practices for Using Alpha](http://imid.me/blog/2014/01/17/best-practices-for-using-alpha/)
