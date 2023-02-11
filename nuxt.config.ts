// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // css: ['~/assets/css/main.css'],
  modules: [
    // 'floating-vue/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    './modules/sheet/sheetmodule',
    '@nuxt/content',
  ],
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
})
