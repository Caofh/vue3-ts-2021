import { createApp, Component, App } from 'vue'
// 引入状态管理
import store from '@/store'
// 引入element-plus依赖
import elementPlus from '@/utils/elementPlus'
// 引入svg-sprite
import '@/assets/svg/svg.config'
import SvgIcon from '@/assets/svg/svg.vue'
// 通讯实例（兼容老代码）
import { eventHub } from '@/utils/eventHub'
// 引入lodash
import lodash from 'lodash'
// 引入公共函数库
import library from '@/utils/library'
// 项目
import projectInfo from '@/utils/library'
// 创建app
const AppFactory = (options: Component): App => {
  const app = createApp(options)
  app.use(store).use(elementPlus)
  app.component('svg-icon', SvgIcon)

  /* 全局属性 */
  app.config.globalProperties.$Bus = eventHub
  app.config.globalProperties.$lodash = lodash
  app.config.globalProperties.$library = library
  app.config.globalProperties.$projectInfo = projectInfo

  return app
}
export { AppFactory }
