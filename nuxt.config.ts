// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // css: ['~/assets/css/main.css'],
  modules: [
    // 'floating-vue/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    './modules/sheet/sheetmodule',
    '@nuxt/content'
  ],
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
  build:{
    transpile:[
      // '@pdftron/pdfnet-node'
    ]
  },
  runtimeConfig: {
      // Private config that is only available on the server
      apiSecret: '',
      appUrl:'',
      // Config within public will be also exposed to the client
      public: {
          apiBase: '/api'
      }
  },
})
