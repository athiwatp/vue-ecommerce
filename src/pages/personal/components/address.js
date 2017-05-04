import Pagination from 'components/pagination/pagination.vue'
import address from 'js/addressService.js'
import EditAddress from './editAddress.vue'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      lists: '',
      edit: false,
      add: null, //修改新增要传递的地址实例
      pageSize: 10,
      pageNum: 1,
      total: 0
    }
  },
  created() {
    this.getLists()
  },
  methods: {
    getLists() {
      address.list().then(res => {
        this.lists = res.data.list
        this.total = res.data.total
      })
    },
    editAddress(add) {
      this.add = add
      this.edit = true
    },
    deleteAddress(add,index) {
      address.delete({
        consigneeId: add.id
      }).then(res => {
        Message(res.message)
        this.lists.splice(index,1)
      })
    },
    setDefault(add) {
      address.setDefault({
        consigneeId: add.id
      }).then(res => {
        Message(res.message)
        this.lists.forEach(item => {
          item.acquiesce = 2
        })
        add.acquiesce = 1
      })
    },
    cancel() {
      this.edit = false
    },
    addAddress(address){
      this.edit = false
      if(!this.add){
        this.lists.push(address)
      }
      if(address.acquiesce == 1) {
        this.lists.forEach(item => item.acquiesce = 2)
        address.acquiesce = 1
      }
    }
  },
  components: {
    Pagination,
    EditAddress
  }
}

