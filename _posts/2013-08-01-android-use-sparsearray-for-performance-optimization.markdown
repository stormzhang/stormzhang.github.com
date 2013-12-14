---
layout: post
title: "Android性能优化之使用SparseArray代替HashMap"
tags: [SparseArray]
categories: [Android]
---

最近在重构one的项目，其中用HashMap来缓存ActivityGroup加载过的View，Eclipse给出了一个警告，之前考虑项目进度没怎么在意，这次仔细看了下提示，如下：

{% highlight ruby %}

Use new SparseArray<View> (...) instead for better performance

{% endhighlight %}

<p class="paragraph">
意思就是说用SparseArray来替代，以获取更好的性能。对SparseArray根本不熟悉，甚至都没听过，第一感觉应该是Android提供的类，于是F3进入SparseArray的源码，果不其然，确实是Android提供的一个工具类,部分源码如下：
</p>

{% highlight ruby %}

 * Copyright (C) 2006 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package android.util;

import com.android.internal.util.ArrayUtils;

/**
 * SparseArrays map integers to Objects.  Unlike a normal array of Objects,
 * there can be gaps in the indices.  It is intended to be more efficient
 * than using a HashMap to map Integers to Objects.
 */
public class SparseArray<E> implements Cloneable {
    private static final Object DELETED = new Object();
    private boolean mGarbage = false;

    private int[] mKeys;
    private Object[] mValues;
    private int mSize;

    /**
     * Creates a new SparseArray containing no mappings.
     */
    public SparseArray() {
        this(10);
    }

    /**
     * Creates a new SparseArray containing no mappings that will not
     * require any additional memory allocation to store the specified
     * number of mappings.
     */
    public SparseArray(int initialCapacity) {
        initialCapacity = ArrayUtils.idealIntArraySize(initialCapacity);

        mKeys = new int[initialCapacity];
        mValues = new Object[initialCapacity];
        mSize = 0;
    }

    @Override
    @SuppressWarnings("unchecked")
    public SparseArray<E> clone() {
        SparseArray<E> clone = null;
        try {
            clone = (SparseArray<E>) super.clone();
            clone.mKeys = mKeys.clone();
            clone.mValues = mValues.clone();
        } catch (CloneNotSupportedException cnse) {
            /* ignore */
        }
        return clone;
    }

    /**
     * Gets the Object mapped from the specified key, or <code>null</code>
     * if no such mapping has been made.
     */
    public E get(int key) {
        return get(key, null);
    }

    /**
     * Gets the Object mapped from the specified key, or the specified Object
     * if no such mapping has been made.
     */
    @SuppressWarnings("unchecked")
    public E get(int key, E valueIfKeyNotFound) {
        int i = binarySearch(mKeys, 0, mSize, key);

        if (i < 0 || mValues[i] == DELETED) {
            return valueIfKeyNotFound;
        } else {
            return (E) mValues[i];
        }
    }

    /**
     * Removes the mapping from the specified key, if there was any.
     */
    public void delete(int key) {
        int i = binarySearch(mKeys, 0, mSize, key);

        if (i >= 0) {
            if (mValues[i] != DELETED) {
                mValues[i] = DELETED;
                mGarbage = true;
            }
        }
    }

    /**
     * Alias for {@link #delete(int)}.
     */
    public void remove(int key) {
        delete(key);
    }

    /**
     * Removes the mapping at the specified index.
     */
    public void removeAt(int index) {
        if (mValues[index] != DELETED) {
            mValues[index] = DELETED;
            mGarbage = true;
        }
    }
    ...

{% endhighlight %}

    mSize++;单纯从字面上来理解，SparseArray指的是稀疏数组(Sparse array)，所谓稀疏数组就是数组中大部分的内容值都未被使用（或都为零），在数组中仅有少部分的空间使用。因此造成内存空间的浪费，为了节省内存空间，并且不影响数组中原有的内容值，我们可以采用一种压缩的方式来表示稀疏数组的内容。

继续阅读SparseArray的源码，从构造方法我们可以看出，它和一般的List一样，可以预先设置容器大小，默认的大小是10：

{% highlight ruby %}

public SparseArray() {
    this(10);
}

public SparseArray(int initialCapacity) {
    initialCapacity = ArrayUtils.idealIntArraySize(initialCapacity);

    mKeys = new int[initialCapacity];
    mValues = new Object[initialCapacity];
    mSize = 0;
}

{% endhighlight %}

再来看看它对数据的“增删改查”。

{% highlight ruby %}

public void put(int key, E value) {}
public void append(int key, E value){}

{% endhighlight %}

修改数据起初以为只有setValueAt(int index, E value)可以修改数据，但后来发现put(int key, E value)也可以修改数据，我们查看put(int key, E value)的源码可知，在put数据之前，会先查找要put的数据是否已经存在，如果存在就是修改，不存在就添加。

{% highlight ruby %}

public void put(int key, E value) {
    int i = binarySearch(mKeys, 0, mSize, key);

    if (i >= 0) {
        mValues[i] = value;
    } else {
        i = ~i;

        if (i < mSize && mValues[i] == DELETED) {
            mKeys[i] = key;
            mValues[i] = value;
            return;
        }

        if (mGarbage && mSize >= mKeys.length) {
            gc();

            // Search again because indices may have changed.
            i = ~binarySearch(mKeys, 0, mSize, key);
        }

        if (mSize >= mKeys.length) {
            int n = ArrayUtils.idealIntArraySize(mSize + 1);

            int[] nkeys = new int[n];
            Object[] nvalues = new Object[n];

            // Log.e("SparseArray", "grow " + mKeys.length + " to " + n);
            System.arraycopy(mKeys, 0, nkeys, 0, mKeys.length);
            System.arraycopy(mValues, 0, nvalues, 0, mValues.length);

            mKeys = nkeys;
            mValues = nvalues;
        }

        if (mSize - i != 0) {
            // Log.e("SparseArray", "move " + (mSize - i));
            System.arraycopy(mKeys, i, mKeys, i + 1, mSize - i);
            System.arraycopy(mValues, i, mValues, i + 1, mSize - i);
        }

        mKeys[i] = key;
        mValues[i] = value;
    
    }
}

{% endhighlight %}

所以，修改数据实际也有两种方法：

{% highlight ruby %}
public void put(int key, E value)
public void setValueAt(int index, E value)
{% endhighlight %}

最后再来看看如何查找数据。有两个方法可以查询取值：

{% highlight ruby %}
public E get(int key)
public E get(int key, E valueIfKeyNotFound)
{% endhighlight %}

其中get(int key)也只是调用了 get(int key,E valueIfKeyNotFound),最后一个从传参的变量名就能看出，传入的是找不到的时候返回的值.get(int key)当找不到的时候，默认返回null。

查看第几个位置的键：

{% highlight ruby %}
public int keyAt(int index)
{% endhighlight %}

有一点需要注意的是，查看键所在位置，由于是采用二分法查找键的位置，所以找不到时返回小于0的数值，而不是返回-1。返回的负值是表示它在找不到时所在的位置。

查看第几个位置的值：

{% highlight ruby %}
public E valueAt(int index)
{% endhighlight %}

查看值所在位置，没有的话返回-1：

{% highlight ruby %}
public int indexOfValue(E value)
{% endhighlight %}

最后，发现其核心就是折半查找函数（binarySearch），算法设计的很不错。

{% highlight ruby %}
private static int binarySearch(int[] a, int start, int len, int key) {
    int high = start + len, low = start - 1, guess;

    while (high - low &gt; 1) {
        guess = (high + low) / 2;

        if (a[guess] &lt; key)
            low = guess;
        else
            high = guess;
    }

    if (high == start + len)
        return ~(start + len);
    else if (a[high] == key)
        return high;
    else
        return ~high;
}

相应的也有SparseBooleanArray，用来取代HashMap<Integer, Boolean>，SparseIntArray用来取代HashMap<Integer, Integer>，大家有兴趣的可以研究。

{% endhighlight %}

## 总结

{% highlight ruby %}

SparseArray是android里为<Interger,Object>这样的Hashmap而专门写的类,目的是提高效率，其核心是折半查找函数（binarySearch）。在Android中，当我们需要定义
    HashMap<Integer, E> hashMap = new HashMap<Integer, E>();
时，我们可以使用如下的方式来取得更好的性能.
    SparseArray<E> sparseArray = new SparseArray<E>();
    
{% endhighlight %}

最后，看看重构后的ActivityGroupManager：

{% highlight ruby %}

public class ActivityGroupManager {
    static final String TAG = ActivityGroupManager.class.getName();

    private SparseArray<View> array;
    private ViewGroup container;

    public ActivityGroupManager() {
    	array = new SparseArray<View>();
    }

    public void setContainer(ViewGroup container) {
    	this.container = container;
    }

    public void showContainer(int num, View view) {
    	if (array.get(num) == null) {
    		array.put(num, view);
    		container.addView(view);
    	}
    	for (int i = 0; i < array.size(); i++) {
    		View v = array.valueAt(i);
    		v.setVisibility(View.GONE);
    	}
    	view.setVisibility(View.VISIBLE);
    }
}

{% endhighlight %}