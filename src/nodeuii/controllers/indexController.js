// import IndexModel from './../models/indexModel.js'
import { route, GET } from 'awilix-koa'
import { join, resolve } from 'path'
import { createBundleRenderer } from 'vue-server-renderer'
import LRU from 'lru-cache'
//装饰器
@route('/')
@route('/index')
@route('/about')
@route('/topic')
@route('/test')
export default
// controller
class IndexController {
    constructor({ indexService }) {
        this.indexService = indexService
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
        return createBundleRenderer(serverBundle, {
            // for component caching
            cache: new LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            }),
            basedir: resolve('./dist'),
            runInNewContext: false, // 推荐
            template, // （可选）页面模板
            clientManifest // （可选）客户端构建 manifest
        })
    }
    // IOC后改为
    @GET()
    // action
    async getIndex(ctx) {
        // const result = await this.indexService.getData()
        // ctx.body = await ctx.render('index/pages/index',{
        //  data: result
        // })
        const context = { url: ctx.url }
        const rootPath = join(__dirname, '..')
        const template = require('fs').readFileSync(resolve('./src/webapp/index.html'), 'utf-8')
        const serverBundle = require(rootPath + '/assets/vue-ssr-server-bundle')
        const clientManifest = require(rootPath + '/assets/vue-ssr-client-manifest.json')
        // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
        // 现在我们的服务器与应用程序已经解耦！
        const ssrRenderer = this.createRenderer(serverBundle, template, clientManifest)

        if (!ssrRenderer) {
            return ctx.body = 'wait a moment'
        }
        ssrRenderer.renderToString(context, (err, html) => {
            // 处理异常……
            ctx.body = html
        })
        // const stream = ssrRenderer.renderToStream(context)

        // ctx.status = 200
        // ctx.type = 'html'
        // stream.on('error',err => {console.log(err)}).pipe(ctx.res)

    }

}

// export default IndexController