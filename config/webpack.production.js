const { join } = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = {
    entry: join(__dirname,'..','src/webapp/entry-client.js'),
    output: {
        path: join(__dirname, '../dist/assets/'),
        publicPath: '/',
        filename: 'scripts/[name].[hash:5].bundle.js'
    },
    plugins: [
        // new ExtractTextPlugin({
        //   filename: 'common.[chunkhash].css'
        // }),
        new MiniCssExtractPlugin("style.css"),
        new VueSSRClientPlugin()
    ],
}