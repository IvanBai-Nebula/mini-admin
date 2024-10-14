import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

export * from './modules/sidebar'
export * from './modules/tabs'
export * from './modules/theme'
export * from './modules/user'
