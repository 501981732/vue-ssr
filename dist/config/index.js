'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
	"viewDir": _path2.default.join(__dirname, '../views'),
	"staticDir": _path2.default.join(__dirname, '../assets')
};

const init = () => {
	if (process.env.NODE_ENV == 'development') {
		const localConfig = {
			port: '8081'
		};
		Object.assign(config, localConfig);
	}
	if (process.env.NODE_ENV == 'production') {
		const localConfig = {
			port: '80'
		};
		Object.assign(config, localConfig);
	}
};

init();

exports.default = config;