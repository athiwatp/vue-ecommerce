
import {pagination,card} from 'element-ui'
Vue.use(pagination)
Vue.use(card)

import {fetch,rap} from 'js/fetch.js'
let url = {
  list: '/product/getLists.do'
}
url = rap(url)

new Vue({
  el:'#app',
  data:{
    curPage: 2,
    items: ''
  },
  created(){
    this.getLists()
  },
  // computed: {
  //   items() {
  //     let arr = []
  //     for (let i = 1; i < 5; i++) {
  //       arr.push(this.curPage*i)
  //     }
  //     return arr
  //   }
  // },
  methods: {
    change(page) {
      this.curPage = page
      this.getLists()
    },
    getLists() {
      fetch(url.list,{
        pageNumber: this.curPage
      }).then( res => {
        this.items = res.data.list
      })
    }
  }
})
