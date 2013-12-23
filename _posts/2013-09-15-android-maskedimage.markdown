---
layout: post
title: "Android MaskedImage"
tags: [MaskedImage]
categories: [Android]
---

在这次one新版本的UI设计中，其中关于头像的设计中，一部分是圆角头像，一部分是圆形图像，关于这部分的实现有两种方法：第一种就是通过图片的叠加来实现，这种方法相对比较简单，但是如果有多种规格大小的就得提供相应这么多种的图片，第二种就是通过代码实现，这部分实现起来稍微麻烦点，但是如果一旦实现那么代码就可以重用，代码中用起来就比较方便。于是查找了各种资料，今天就来分享下代码实现的方法。

UI的开发最推荐的还是组件式开发，对于多个地方通用的东西抽成一个组件，这样不管是代码复用还是提供给别人使用都是比较方便的做法。在这次UI设计中，有圆形图片，圆角图片，不排除以后还有其他图片，如椭圆图片之类的，所以这次UI组件的开发也采用了继承的方法。

<img src="/images/masked_image_design.png">

下面就来看下代码实现：

## MaskedImage抽象基类

{% highlight ruby %}
package com.boohee.widgets;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Xfermode;
import android.graphics.drawable.Drawable;
import android.util.AttributeSet;
import android.widget.ImageView;

public abstract class MaskedImage extends ImageView {
	private static final Xfermode MASK_XFERMODE;
	private Bitmap mask;
	private Paint paint;

	static {
		PorterDuff.Mode localMode = PorterDuff.Mode.DST_IN;
		MASK_XFERMODE = new PorterDuffXfermode(localMode);
	}

	public MaskedImage(Context paramContext) {
		super(paramContext);
	}

	public MaskedImage(Context paramContext, AttributeSet paramAttributeSet) {
		super(paramContext, paramAttributeSet);
	}

	public MaskedImage(Context paramContext, AttributeSet paramAttributeSet, int paramInt) {
		super(paramContext, paramAttributeSet, paramInt);
	}

	public abstract Bitmap createMask();

	protected void onDraw(Canvas paramCanvas) {
		Drawable localDrawable = getDrawable();
		if (localDrawable == null)
			return;
		try {
			if (this.paint == null) {
				Paint localPaint1 = new Paint();
				this.paint = localPaint1;
				this.paint.setFilterBitmap(false);
				Paint localPaint2 = this.paint;
				Xfermode localXfermode1 = MASK_XFERMODE;
				Xfermode localXfermode2 = localPaint2.setXfermode(localXfermode1);
			}
			float f1 = getWidth();
			float f2 = getHeight();
			int i = paramCanvas.saveLayer(0.0F, 0.0F, f1, f2, null, 31);
			int j = getWidth();
			int k = getHeight();
			localDrawable.setBounds(0, 0, j, k);
			localDrawable.draw(paramCanvas);
			if ((this.mask == null) || (this.mask.isRecycled())) {
				Bitmap localBitmap1 = createMask();
				this.mask = localBitmap1;
			}
			Bitmap localBitmap2 = this.mask;
			Paint localPaint3 = this.paint;
			paramCanvas.drawBitmap(localBitmap2, 0.0F, 0.0F, localPaint3);
			paramCanvas.restoreToCount(i);
			return;
		} catch (Exception localException) {
			StringBuilder localStringBuilder = new StringBuilder()
					.append("Attempting to draw with recycled bitmap. View ID = ");
			System.out.println("localStringBuilder=="+localStringBuilder);
		}
	}
}
{% endhighlight %}

## CircularImage（圆形图片）实现类

{% highlight ruby %}
public class CircularImage extends MaskedImage {
	public CircularImage(Context paramContext) {
		super(paramContext);
	}

	public CircularImage(Context paramContext, AttributeSet paramAttributeSet) {
		super(paramContext, paramAttributeSet);
	}

	public CircularImage(Context paramContext, AttributeSet paramAttributeSet, int paramInt) {
		super(paramContext, paramAttributeSet, paramInt);
	}

	public Bitmap createMask() {
		int i = getWidth();
		int j = getHeight();
		Bitmap.Config localConfig = Bitmap.Config.ARGB_8888;
		Bitmap localBitmap = Bitmap.createBitmap(i, j, localConfig);
		Canvas localCanvas = new Canvas(localBitmap);
		Paint localPaint = new Paint(1);
		localPaint.setColor(-16777216);
		float f1 = getWidth();
		float f2 = getHeight();
		RectF localRectF = new RectF(0.0F, 0.0F, f1, f2);
		localCanvas.drawOval(localRectF, localPaint);
		return localBitmap;
	}
}
{% endhighlight %}

## RoundedCornersImage（圆角图片）实现类

{% highlight xml %}
public class RoundedCornersImage extends MaskedImage {
	private static final int DEFAULT_CORNER_RADIUS = 8;
	private int cornerRadius = DEFAULT_CORNER_RADIUS;

	public RoundedCornersImage(Context paramContext) {
		super(paramContext);
	}

	public RoundedCornersImage(Context paramContext, AttributeSet paramAttributeSet) {
		super(paramContext, paramAttributeSet);
		int[] arrayOfInt = R.styleable.RoundedCornersImage;
		TypedArray a = paramContext.obtainStyledAttributes(paramAttributeSet, arrayOfInt);
		int i = a.getDimensionPixelSize(0, DEFAULT_CORNER_RADIUS);
		this.cornerRadius = i;
		a.recycle();
	}

	public Bitmap createMask() {
		int i = getWidth();
		int j = getHeight();
		Bitmap.Config localConfig = Bitmap.Config.ARGB_8888;
		Bitmap localBitmap = Bitmap.createBitmap(i, j, localConfig);
		Canvas localCanvas = new Canvas(localBitmap);
		Paint localPaint = new Paint(1);
		localPaint.setColor(-16777216);
		float f1 = getWidth();
		float f2 = getHeight();
		RectF localRectF = new RectF(0.0F, 0.0F, f1, f2);
		float f3 = this.cornerRadius;
		float f4 = this.cornerRadius;
		localCanvas.drawRoundRect(localRectF, f3, f4, localPaint);
		return localBitmap;
	}
}
{% endhighlight %}

如果以后新增了椭圆图片，那么只须新建一个椭圆图片累继承自MaskedImage,然后重写createMask()方法即可。

至此，代码实现已完成，只需要在xml中像使用android自带组件的方式使用我们的自定义组件即可，如：

{% highlight ruby %}
<com.boohee.widgets.RoundedCornersImage
    android:id="@+id/rounded_image"
    android:layout_width="60dp"
    android:layout_height="60dp" />
{% endhighlight %}