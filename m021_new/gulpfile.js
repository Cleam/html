var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    // notify = require('gulp-notify'),
    // cache = require('gulp-cache'),
    clean = require('gulp-clean'),                  //清空文件夹
    rev = require('gulp-rev'),                      //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),   //- 路径替换
    livereload = require('gulp-livereload');        //livereload
    // del = require('del');
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
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload());
});
gulp.task('html-index', function() {
    var htmlSrc = './src/index.html',
        htmlDst = './dist/';
    gulp.src(htmlSrc)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload());
});

// 自动添加css前缀和压缩
gulp.task('css', function () {
    var cssSrc = [
            './src/css/base.css', 
            './src/css/swiper-3.3.0.min.css', 
            './src/css/page.css'
        ],
        cssDst = './dist/css';
    return gulp.src(cssSrc)
    	.pipe(autoprefixer())
    	.pipe(concat('all.css'))
    	// .pipe(gulp.dest(cssDst))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest(cssDst))
        //.pipe(rev.manifest({merge: true}))           //- 生成一个rev-manifest.json
        //.pipe(gulp.dest('./rev'))
        .pipe(livereload());
    	// .pipe(notify({ message: 'Styles task complete' }));
});

// js代码校验、合并和压缩
gulp.task('js-top', function() {
    var jsSrc = [
            './src/js/channel.js', 
            './src/js/qidToAdid.js'
        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        .pipe(concat('main-top.js'))
        // .pipe(gulp.dest(jsDst))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(jsDst))
        //.pipe(rev.manifest({merge: true}))           //- 生成一个rev-manifest.json
        //.pipe(gulp.dest('./rev'))
        .pipe(livereload());
});
gulp.task('js-bottom', function() {
    var jsSrc = [
            './src/js/jquery-2.2.1.min.js', 
            './src/js/jquery.cookie.min.js',
            './src/js/swiper-3.3.0.jquery.min.js',
            './src/js/fastclick.min.js',
            './src/js/web-storage-cache.min.js',
            './src/js/changeUrl.js',
            './src/js/page.js'
        ],
        jsDst = './dist/js';
    return gulp.src(jsSrc)
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        .pipe(concat('main-bottom.js'))
        // .pipe(gulp.dest(jsDst))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(jsDst))
        //.pipe(rev.manifest({merge: true}))           //- 生成一个rev-manifest.json
        //.pipe(gulp.dest('./rev'))
        .pipe(livereload());
        // .pipe(notify({ message: 'Scripts task complete' }));
});

// 压缩图片
gulp.task('img', function() {
    var imgSrc = './src/img/**/*',
        imgDst = './dist/img';
    return gulp.src(imgSrc)
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imgDst))
        .pipe(livereload());
        // .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('rev', function() {
    var revDst = './rev/*.json',
        htmlSrc = './dist/*.html',
        htmlDst = './dist/';
    //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    gulp.src([revDst, htmlSrc])   
        .pipe(revCollector())          //- 执行文件内css名的替换
        .pipe(gulp.dest(htmlDst));     //- 替换后的文件输出的目录
});

// 清除文件(清除完后回调cb)
gulp.task('clean', function(cb) {
    gulp.src(['./dist/*'], {read: false})
        .pipe(clean());
    // del(['dist/css', 'dist/js', 'dist/img'], cb);
});

/* 
gulp.task('default', ['clean'], function() {
    // console.log('cleaned!!!');
    gulp.start('html', 'css', 'img', 'js');
}); 
*/

gulp.task('default', ['html', 'css', 'img', 'js_top', 'js_bottom']);

// 监听文件
// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){
    livereload.listen();
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/img/**/*', ['img']);
    gulp.watch('./src/js/*.js', ['js']);
});