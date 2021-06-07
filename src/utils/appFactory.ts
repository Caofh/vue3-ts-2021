import { createApp, Component, App } from 'vue'
// 引入状态管理
import store from '@/store'
// 引入lodash
import lodash from 'lodash'
// 引入element-plus依赖
import elementPlus from '@/utils/elementPlus'
// 引入svg-sprite
// import '@/assets/svg/svg.config'
// import SvgIcon from '@/assets/svg/svg.vue'
// 通讯实例（兼容老代码）
import { eventHub } from '@/utils/eventHub'
// 创建app
const AppFactory = (options: Component): App => {
  const app = createApp(options)
  app.use(store).use(elementPlus)
  // app.component('svg-icon', SvgIcon)

  /* 全局属性 */
  app.config.globalProperties.$Bus = eventHub
  app.config.globalProperties.$lodash = lodash

  return app
}
export { AppFactory }
