new Vue({
  el: '#key',
  data: {
    lists: [{
      val: 3,
      id: 3
    }, {
      val: 4,
      id: 4
    }, {
      val: 5,
      id: 5
    }, {
      val: 6,
      id: 6
    }],
    items:[3,4,5,6]
  },
  mounted() {
    console.log(document.querySelector('li'))
    this.lists.unshift(this.lists.pop())
    console.log(document.querySelector('li'))
    this.$nextTick(() => {
      console.log(document.querySelector('li'))
    })
  }
})
