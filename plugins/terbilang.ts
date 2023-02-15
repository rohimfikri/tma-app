import angkaTerbilang from '@develoka/angka-terbilang-js';
export default defineNuxtPlugin((nuxtApp) => {
    // nuxtApp.vueApp.use(domtoimage)
    return {
        provide: {
            terbilang: angkaTerbilang
        }
    }
})