// vue.config.js
module.exports = {
    assetsDir:'mp',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://14.29.248.178:9301/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                  }
            },
        }
    }
}