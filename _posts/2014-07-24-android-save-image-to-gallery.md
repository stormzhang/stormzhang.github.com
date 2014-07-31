---
layout: post
keywords: blog
description: blog
title: "Android保存图片到系统图库"
categories: [Android]
tags: [Gallery]
---
{% include codepiano/setup %}

最近有些用户反映保存图片之后在系统图库找不到保存的图片，遂决定彻底查看并解决下。

Adnroid中保存图片的方法可能有如下两种：

* 第一种是自己写方法，如下代码：

{% highlight ruby %}
public static File saveImage(Bitmap bmp) {
    File appDir = new File(Environment.getExternalStorageDirectory(), "Boohee");
    if (!appDir.exists()) {
        appDir.mkdir();
    }
    String fileName = System.currentTimeMillis() + ".jpg";
    File file = new File(appDir, fileName);
    try {
        FileOutputStream fos = new FileOutputStream(file);
        bmp.compress(CompressFormat.JPEG, 100, fos);
        fos.flush();
        fos.close();
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
{% endhighlight %}

以上代码便是将Bitmap保存图片到指定的路径/sdcard/Boohee/下，文件名以当前系统时间命名,但是这种方法保存的图片没有加入到系统图库中

* 第二种是调用系统提供的插入图库的方法：

{% highlight ruby %}
MediaStore.Images.Media.insertImage(getContentResolver(), bitmap, "title", "description");
{% endhighlight %}

调用以上系统自带的方法会把bitmap对象保存到系统图库中，但是这种方法无法指定保存的路径和名称，上述方法的title、description参数只是插入数据库中的字段，真实的图片名称系统会自动分配。

看似上述第二种方法就是我们要用到的方法，但是可惜的调用上述第二种插入图库的方法图片并没有立刻显示在图库中，而我们需要立刻更新系统图库以便让用户可以立刻查看到这张图片。

* 更新系统图库的方法

{% highlight ruby %}
sendBroadcast(new Intent(Intent.ACTION_MEDIA_MOUNTED, Uri.parse("file://"+ Environment.getExternalStorageDirectory())));
{% endhighlight %}

上面那条广播是扫描整个sd卡的广播，如果你sd卡里面东西很多会扫描很久，在扫描当中我们是不能访问sd卡，所以这样子用户体现很不好，所以下面我们还有如下的方法：

{% highlight ruby %}    
sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(new File("/sdcard/Boohee/image.jpg"))););
{% endhighlight %}

或者还有如下方法：

{% highlight ruby %}
final MediaScannerConnection msc = new MediaScannerConnection(mContext, new MediaScannerConnectionClient() {     
    public void onMediaScannerConnected() {     
        msc.scanFile("/sdcard/Boohee/image.jpg", "image/jpeg");     
    }     
    public void onScanCompleted(String path, Uri uri) {     
        Log.v(TAG, "scan completed");     
        msc.disconnect();     
    }     
});
{% endhighlight %}

上面代码的图片路径不管是通过自己写方法还是系统插入图库的方法都可以很容易的获取到。

* 终极完美解决方案

那么到这里可能有人又会问了，如果我想把图片保存到指定的文件夹，同时又需要图片出现在图库里呢？答案是可以的，sdk还提供了这样一个方法:

{% highlight ruby %}
MediaStore.Images.Media.insertImage(getContentResolver(), "image path", "title", "description");
{% endhighlight %}

上述方法的第二个参数是image path，这样的话就有思路了，首先自己写方法把图片指定到指定的文件夹，然后调用上述方法把刚保存的图片路径传入进去，最后通知图库更新。

所以写了一个方法，完整的代码如下：

{% highlight ruby %}
public static void saveImageToGallery(Context context, Bitmap bmp) {
    // 首先保存图片
    File appDir = new File(Environment.getExternalStorageDirectory(), "Boohee");
    if (!appDir.exists()) {
        appDir.mkdir();
    }
    String fileName = System.currentTimeMillis() + ".jpg";
    File file = new File(appDir, fileName);
    try {
        FileOutputStream fos = new FileOutputStream(file);
        bmp.compress(CompressFormat.JPEG, 100, fos);
        fos.flush();
        fos.close();
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
	}
    
    // 其次把文件插入到系统图库
    try {
        MediaStore.Images.Media.insertImage(context.getContentResolver(),
				file.getAbsolutePath(), fileName, null);
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }
    // 最后通知图库更新
    context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse("file://" + path)));
}
{% endhighlight %}

