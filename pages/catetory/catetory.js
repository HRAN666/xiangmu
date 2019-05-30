// pages/catetory/catetory.js
import {
  selectCatalogByParents,
  selectCatalog,
  selectProductByCatalogId
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentHeight: 0,
    pageHeight: 0,
    catetoryTabList: [],
    tabIndex: 0,
    productList: [],
    scrollInto: 0,
    hasNoData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fetchTabCatetory()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pageHeight: res.windowHeight,
          contentHeight: res.windowHeight - 50
        })
      }
    })
  },

  /**
   * Tab滚动调用的函数
   */

  onScroll() {},

  fetchTabCatetory() {
    selectCatalogByParents({})
      .then((data) => {
        let Data_arr = []
        data.dataResultList.forEach(value => {
          const {
            catalogId,
            nodeName: catalogName
          } = value
          Data_arr.push({
            catalogId,
            catalogName,
            active: false
          })
        })
        let activeTabObj = `catetoryTabList[${this.data.tabIndex}].active`
        this.setData({
          catetoryTabList: Data_arr,
          [activeTabObj]: true
        })
        this.changeActiveTab({detail: {
          index: this.data.tabIndex
        }})
        console.log(this.data.catetoryTabList)
      })
  },

  fetchCatalog({ catalogId }) {
    console.time("total")
    selectCatalog({"parentsId": catalogId})
      .then(async response => {
        wx.showLoading({
          title: '加载中',
        })
        console.time("request")
        let Product_arr = []
        try {
          await response.dataResultList.reduce(async (promise, value) => {
            await promise
            const { catalogId, nodeName: catalogName } = value
            const { pageInfo: product } = await this.fetchProductList(catalogId)
            // console.log(...product.list)
            Product_arr.push({
              catalogId,
              catalogName,
              children: this.checkIsWhat(product.list)
            })
          })
        } catch{
          wx.hideLoading()
          this.setData({
            hasNoData: true
          })
        }
        console.timeEnd("request")
        console.time("ss")
        let productList_index = `productList[${this.data.tabIndex}]`
        this.setData({
          [productList_index]: Product_arr
        }, () => {
          wx.hideLoading()
          console.timeEnd("ss")
          console.log("=============="+this.roughSizeOfObject(this.data.productList))
          console.timeEnd("total")
        })
      })
  },
  checkIsWhat(value) {
    var obj_list = []
    for(let i of value) {
      let obj = {}
      obj.commodityNumber = i.commodityNumber
      obj.commodityName = i.dataResultObj.commodityName
      obj.photo = i.dataResultObj.homePhoto
      obj.price = ''
      obj_list.push(obj)
    }
    return obj_list
  },
  roughSizeOfObject(object) {

    let objectList = [];
    let stack = [object];
    let bytes = 0;

    while(stack.length) {
      let value = stack.pop();

      if (typeof value === 'boolean') {
        bytes += 4;
      }
      else if (typeof value === 'string') {
        bytes += value.length * 2;
      }
      else if (typeof value === 'number') {
        bytes += 8;
      }
      else if
      (
        typeof value === 'object'
        && objectList.indexOf(value) === -1
      ) {
        objectList.push(value);

        for (var i in value) {
          stack.push(value[i]);
        }
      }
    }
    return bytes;
  },

  fetchProductList(catalogId) {
    return selectProductByCatalogId({
      'tosort': 'asc',
      'sorting': 'present_price',
      'catalogId': catalogId
    })
  },

  changeActiveTab(e) {
    let value = e.detail.index
    this.setData({
      tabIndex: value,
      hasNoData: false
    })
    if (this.data.productList[value] === undefined || this.data.productList[value].length === 0) {
      this.fetchCatalog(this.data.catetoryTabList[value])
    }
    console.log(this.data.tabIndex)
  },

  scrollTo(e) {
    let top = e.detail.top
    this.setData({
      scrollInto: top - this.data.contentHeight / 2 + 45
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})