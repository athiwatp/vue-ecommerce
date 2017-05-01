import { fetch, rap } from 'js/fetch.js'

let url = {
  commit: '/order/commit.do',
  preorder: '/order/preorder.do'
}
url = rap(url)

class order {

  static preorder(data) {
    return fetch(url.preorder, data)
  }

  static commit(data) {
    return fetch(url.commit, data)
  }

  static toOrder(lists,type) {
    let preData = {
      numbers: [],
      months: [],
      ids: []
    }
    lists.forEach( item =>{
      preData.numbers.push(item.number)
      preData.ids.push(item.unifiedMerchandiseId)
      if(type == 3) {
        preData.months.push(item.month)
      }
    })
    Object.keys(preData).forEach( key => {
      preData[key] = preData[key].toString()
    })
    sessionStorage.setItem('preData',JSON.stringify(preData))
    location.href = 'submitOrder.html?type='+type
  }

}

export default order
