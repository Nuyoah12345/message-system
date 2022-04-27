module.exports = {
    lintOnSave: false,
    // 关闭source-map
    productionSourceMap: false,
    // 不打包这些静态资源，采用CDN引入
    chainWebpack: config => {
        config.set('externals', {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ElementUi',
            'echarts': 'echarts'
        })
    }
}