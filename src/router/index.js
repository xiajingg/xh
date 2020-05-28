import Vue from 'vue'
import Router from 'vue-router'
import demo from '@/components/demo'
import ElementUi from 'element-ui'
import '@/theme-et/index.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video
Vue.use(ElementUi)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: demo,
      meta: {
        title: '首页'
      }
    }
  ]
})
