import { Message } from 'element-ui'
import address from 'js/addressService.js'
import {mapMutations,mapActions} from 'vuex'

export default {
  props: ['add'],
  data() {
    return {
      provinceLists: '',
      cityLists: '',
      districtLists: '',
      addr: this.add ? this.add : {
        name: '',
        mobile: '',
        province: '',
        city: '',
        district: '',
        address: '',
        acquiesce: 1
      }
    }
  },
  created(){
    this.getProvince()
    if(this.add){//修改地址
      this.getCity()
      this.getDistrict()
    }
  },
  methods: {
    getProvince() {
      address.province().then(res => {
        this.provinceLists = res.data.provinceList
      })
    },
    getCity() {
      address.city({
        province: this.addr.province
      }).then(res => {
        this.cityLists = res.data.cityList
      })
    },
    getDistrict() {
      address.district({
        city: this.addr.city
      }).then(res => {
        this.districtLists = res.data.districtList
      })
    },
    saveAddress() {
      let data = {address:this.addr}
      this.add == null ? this.addAddress(data) : this.updateAddress(data)
      // let save = this.add ? address.update(this.addr) : address.add(this.addr)
      // save.then(res => {
      //   Message(res.message)
      //   //修改: 数据是引用类型
      //   //新增: 数据要添加到父组件
      //   this.$emit('add-address',this.addr)
      // })
    },
    cancel() {
      // this.$emit('cancel')
      this.changeEdit({edit: false})
    },
    ...mapActions(['addAddress','updateAddress']),
    ...mapMutations(['changeEdit'])
  }
}
