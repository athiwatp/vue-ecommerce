/**
 * Created by Administrator on 2017/5/13.
 */
import * as types from './mutation-types.js'
import addressApi from 'js/addressService.js'

const actions = {
  getLists({commit}) {
    addressApi.list().then(res => {
      commit(types.RECEIVE_ADDRESSES,{
        lists: res.data.list,
        total: res.data.total
      })
    })
  },
  deleteAddress({commit},{id,index}) {
    addressApi.delete({
      consigneeId: id
    }).then(res => {
      commit(types.DELETE_ADDRESS,{index})
    })
  },
  setDefault({commit},{address}){
    addressApi.setDefault({
      consigneeId: address.id
    }).then(res => {
      commit(types.SET_DEFAULT,{address})
    })
  },
  addAddress({commit},{address}){
    addressApi.add(address).then(res => {
      commit(types.ADD_ADDRESS,{address})
    })
  },
  updateAddress({commit},{address}){
    addressApi.update(address).then(res => {
      commit(types.UPDATE_ADDRESSS,{address})
    })
  }
}

export default actions
