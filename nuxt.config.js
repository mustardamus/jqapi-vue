module.exports = {
  build: {
    vendor: ['jquery/dist/jquery.slim'],
    extractCSS: true
  },

  modules: [
    ['@nuxtjs/axios', {
      baseURL: 'http://localhost:9999/',
      browserBaseURL: '/',
      credentials: false
    }]
  ],

  css: [
    '~/assets/sass/index.sass'
  ]
}
