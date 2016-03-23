var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
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
    var htmlSrc = './src/index.html',
        htmlDst = './dist/';
    gulp.src(htmlSrc)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload());
});

// 自动添加css前缀和压缩
gulp.task('css', function () {
    var cssSrc = ['./src/css/base.css', './src/css/page.css'],
        // cssSrc = './src/css/*.css',
        cssDst = './dist/css';
    return gulp.src(cssSrc)
    	.pipe(autoprefixer())
    	.pipe(concat('all.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        // .pipe(rev())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});

// js代码校验、合并和压缩
gulp.task('js', function() {
    var jsSrc = ['./src/js/zepto.min.js', './src/js/page.js'],
        // jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        // .pipe(rev())
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

// 清除文件(清除完后回调cb)
gulp.task('clean', function(cb) {
    gulp.src(['./dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('default', ['html', 'css', 'img', 'js']);

// 监听文件
// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){
    livereload.listen();
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/img/**/*', ['img']);
    gulp.watch('./src/js/*.js', ['js']);
});