"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

var _errorHandler = require("./middlewares/errorHandler.js");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import controllerInit from "./controllers";
_log4js2.default.configure({
    appenders: { cheese: { type: 'file', filename: __dirname + '/logs/cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
// scopePerRequest 每一次请求都创建独立的作用域 要不然就共享了

// import router from 'koa-simple-router';

const logger = _log4js2.default.getLogger('cheese');

const app = new _koa2.default();
// 创建IOC的容器 容器里面放的是各种路由 ，需要什么服务就让他注入进来
const container = (0, _awilix.createContainer)();
// 每一次请求都是new 一次类  server自动注入container
app.use((0, _awilixKoa.scopePerRequest)(container));

// 装载service
container.loadModules([__dirname + '/service/*.js'], {
    formatName: 'camelCase',
    resolverOptions: { //生命周期
        lifetime: _awilix.Lifetime.SCOPED
    }
});
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _config2.default.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ["[[", "]]"],
    writeBody: false
}));

// 网站容错
_errorHandler2.default.error(app, logger);
// controllerInit(app, router);

//自动注册所有的路由
app.use((0, _awilixKoa.loadControllers)('controllers/*.js', { cwd: __dirname }));

app.use((0, _koaStatic2.default)(_config2.default.staticDir));
app.listen(_config2.default.port, () => {
    console.log(`listening on ${_config2.default.port}`);
});