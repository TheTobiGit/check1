import './assets/styles/main.css'
import router from './routes'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

createApp(App)
.use(createPinia())
.use(router)
.mount('#app')
