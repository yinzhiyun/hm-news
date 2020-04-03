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
  },
  //项目优化
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      lodash: "_",
      axios: "axios",
      moment: "moment"
    }
  }
};
