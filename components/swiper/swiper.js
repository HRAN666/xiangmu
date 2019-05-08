// components/swiper.js
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

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    circular: true,
    imgUrl: 'http://imagehsmy.vrdete.com/'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
