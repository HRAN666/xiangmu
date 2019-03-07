// vue.config.js
module.exports = {
    assetsDir:'mp',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://igo.vrdete.com/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                  }
            },
        }
    }
}