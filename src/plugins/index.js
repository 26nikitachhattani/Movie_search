// Plugins
import vuetify from './vuetify'
import router from '@/router'
import store from '@/stores'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(store)
}
