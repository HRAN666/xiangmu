// components/product-item/product-item.js
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
    formatPrice(value) {
      debugger
      if (value === '' || value === null || value === undefined) {
        return ''
      }
      value = `￥${Number.parseFloat(value / 100).toFixed(2)}`
      return value
    }
  }
})
