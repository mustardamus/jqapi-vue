module.exports = {
  build: {
    vendor: ['jquery/dist/jquery.slim']
  },

  modules: [
    ['@nuxtjs/axios', {
      baseURL: 'http://localhost:9999/',
      browserBaseURL: '/',
      credentials: false
    }]
  ]
}
