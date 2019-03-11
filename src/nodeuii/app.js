import Koa from "koa";
// import router from 'koa-simple-router';
import config from "./config";
// import controllerInit from "./controllers";
import render from "koa-swig";
import co from "co";
import serve from 'koa-static';
import log4js from 'log4js';

import { createContainer,Lifetime} from 'awilix'
// scopePerRequest 每一次请求都创建独立的作用域 要不然就共享了
import { scopePerRequest,loadControllers } from 'awilix-koa'

log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname + '/logs/cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

import errorHandler from './middlewares/errorHandler.js'

const app = new Koa();
// 创建IOC的容器 容器里面放的是各种路由 ，需要什么服务就让他注入进来
const container = createContainer()
// 每一次请求都是new 一次类  server自动注入container
app.use(scopePerRequest(container))

// 装载service
container.loadModules([__dirname+'/service/*.js'],{
    formatName: 'camelCase',
    resolverOptions:{//生命周期
        lifetime: Lifetime.SCOPED
    }
})
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls:["[[","]]"],
    writeBody: false
}));

// 网站容错
errorHandler.error(app,logger)
// controllerInit(app, router);

//自动注册所有的路由
app.use(loadControllers('controllers/*.js', { cwd: __dirname }))

app.use(serve(config.staticDir));
app.listen(config.port, () => {
    console.log(`listening on ${config.port}`);
})