---
layout: post
title: "Android-Universal-Image-Loader"
tags: [ImageLoader]
categories: [Android, OpenAndroid]
---

之前项目中用到的图片异步加载库是[LazyList](https://github.com/thest1/LazyList)。随着需求的不算增长，需求有点不太能满足，缺少可配置的选项，于是换到了强大的[UniversalImageLoader](https://github.com/nostra13/Android-Universal-Image-Loader)。

## 一、介绍

Android-Universal-Image-Loader是一个开源的图片异步加载库，该项目的目的是提供一个可重复使用的仪器为异步图像加载，缓存和显示。该库非常强大，国内外很多有名的应用程序都有使用，在该类库的默认缓存文件夹中甚至发现了google, instagram, qq, baidu都有在用。

<!-- more -->

## 二、特点

* 多线程的图像加载

* 尽可能多的配置选项（线程池，加载器，解析器，内存/磁盘缓存，显示参数等等）

* 图片可以缓存在内存中，或者设备文件目录下，或者SD卡中

* 可以添加图片加载监听器

* 可以自定义显示每一张图片时都带不同参数

* 支持Widget

* Android 1.5以上支持

## 三、使用方法

#### 1. Android Manifest

{% highlight xml %}
<manifest>
    <uses-permission android:name="android.permission.INTERNET" />
    <!-- Include next permission if you want to allow UIL to cache images on SD card -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    ...
    <application android:name="MyApplication">
    ...
    </application>
</manifest>
{% endhighlight %}

#### 2. Application class

{% highlight ruby %}
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        // Create global configuration and initialize ImageLoader with this configuration
        ImageLoaderConfiguration config = new ImageLoaderConfiguration.Builder(getApplicationContext())
            ...
            .build();
        ImageLoader.getInstance().init(config);
    }
}
{% endhighlight %}

##### Configuration

所有的选项都是可选的，只选择你真正想制定的去配置。

{% highlight ruby %}
File cacheDir = StorageUtils.getCacheDirectory(context);
ImageLoaderConfiguration config = new ImageLoaderConfiguration.Builder(context)
    //如果图片尺寸大于了这个参数，那么就会这按照这个参数对图片大小进行限制并缓存
    .memoryCacheExtraOptions(480, 800) // default=device screen dimensions
    .discCacheExtraOptions(480, 800, CompressFormat.JPEG, 75)
    .taskExecutor(AsyncTask.THREAD_POOL_EXECUTOR)
    .taskExecutorForCachedImages(AsyncTask.THREAD_POOL_EXECUTOR)
    .threadPoolSize(3) // default
    .threadPriority(Thread.NORM_PRIORITY - 1) // default
    .tasksProcessingOrder(QueueProcessingType.FIFO) // default
    .denyCacheImageMultipleSizesInMemory()
    .memoryCache(new LruMemoryCache(2 * 1024 * 1024))
    .memoryCacheSize(2 * 1024 * 1024)
    .discCache(new UnlimitedDiscCache(cacheDir)) // default
    .discCacheSize(50 * 1024 * 1024)
    .discCacheFileCount(100)
    .discCacheFileNameGenerator(new HashCodeFileNameGenerator()) // default
    .imageDownloader(new BaseImageDownloader(context)) // default
    .imageDecoder(new BaseImageDecoder()) // default
    .defaultDisplayImageOptions(DisplayImageOptions.createSimple()) // default
    .enableLogging()
    .build();
{% endhighlight %}

##### Display Options

显示参数可以分别被每一个显示任务调用(ImageLoader.displayImage(…))

{% highlight ruby %}
DisplayImageOptions options = new DisplayImageOptions.Builder()
    .showStubImage(R.drawable.ic_stub)  // 在显示真正的图片前，会加载这个资源
    .showImageForEmptyUri(R.drawable.ic_empty) //空的Url时
    .showImageOnFail(R.drawable.ic_error) 
    .resetViewBeforeLoading() // 
    .delayBeforeLoading(1000)     // 延长1000ms 加载图片  （想不出来用在什么场景下）
    .cacheInMemory()              
    .cacheOnDisc()               
    .preProcessor(...)            
    .postProcessor(...)           
    .extraForDownloader(...)      //可以向加载器携带一些参数 
    .imageScaleType(ImageScaleType.IN_SAMPLE_POWER_OF_2) // default  
    .bitmapConfig(Bitmap.Config.ARGB_8888) // default
    .decodingOptions(...)
    .displayer(new SimpleBitmapDisplayer()) // default
    .handler(new Handler()) // default
    .build();
{% endhighlight %}

##### 可接收的URL

{% highlight ruby %}
String imageUri = "http://site.com/image.png"; // from Web
String imageUri = "file:///mnt/sdcard/image.png"; // from SD card
String imageUri = "content://media/external/audio/albumart/13"; // from content     provider
String imageUri = "assets://image.png"; // from assets
String imageUri = "drawable://" + R.drawable.image; // from drawables (only images, non-9patch)
{% endhighlight %}

##### 完整版

{% highlight ruby %}
// Load image, decode it to Bitmap and display Bitmap in ImageView
imageLoader.displayImage(imageUri, imageView, displayOptions, 
new ImageLoadingListener() {
    @Override
    public void onLoadingStarted(String imageUri, View view) {
        ...
    }
    @Override
    public void onLoadingFailed(String imageUri, View view, FailReason failReason) {
        ...
    }
    @Override
    public void onLoadingComplete(String imageUri, View view, Bitmap loadedImage) {
        ...
    }    
    @Override
    public void onLoadingCancelled(String imageUri, View view) {
        ...
    }
});


ImageSize targetSize = new ImageSize(120, 80); // result Bitmap will be fit to this size
imageLoader.loadImage(imageUri, targetSize, displayOptions, new     SimpleImageLoadingListener() {
    @Override
    public void onLoadingComplete(String imageUri, View view, Bitmap loadedImage) {
        // Do whatever you want with Bitmap
    }
});
{% endhighlight %}