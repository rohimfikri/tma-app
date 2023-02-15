// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
      head: {
          script: [
              {
                src: 'https://documentservices.adobe.com/view-sdk/viewer.js',
              }
          ],
      }
  },
  // css: ['~/assets/css/main.css'],
  modules: [
    // 'floating-vue/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    './modules/sheet/sheetmodule',
    '@nuxt/content',
    "nuxt-lodash",
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
  ],
  piniaPersistedstate: {
    // cookieOptions: {
    //   sameSite: 'strict',
    // },
    storage: 'localStorage'
  },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
    alias: [
      ["camelCase", "stringToCamelCase"], // => stringToCamelCase
      ["kebabCase", "stringToKebab"], // => stringToKebab
      ["isDate", "isLodashDate"], // => _isLodashDate
    ],
  },
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
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => ['v-skeleton-loader'].includes(tag),
  //   }
  // },
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
