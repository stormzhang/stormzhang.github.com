---
layout: post
title: "Android高效加载图片，有效避免程序OOM"
tags: [Bitmap]
categories: [Android]
---
{% include codepiano/setup %}

我们在编写Android程序的时候经常要用到许多图片，不同图片总是会有不同的形状、不同的大小，但在大多数情况下，这些图片都会大于我们程序所需要的大小。比如说系统图片库里展示的图片大都是用手机摄像头拍出来的，这些图片的分辨率会比我们手机屏幕的分辨率高得多。大家应该知道，我们编写的应用程序都是有一定内存限制的，程序占用了过高的内存就容易出现OOM(OutOfMemory)异常。我们可以通过下面的代码看出每个应用程序最高可用内存是多少。

{% highlight ruby %}
int maxMemory = (int) (Runtime.getRuntime().maxMemory() / 1024);
Log.d("TAG", "Max memory is " + maxMemory + "KB");
{% endhighlight %}

因此在展示高分辨率图片的时候，最好先将图片进行压缩。压缩后的图片大小应该和用来展示它的控件大小相近，在一个很小的ImageView上显示一张超大的图片不会带来任何视觉上的好处，但却会占用我们相当多宝贵的内存，而且在性能上还可能会带来负面影响。下面我们就来看一看，如何对一张大图片进行适当的压缩，让它能够以最佳大小显示的同时，还能防止OOM的出现。

<!-- more -->

BitmapFactory这个类提供了多个解析方法(decodeByteArray, decodeFile, decodeResource等)用于创建Bitmap对象，我们应该根据图片的来源选择合适的方法。比如SD卡中的图片可以使用decodeFile方法，网络上的图片可以使用decodeStream方法，资源文件中的图片可以使用decodeResource方法。这些方法会尝试为已经构建的bitmap分配内存，这时就会很容易导致OOM出现。为此每一种解析方法都提供了一个可选的BitmapFactory.Options参数，将这个参数的inJustDecodeBounds属性设置为true就可以让解析方法禁止为bitmap分配内存，返回值也不再是一个Bitmap对象，而是null。虽然Bitmap是null了，但是BitmapFactory.Options的outWidth、outHeight和outMimeType属性都会被赋值。这个技巧让我们可以在加载图片之前就获取到图片的长宽值和MIME类型，从而根据情况对图片进行压缩。如下代码所示：

{% highlight ruby %}
BitmapFactory.Options options = new BitmapFactory.Options();
options.inJustDecodeBounds = true;
BitmapFactory.decodeResource(getResources(), R.id.myimage, options);
int imageHeight = options.outHeight;
int imageWidth = options.outWidth;
String imageType = options.outMimeType;
{% endhighlight %}

为了避免OOM异常，最好在解析每张图片的时候都先检查一下图片的大小，除非你非常信任图片的来源，保证这些图片都不会超出你程序的可用内存。现在图片的大小已经知道了，我们就可以决定是把整张图片加载到内存中还是加载一个压缩版的图片到内存中。以下几个因素是我们需要考虑的：

* 预估一下加载整张图片所需占用的内存

* 为了加载这一张图片你所愿意提供多少内存

* 用于展示这张图片的控件的实际大小

* 当前设备的屏幕尺寸和分辨率

<p>
比如，你的ImageView只有128*96像素的大小，只是为了显示一张缩略图，这时候把一张1024*768像素的图片完全加载到内存中显然是不值得的。那我们怎样才能对图片进行压缩呢？通过设置BitmapFactory.Options中inSampleSize的值就可以实现。比如我们有一张2048*1536像素的图片，将inSampleSize的值设置为4，就可以把这张图片压缩成512*384像素。原本加载这张图片需要占用13M的内存，压缩后就只需要占用0.75M了(假设图片是ARGB_8888类型，即每个像素点占用4个字节)。下面的方法可以根据传入的宽和高，计算出合适的inSampleSize值：
</p>

{% highlight ruby %}
public static int calculateInSampleSize(BitmapFactory.Options options,
                int reqWidth, int reqHeight) {
    // 源图片的高度和宽度
    final int height = options.outHeight;
    final int width = options.outWidth;
    int inSampleSize = 1;
    if (height > reqHeight || width > reqWidth) {
        // 计算出实际宽高和目标宽高的比率
        final int heightRatio = Math.round((float) height / (float) reqHeight);
        final int widthRatio = Math.round((float) width / (float) reqWidth);
        // 选择宽和高中最小的比率作为inSampleSize的值，这样可以保证最终图片的宽和高
        // 一定都会大于等于目标的宽和高。
        inSampleSize = heightRatio < widthRatio ? heightRatio : widthRatio;
    }
    return inSampleSize;
}
{% endhighlight %}

使用这个方法，首先你要将BitmapFactory.Options的inJustDecodeBounds属性设置为true，解析一次图片。然后将BitmapFactory.Options连同期望的宽度和高度一起传递到到calculateInSampleSize方法中，就可以得到合适的inSampleSize值了。之后再解析一次图片，使用新获取到的inSampleSize值，并把inJustDecodeBounds设置为false，就可以得到压缩后的图片了。

{% highlight ruby %}
public static Bitmap decodeSampledBitmapFromResource(Resources res, int resId,
        int reqWidth, int reqHeight) {
        // 第一次解析将inJustDecodeBounds设置为true，来获取图片大小
    final BitmapFactory.Options options = new BitmapFactory.Options();
    options.inJustDecodeBounds = true;
    BitmapFactory.decodeResource(res, resId, options);
    // 调用上面定义的方法计算inSampleSize值
    options.inSampleSize = calculateInSampleSize(options, reqWidth, reqHeight);
    // 使用获取到的inSampleSize值再次解析图片
    options.inJustDecodeBounds = false;
    return BitmapFactory.decodeResource(res, resId, options);
}
{% endhighlight %}

<p>
下面的代码非常简单地将任意一张图片压缩成100*100的缩略图，并在ImageView上展示。
</p>

{% highlight ruby %}
mImageView.setImageBitmap(
    decodeSampledBitmapFromResource(getResources(), R.id.myimage, 100, 100));
{% endhighlight %}

使用图片缓存技术在你应用程序的UI界面加载一张图片是一件很简单的事情，但是当你需要在界面上加载一大堆图片的时候，情况就变得复杂起来。在很多情况下，（比如使用ListView, GridView 或者 ViewPager 这样的组件），屏幕上显示的图片可以通过滑动屏幕等事件不断地增加，最终导致OOM。为了保证内存的使用始终维持在一个合理的范围，通常会把被移除屏幕的图片进行回收处理。此时垃圾回收器也会认为你不再持有这些图片的引用，从而对这些图片进行GC操作。用这种思路来解决问题是非常好的，可是为了能让程序快速运行，在界面上迅速地加载图片，你又必须要考虑到某些图片被回收之后，用户又将它重新滑入屏幕这种情况。这时重新去加载一遍刚刚加载过的图片无疑是性能的瓶颈，你需要想办法去避免这个情况的发生。这个时候，使用内存缓存技术可以很好的解决这个问题，它可以让组件快速地重新加载和处理图片。下面我们就来看一看如何使用内存缓存技术来对图片进行缓存，从而让你的应用程序在加载很多图片的时候可以提高响应速度和流畅性。内存缓存技术对那些大量占用应用程序宝贵内存的图片提供了快速访问的方法。其中最核心的类是LruCache (此类在android-support-v4的包中提供) 。这个类非常适合用来缓存图片，它的主要算法原理是把最近使用的对象用强引用存储在 LinkedHashMap 中，并且把最近最少使用的对象在缓存值达到预设定值之前从内存中移除。

在过去，我们经常会使用一种非常流行的内存缓存技术的实现，即软引用或弱引用 (SoftReference or WeakReference)。但是现在已经不再推荐使用这种方式了，因为从 Android 2.3 (API Level 9)开始，垃圾回收器会更倾向于回收持有软引用或弱引用的对象，这让软引用和弱引用变得不再可靠。另外，Android 3.0 (API Level 11)中，图片的数据会存储在本地的内存当中，因而无法用一种可预见的方式将其释放，这就有潜在的风险造成应用程序的内存溢出并崩溃。

为了能够选择一个合适的缓存大小给LruCache, 有以下多个因素应该放入考虑范围内，例如：

* 你的设备可以为每个应用程序分配多大的内存？

* 设备屏幕上一次最多能显示多少张图片？有多少图片需要进行预加载，因为有可能很快也会显示在屏幕上？

* 你的设备的屏幕大小和分辨率分别是多少？一个超高分辨率的设备（例如 Galaxy Nexus) 比起一个较低分辨率的设备（例如 Nexus S），在持有相同数量图片的时候，需要更大的缓存空间。

* 图片的尺寸和大小，还有每张图片会占据多少内存空间。

* 图片被访问的频率有多高？会不会有一些图片的访问频率比其它图片要高？如果有的话，你也许应该让一些图片常驻在内存当中，或者使用多个LruCache 对象来区分不同组的图片。

* 你能维持好数量和质量之间的平衡吗？有些时候，存储多个低像素的图片，而在后台去开线程加载高像素的图片会更加的有效。

并没有一个指定的缓存大小可以满足所有的应用程序，这是由你决定的。你应该去分析程序内存的使用情况，然后制定出一个合适的解决方案。一个太小的缓存空间，有可能造成图片频繁地被释放和重新加载，这并没有好处。而一个太大的缓存空间，则有可能还是会引起 java.lang.OutOfMemory 的异常。
下面是一个使用 LruCache 来缓存图片的例子：

{% highlight ruby %}
private LruCache<String, Bitmap> mMemoryCache;

@Override
protected void onCreate(Bundle savedInstanceState) {
    // 获取到可用内存的最大值，使用内存超出这个值会引起OutOfMemory异常。
    // LruCache通过构造函数传入缓存值，以KB为单位。
    int maxMemory = (int) (Runtime.getRuntime().maxMemory() / 1024);
    // 使用最大可用内存值的1/8作为缓存的大小。
    int cacheSize = maxMemory / 8;
    mMemoryCache = new LruCache<String, Bitmap>(cacheSize) {
        @Override
        protected int sizeOf(String key, Bitmap bitmap) {
                // 重写此方法来衡量每张图片的大小，默认返回图片数量。
                return bitmap.getByteCount() / 1024;
        }
    };
}

public void addBitmapToMemoryCache(String key, Bitmap bitmap) {
    if (getBitmapFromMemCache(key) == null) {
            mMemoryCache.put(key, bitmap);
    }
}

public Bitmap getBitmapFromMemCache(String key) {
    return mMemoryCache.get(key);
}
{% endhighlight %}

<p>
在这个例子当中，使用了系统分配给应用程序的八分之一内存来作为缓存大小。在中高配置的手机当中，这大概会有4兆(32/8)的缓存空间。一个全屏幕的 GridView 使用4张 800x480分辨率的图片来填充，则大概会占用1.5兆的空间(800*480*4)。因此，这个缓存大小可以存储2.5页的图片。
当向 ImageView 中加载一张图片时,首先会在 LruCache 的缓存中进行检查。如果找到了相应的键值，则会立刻更新ImageView ，否则开启一个后台线程来加载这张图片。
</p>

{% highlight ruby %}
public void loadBitmap(int resId, ImageView imageView) {
    final String imageKey = String.valueOf(resId);
    final Bitmap bitmap = getBitmapFromMemCache(imageKey);
    if (bitmap != null) {
        imageView.setImageBitmap(bitmap);
    } else {
        imageView.setImageResource(R.drawable.image_placeholder);
        BitmapWorkerTask task = new BitmapWorkerTask(imageView);
        task.execute(resId);
    }
}
{% endhighlight %}

BitmapWorkerTask 还要把新加载的图片的键值对放到缓存中。

{% highlight ruby %}
class BitmapWorkerTask extends AsyncTask<Integer, Void, Bitmap> {
    // 在后台加载图片。
    @Override
    protected Bitmap doInBackground(Integer... params) {
        final Bitmap bitmap = decodeSampledBitmapFromResource(
                        getResources(), params[0], 100, 100);
        addBitmapToMemoryCache(String.valueOf(params[0]), bitmap);
        return bitmap;
    }
}
{% endhighlight %}

掌握了以上两种方法，不管是要在程序中加载超大图片，还是要加载大量图片，都不用担心OOM的问题了!