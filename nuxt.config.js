import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: { lang: 'en' },
    title: 'Todo App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'The goal of this project is to see how you work by creating a simple to-do application.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/vue-confetti.js', mode: 'client' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    ['nuxt-vuex-localstorage', { localStorage: ['localStorage'] }],
  ],

  axios: {
    baseURL: process.env.API_URL,
    headers: {
      common: {
        Authorization: process.env.AUTH_KEY,
        /* Had to send data using this header or FormData since I was getting a CORS error when trying to send JSON data */
        'Content-Type': 'multipart/form-data',
      },
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false, // set default to light
      themes: {
        light: {
          primary: colors.indigo.darken1, // #3949AB
          secondary: colors.deepPurple.accent1, // #B388FF
          accent: colors.green.lighten2, // #81C784
        },
        dark: {
          primary: colors.teal.darken2, // #00796B
          secondary: colors.green.lighten2, // #81C784
          accent: colors.deepPurple.accent1, // #B388FF
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
