// components/tabSelection/tabSelection.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    catetoryTabList: {
      type: Array,
      value: []
    },
    tabIndex: {
      type: Number,
      value: 0,
      observer(value, oldValue) {
        let newActive = `catetoryTabList[${value}].active`
        let oldActive = `catetoryTabList[${oldValue}].active`
        this.setData({
          [newActive]: true,
          [oldActive]: false
        })
        console.log(this.data.catetoryTabList)
      }
    },
    contentHeight: {
      type: Number,
      value: 0
    },
    scrollInto: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowActiveTabOfTop: false,
    isShowActiveTabOfBottom: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onScroll(e) {
      let scrollViewScrollTop = e.detail.scrollTop
      console.log(scrollViewScrollTop)
      this.data.tabIndex * 45 < scrollViewScrollTop || this.data.tabIndex === 0 ? this.setData({ isShowActiveTabOfTop: true }) : this.setData({ isShowActiveTabOfTop: false })
      // const query = this.createSelectorQuery()
      // query.select('#sbdl .tab-catetory.active').boundingClientRect()
      // query.exec(function (res) {
      //   console.log(res)
      // })
      this.createSelectorQuery().select("#sbdl .tab-catetory.active").boundingClientRect((rect) => {
        rect.top+45 > this.data.contentHeight && this.data.tabIndex !== 0
          ? this.setData({ isShowActiveTabOfBottom: true })
          : this.setData({ isShowActiveTabOfBottom: false })
      }).exec()
    },
    changeTab(e) {
      let value = e.currentTarget.dataset.index
      this.triggerEvent("tapTab", {"index": value})
      this.triggerEvent("scrollTo", {"top": e.currentTarget.offsetTop})
      this.createSelectorQuery().select("#sbdl").scrollOffset((rect) => {
        this.onScroll({detail: rect.scrollTop})
      }).exec()
    }
  }
})
