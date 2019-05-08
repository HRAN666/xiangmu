华胜木业小程序
======

如何启动
------
由于本项目使用到了第三方包，需要npm/yarn下载依赖包
```shell
#npm
npm i

#yarn
yarn
```
下载完依赖包之后，打开web开发者工具，点击开发者工具中的菜单栏：工具 --> 构建 npm 

=======

以下是开发历程

# 场景
写一个商城，需要底部tabbar切换，印象中小程序还是停留在以页面为单位开发
开发的时候都是将tabbar作为一个组件，每新建一个页面的时候就不用再去复制tabbar的代码，如果每新建个页面就复制一份tabbar代码，那样将会变得难以维护。
tabbar的一个地方改动了，所有页面的代码都要跟着改（事实上以前还没组件化的时候就是这样做的），使用组件化开发只需要更改tabbar组件这一处代码，没有耦合便无需担心其他页面

## 疑问
这目录结构似乎无法实现tabbar组件化，这样跟页面有耦合不利于维护。看了一下issues似乎都是“每个页面都加上tabbar代码”
我觉得一定会有解决办法的，于是Google了一下，发现小程序有提供[自定义TabBar](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)

## 遇到的问题
Tabbar虽然是可以用了，但是点击第二个bar并切换页面后，竟然选中了第一个bar，我就不知道是为啥
后来发现其实是有跳转页面的，跳转之后tabbar组件重新渲染了一遍，所以这就是为又选中第一个bar的原因了
找到问题之后，就要想解决方案了，跳转到页面之后要在渲染页面对应的函数里重写设置tabbar的index

## 解决
在看官方的时候发现了有一个例子，下载之后有了新的发现
```js
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})
```
由于没怎么深入写小程序，从未接触过`Component`，看这意思似乎是可以组件化的
查看了一下官方文档，官方说法是[自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)
> 开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似。

大致了解小程序开发流程，分别为以下几点(和现代开发方式相差无几)
  1. 使用`Component`创建自定义组件
  2. 使用`Page`创建页面并使用组件
  3. 页面与组件之间的传值
   
   
# 场景
能够正常使用Tabbar之后还不满足，需要引用UI库
我选择了[vant](https://youzan.github.io/vant-weapp/)，vant是有赞开发的，考虑到有赞是专门开发商城的，会有一些商城特有的组件，便选择了vant

## 使用组件
首先需要安装包
```js
# npm
npm i vant-weapp -S --production

# yarn
yarn add vant-weapp --production
```
然后在json里引用组件
```js
# pages/index/index.json
"usingComponents": {
  "van-button": "/path/to/vant-weapp/button/index"
}
```
按道理来说需要把`/path/to`给替换掉，我就替换成`node_modules`
报了一个错误
```js
Error: Component is not found in path "node_modules/vant-weapp/tabbar/index"
```
后来看了一下微信官方文档的[npm支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)
> 此处并没有强制要求 node_modules 必须在小程序根目录下（即 project.config.js 中的 miniprogramRoot 字段），也可以存在于小程序根目录下的各个子目录中。但是不允许 node_modules 在小程序根目录外。

1. 点击开发者工具中的菜单栏：工具 --> 构建 npm 
![](https://developers.weixin.qq.com/miniprogram/dev/devtools/image/framework/construction.png?t=19050611)

2. 勾选“使用 npm 模块”选项：
![](https://developers.weixin.qq.com/miniprogram/dev/devtools/image/framework/use_npm.png?t=19050611)

3. 构建完成后会有一个新文件夹`miniprogram_npm`，里面就是构建好的第三方包了
4. 在json里引用组件：
   ```js
    # pages/index/index.json
    "usingComponents": {
        "van-button": "/miniprogram_npm/vant-weapp/button/index"
    }
   ```
5. 在wxml使用就行了`<van-button type="primary">按钮</van-button>`

# 场景
封装一个组件，如何在页面中使用组件

## 引用组件
自定义的组件
```js
# component/swiper/swiper.json
{
  "component": true, //代表是一个组件
  "usingComponents": {}
}

# component/swiper/swiper.js
Component({
   /**
   * 组件的属性列表
   */
  properties: {
    imgList: {
      type: Array,
      value: []
    }
  },
})
```

引用
```js
# pages/index/index.json
  "usingComponents": {
    "swipers": "../../component/swiper/swiper"
  }

# pages/index/index.wxml
  <swipers imgList="{{imgList}}"></swipers>
```
tips: `properties`其实就是props


# 场景
在开发的过程中，商品的价格需要格式化处理

## 遇到的问题
小程序没有类似vue中的`filter`，所以只能另辟蹊径了

## 解决方案
经过搜索，发现可以使用[wxs](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)
> WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。
> WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。

首先新建一个`wxs`文件
```js
# /filter/format.wxs
var price_format = function (value) {
  if (value === "" || value === null || value === undefined) {
    return ""
  }
  value = "￥"+parseFloat(value / 100).toFixed(2)
  return value
}

//这是关键
module.exports = {
  price_format: price_format
};
```
需要引用的wxml文件，有关模块的知识看官方文档，[模块](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/01wxs-module.html)
```html
# /pages/index/index.wxml

//导入wxs文件，module是导入的名称，可以理解为命名空间
<wxs  src="../../filter/format.wxs" module="format" />

//调用format模块里的price_format函数
<text>{{format.price_format(Product.bizCommodityForSales.presentPrice)}}</text>
```