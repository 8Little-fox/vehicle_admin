import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { authSetup } from './setup'
import { useLoginStore } from './store'
import './style/index.css'

function bootstrap() {
  useLoginStore().hydrateSessionFromStorage()
  const router = createRouter({
    history: createWebHistory(),
    routes: routes || [],
  })

  authSetup(router)

  const app = createApp(App)

  app.use(DataLoaderPlugin, { router })
  app.use(router)
  app.mount('#root')
}

bootstrap()
