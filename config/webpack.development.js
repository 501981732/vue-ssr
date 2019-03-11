const { join } = require('path')

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

// html-webpack-plugin 把模板文件给后端
module.exports = {
    entry: join(__dirname,'..','src/webapp/entry-client.js'),
    plugins: [
        // 生成的客户端构建 manifest
        new VueSSRClientPlugin()
    ],
}