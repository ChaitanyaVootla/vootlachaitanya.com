import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      title: 'Chaitanya vootla',
    },
  },
  target: 'static',
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error -- no fix
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/tailwindcss',
    "@nuxtjs/google-fonts",
    '@nuxt/image',
  ],
  googleFonts: {
    families: {
      Lato: [100, 300, 400, 700, 900],
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
