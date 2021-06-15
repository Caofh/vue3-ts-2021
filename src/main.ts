import { AppFactory } from '@/utils/appFactory'
import App from '@/App.vue'
import router from '@/router'

// 共用css样式
import 'normalize.css' // 引用基础兼容性css，normalize.css；文档：https://github.com/necolas/normalize.css

const app = AppFactory(App)

// 注入vue-router，并挂再到app
app.use(router).mount('#app')
