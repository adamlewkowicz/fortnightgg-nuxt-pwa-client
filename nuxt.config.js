require('dotenv').config();
const sitemapPlayers = require('./plugins/sitemap-players');
const cdnURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://fortnite-api.space';
const siteDesc = 'Fortnite stats, rankings, interactive and detailed items explorer. Quick updates, live and daily matches tracking.';

module.exports = {
  head: {
    title: 'Fortnite Stats & Rankings & Items explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: siteDesc },
      { name: 'theme-color', content: '#20213A' },
      { name: 'author', content: 'Fortnight.gg' },
      { name: 'ogDescription', content: siteDesc },
      { name: 'google-site-verification', content: 'cPS_vRDKbaV3wHF5Va5xUGl-onRkUYhcf5e1VIYEXFk' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  manifest: {
    name: 'Fortnight.gg',
    short_name: 'Fortnight.gg',
    lang: 'en',
    background_color: '#20213A',
    description: siteDesc
  },

  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fortnite-api.space/.*',
        handler: 'cacheFirst',
        method: 'GET'
      }
    ]
  },

  loadingIndicator: {
    name: 'wandering-cubes',
    color: '#1aa1eb',
    background: '#1b1c2e'
  },

  router: {
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },

  css: [
    '@/assets/css/index.scss'
  ],

  env: {
    baseURL: cdnURL
  },

  loading: '~/components/LoadingBar.vue',

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap'
  ],

  'google-analytics': {
    id: 'UA-113730992-1'
  },

  plugins: [
    '~/plugins/global.js',
    '@/plugins/vue-scrollto'
  ],

  axios: {
    baseURL: cdnURL
  },

  sitemap: {
    routes: sitemapPlayers
  },


  build: {
    vendor: [
      'vue-c3',
      'vue-scrollto'
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
