module.exports = {
  devServer: {
    open: true
  },
  //rem的配置
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 36
          })
        ]
      }
    }
  }
};
