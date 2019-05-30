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
这目录结构似乎无法实现tabbar组件化，这样跟页面有耦合不利于维护。看了一下issuer似乎都是“每个页面都加上tabbar代码”
我觉得一定会有解决办法的，于是Google了一下，发现小程序有提供[自定义TabBar](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)

## 遇到的问题
Tabbar虽然是可以用了，但是点击第二个bar并切换页面后，竟然选中了第一个bar，我就不知道是为啥
后来发现其实是有跳转页面的，跳转之后tabbar组件重写渲染了一遍，所以这就是为又选中第一个bar的原因了
找到问题之后，就要想解决方案了，跳转到页面之后要在渲染页面对应的函数里重写设置tabbar的index

## 解决
在看官方的时候发现了有一个例子，下载之后有了新的发现
```js
Component({
  pageLifetimes: {
    show() {
      debugger
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

# 场景
在开发的时候切换catetoryTab，需要检测数据的变化，看了一下官方文档发现Page并没有提供相关方法
在看Component的时候忽然发现了`observers`(数据监听器)
于是我将那个catetoryTab抽象成组件，这样就能监听数据变化了

## 遇到的问题
在使用`observers`的过程中，发现了一个问题
```js
observers: {
    tabIndex (value, oldValue) {
        //oldValue is undefined   
    }
}
```
我以为是跟vue的watch类似，第一个形参是当前值，第二个形参是旧值
没想到observers只有一个形参,就是当前值

## 解决方案
于是看了一下`properties 定义`有一个`observer`是专门监听本数据的，关键是有第二个形参
```js
properties: {
    type: Number,
    value: 0,
    observer(value, oldValue) {

    }
}
```

# 场景
在之前将catetoryTab组件化之后,Page需要和Component进行通信才可以在切换的时候改变某些数据
```js
# /pages/index/index.wxml
<tabSelection dataList="{{List}}" bind:changeSomething="changechange"></tabSelection>

# /pages/index/index.js
Page({
    data:{
        List: []
    },
    changechange() {
        //doSomething...
    }
})

# /pages/index/index.json
{
  "usingComponents": {
    "tabSelection": "/components/tabSelection/tabSelection"
  }
}

# /components/tatabSelection/tabSelection.wxml
<view>
  <text wx:for="{{dataList}}" wx:key="*this" bindtap="tabChange" data-index="{{index}}">{{item}}</text>
</view>

# /components/tatabSelection/tabSelection.js
Component({
    properties: {
        dataList: {
            type: Array,
            value: []
        }
    },
    methods: {
        tabChange(e) {
            let value = e.currentTarget.dataset.index
            this.triggerEvent("changeSomething", {"index": value})
        }
    }
})
```
## 遇到的问题
1. 在绑定函数的时候带了参数，出现了错误
    ```js
    <text wx:for="{{dataList}}" wx:key="*this" bindtap="tabChange({{index}})" data-index="{{index}}">{{item}}</text>
    ```
    ```shell
    Component "pages/index/index" does not have a method "tabChange(1)" to handle event "tap".
    ```

2. 之前vue写在mounted中的操作在该卸载小程序的那个钩子函数里？

3. 事件的target和currentTarget有什么区别

## 解决方法
  1. bindtap="这里的函数不要带参数直接写函数名"
    如果要传参数使用data-xxx的形式传递

  2. 小程序的钩子函数相对来说简单一点
        ```js
        onLoad: 页面加载
        一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。

        onShow: 页面显示
        每次打开页面都会调用一次。
        
        onReady: 页面初次渲染完成
        一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
        对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。详见生命周期

        onHide: 页面隐藏
        当navigateTo或底部tab切换时调用。

        onUnload: 页面卸载
        当redirectTo或navigateBack的时候调用。
        ```
        所以将原本mounted的操作放在onShow中

  3. 在第一点传参要使用data-xxx的形式传递
     ```js
     function(e){
         // e是一个event对象
     }
     ```
     其中有两个比较关键的属性
     ```json
     {
        "target": {
            "dataset": {}
        },
        "currentTarget": {
            "dataset": {}
        },
     }
     ```
     - e.currentTarget 代表的是，注册了监听点击事件的组件(绑定了父元素点击子元素)
     - e.target 代表的是，触发了点击事件的组件
     - 如果你点击的是添加事件元素的子元素，就用`e.currentTarget`来获取父元素的值，用e.target来获取子元素的值，如果没有子元素，就在本元素，`e.target===e.currentTarget`。

# 场景
渲染数据量大的时候页面会很卡，考虑有些地方操作不合理
查看[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)的优化建议之后，猜测是setData的问题

setData
------
setData 是小程序开发中使用最频繁的接口，也是最容易引发性能问题的接口。在介绍常见的错误用法前，先简单介绍一下 setData 背后的工作原理。

工作原理
------
小程序的视图层目前使用 WebView 作为渲染载体，而逻辑层是由独立的 JavascriptCore 作为运行环境。在架构上，WebView 和 JavascriptCore 都是独立的模块，并不具备数据直接共享的通道。当前，视图层和逻辑层的数据传输，实际上通过两边提供的 `evaluateJavascript` 所实现。即用户传输的数据，需要将其转换为字符串形式传递，同时把转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。

而 `evaluateJavascript` 的执行会受很多方面的影响，数据到达视图层并不是实时的。

常见的 setData 操作错误
1. 频繁的去 setData

在我们分析过的一些案例里，部分小程序会非常频繁（毫秒级）的去setData，其导致了两个后果：

Android 下用户在滑动时会感觉到卡顿，操作反馈延迟严重，因为 JS 线程一直在编译执行渲染，未能及时将用户操作事件传递到逻辑层，逻辑层亦无法及时将操作处理结果及时传递到视图层；
渲染有出现延时，由于 WebView 的 JS 线程一直处于忙碌状态，逻辑层到页面层的通信耗时上升，视图层收到的数据消息时距离发出时间已经过去了几百毫秒，渲染的结果并不实时；
2. 每次 setData 都传递大量新数据

由setData的底层实现可知，我们的数据传输实际是一次 evaluateJavascript 脚本过程，当数据量过大时会增加脚本的编译执行时间，占用 WebView JS 线程，

3. 后台态页面进行 setData

当页面进入后台态（用户不可见），不应该继续去进行setData，后台态页面的渲染用户是无法感受的，另外后台态页面去setData也会抢占前台页面的执行。

## 解决方法
锁定问题之后发现
```js
//示例,非真实代码
fetchData().then(res => {
  let arr = []
  res.map(e => {
    arr.push(e)
    this.setData({
      DataList: arr
    })
  })
})
```
这样频繁地setData肯定会非常卡顿。。。。
于是修改了一下
```js
fetchData().then(res => {
  let arr = []
  res.map(e => {
    arr.push(e)
  })
  this.setData({
    DataList: arr
  })
})
```
**减少setData次数，卡顿就没那么明显了**
但是还有一个问题，接口传来的数据有许多用不到的字段
**应该摒弃这些无用的字段，摒弃之后变量占用的内存小了不少,setData的速度也得到了提升**
由于页面中有tab切换，切换一个tab，显示内容的区域对应的DataList就要重新赋值，导致等待时间变长体验糟糕
另外切换回之前的tab，显示内容的区域还要重新请求并渲染，希望做出"缓存"的效果
因为每次都是直接把DataList给替换掉，我就想着**将tab的排列顺序作为DataList的索引**
例如:**点击第一个tab那么DataList[0]存放的就是要显示的数据，点击第二个tab那么DataList[1]存放的就是要显示的数据**
```js
fetchData().then(res => {
  let arr = []
  res.map(e => {
    arr.push(e)
  })
  let DataList_index = `DataList[${this.data.tabIndex}]`
  this.setData({
    [DataList_index]: arr
  })
})
```
在点击tab触发的函数判断一下，当前索引指向的数组元素是否存在
**不存在再请求接口获取数据，存在直接在DataList中通过当前tab索引值取数据就可以了**
```js
changeTab(value) {
  let index = value.detail.index
  if(this.data.DataList[index] === undefined) {
    this.fetchData()
  }
  this.setData({
    tabIndex: index
  })
}
````
以下就是wxml
```html
<view 
  class="catetory-product"
  wx:for="{{DataList[tabIndex]}}"
  wx:key="{{index}}"
>
</view>
```