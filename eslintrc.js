module.exports = {
    rules: {
        "experimentalDecorators": "off"
    },
    // 推荐规则
    extends: 'eslint:recommended',
    env: {
        'browser': true,
        'node': true,
        'es6': true
    },
    parserOptions: {
        'ecmaVersion': 6,
        'sourceType': 'module'
    }
}