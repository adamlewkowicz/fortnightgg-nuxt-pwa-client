require('dotenv').config();


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Fornight pwa client made in vue, vuex, nuxt' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' }
    ]
  },
  /*
  ** Customize the progress bar color
  */

  css: [
    '@/assets/css/index.scss'
  ],

  // env: {
  //   NODE_ENV: process.env.NODE_ENV
  // },

  loading: '~/components/LoadingBar.vue',

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  axios: {
    baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:4000' : 'https://fortnite-api.space'
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'vue-c3'
    ],

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
