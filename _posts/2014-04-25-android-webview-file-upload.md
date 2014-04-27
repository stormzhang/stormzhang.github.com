---
layout: post
keywords: blog
description: blog
title: "Android WebView上传文件"
categories: [Android]
tags: [WebView]
---
{% include codepiano/setup %}

在这次食物上传功能的开发中，其中WebView中上传图片需要调用系统的文件系统，默认WebView是不支持文件上传的，需要自己手动配置一些东西，具体代码如下：

{% highlight ruby %}
public class BrowserActivity extends Activity {
    private WebView mWebView;
    private ValueCallback<Uri> mUploadMessage;
    private final static int FILECHOOSER_RESULTCODE = 1;

    public void onCreate(Bundle outState) {
        super.onCreate(outState);
        setContentView(R.layout.activity_browser);
        mWebView = (WebView) findViewById(R.id.webview);
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.setWebChromeClient(new MyWebClient());
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == FILECHOOSER_RESULTCODE) {
            if (null == mUploadMessage)
            return;
        Uri result = intent == null || resultCode != RESULT_OK ? null : intent.getData();
        mUploadMessage.onReceiveValue(result);
        mUploadMessage = null;
        }
    }

    public class MyWebClient extends WebChromeClient {
        // For Android 3.0-
        public void openFileChooser(ValueCallback<Uri> uploadMsg) {
            mUploadMessage = uploadMsg;
            Intent i = new Intent(Intent.ACTION_GET_CONTENT);
            i.addCategory(Intent.CATEGORY_OPENABLE);
            i.setType("image/*");
            startActivityForResult(Intent.createChooser(i, "File Chooser"), FILECHOOSER_RESULTCODE);
        }

        // For Android 3.0+
        public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType) {
            mUploadMessage = uploadMsg;
            Intent i = new Intent(Intent.ACTION_GET_CONTENT);
            i.addCategory(Intent.CATEGORY_OPENABLE);
            i.setType("*/*");
            startActivityForResult(Intent.createChooser(i, "File Browser"), FILECHOOSER_RESULTCODE);
        }

        // For Android 4.1
        public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture) {
            mUploadMessage = uploadMsg;
            Intent i = new Intent(Intent.ACTION_GET_CONTENT);
            i.addCategory(Intent.CATEGORY_OPENABLE);
            i.setType("image/*");
            startActivityForResult(Intent.createChooser(i, "File Chooser"), FILECHOOSER_RESULTCODE);
        }
    }
}
{% endhighlight %}

主要就是自定义了WebChromeClient，然而测试时发现在4.4以上的Android版本依然不可以，搜了下openFileChooser方法在4.4以后不是public的，所以以后不建议这种直接在WebView上传文件的做法。

stackoverflow参考链接：[HTML file input in android webview (android 4.4, kitkat)](http://stackoverflow.com/questions/19882331/html-file-input-in-android-webview-android-4-4-kitkat)