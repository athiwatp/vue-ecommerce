import 'normalize.css'
import './index.scss'

import {fetch, rap} from 'js/fetch.js'

let url = {
  list: '/merchandiseHot/list.do',
  slideList: '/slide/listSlides.do'
}
url = rap(url)

new Vue({
  el: '.main-content-w',
  data: {
    excavatorList: '',
    partsList: '',
    slideList: '',
    currentIndex: 0,
    timer: ''
  },
  //在created钩子中获取异步数据
  created() {
    this.getList()
    this.getList(3)
    this.getSlideList()
  },
  methods: {
    //定义异步获取方法
    getList(type = undefined) {
      fetch(url.list, {
        businessType : type
      }).then(res => {
        if (type) {
          this.partsList = res.data.merchandiseHotVOList  //配件信息
        } else {
          this.excavatorList = res.data.merchandiseHotVOList  //设备信息
        }
      })
    },
    //异步获取轮播图数据方法
    getSlideList() {
      fetch(url.slideList).then(res => {
        this.slideList = res.data.slideList
        this.$nextTick(() => {
          this.timer = setInterval(() => {
            this.autoPlay()
          },4000)
        })
      })
    },
    go() {
      this.timer = setInterval(() => {
        this.autoPlay()
      },4000)
    },
    stop() {
      clearInterval(this.timer)
      this.timer = null
    },
    reduceNum(list) {
      if (list.num <= 1) {
        return
      }
      list.num--
    },
    addNum(list) {
      list.num++
    },
    change(index) {
      this.currentIndex = index
    },
    autoPlay() {
      this.currentIndex++
      if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0
      }
    }
  }
})
