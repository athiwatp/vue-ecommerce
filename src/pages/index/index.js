import 'normalize.css'
import './index.scss'

import {fetch, rap} from 'js/fetch.js'

let url = {
  list: '/merchandiseHot/list.do',
  slideList: '/slide/listSlides.do'
}
url = rap(url)

import Slide from 'components/slide/slide.vue'
import Top from 'components/top/top.vue'
import Foot from 'components/foot/foot.vue'
import Search from 'components/search/search.vue'

new Vue({
  el: '#body',
  data: {
    excavatorList: '',
    partsList: '',
    slideList: ''
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
      })
    },
    reduceNum(list) {
      if (list.num <= 1) {
        return
      }
      list.num--
    },
    addNum(list) {
      list.num++
    }
  },
  components: {
    Slide,
    Top,
    Foot,
    Search
  }
})
