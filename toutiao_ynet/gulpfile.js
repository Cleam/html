/* 工具模块 */
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),   // css 压缩
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),    // js 压缩
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),                  //清空文件夹
    rev = require('gulp-rev'),                      //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),   //- 路径替换
    livereload = require('gulp-livereload');        //livereload

/* ========================================
  HTML: 压缩
 ======================================== */
 /**
  * 所有html模板（特殊模板除外）
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
/**
 * 首页html模板
 */
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
/**
 * 详情页html模板
 */
gulp.task('html-details', function() {
    var htmlSrc = [
            './src/details.html'
        ],
        htmlDst = './dist/';
    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload());
});
/**
 * 广告html
 */
gulp.task('html-gg', function() {
    var htmlSrc = [
            './src/gg/gg_baidu.html',
            './src/gg/gg_sogou.html',
            './src/gg/gg_gdt.html'
        ],
        htmlDst = './dist/gg';
    gulp.src(htmlSrc)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload());
});

/* ========================================
  CSS: 自动添加css前缀和压缩
 ======================================== */
/**
 * 公用css样式压缩合并（不需要加MD5版本号，更新不需要改模板）
 */
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

/**
 * 首页css样式（每次更新，需要改模板）
 */
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

/**
 * 搜索页css样式（每次更新，需要改模板）
 */
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

/**
 * 订阅页css样式（每次更新，需要改模板）
 */
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

gulp.task('css-page', ['css-index', 'css-search', 'css-subscribe']);

/**
 * 视频页css样式（由于模板更新麻烦，所以不需要加MD5版本号，更新不需要改模板）
 */
gulp.task('css-video', function () {
    var cssSrc = [
            './src/css/video/*.css',
        ],
        cssDst = './dist/css/video/';
    return gulp.src(cssSrc)
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});

/**
 * 详情页css样式（由于模板更新麻烦，所以不需要加MD5版本号，更新不需要改模板）
 */
gulp.task('css-details', function () {
    var cssSrc = [
            './src/css/page_details.css'
        ],
        cssDst = './dist/css';
    return gulp.src(cssSrc)
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});

/**
 * 详情页图片浏览插件css样式合并、压缩、复制
 */
gulp.task('pswp-css', function () {
    var cssSrc = [
            './src/css/photoswipe/*.css'
        ],
        cssDst = './dist/css/photoswipe';
    return gulp.src(cssSrc)
        .pipe(autoprefixer())
        .pipe(concat('photoswipe.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});
gulp.task('pswp-src', function () {
    var pswpSrc = [
            './src/css/photoswipe/default-skin.png',
            './src/css/photoswipe/preloader.gif',
            './src/css/photoswipe/default-skin.svg'
        ],
        pswpDst = './dist/css/photoswipe';
    return gulp.src(pswpSrc)
        .pipe(gulp.dest(pswpDst))
        .pipe(livereload());
});
gulp.task('css-pswp', ['pswp-css', 'pswp-src']);

/* ========================================
  JS: js代码校验、合并和压缩
 ======================================== */
/**
 * 公用js代码
 */
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
/**
 * 广告js
 */
gulp.task('js-gg', function() {
    var jsSrc = [
            './src/js/gg.js',
            './src/js/gg_details.js'
        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        //.pipe(rev())
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});
/**
 * 首页js
 */
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
/**
 * 搜索页js
 */
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
/**
 * 订阅页js
 */
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
gulp.task('js-page', ['js-gg', 'js-index', 'js-search', 'js-subscribe']);
// video
gulp.task('js-video', function() {
    var jsSrc = [
            './src/js/video/*.js'
        ],
        jsDst = './dist/js/video/';
    return gulp.src(jsSrc)
        .pipe(uglify())
        // .pipe(rev())
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});

gulp.task('js-details', function() {
    var jsSrc = [
            './src/js/page_details.js'
        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});
gulp.task('js-pswp', function() {
    var jsSrc = [
            './src/js/photoswipe/photoswipe.min.js',
            './src/js/photoswipe/photoswipe-ui-default.min.js'
        ],
        jsDst = './dist/js/photoswipe';
    return gulp.src(jsSrc)
        .pipe(concat('photoswipe.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
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

gulp.task('data', function() {
    var jsSrc = [
            './src/data/channels.json'
        ],
        jsDst = './dist/data';
    return gulp.src(jsSrc)
        .pipe(gulp.dest(jsDst))
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
    gulp.watch('./src/css/**/*.css', ['css']);
    gulp.watch('./src/img/**/*', ['img']);
    gulp.watch('./src/js/**/*.js', ['js']);
});

// 清除文件(清除完后回调cb)
gulp.task('clean', function(cb) {
    gulp.src(['./dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('css', ['css-common', 'css-page']);
gulp.task('js', ['js-common', 'js-page']);
gulp.task('default', ['html', 'gg-html', 'css', 'img', 'js', 'data']);
