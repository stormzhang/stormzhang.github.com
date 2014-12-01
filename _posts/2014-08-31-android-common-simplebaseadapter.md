---
layout: post
keywords: [commonadapter]
description: blog
title: "Android简便通用的SimpleBaseAdapter"
categories: [AndroidTips]
tags: [adapter]
---
{% include codepiano/setup %}

在Android开发中经常用到ListView、GridView等列表，于是Adapter也就比较常用的了， 而实际项目中稍微复杂点的基本都会用到BaseAdapter， 大家都知道继承自BaseAdapter必须要重写getCount(), getItem(), getItemId(), getView()这几个方法， 而且可能为了优化列表的加载还还会经常采用ViewHoder模式， 试想列表多了估计都写烦了吧，那么今天就来教大家一种通用、简洁的Adapter，以后你就可以几行代码搞定一个复杂的Adapter了。

## 通用的SimpleBaseAdapter

首先我们来解决每次都重写BaseAdapter的那几个方法的问题，解决方案很简单，直接写一个抽象的SimpleBaseAdapter，代码如下

{% highlight ruby %}
public abstract class SimpleBaseAdapter<T> extends BaseAdapter {

    protected Context context;
    protected List<T> data;

    public SimpleBaseAdapter(Context context, List<T> data) {
        this.context = context;
        this.data = data == null ? new ArrayList<T>() : data;
    }

    @Override
    public int getCount() {
        return data.size();
    }

    @Override
    public Object getItem(int position) {
        if (position >= data.size())
            return null;
        return data.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }
}
{% endhighlight %}

上面代码我不就过多解释了，相信大家都能看懂。之后建立Adapter的时候只需要继承自SimpleBaseAdapter，把List数据源传进去，再重写getView方法就好了。

## 通用的ViewHolder

上面的SimpleBaseAdapter已经大大减少了不少的重复性工作，但是对于ViewHolder的优化依然还有很多重复性的代码要写，那么下面就来看看如何打造一个通用的ViewHolder。

关于ListView的优化这里再多说下吧，主要是两点：一是判断convertView为空的时候才会inflate，复用item view，二便是使用ViewHoder模式，通过convertView.setTag与convertView进行绑定，然后当convertView复用时，直接从与之对于的ViewHolder(getTag)中拿到convertView布局中的控件，省去了findViewById的时间~

下面看我们的ViewHolder类：

{% highlight ruby %}
public class ViewHolder {
    private SparseArray<View> views = new SparseArray<View>();
    private View convertView;

    public ViewHolder(View convertView) {
        this.convertView = convertView;
    }

    public <T extends View> T getView(int resId) {
        View v = views.get(resId);
        if (null == v) {
            v = convertView.findViewById(resId);
            views.put(resId, v);
        }
        return (T) v;
    }
}
{% endhighlight %}

可以看到这里定义的ViewHolder代码很简单，使用起来也是非常的轻便。SparseArray<View>在代码理解上等价于HashMap<Integer, View>, SparseArray是Android提供的一个数据结构，但是比Map的效率更高。

## 最终的SimpleBaseAdapter

废话不多说了，我们结合以上两点，直接上个最终的SimpleBaseAdapter

{% highlight ruby %}
public abstract class SimpleBaseAdapter<T> extends BaseAdapter {

    protected Context context;
    protected List<T> data;

    public SimpleBaseAdapter(Context context, List<T> data) {
        this.context = context;
        this.data = data == null ? new ArrayList<T>() : new ArrayList<T>(data);
    }

    @Override
    public int getCount() {
        return data.size();
    }

    @Override
    public Object getItem(int position) {
        if (position >= data.size())
            return null;
        return data.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    /**
     * 该方法需要子类实现，需要返回item布局的resource id
     * 
     * @return
     */
    public abstract int getItemResource();

    /**
     * 使用该getItemView方法替换原来的getView方法，需要子类实现
     * 
     * @param position
     * @param convertView
     * @param parent
     * @param holder
     * @return
     */
    public abstract View getItemView(int position, View convertView, ViewHolder holder);

    @SuppressWarnings("unchecked")
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;
        if (null == convertView) {
            convertView = View.inflate(context, getItemResource(), null);
            holder = new ViewHolder(convertView);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        return getItemView(position, convertView, holder);
    }

    public class ViewHolder {
        private SparseArray<View> views = new SparseArray<View>();
        private View convertView;
		
        public ViewHolder(View convertView) {
            this.convertView = convertView;
        }

        @SuppressWarnings("unchecked")
        public <T extends View> T getView(int resId) {
            View v = views.get(resId);
            if (null == v) {
                v = convertView.findViewById(resId);
                views.put(resId, v);
            }
            return (T) v;
        }
    }

    public void addAll(List<T> elem) {
        data.addAll(elem);
        notifyDataSetChanged();
    }
	
    public void remove(T elem) {
        data.remove(elem);
        notifyDataSetChanged();
    }

    public void remove(int index) {
        data.remove(index);
        notifyDataSetChanged();
    }

    public void replaceAll(List<T> elem) {
        data.clear();
        data.addAll(elem);
        notifyDataSetChanged();
    }
}
{% endhighlight %}

## 使用

自己的Adapter需要继承SimpleBaseAdapter，并且实现getItemResource和getItemView两个方法就好了, 下面看下例子:

{% highlight ruby %}
public class TestFoodListAdapter extends SimpleBaseAdapter<String> {

    public TestFoodListAdapter(Context context, List<String> data) {
        super(context, data);
    }

    @Override
    public int getItemResource() {
        return R.layout.listitem_test;
    }

    @Override
    public View getItemView(int position, View convertView, ViewHolder holder) {
        TextView text = holder.getView(R.id.text);
        text.setText(getItem(position));
        return convertView;
    }
}
{% endhighlight %}

相信大家都能看懂，具体的xml布局文件就不写出来了，上面的示例和google推荐的写法类似，只不过稍加变通之后减少了很多重复的代码, 是不是清爽了很多呢？
