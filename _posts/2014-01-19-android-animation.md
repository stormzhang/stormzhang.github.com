---
layout: post
title: "Android Animation"
categories: [Android]
tags: [Animation]
---
{% include codepiano/setup %}

Android中常用两种动画模式，tween animation和frame animation，即补间动画和帧动画，但在android3.0中又引入了一个新的动画系统：property animation，即属性动画，这三种动画模式在SDK中被称为property animation,view animation,drawable animation。如果想在3.0之前的版本支持property animation的话，那么可使用[NineOldAndroids](https://github.com/JakeWharton/NineOldAndroids)，大神JakeWharton的又一开源项目。

## View Animation(Tween Animation)

View animation只能应用于View对象，而且只支持一部分属性，如支持缩放旋转而不支持背景颜色的改变。

而且对于View animation，它只是改变了View对象绘制的位置，而没有改变View对象本身，比如，你有一个Button，坐标（100,100），Width:200,Height:50，而你有一个动画使其变为Width：100，Height：100，你会发现动画过程中触发按钮点击的区域仍是(100,100)-(300,150)。

　　View Animation就是一系列View形状的变换，如大小的缩放，透明度的改变，位置的改变，动画的定义既可以用代码定义也可以用XML定义，当然，建议用XML定义。

　　可以给一个View同时设置多个动画，比如从透明至不透明的淡入效果，与从小到大的放大效果，这些动画可以同时进行，也可以在一个完成之后开始另一个。

用XML定义的动画放在/res/anim/文件夹内，XML文件的根元素可以为alpha, scale, translate, rotate, interpolator元素或set(表示以上几个动画的集合，set可以嵌套)。默认情况下，所有动画是同时进行的，可以通过startOffset属性设置各个动画的开始偏移（开始时间）来达到动画顺序播放的效果。

　　可以通过设置interpolator属性改变动画渐变的方式，如AccelerateInterpolator，开始时慢，然后逐渐加快。默认为AccelerateDecelerateInterpolator。

　　定义好动画的XML文件后，可以通过类似下面的代码对指定View应用动画。

{% highlight ruby %}
ImageView image = (ImageView)findViewById(R.id.image);
Animation animation = AnimationUtils.loadAnimation(this, R.anim.animation);
spaceshipImage.startAnimation(animation);
{% endhighlight %}

## TimeInterplator

Time interplator定义了属性值变化的方式，如线性均匀改变，开始慢然后逐渐快等。在Property Animation中是TimeInterplator，在View Animation中是Interplator，这两个是一样的，在3.0之前只有Interplator，3.0之后实现代码转移至了TimeInterplator。Interplator继承自TimeInterplator，内部没有任何其他代码。

* AccelerateInterpolator　　　　　     加速，开始时慢中间加速

* DecelerateInterpolator　　　 　　   减速，开始时快然后减速

* AccelerateDecelerateInterolator　   先加速后减速，开始结束时慢，中间加速

* AnticipateInterpolator　　　　　　  反向 ，先向相反方向改变一段再加速播放

* AnticipateOvershootInterpolator　   反向加回弹，先向相反方向改变，再加速播放，会超出目的值然后缓慢移动至目的值

* BounceInterpolator　　　　　　　  跳跃，快到目的值时值会跳跃，如目的值100，后面的值可能依次为85，77，70，80，90，100

* CycleIinterpolator　　　　　　　　 循环，动画循环一定次数，值的改变为一正弦函数：Math.sin(2 * mCycles * Math.PI * input)

* LinearInterpolator　　　　　　　　 线性，线性均匀改变

* OvershottInterpolator　　　　　　  回弹，最后超出目的值然后缓慢改变到目的值

* TimeInterpolator　　　　　　　　   一个接口，允许你自定义interpolator，以上几个都是实现了这个接口

## Drawable Animation(Frame Animation)

Drawable Animation（Frame Animation）：帧动画，就像GIF图片，通过一系列Drawable依次显示来模拟动画的效果。在XML中的定义方式如下：

{% highlight ruby %}
<animation-list xmlns:android="http://schemas.android.com/apk/res/android"
    android:oneshot="false">
    <item android:drawable="@drawable/loading01" android:duration="200" />
    <item android:drawable="@drawable/loading02" android:duration="200" />
    <item android:drawable="@drawable/loading03" android:duration="200" />
</animation-list>
{% endhighlight %}

必须以animation-list为根元素，以item表示要轮换显示的图片，duration属性表示各项显示的时间。XML文件要放在/res/drawable/目录下。示例：

{% highlight ruby %}
ImageView imageView = (ImageView) findViewById(R.id.imageView);
imageView.setBackgroundResource(R.drawable.drawable_anim);
anim = (AnimationDrawable) imageView.getBackground();
anim.start();
{% endhighlight %}

##  Property Animation

属性动画，这个是在Android 3.0中才引进的，以前学WPF时里面的动画机制好像就是这个，它更改的是对象的实际属性，在View Animation（Tween Animation）中，其改变的是View的绘制效果，真正的View的属性保持不变，比如无论你在对话中如何缩放Button的大小，Button的有效点击区域还是没有应用动画时的区域，其位置与大小都不变。而在Property Animation中，改变的是对象的实际属性，如Button的缩放，Button的位置与大小属性值都改变了。而且Property Animation不止可以应用于View，还可以应用于任何对象。Property Animation只是表示一个值在一段时间内的改变，当值改变时要做什么事情完全是你自己决定的。

在Property Animation中，可以对动画应用以下属性：

* Duration：动画的持续时间

* TimeInterpolation：属性值的计算方式，如先快后慢

* TypeEvaluator：根据属性的开始、结束值与TimeInterpolation计算出的因子计算出当前时间的属性值

* Repeat Count and behavoir：重复次数与方式，如播放3次、5次、无限循环，可以此动画一直重复，或播放完时再反向播放

* Animation sets：动画集合，即可以同时对一个对象应用几个动画，这些动画可以同时播放也可以对不同动画设置不同开始偏移

* Frame refreash delay：多少时间刷新一次，即每隔多少时间计算一次属性值，默认为10ms，最终刷新时间还受系统进程调度与硬件的影响

具体使用方式，见[NineOldAndroids官网](http://nineoldandroids.com/)
