const HappyPack = require('happypack');
const os = require('os')

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

exports.module = {
  rules: [{
    test: /.ts$/,
    // 1) replace your original list of loaders with "happypack/loader":
    // loaders: [ 'babel-loader?presets[]=es2015' ],
    use: 'happypack/loader?id=happypackJS',
    // include: [ /* ... */ ],
    // exclude: [ /* ... */ ]
  }]
};

exports.plugins = [
  new HappyPack({
    id: 'happypackJS',
    threadPool: happyThreadPool,
    verbose: true,//日志
    loaders: [{
      path: 'ts-loader',
      query: {
        happyPackMode: true
      }
    }],
  }),
  new HappyPack({
    id: 'happypackCSS',
    threadPool: happyThreadPool,
    verbose: true,//日志
    use: [
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader'
      ]
  }),
];