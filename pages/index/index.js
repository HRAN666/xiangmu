//index.js
import {
  homepagebanner,
  selecthot
  } from '../../utils/request.js'
//获取应用实例
const app = getApp()

// Component({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   pageLifetimes: {
//     show() {
//       if (typeof this.getTabBar === 'function' &&
//         this.getTabBar()) {
//         this.getTabBar().setData({
//           selected: 0
//         })
//       }
//     }
//   },
//   lifetimes: {
//     created() {
//       if (app.globalData.userInfo) {
//         this.setData({
//           userInfo: app.globalData.userInfo,
//           hasUserInfo: true
//         })
//       } else if (this.data.canIUse) {
//         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//         // 所以此处加入 callback 以防止这种情况
//         app.userInfoReadyCallback = res => {
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       } else {
//         // 在没有 open-type=getUserInfo 版本的兼容处理
//         wx.getUserInfo({
//           success: res => {
//             app.globalData.userInfo = res.userInfo
//             this.setData({
//               userInfo: res.userInfo,
//               hasUserInfo: true
//             })
//           }
//         })
//       }
//     }
//   },
//   methods: {
//     getUserInfo: function (e) {
//       console.log(e)
//       app.globalData.userInfo = e.detail.userInfo
//       this.setData({
//         userInfo: e.detail.userInfo,
//         hasUserInfo: true
//       })
//     }
//   }
// })

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    BannerImgList: [],
    ProductList: []
  },
  onPageScroll() {
    console.log('123')
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this
    homepagebanner().then(res => {
      that.setData({
        BannerImgList: res.dataResultList
      })
    })
    selecthot({ "hotState": 1, "pageNo": 1, "pageSize": 6, "sorting": "listing_date", "tosort": "desc" }).then(res => {
      console.log(res)
      that.setData({
        ProductList: res.pageInfo.list
      })
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
})