---
layout: post
keywords: blog
description: blog
title: "Android 开发你需要了解的 Gradle 配置"
categories: [Android]
tags: [Gradle]
---
{% include codepiano/setup %}

这两天很忙，在解决项目中遇到的一些疑难杂症，今天抽空看了后台，然后又一堆人留言说「张哥拖更啦，每天刷好几遍只为看张哥文章」，好吧，今天无论如何得忙中偷闲来给你们更新一篇。    

   
之前发过这篇文章「给 Android 初学者的 Gradle 知识普及」，很多人表示终于了解了 Gradle 咋回事了，但是工作的项目中一些 Gradle 配置仍然不知道啥意思，查资料也一头雾水，那么今天我就来给你们说下工作中常用的一些 Gradle 配置。    


## 1. Gradle 相关的文件            

我们在 Android Stduio 上新建一个全新的 Android 项目，姑且取个名字叫 demo ，一般就包含了三个相关的 gradle 配置文件，分别是根目录下的 build.gradle、settings.gradle 和 app 目录下的 build.gradle 文件，前两个文件配置比较简单，上篇文章也已经有所介绍，今天来主要介绍下 app/build.gradle 文件的详细配置。    

   
## 2. app/build.gradle 配置文件            

一般来说，新建的一个项目，在 app 目录会生成一个 build.gradle 文件，app 目录基本是项目的一个主要目录了，所有的功能开发都是在这个目录下，自然该目录下的 build.gradle 也是整个项目最重要的配置文件，这个文件对全新的项目来说会包含三部分    

   
- 最顶部的 apply plugin 声明
- android {} 节点
- dependencies {} 节点

   
#### apply plugin 声明    

最顶部有一行代码是这样的：

    apply plugin: 'com.android.application'    

代表该项目是一个 Android 项目，而且一个 Android 项目只有一句这个声明，别问为什么这样写，这是规范。    

   
如果你的项目有引用一些 module ，你可以理解成通过源码的方式引用一些 android library ，那么你的 module 开头需要声明是一个 android library ，那需要这样写：    

    apply plugin: 'com.android.library'    

是不是很容易理解？    

   
#### dependencies 节点

我们先来看下 dependencies 节点，dependencies 是 denpendency 的复数，意为依赖的意思，所以这里就是用来管理依赖的地方。这里以我的开源项目 9GAG 为例，依赖一般有三种：    

   
![图片描述](/image/dependencies.png)
   

我们知道我们可以在 AS 中直接依赖 jar 文件，靠的就是这行代码 compile fileTree(dir: 'libs', include: ['*.jar']) ，意思是编译 libs 目录下的所有 jar 包，当然你可以更改这个目录。    

   
第二种就比较常见了，现在大家都已经很熟悉了，就是直接依赖远程项目名字 + 版本号，至于该项目是放在哪里的呢？一般是放在 jcenter 和 maven 仓库的，这个可以在项目根目录下的 build.gradle 指定远程仓库地址，甚至可以在本地搭建一个私有仓库，然后指定本地仓库地址。    

   
第三种就是类似原始的引用 android library 的方式，一般是你们公司内部的项目，或者改第三方库的源码，同时本地又没有搭建私有仓库，才会选择这种方式。这种方式目前很不推荐了，大部分情况第二种方式完全足够了，但是大家知道这也是一种依赖方式。    

   
#### android 节点

以上两个节点都相对简单点，这个节点是跟项目配置紧密相关的，简单有简单的配置方法，复杂也有复杂的配置方法，这里我先列举一些项目常用的配置，并且加上了注释方便大家理解：    

   
![图片描述](/image/gradle-android1.png)

   
这部分应该比较简单，没有不理解的吧?就不过多解释了。    

   
![图片描述](/image/gradle-android2.png)
   

buildTypes 意为编译类型，这里声明了 debug 和 release 两种类型，当然你也可以声明其他类型，名字随意取，可以看到 debug 和 release 两种类型签名所用的配置不一样，这个配置具体详细也就是在上部分 signingConfigs 节点指定的，那里面的一些密码信息是在你生成 keystore 文件时设置的。    

   
这里配置完成之后就可以通过上篇文章提到的的命令 gradlew assembleDebug 或者 gradlew assembleRelease 进行打包了，这里估计有同学会问这个命令跟 buildTypes 有没有什么关系呢？聪明，是有关系的，这里用到的其实就是 assemble 命令，而 assemble + buildTypes 会生成一个 task ，所以 gradlew assembleDebug 和 gradlew assembleRelease 都是属于拼接的一个 task ，如果你 buildTypes 定义了一个 abc 的类型，那你就会有一个 gradlew assembleAbc 的 task 可以执行。    

   
但是关于 task 远不止与此，这里先提一下，后面再给大家单独介绍。    
  
 
## 3. 从 Eclipse 迁移到 AS            

上面的一些命令差多介绍完了一些项目的基本配置，大家基本也都明白各个配置的意思了，相信大家大部分也都在用 AS 了，但是不排除仍有部分读者还在用着 Eclipse ，或者正准备从 Eclipse 迁移到 AS 上，从 Eclipse 迁移到 AS 上应该会遇到不少问题，但是我认为一个最大的问题就是 gradle 脚本的生成，Eclipse 支持直接导出 AS 项目，就给我们生成了 gradle 脚本，当然如果你对 gradle 熟悉的话完全可以自己新建 gradle 文件，然后自己把一些 gradle 配置手动写上去。    

   
还有一个最大的问题是目录结构，我们知道 Eclipse 上的目录结构是:    
 
demo    
    |--app    
         |--libs    
         |--src    
         |--res    

而 AS 上的项目结构是：    

demo    
   |--libs    
   |--src    
       |--main    
              |--java    
              |--res    

所以如果不想对目录结构进行更改的话，直接用上面 gradle 脚本进行构建会失败，而这时候你需要添加如下配置：    

   
![图片描述](/image/gradle-android3.png)
   

上面也没啥解释的，就是手动指定编译对应的目录，相信大家看得懂。    

## 4. 总结            

当然 Gradle 的配置不止以上介绍的，还有其他配置，如忽略 Lint 的检查报错，打包的时候忽略一些文件、指定 Java 版本等：    

![图片描述](/image/gradle-android4.png)   

     
这些问题不必太在意，一般你在编译或者打包出错的时候 gradle 会提示你什么错误的，按照提示进行修改就行了。    

   
最后，实际项目中 Gradle 的配置与使用远不止如此，这篇文章先教给大家一些项目中最通用的一些配置，让大家对基本的配置理解了，后续再介绍一些其他有用的配置以及一些进阶的用法！    

<br />

> 本文原创发布于微信公众号 **AndroidDeveloper「googdev」**，转载请务必注明出处！

![图片描述](/image/weixinpublic.jpg)
