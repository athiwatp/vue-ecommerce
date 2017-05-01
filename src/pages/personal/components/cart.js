 import cart from 'js/cartService.js'
 import Pagination from 'components/pagination/pagination.vue'
 import { Message } from 'element-ui'
 import order from 'js/orderService.js'

 export default {
   name: 'cart',
   data() {
     return {
       // selectIndex: -1,
       listsData: null,
       lists: [],
       allSelected: false,
       total: 0,
       pageNum: 1,
       pageSize: 6
     }
   },
   computed: {
    selectIndex() {
      return this.$route.query.index
    },
    sum() {
      let sum = 0
      this.lists.forEach((item) => {
        if(item.isSelected) {
          sum += item.sum
        }
      })
      return sum
    }
   },
   created() {
    // this.selectIndex = this.$route.query.index

    // window.addEventListener('hashchange', () => {
    //   console.log(this.$route.query.index)
    //   this.selectIndex = this.$route.query.index
    // },false)

     this.getLists()
   },

   methods: {
     goIndex() {
       location.href = 'index.html'
     },
     getLists() {
      cart.list({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: this.selectIndex
      }).then( res => {
        // 对数据增减新的属性，是先处理后赋值还是先赋值后处理
        let data = res.data
        data.list.forEach( (item)=> {
          item.isSelected = false
        })
        this.listsData = data
        this.lists = data.list
        this.total = data.total
      })
     },
     add(data) {
      let item = data.item
      // 数量不能超过库存
      if(item.number >= item.stock) {
        return
      }
      cart.add({
        month: data.month,
        number: data.number,
        type: this.selectIndex,
        unifiedMerchandiseId: item.unifiedMerchandiseId
      }).then( res => {
        if(data.month){
          item.month++
        }else{
          item.number++
        }
        item.sum = item.number * item.discount * (this.selectIndex == 1 ? item.month:1)
      })
     },

     reduce(data) {
      let item = data.item
      if(data.month) {
        if(item.month <= 3){
          return
        }
      }else if(item.number <= 1){
        return
      }
      cart.reduce({
        month: data.month,
        number: data.number,
        type: this.selectIndex,
        unifiedMerchandiseId: item.unifiedMerchandiseId
      }).then( res => {
        if(data.month){
          item.month--
        }else{
          item.number--
        }
        item.sum = item.number * item.discount * (this.selectIndex == 1 ? item.month:1)

      })
     },
     update(data) {
      let item = data.item
      if(item.number > item.stock) {
        item.number = item.stock
        item.sum = item.number * item.discount * (this.selectIndex == 1 ? item.month:1)

        return
      }
      if(data.month) {
        if(item.month < 3){
          item.month = 3
        item.sum = item.number * item.discount * (this.selectIndex == 1 ? item.month:1)

          return
        }
      }else if(item.number < 1){
        item.number = 1
        item.sum = item.number * item.discount * (this.selectIndex == 1 ? item.month:1)

        return
      }
      cart.update({
        month: data.month,
        number: data.number,
        type: this.selectIndex,
        unifiedMerchandiseId: item.unifiedMerchandiseId
      }).then( res => {
        item.sum = item.number * item.discount * (this.selectIndex == 1 ? item.month:1)
      })
     },
     toggle(item) {
      if(item.isSelected){
        this.allSelected = this.checkAll()
      }else{
        this.allSelected = false
      }
     },
     checkAll() {
      return this.lists.every((item) => {
        return item.isSelected
      })
     },
     toggleAll() {
      this.lists.forEach((item) => {
        item.isSelected = this.allSelected
      })
     },

     remove() {
      let ids = []
      this.lists.forEach((item) => {
        if(item.isSelected){
          ids.push(item.unifiedMerchandiseId)
        }
      })
      cart.remove({
        longList: ids.toString(),
        type: this.selectIndex
      }).then( res => {
        this.lists = this.lists.filter((item) =>{
          return !item.isSelected
        })
      })
     },
     changeNum(page) {
        this.pageNum = page
     },
     goApply() {
      let lists = this.lists.filter((item) =>{
          return item.isSelected
        })
      if(!lists.length){
        Message({
          message: '请选择商品',
          type: 'warning'
        })
        return
      }
      order.toOrder(lists,this.selectIndex)
     },
   },
   components: {
     Pagination
   }
 }
