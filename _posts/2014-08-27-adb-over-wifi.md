---
layout: post
keywords: blog
description: blog
title: "Android通过Wifi来调试你的应用"
categories: [Android]
tags: [Adb, Wifi]
---
{% include codepiano/setup %}

在Android中调试我们经常要用一根USB数据线连接到手机和电脑，一方面麻烦不说，手机一直连着电脑充电时间长了对手机也是一种伤害，另一方面如果哪一天忘记带USB数据线就很悲催了。今天就来教大家一种通过wifi来连接手机调试的方法，瞬间高大上有木有？而且不需要root，以后你就可以隔空给你公司的测试妹子安装/卸载apk了。

## 连接方法

方法很简单，具体步骤如下：

* 1.先确保你手机和电脑运行在同一wifi局域网内

* 2.由于是通过adb来进行连接的，所以确保你配置了环境变量

* 3.第一次的时候需要用手机USB连接到你的电脑，之后运行下面国外大牛写的shell脚本连接成功就可以把你的USB数据线拔掉了，然后你的电脑就可以通过wifi调试你的应用了。

{% highlight ruby %}
# adbwifi.sh是脚本的文件名
sh adbwifi.sh
{% endhighlight %}

* 4.以上脚本在mac或者Linux肯定是ok的，windows上需要安装一些如[msysgit](http://msysgit.github.io/)或者[Cygwin](http://www.cygwin.com/)才可运行以上Linux shell

最后提醒：实际测试一系列手机都ok，唯独测试了手上的两部小米手机连接不上，悲剧。。

## 脚本内容

我在GitHub Gist上也创建了该文件，点这里[adbwifi.sh](https://gist.github.com/stormzhang/6fa157ceb7980a25fbf0)

下面是shell内容:

{% highlight ruby %}
#!/bin/bash
   
#Modify this with your IP range
MY_IP_RANGE="192\.168\.1"

#You usually wouldn't have to modify this
PORT_BASE=5555

#List the devices on the screen for your viewing pleasure
adb devices
echo

#Find USB devices only (no emulators, genymotion or connected devices
declare -a deviceArray=(`adb devices -l | grep -v emulator | grep -v vbox | grep -v "${MY_IP_RANGE}" | grep " device " | awk '{print $1}'`)  

echo "found ${#deviceArray[@]} device(s)"
echo

for index in ${!deviceArray[*]}
do
echo "finding IP address for device ${deviceArray[index]}"
IP_ADDRESS=$(adb -s ${deviceArray[index]} shell ifconfig wlan0 | awk '{print $3}')

echo "IP address found : $IP_ADDRESS "

echo "Connecting..."
adb -s ${deviceArray[index]} tcpip $(($PORT_BASE + $index))
adb -s ${deviceArray[index]} connect "$IP_ADDRESS:$(($PORT_BASE + $index))"

echo
echo
done

adb devices -l
#exit
{% endhighlight %}

