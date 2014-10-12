---
layout: post
keywords: blog
description: blog
title: "Android打开第三方Application的Launch Activity"
categories: [Android]
tags: [Android]
---
{% include codepiano/setup %}

这周给一个第三方的机构写了一段代码，主要功能是让第三方的App打开薄荷的App，实现起来也很简单，废话不多说，直接上代码：

{% highlight ruby %}

public static final String BOOHEE_PACKAGE_NAME = "com.boohee.*";

/**
 * 启动薄荷App
 * @param context
 */
public static void launchBoohee(Context context) {
    // 判断是否安装过App，否则去市场下载
    if (isAppInstalled(context, BOOHEE_PACKAGE_NAME)) {
        context.startActivity(context.getPackageManager().getLaunchIntentForPackage(BOOHEE_PACKAGE_NAME));
    } else {
        goToMarket(context, BOOHEE_PACKAGE_NAME);
    }
}

/**
 * 检测某个应用是否安装
 * 
 * @param context
 * @param pkgName
 * @return
 */
public static boolean isAppInstalled(Context context, String packageName) {
    try {
        context.getPackageManager().getPackageInfo(packageName, 0);
        return true;
    } catch (NameNotFoundException e) {
        return false;
    }
}

/**
 * 去市场下载页面
 */
public static void goToMarket(Context context, String packageName) {
    Uri uri = Uri.parse("market://details?id=" + packageName);
    Intent goToMarket = new Intent(Intent.ACTION_VIEW, uri);
    try {
        context.startActivity(goToMarket);
    } catch (ActivityNotFoundException e) {
    }
}
{% endhighlight %}