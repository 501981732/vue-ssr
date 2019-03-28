module.exports = {
    rules: {
        "experimentalDecorators": "off",
        "no-console": 0,
        "no-unused-vars": 0
    },
    // 推荐规则
    extends: 'eslint:recommended',
    env: {
        'browser': true,
        'node': true,
        'es6': true
    },
    "parser": "babel-eslint",
    parserOptions: {
        'ecmaVersion': 6,
        'sourceType': 'module'
    }
}