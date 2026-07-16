import './asserts/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


async function startApplication(): Promise<void> {

    // const { worker } = await import('./mocks/browser')

    // await worker.start({
    //     onUnhandledRequest: 'bypass',
    // })

    const app = createApp(App)

    app.use(createPinia())
    app.use(router)

    app.mount('#app')
}

void startApplication()
.then(() => {
    console.log('Application started successfully.')
})
.catch((error) => {
    console.error('Error starting the application:', error)
})

