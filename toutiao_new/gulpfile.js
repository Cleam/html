var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),                  //清空文件夹
    rev = require('gulp-rev'),                      //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),   //- 路径替换
    livereload = require('gulp-livereload');        //livereload
// HTML处理
/*
  注意更新css和js的引用：
  <link rel="stylesheet" href="css/all.min.css">
  <script src="js/main.min.js"></script>
 */
gulp.task('html', function() {
    var htmlSrc = [
            './src/index.html',
            './src/search.html',
            './src/subscribe.html'
        ],
        htmlDst = './dist/';
    gulp.src(htmlSrc)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload());
});
gulp.task('html-index', function() {
    var htmlSrc = [
            './src/index.html'
        ],
        htmlDst = './dist/';
    gulp.src(htmlSrc)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload());
});

// 自动添加css前缀和压缩
gulp.task('css-common', function () {
    var cssSrc = [
            './src/css/base.css',
            './src/css/common.css'
        ],
        cssDst = './dist/css';
    return gulp.src(cssSrc)
        .pipe(autoprefixer())
        .pipe(concat('common.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});
gulp.task('css-page', function () {
    var cssSrc = [
            './src/css/page.css',
            './src/css/page_search.css',
            './src/css/page_subscribe.css'
        ],
        cssDst = './dist/css';
    return gulp.src(cssSrc)
    	.pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});
gulp.task('css-index', function () {
    var cssSrc = [
            './src/css/page.css'
        ],
        cssDst = './dist/css';
    return gulp.src(cssSrc)
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});
gulp.task('css-search', function () {
    var cssSrc = [
            './src/css/page_search.css'
        ],
        cssDst = './dist/css';
    return gulp.src(cssSrc)
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});
gulp.task('css-subscribe', function () {
    var cssSrc = [
            './src/css/page_subscribe.css'
        ],
        cssDst = './dist/css';
    return gulp.src(cssSrc)
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});

// js代码校验、合并和压缩
gulp.task('js-common', function() {
    var jsSrc = [
            './src/js/zepto.min.js',
            './src/js/fastclick.min.js',
            './src/js/web-storage-cache.min.js',
            './src/js/js.cookie.js',
            './src/js/global.js'
        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(concat('common.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});
gulp.task('js-page', function() {
    var jsSrc = [
            './src/js/page.js', 
            './src/js/page_search.js', 
            './src/js/page_subscribe.js'
        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});
gulp.task('js-index', function() {
    var jsSrc = [
            './src/js/page.js'
        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});
gulp.task('js-search', function() {
    var jsSrc = [
            './src/js/page_search.js'
        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});
gulp.task('js-subscribe', function() {
    var jsSrc = [
            './src/js/page_subscribe.js'
        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});

gulp.task('data', function() {
    var jsSrc = [
            './src/data/channels.json'
        ],
        jsDst = './dist/data';
    return gulp.src(jsSrc)
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});

// 压缩图片
gulp.task('img', function() {
    var imgSrc = './src/img/**/*',
        imgDst = './dist/img';
    return gulp.src(imgSrc)
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imgDst))
        .pipe(livereload());
});

gulp.task('rev', function() {
    var revDst = './rev/*.json',
        htmlSrc = './dist/*.html',
        htmlDst = './dist/';
    gulp.src([revDst, htmlSrc])   
        .pipe(revCollector())          //- 执行文件内css名的替换
        .pipe(gulp.dest(htmlDst));     //- 替换后的文件输出的目录
});

gulp.task('webserver', function(){
    connect.server({
        port: 8888
    });
});

// 监听文件
// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){
    livereload.listen();
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/img/**/*', ['img']);
    gulp.watch('./src/js/*.js', ['js']);
});

// 清除文件(清除完后回调cb)
gulp.task('clean', function(cb) {
    gulp.src(['./dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('css', ['css-common', 'css-page']);
gulp.task('js', ['js-common', 'js-page']);
gulp.task('default', ['html', 'css', 'img', 'js', 'data']);
