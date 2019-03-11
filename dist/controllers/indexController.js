'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2; // import IndexModel from './../models/indexModel.js'


var _awilixKoa = require('awilix-koa');

var _path = require('path');

var _vueServerRenderer = require('vue-server-renderer');

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

// controller

//装饰器
let IndexController = (_dec = (0, _awilixKoa.route)('/'), _dec2 = (0, _awilixKoa.route)('/index'), _dec3 = (0, _awilixKoa.route)('/about'), _dec4 = (0, _awilixKoa.route)('/topic'), _dec5 = (0, _awilixKoa.route)('/test'), _dec6 = (0, _awilixKoa.GET)(), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = class IndexController {
    constructor({ indexService }) {
        this.indexService = indexService;
    }
    // 之前这里是给koa2(indexAction)用的
    // indexAction() {
    //  return async (ctx,next) =>{
    //      const insIndexModel = new IndexModel()
    //      const result = await insIndexModel.getData()
    //      ctx.body = await ctx.render('index',{
    //          data: result
    //      })
    //  }
    // }
    createRenderer(serverBundle, template, clientManifest) {
        return (0, _vueServerRenderer.createBundleRenderer)(serverBundle, {
            // for component caching
            cache: new _lruCache2.default({
                max: 1000,
                maxAge: 1000 * 60 * 15
            }),
            basedir: (0, _path.resolve)('./dist'),
            runInNewContext: false, // 推荐
            template, // （可选）页面模板
            clientManifest // （可选）客户端构建 manifest
        });
    }
    // IOC后改为

    // action
    async getIndex(ctx) {
        // const result = await this.indexService.getData()
        // ctx.body = await ctx.render('index/pages/index',{
        //  data: result
        // })
        const context = { url: ctx.url };
        const rootPath = (0, _path.join)(__dirname, '..');
        const template = require('fs').readFileSync((0, _path.resolve)('./src/webapp/index.html'), 'utf-8');
        const serverBundle = require(rootPath + '/assets/vue-ssr-server-bundle');
        const clientManifest = require(rootPath + '/assets/vue-ssr-client-manifest.json');
        // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
        // 现在我们的服务器与应用程序已经解耦！
        const ssrRenderer = this.createRenderer(serverBundle, template, clientManifest);

        if (!ssrRenderer) {
            return ctx.body = 'wait a moment';
        }
        ssrRenderer.renderToString(context, (err, html) => {
            // 处理异常……
            ctx.body = html;
        });
        // const stream = ssrRenderer.renderToStream(context)

        // ctx.status = 200
        // ctx.type = 'html'
        // stream.on('error',err => {console.log(err)}).pipe(ctx.res)
    }

}, (_applyDecoratedDescriptor(_class2.prototype, 'getIndex', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'getIndex'), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class);

// export default IndexController

exports.default = IndexController;