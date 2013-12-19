---
layout: post
title: "Android调用系统图库"
tags: [Camera]
categories: [Android]
---

上面一篇讲到Android调用系统相机时遇到的兼容性问题，没想到选择系统图库的时候竟然也遇到了系统兼容性问题，郁闷之极无以言表，在这里记录下解决方案吧。

首先是调用系统默认图库代码：

{% highlight ruby %}
Intent intent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
startActivityForResult(intent, SELECT_PHOTOS_REQUEST_CODE);
{% endhighlight %}

下面是关键的拿到图片的处理代码：

{% highlight ruby %}
public void onActivityResult(int requestCode, int resultCode, Intent data) {
	super.onActivityResult(requestCode, resultCode, data);
	switch (requestCode) {
	case SELECT_PHOTOS_REQUEST_CODE:
	    if (resultCode == RESULT_OK) {
			Uri uri = data.getData();
			// 取得返回的Uri,基本上选择照片的时候返回的是以Uri形式，但是在拍照中有得机子呢Uri是空的，所以要特别注意
			if (uri != null) {
				Bitmap image;
				try {
					// 这个方法是根据Uri获取Bitmap图片的静态方法
					image = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);
					postImage.setImageBitmap(image);
					imageLayout.setVisibility(View.VISIBLE);
					mUri = uri;
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				Bundle extras = data.getExtras();
				if (extras != null) {
					// 这里是有些拍照后的图片是直接存放到Bundle中的所以我们可以从这里面获取Bitmap图片
					Bitmap image = extras.getParcelable("data");
					if (image != null) {
						postImage.setImageBitmap(image);
						imageLayout.setVisibility(View.VISIBLE);
						mUri = BitmapUtil.getImageUri(ctx, image);
					}
				}
			}
		}
		break;
	}
}
{% endhighlight %}