import './assets/main.css'
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WebSocketService from './WebSocketService'

const app = createApp(App)

app.config.globalProperties.$websocket = WebSocketService;

app.use(router)

app.mount('#app')
