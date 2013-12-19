---
layout: post
title: "Builder Pattern In Android"
tags: [Builder]
categories: [DesignPatterns, Android]
---

看到一篇个人感觉不错的文章，分享出来。

When I started with android, I almost always asked Google how to do the smallest things. I want to highlight the examples I found for starting an activity.

{% highlight ruby %}
Intent intent = new Intent(this, SomeOtherActivity.class);
startActivity(intent);
{% endhighlight %}

I always wondered why many examples used a variable called intent. You could easily create the Intent on-the-fly in the startActivity() parameter. Maybe it looks better, if you need to add some parameters to the intent like this?

{% highlight ruby %}
Intent intent = new Intent(this, SomeOtherActivity.class);
intent.putExtra("param1", extraInfo1);
intent.putExtra("param2", extraInfo2);
startActivity(intent);
{% endhighlight %}

But then again, the method putExtra() returns an Intent. As described in the [example for method-chaining](http://unreleased.de/code/example-for-method-chaining), such chaining can be relatively useful. Androids call to startActivity() could be rewritten to this:

{% highlight ruby %}
startActivity(new Intent(this, SomeOtherActivity.class)
       .putExtra("param1", extraInfo1)
       .putExtra("param2", extraInfo2));
{% endhighlight %}

Since this doesn't need a variable, I like that approach more. In Android, this pattern is used quite often. The so called builder-pattern is used with AlertDialog for example. When built, you use the create() method in order to show the dialog itself (equals the build() method of the builder-pattern). To create URIs one can use the buildUpon() method to get a Uri.Builder. There are tons of other examples where Android uses such builders. Intents seem to be an exception, since there is no startActivity() function or similar to it. Returning the object itself was not even done consequently, to make chaining of some methods impossible. Examples for these are setSourceBounds() or setExtrasClassLoader().

I see two options to address these problems:

* Creation of a sub-class of Intent, which provides a startAsActivity() function. It needs to return its own type in every putExtra() method, to preserve the startAsActivity() method. This class could look like this:

{% highlight ruby %}
public class BuilderIntent extends Intent {
    private final Context context;
 
    public BuilderIntent(Context ctx, Class<?> cls) {
        super(ctx, cls);
        this.context = ctx;
    }
 
    @Override
    public BuilderIntent putExtra(String name, String value) {
        super.putExtra(name, value);
        return this;
    }
 
    // ... more putExtra-methods ...
 
    public void startAsActivity() {
        context.startActivity(this);
    }
}
 
// Usage:
new BuilderIntent(this, SomeOtherActivity.class)
        .putExtra("param1", "info1")
        .putExtra("param2", "info2")
        .startAsActivity();
{% endhighlight %}

The problem with this class is, that methods like public void setExtrasClassLoader() cannot be changed to return the BuilderIntent type.

* An alternative would be the usage of an external builder, which uses its own Intent internally. Take all functions you want to provide and change them for your requirements, somehow similar to the Decorator-Pattern.

{% highlight ruby %}
public static class ActivityBuilder {
    private final Context context;
    private final Intent intent;
 
    private ActivityBuilder(Context context, Class<? extends Activity> activity) {
        this.context = context;
        intent = new Intent(context, activity);
    }
 
    public ActivityBuilder put(String param, Long x) {
        intent.putExtra(param, x);
        return this;
    }
 
    // ... more required methods ...
 
    public void start() {
        context.startActivity(intent);
    }
}
{% endhighlight %}

The advantage is that you can setup a public ActivityBuilder setExtrasClassLoader() method without hassle. The problem is, that you cannot use methods from Intent at all. With the first option, that would be cumbersome but at least possible.

What I wanted to say is that a method like startAsActivity() seems to be missing. However, you can create your own builders around existing classes.