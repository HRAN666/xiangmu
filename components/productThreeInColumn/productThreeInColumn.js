// components/productThreeInColumn/productThreeInColumn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Product: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: 'http://imagehsmy.vrdete.com/'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindViewTap() {
      wx.navigateTo({
        url: '/pages/logs/logs'
      })
    },
    onLazyLoad(e){
      console.log(e)
    }
  }
})
