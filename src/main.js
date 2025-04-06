import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './style/reset.css'
import router from './router'
import { createPinia } from 'pinia';
import persist from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIcons from "@element-plus/icons-vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const pinia = createPinia()
pinia.use(persist)

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component);
}

app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn });
app.use(ElementPlusIcons)
app.mount('#app')
