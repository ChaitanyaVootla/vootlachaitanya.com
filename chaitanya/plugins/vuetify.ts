// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const customTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: 'rgb(240, 240, 240)',
    surface: '#333',
    primary: '#dcdcdc',
    secondary: '#03DAC6',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme,
      }
    }
  })
  app.vueApp.use(vuetify)
})
