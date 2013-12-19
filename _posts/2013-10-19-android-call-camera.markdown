---
layout: post
title: "Android调用系统相机拍照"
tags: [Camera]
categories: [Android]
---

在这次的开发中用到了拍照上传图片的功能，还好Android中调用系统相机很方便，代码如下：

{% highlight ruby %}
cameraBtn.setOnClickListener(new OnClickListener() {
	public void onClick() {
		Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
		startActivityForResult(intent, TAKE_PHOTO_REQUEST_CODE);
    }
});
{% endhighlight %}

获取拍照后图片数据，代码如下：

{% highlight ruby %}
public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		switch (requestCode) {
		case TAKE_PHOTO_REQUEST_CODE:
			if(data!=null){
                Bundle extras = data.getExtras();
                Bitmap bmp = (Bitmap) extras.get("data");
        
                imageView.setImageBitmap(bmp);  //设置照片现实在界面上
            }  
			break;
		}
	}
{% endhighlight %}

此时便遇到了问题，测试发现不同手机调用系统相机拍照时，有些并不会把照片存储起来，导致返回时无法获取照片数据，使用Log打印数据之后发现Bitmap bmp = (Bitmap) extras.get("data"); 处出现异常。Android的兼容性真是一个头大的难题，但是问题依然是要解决，google了有了解决方案。就是拍照时会把数据指定存储在SDcard上，然后读取SDcard上的图片数据显示在ImageView上。下面就看下解决问题的代码：

{% highlight ruby %}
cameraBtn.setOnClickListener(new OnClickListener() {
	public void onClick() {
		if (!isHasSdCard()) {
			Helper.showToast(ctx, R.string.sdcard_no_avaiable);
			return;
		}

		Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
		// 指定存储照片的路径
		Uri imageUri = Uri.fromFile(getTempImage());
		intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
		startActivityForResult(intent, TAKE_PHOTO_REQUEST_CODE);
    }
});
{% endhighlight %}

上面代码会指定调用系统相机拍照时图片的存储路径，其中指定了一个临时文件temp.jpg来存储。

{% highlight ruby %}
public static File getTempImage() {
	if (android.os.Environment.getExternalStorageState().equals(
			android.os.Environment.MEDIA_MOUNTED)) {
		File tempFile = new File(Environment.getExternalStorageDirectory(), "temp.jpg");
		try {
			tempFile.createNewFile();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return tempFile;
	}
	return null;
}
{% endhighlight %}

这时的onActivityResult的方法是下面这样的：

{% highlight ruby %}
public void onActivityResult(int requestCode, int resultCode, Intent data) {
	super.onActivityResult(requestCode, resultCode, data);
	switch (requestCode) {
	case TAKE_PHOTO:
		if (resultCode == RESULT_OK) {
			Bitmap bmp = BitmapFactory.decodeFile(getTempImage().getPath());
			if (null != bmp) {
				postImage.setImageBitmap(bmp);
			}
		}
		break;
	}
}
{% endhighlight %}
兼容性问题终于解决了，不过不幸的是新的问题又出现了。

由于目前Android手机的相机像素普遍已经比较高了，拍出来的照片可能都会达到1-2M，把这么大的一张图片加载进内存里肯定会报出OOM错误。即:

    Bitmap bmp = BitmapFactory.decodeFile(getTempImage().getPath());

这行代码会报出内存不足的错误。所以解决方案是在拍照后返回的bitmap必须要经过压缩，然后加载进内存从而渲染出来才不会报出内存不足的错误。下面就看代码：

{% highlight ruby %}
public static Bitmap getScaleBitmap(Context ctx, String filePath) {
	BitmapFactory.Options opt = new BitmapFactory.Options();
	opt.inJustDecodeBounds = true;
	Bitmap bmp = BitmapFactory.decodeFile(filePath, opt);

	int bmpWidth = opt.outWidth;
	int bmpHeght = opt.outHeight;

	WindowManager windowManager = (WindowManager) ctx.getSystemService(Context.WINDOW_SERVICE);
	Display display = windowManager.getDefaultDisplay();
	int screenWidth = display.getWidth();
	int screenHeight = display.getHeight();

	opt.inSampleSize = 1;
	if (bmpWidth > bmpHeght) {
		if (bmpWidth > screenWidth)
			opt.inSampleSize = bmpWidth / screenWidth;
	} else {
		if (bmpHeght > screenHeight)
			opt.inSampleSize = bmpHeght / screenHeight;
	}
	opt.inJustDecodeBounds = false;

	bmp = BitmapFactory.decodeFile(filePath, opt);
	return bmp;
	}
{% endhighlight %}

上述代码的关键在于inJustDecodeBounds属性。如果设置inJustDecodeBounds为true，仍可以获取到bitmap信息，但完全不用分配内存，因为没有获取像素，所以我们可以利用得到的Bitmap的大小，重新压缩图片，然后在内存中生成一个更小的Bitmap，这样即便是一个4MB的JPG，我们也可以随心所欲地把他压缩到任意大小，从而节省了内存。

下面看下更改后的代码:

{% highlight ruby %}
public void onActivityResult(int requestCode, int resultCode, Intent data) {
	super.onActivityResult(requestCode, resultCode, data);
	switch (requestCode) {
	case TAKE_PHOTO:
		if (resultCode == RESULT_OK) {
			Bitmap bmp = getScaleBitmap(ctx, getTempImage().getPath());
			if (null != bmp) {
				postImage.setImageBitmap(bmp);
			}
		}
		break;
	}
}
{% endhighlight %}