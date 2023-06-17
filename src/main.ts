import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import 'uno.css'
import 'vant/lib/index.css'
import './assets/styles/base.scss'
import './assets/styles/main.scss'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
    // 添加全局前置守卫
    ctx.router.beforeEach((to, from, next) => {
      routeInterception(routes, to, from, next)
    })
  },
)
