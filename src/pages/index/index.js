import 'normalize.css'
import './index.scss'

import {fetch, rap} from 'js/fetch.js'

let url = {
  list: '/merchandiseHot/list.do',
  slideList: '/slide/listSlides.do'
}
url = rap(url)

new Vue({
  el: '.recommendation',
  data: {
    excavatorList: '',
    partsList: ''
  },
  created() {
    this.getList()
    this.getList(3)
  },
  methods: {
    getList(type = undefined) {
      fetch(url.list, {
        businessType : type
      }).then(res => {
        if (type) {
          this.partsList = res.data.merchandiseHotVOList
        } else {
          this.excavatorList = res.data.merchandiseHotVOList
        }
      })
    }
  }
})
