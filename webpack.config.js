const argv = require('yargs-parser')(process.argv.slice(2))

const mode = argv.mode || 'development'
const isProd = mode === 'production' ? true : false
let _mergeConfig = ''

if (argv.env === 'server') {
    _mergeConfig = require(`./config/webpack.server.js`)
} else {
    _mergeConfig = require(`./config/webpack.${mode}.js`)
}

const merge = require('webpack-merge')
const glob = require('glob')
const { join, resolve } = require('path')
const { VueLoaderPlugin } = require('vue-loader')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config/config.js')

// webpack3
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// webpack4
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const IMAGE_NAME = isProd ? '[name].[hash:7].[ext]' : 'img/[name].[ext]'

const IMAGE_LOADER_QUERY = isProd ? `&name=${IMAGE_NAME}&outputPath=/img&publicPath=${config.prod.imagePublicPath}` : `&name=${IMAGE_NAME}`

let _entry = {} //默认空入口文件
let _plugins = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/webapp/index.html'
    })
]; //默认插件

let baseConfig = {
    output: {
        path: join(__dirname, './dist/assets/'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js'
    },
    // watch: !isProd,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 600,
    //     poll: 1000 // Check for changes every second
    // },
    devServer: {
        after(app){
          // do fancy stuff
        },
        historyApiFallback: true,
        port: 8082,
        // contentBase: join(__dirname, "dist/assets/"),
        // open: true,
        proxy: {
            // 'http://localhost:8081': 'http://localhost:8082'
        },
    },
    plugins: [
        ..._plugins,
        // ...happyPack.plugins,

    ],
    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     use: ['happypack/loader?id=happypackJS']
            // },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: ['happypack/loader?id=happypackCSS']
            //     })
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    `url-loader?limit=10000${IMAGE_LOADER_QUERY}`
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    // loader: 'babel-loader?cacheDirectory',
                    loader: 'babel-loader',
                }
            },
            // {
            //     test: /\.css/,
            //     use: isProd ?
            //         ExtractTextPlugin.extract({
            //             fallback: 'vue-style-loader',
            //             use: [
            //                 'style-loader',
            //                 'css-loader'
            //                 // {
            //                 //     loader: 'css-loader',
            //                 //     options: { minimize: true }
            //                 // },
            //                 // 'stylus-loader'
            //             ],
            //         }) : ['vue-style-loader', 'style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                use: [
                    (!isProd || argv.env === 'server') ?
                    'vue-style-loader' :
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: [
            '.vue',
            '.ts',
            '.js',
            '.css'
        ],
        alias: {
            "@": resolve('src')
        }
    },
    // webpack4
    optimization: {
        // 原commonsChunkPlugin配置
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             // test: resolve(__dirname,'node_modules/'),
        //             chunks: all,
        //             name: 'common',
        //             minChunks: 2
        //         }
        //     }
        // },
        // webpack4 
    //     splitChunks: {
    //         // 抽离异步公共组件
    //         chunks: 'async',
    //         minSize: 30000,
    //         maxSize: 0,
    //         minChunks: 1,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         automaticNameDelimiter: '~',
    //         name: true,
    //         cacheGroups: {
    //             commons: { //页面之间公用代码
    //                 name: 'commons',
    //                 chunks: 'initial',
    //                 minChunks: 2
    //             },
    //             // vendors: { //基础类库
    //             //     test: /[\\/]node_modules[\\/]/,
    //             //     priority: -10
    //             // },
    //             // default: {
    //             //     minChunks: 2,
    //             //     priority: -20,
    //             //     reuseExistingChunk: true
    //             // }
    //         }
    //     },
    //     runtimeChunk: {
    //         name: 'runtime'
    //     },
    }
}

module.exports = merge(baseConfig, _mergeConfig)


// - 模板文件 --> html  --> views
// - js css            --> assets