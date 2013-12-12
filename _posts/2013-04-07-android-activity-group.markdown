---
layout: post
title: "Android ActivityGroup"
tags: [ActivityGroup]
categories: [Android]
---

在android应用中底部导航栏可以说是十分常见的，如新浪微博，微信等都是这种设计，大家在做这种应用第一反应就是使用TabActivity，今天就来分享下如何用ActivityGroup来代替TabActivity，以及这样使用的优点。

ActivityGroup是Google提供的一个非常优秀的API，而TabActivity是ActivityGroup唯一的一个子类。

## ActivityGroup的优点

首先来说ActivityGroup的优秀之处以及它的必要性，它为开发者提供了一种可能，这种可能不将Activity作为屏幕的顶级元素（Context）呈现，而是嵌入到ActivityGroup当中。这是一种极大的飞跃，它将场景（Context）细分化了，ActivityGroup是一个主场景，而用户可以通过导航按钮来切换想要的子场景。如使用微博功能，它是一个相当宏大的场景，具有看最新的广播信息、自己发微博、修改资料等子场景，用户可以通过按钮来切换到想要的子场景，而这个子场景仍活动于主场景之中。让一个主场景能拥有多个逻辑处理模块，主场景不再负责子场景逻辑，主场景只负责切换场景的逻辑，即每一个Activity（子场景）拥有一个逻辑处理模块，一个ActivityGroup有多个Activity，却不干预Activity的逻辑，这无疑细分化和模块化了逻辑代码。ActivityGroup和它将要内嵌的Activity所要实现的功能完全可以只用一个Activity来完成，你可以试想，当你把一个ActivityGroup和它所拥有的Activity的逻辑代码放在一个Activity中时，那这个Activity会拥有多少行代码，为维护带来非常的不便。

## TabActivity的不足

再来说说TabActivity的不足之处，首先，TabActivity自己独有的视图几乎没人使用（也就是难看的标签页按钮形式），大多数开发者用到的特性几乎都是从ActivityGroup继承下来的。还有就是TabActivity的强制依赖关系，它的布局文件必须将TabHost作根标签，并且id必须为"@android:id/tabhost"，必须有TabWidget标签，且它的id必须是"@android:id/tabs"，还有加载Activity的View容器，id必须为@android:id/tabcontent。光是强制依赖关系，我就觉得不是很舒服。而且在android3.0以后已经建议用Fragment来代替TabActivity了。只是由于目前为了要兼容3.0之前的版本，Fragment还没有被开发者们所普及。

下面就来看下这次食物库重构后的用ActivityGroup来实现的主页面架构吧：

{% highlight ruby %} MainActivityGroup.java

public class MainActivityGroup extends ActivityGroup implements
		OnCheckedChangeListener {
	private static final String RECORD = "record";
	private static final String CATEGORY = "category";
	private static final String MORE = "more";

	private ActivityGroupManager manager = null;
	private FrameLayout container = null;
	private RadioGroup radioGroup;

	

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.test_main);

		initView();
	}

	private void initView() {
		radioGroup = (RadioGroup) findViewById(R.id.main_radio);
		radioGroup.setOnCheckedChangeListener(this);

		manager = new ActivityGroupManager();
		container = (FrameLayout) findViewById(R.id.container);
		manager.setContainer(container);
		switchActivity(ActivityGroupManager.RECORD_ACTIVITY_VIEW, RECORD, RecordActivity.class);
	}

	@Override
	public void onCheckedChanged(RadioGroup group, int checkedId) {
		switch (checkedId) {
		case R.id.record_button:
			switchActivity(ActivityGroupManager.RECORD_ACTIVITY_VIEW, RECORD, RecordActivity.class);
			break;
		case R.id.category_button:
			switchActivity(ActivityGroupManager.CATEGORY_ACTIVITY_VIEW, CATEGORY, CategoryActivity.class);
			break;
		case R.id.more_button:
			switchActivity(ActivityGroupManager.MORE_AVTIVITY_VIEW, MORE, MoreActivity.class);
			break;
		default:
			break;
		}
	}
	
	private View getActivityView(String activityName, Class<?> activityClass) {
		return getLocalActivityManager().startActivity(activityName,
				new Intent(MainActivityGroup.this, activityClass))
				.getDecorView();
	}

	private void switchActivity(int num, String activityName, Class<?> activityClass) {
		manager.showContainer(num, getActivityView(activityName, activityClass));
	}

}
{% endhighlight %}

可以看到在“主场景”MainActivityGroup中基本没有任何逻辑代码，只有各个“子场景”切换的逻辑，而子场景的切换用了一个ActivityGroupManager类来管理，这样又起到了代码分离的作用,

{% highlight ruby %} ActivityGroupManager.java
public class ActivityGroupManager {

	private static final String TAG = "frag_manager";

	public static final int RECORD_ACTIVITY_VIEW = 0;
	public static final int CATEGORY_ACTIVITY_VIEW = 1;
	public static final int MORE_AVTIVITY_VIEW = 2;

	private HashMap<Integer, View> hashMap;
	private ViewGroup container;

	public ActivityGroupManager() {
		hashMap = new HashMap<Integer, View>();
	}

	public void setContainer(ViewGroup container) {
		this.container = container;
	}
	
	public void showContainer(int num, View view) {
		if (!hashMap.containsKey(num)) {
			hashMap.put(num, view);
			container.addView(view);
		}

		for (Iterator<Integer> iter = hashMap.keySet().iterator(); iter.hasNext();) {
			Object key = iter.next();
			View v = hashMap.get(key);
			v.setVisibility(View.INVISIBLE);
		}
		
		view.setVisibility(View.VISIBLE);
	}
}

{% endhighlight %}

值得一说的是在ActivityGroupManager类中的showContainer ()方法并没有像网上的做法这样：

{% highlight ruby %}
container.removeAllViews();
container.addView(view);
{% endhighlight %}
这种做法看似代码逻辑更简单，但是这样就会导致每次切换“子场景”的时候都会把已经加载过的View remove掉，一方面性能有所欠缺，另一个方面“子场景”的状态无法记住。而现在的做法就很好的解决了上面的问题。

好了，然后就是各个“子场景”（Activity）的代码了，每个“子场景”的逻辑各自独立，这里就不上代码了。

这里还有一个需要提到的是底部导航栏的实现，由于android没有像iOS那样预定好的组件，只有自己定义一个布局了，这里我用到的是用RadioGroup来实现类似微信的底部导航栏效果，下面是布局代码，在其他使用到的地方直接include进来就可以了。

{% highlight ruby %}
<?xml version="1.0" encoding="utf-8"?>
<RadioGroup xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main_radio"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:layout_gravity="bottom|center"
    android:layout_marginBottom="-20dp"
    android:gravity="center"
    android:orientation="horizontal"
    android:padding="0dp" >

    <RadioButton
        android:id="@+id/record_button"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_weight="1.0"
        android:background="@null"
        android:button="@null"
        android:checked="true"
        android:drawableTop="@drawable/main_tab_record_selector"
        android:gravity="center"
        android:tag="record" />

    <RadioButton
        android:id="@+id/category_button"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_weight="1.0"
        android:background="@null"
        android:button="@null"
        android:drawableTop="@drawable/main_tab_category_selector"
        android:gravity="center_horizontal"
        android:tag="category" />

    <RadioButton
        android:id="@+id/more_button"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_weight="1.0"
        android:background="@null"
        android:button="@null"
        android:drawableTop="@drawable/main_tab_more_selector"
        android:gravity="center_horizontal"
        android:tag="more" />

</RadioGroup>
{% endhighlight %}