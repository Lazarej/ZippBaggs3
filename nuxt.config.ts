import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css',
      ],
      head: {
        script: [{ src: 'https://js.stripe.com/v3/' }],
      },

      buildModules: [
       
        '@pinia/nuxt',
        
      ],
})
