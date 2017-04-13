import Router from 'vue-router'
Vue.use(Router)

import paths from '../tabConfig.js'
let routes = []
paths.forEach((item) => {
  let path = item.path
  routes.push({
    path: `/${path}`,
    component: resolve => require([`../components/${path}.vue`], resolve)
  })
})

export default new Router ({
  routes
})
