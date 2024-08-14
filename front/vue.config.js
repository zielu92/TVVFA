module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://back-api:3088', 
        changeOrigin: true,
        ws: true, 
      },
    },
  },
}
