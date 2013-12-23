---
layout: post
title: "Android自定义点击效果的ImageView"
tags: [AutoImageView]
categories: [Android]
---

我们知道在Android开发中一些可以点击的Button或者ImageView一般都会有一些特效，这样的设计比较友好，让用户确切的知道那个组件有没有成功点击。最简单最常用的办法就是设计两套背景图片，然后给Button或者ImageView设置一个xml的selector，从而达到这样的效果。但是如果整个应用下来每个可点击的组件都需要准备两张图片，未免有些太麻烦，而且一般的点击效果只是让透明度有些变化而已。那么针对只是透明度变化的点击效果，有没有可能自定义一个组件呢，从而达到方便重用的目的。带着整个想法，最后终于找到一个比较好的解决方案。废话不多说，见代码：

{% highlight ruby %}
public class AutoBgImageView extends ImageView {

	public AutoBgImageView(Context context) {
		super(context);
	}

	public AutoBgImageView(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
	}

	public AutoBgImageView(Context context, AttributeSet attrs) {
		super(context, attrs);
	}

	@Override
	public void setBackgroundDrawable(Drawable d) {
		// Replace the original background drawable (e.g. image) with a
		// LayerDrawable that
		// contains the original drawable.
		SAutoBgButtonBackgroundDrawable layer = new SAutoBgButtonBackgroundDrawable(d);
		super.setBackgroundDrawable(layer);
	}

	protected class SAutoBgButtonBackgroundDrawable extends LayerDrawable {

		// The color filter to apply when the button is pressed
		protected ColorFilter _pressedFilter = new LightingColorFilter(Color.LTGRAY, 1);
		// Alpha value when the button is disabled
		protected int _disabledAlpha = 100;

		public SAutoBgButtonBackgroundDrawable(Drawable d) {
			super(new Drawable[] { d });
		}

		@Override
		protected boolean onStateChange(int[] states) {
			boolean enabled = false;
			boolean pressed = false;

			for (int state : states) {
				if (state == android.R.attr.state_enabled)
					enabled = true;
				else if (state == android.R.attr.state_pressed)
					pressed = true;
			}

			mutate();
			if (enabled && pressed) {
				setColorFilter(_pressedFilter);
			} else if (!enabled) {
				setColorFilter(null);
				setAlpha(_disabledAlpha);
			} else {
				setColorFilter(null);
			}

			invalidateSelf();

			return super.onStateChange(states);
		}

		@Override
		public boolean isStateful() {
			return true;
		}
	}
}
{% endhighlight %}

上面代码定义了一个AutoBgImageView组件继承自ImageView，重写了ImageView的setBackgroundDrawable()方法，从而达到点击ImageView的时候透明度为100（最大为255）。这样整个系统只要是可点击的ImageView只需要用整个组件代替即可，非常方便。上述代码同样可以自定义Button达到类似的点击效果。