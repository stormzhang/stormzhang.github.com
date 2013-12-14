---
layout: post
title: "Android中自定义属性格式详解"
tags: [AttributeSet]
categories: [Android]
---

在Android项目的实际开发中，免不了要自定义一些控件或者view，更高深一点的自定义view也应该可以直接在xml自定义属性，今天就来分享下自定义属性的格式。

## 1. reference：参考某一资源ID

属性定义：
{% highlight ruby %}
<declare-styleable name="名称">
    <attr name="background" format="reference" />
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<ImageView
    android:layout_width="42dip"
    android:layout_height="42dip"
    android:background="@drawable/图片ID" />
{% endhighlight %}

## 2. color：颜色值

属性定义：
{% highlight ruby %}
<declare-styleable name="名称">
    <attr name="textColor" format="color" />
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<TextView
    android:layout_width="42dip"
    android:layout_height="42dip"
    android:textColor="#00FF00" />
{% endhighlight %}

## 3. boolean：布尔值

属性定义：
{% highlight ruby %}
<declare-styleable name="名称">
    <attr name="focusable" format="boolean" />
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<Button
    android:layout_width="42dip"
    android:layout_height="42dip"
    android:focusable="true" />
{% endhighlight %}

## 4. dimension：尺寸值

属性定义：
{% highlight ruby %}
<declare-styleable name="名称">
    <attr name="layout_width" format="dimension" />
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<Button
    android:layout_width="42dip"
    android:layout_height="42dip" />
{% endhighlight %}

## 5. float：浮点值

属性定义：
{% highlight ruby %}
<declare-styleable name="AlphaAnimation">
    <attr name="fromAlpha" format="float" />
    <attr name="toAlpha" format="float" />
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<alpha
    android:fromAlpha="1.0"
    android:toAlpha="0.7" />
{% endhighlight %}

## 6. integer：整型值

属性定义：
{% highlight ruby %}
<declare-styleable name="AnimatedRotateDrawable">
    <attr name="visible" />
    <attr name="frameDuration" format="integer" />
    <attr name="framesCount" format="integer" />
    <attr name="pivotX" />
    <attr name="pivotY" />
    <attr name="drawable" />
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<animated-rotate
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/图片ID"
    android:frameDuration="100"
    android:framesCount="12"
    android:pivotX="50%"
    android:pivotY="50%" />
{% endhighlight %}

## 7. string：字符串

属性定义：
{% highlight ruby %}
<declare-styleable name="MapView">
    <attr name="apiKey" format="string" />
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<com.google.android.maps.MapView
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:apiKey="0jOkQ80oD1JL9C6HAja99uGXCRiS2CGjKO_bc_g" />
{% endhighlight %}

## 8. fraction：百分数

属性定义：
{% highlight ruby %}
<declare-styleable name="RotateDrawable">
    <attr name="visible" />
    <attr name="fromDegrees" format="float" />
    <attr name="toDegrees" format="float" />
    <attr name="pivotX" format="fraction" />
    <attr name="pivotY" format="fraction" />
    <attr name="drawable" />
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<rotate
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:duration="5000"
    android:fromDegrees="0"
    android:interpolator="@anim/动画ID"
    android:pivotX="200%"
    android:pivotY="300%"
    android:repeatCount="infinite"
    android:repeatMode="restart"
    android:toDegrees="360" />
{% endhighlight %}

## 9. enum：枚举值

属性定义：
{% highlight ruby %}
<declare-styleable name="名称">
    <attr name="orientation">
        <enum name="horizontal" value="0" />
        <enum name="vertical" value="1" />
    </attr>
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<LinearLayout
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" />
{% endhighlight %}

## 10. flag：位或运算

属性定义：
{% highlight ruby %}
<declare-styleable name="名称">
    <attr name="windowSoftInputMode">
        <flag name="stateUnspecified" value="0" />
        <flag name="stateUnchanged" value="1" />
        <flag name="stateHidden" value="2" />
        <flag name="stateAlwaysHidden" value="3" />
        <flag name="stateVisible" value="4" />
        <flag name="stateAlwaysVisible" value="5" />
        <flag name="adjustUnspecified" value="0x00" />
        <flag name="adjustResize" value="0x10" />
        <flag name="adjustPan" value="0x20" />
        <flag name="adjustNothing" value="0x30" />
    </attr>
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<activity
    android:name=".StyleAndThemeActivity"
    android:label="@string/app_name"
    android:windowSoftInputMode="stateUnspecified | stateUnchanged　|　stateHidden" >

    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
{% endhighlight %}

## 注意

属性定义时可以指定多种类型值，如：

属性定义：
{% highlight ruby %}
<declare-styleable name="名称">
    <attr name="background" format="reference|color" />
</declare-styleable>
{% endhighlight %}

属性使用：
{% highlight ruby %}
<ImageView
    android:layout_width="42dip"
    android:layout_height="42dip"
    android:background="@drawable/图片ID|#00FF00" />
{% endhighlight %}