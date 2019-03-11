const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace')
const gulpSequence = require('gulp-sequence')
const eslint = require('gulp-eslint');

gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                //关闭外侧的 .babelrc配置
                babelrc: false,
                "plugins": ["transform-es2015-modules-commonjs", 'transform-decorators-legacy'] // babel编译es6 modules   装饰器
            }))
            .pipe(gulp.dest('dist'));
    })
});
gulp.task('buildprod', () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(babel({
            //关闭外侧的.babelrc
            babelrc: false,
            ignore: ['./src/nodeuii/config/*.js'], //忽略配置文件，交给rollup去清洗
            "plugins": ["transform-es2015-modules-commonjs", 'transform-decorators-legacy']
        }))
        .pipe(gulp.dest('dist'));
});

// 流清洗
gulp.task('configclean', function () {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(rollup({
            input: './src/nodeuii/config/index.js',
            // 转成commonjs
            output: {
                format: 'cjs'
            },
            plugins: [
                // 此过程中拿不到环境变量 process.env.NODE_ENV 需要用 rollup-plugin-replace替换
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
});


gulp.task('lint', function () {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(eslint({
            configFile: 'eslintrc.js'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
// task('default', () => {
//     return src(['scripts/*.js'])
// });
let _task = ["builddev"];
if (process.env.NODE_ENV == "production") {
    // _task = ['buildprod','configclean'];
    // 生产环境 先lint代码
    _task = gulpSequence('lint', 'buildprod', 'configclean');
    // _task = gulpSequence('buildprod', 'configclean');
}
if (process.env.NODE_ENV == "lint") {
    _task = ['lint'];
}

gulp.task("default", _task);