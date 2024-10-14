import App from '@/App.vue'
import router from '@/router'
import pinia from '@/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '~/css/icon.css'

const app = createApp(App)
app.use(router)
app.use(pinia)

// 注册element plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
