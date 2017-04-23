 import cart from 'js/cartService.js'
 import Pagination from 'components/pagination/pagination.vue'

 export default {
   name: 'cart',
   data() {
     return {
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
         if (item.isSelected) {
           sum += item.sum
         }
       })
       return sum
     }
   },
   created() {
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
         let data = res.data
         data.list.forEach( (item) => {
           item.isSelected = false
         })
         this.listsData = data
         this.lists = data.list
       })
     },
     add(data) {
       let item = data.item
       if(data.number){
         if(item.number >= item.stock){
           item.number = item.stock
           return
         }
       }
       cart.add({
         month: data.month,
         number: data.number,
         type: this.selectIndex,
         unifiedMerchandiseId: item.unifiedMerchandiseId
       }).then(res => {
         if (data.month) {
           item.month++
         }else {
           item.number++
         }
         item.sum = item.number * item.discount * (this.selectIndex === 1 ?　item.month : 1)
       })
     },

     reduce(data) {
       let item = data.item
       if(data.month){
         if(item.month <= 3){
           item.month = 3
           return
         }
       }
       if(data.number){
         if(item.number <= 1){
           item.number = 1
           return
         }
       }
       cart.reduce({
         month: data.month,
         number: data.number,
         type: this.selectIndex,
         unifiedMerchandiseId: item.unifiedMerchandiseId
       }).then(res => {
         if (data.month) {
           item.month--
         }else {
           item.number--
         }
         item.sum = item.number * item.discount * (this.selectIndex === 1 ?　item.month : 1)
       })
     },
     update(data) {
       let item = data.item
       if(data.number){
         if(item.number >= item.stock){
           item.number = item.stock
           item.sum = item.number * item.discount * (this.selectIndex === 1 ?　item.month : 1)
           return
         }
       }
       if(data.month){
         if(item.month <= 3){
           item.month = 3
           item.sum = item.number * item.discount * (this.selectIndex === 1 ?　item.month : 1)
           return
         }
       }else{
         if(item.number <= 1){
           item.number = 1
           item.sum = item.number * item.discount * (this.selectIndex === 1 ?　item.month : 1)
           return
         }
       }
       cart.update({
         month: data.month,
         number: data.number,
         type: this.selectIndex,
         unifiedMerchandiseId: item.unifiedMerchandiseId
       }).then(res => {
         item.sum = item.number * item.discount * (this.selectIndex === 1 ?　item.month : 1)
       })
     },
     remove() {
       let ids = []
       this.lists.forEach((item) => {
         if (item.isSelected) {
           ids.push(item.unifiedMerchandiseId)
         }
       })
       cart.remove({
         longList: ids.toString(),
         type: this.selectIndex
       }).then(res => {
         this.lists = this.lists.filter((item) => {
           return !item.isSelected
         })
       })
     },
     toggle(item) {
       if (item.isSelected) {
         this.allSelected = this.checkAll()
       } else {
         this.allSelected = false
       }
       this.sum = this.calsum()
     },
     checkAll() {
       return this.listsData.list.every((item) => {
         return item.isSelected
       })
     },
     toggleAll() {
       this.lists.forEach((item) => {
         item.isSelected = this.allSelected
       })
       this.sum = this.calsum()
     },
     changeNum(page) {
      this.pageNum = page
      this.getLists()
     },
     goApply() {

     },
   },
   components: {
     Pagination
   }
 }
