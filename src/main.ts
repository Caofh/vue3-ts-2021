import { AppFactory } from '@/utils/appFactory'
import App from '@/App.vue'
import router from '@/router'

const app = AppFactory(App)

// 注入vue-router，并挂再到app
app.use(router).mount('#app')
