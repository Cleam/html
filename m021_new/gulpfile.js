var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload'),   //livereload
    del = require('del');
// HTML处理
/*
  注意更新css和js的引用：
  <link rel="stylesheet" href="css/all.min.css">
  <script src="js/main.min.js"></script>
 */
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';
    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst));
});

// 自动添加css前缀和压缩
gulp.task('css', function () {
  var cssSrc = './src/css/*.css',
      cssDst = './dist/css';
	return gulp.src(cssSrc)
		.pipe(autoprefixer())
		.pipe(concat('all.css'))
		.pipe(gulp.dest(cssDst))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(livereload(server))
    .pipe(gulp.dest(cssDst))
		.pipe(notify({ message: 'Styles task complete' }));
});

// js代码校验、合并和压缩
gulp.task('js', function() {
  var jsSrc = './src/js/*.js',
      jsDst = './dist/js';
  return gulp.src(jsSrc)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(jsDst))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(livereload(server))
    .pipe(gulp.dest(jsDst))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// 压缩图片
gulp.task('img', function() {
  var imgSrc = './src/img/**/*',
      imgDst = './dist/img';
  return gulp.src(imgSrc)
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(livereload(server))
    .pipe(gulp.dest(imgDst));
    // .pipe(notify({ message: 'Images task complete' }));
});

// 清除文件(清除完后回调cb)
gulp.task('clean', function(cb) {
    gulp.src(['./dist/css', './dist/js', './dist/img'], {read: false})
        .pipe(clean());
    // del(['dist/css', 'dist/js', 'dist/img'], cb);
});

/* 
gulp.task('default', ['clean'], function() {
    // console.log('cleaned!!!');
    gulp.start('html', 'css', 'img', 'js');
}); 
*/

gulp.task('default', ['html', 'css', 'img', 'js']);

// 监听文件
// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }

        // 监听html
        gulp.watch('./src/*.html', function(event){
            gulp.run('html');
        })

        // 监听css
        gulp.watch('./src/css/*.css', function(){
            gulp.run('css');
        });

        // 监听images
        gulp.watch('./src/img/**/*', function(){
            gulp.run('img');
        });

        // 监听js
        gulp.watch('./src/js/*.js', function(){
            gulp.run('js');
        });

    });
});