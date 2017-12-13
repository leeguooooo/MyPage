const gulp = require('gulp');
const sass = require('gulp-sass');
const nunjucks = require('gulp-nunjucks');
const webserver = require('gulp-webserver');
const clean = require('gulp-clean');
const rename = require('gulp-rename');

const base = {
    src: './src',
    dest: './site'
};

const paths = {
    nunjucks: {
        src: [base.src + '/**/*.nj', '!' + base.src + '/**/_*.nj'], // 排除 _ 开头的文件
        dest: base.dest
    },
    sass: {
        src: base.src + '/**/*.scss',
        dest: base.dest
       /* dest: base.dest + '/styles'*/
    },
    scripts: {
        src: base.src + '/**/*.js',
        dest: base.dest
    },
    statics: {
        src: './statics/**',
        dest: base.dest
    }
};

gulp.task('nunjucks', function() {
    return gulp
        .src(paths.nunjucks.src)
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(nunjucks.compile())
        .pipe(gulp.dest(paths.nunjucks.dest));
});

gulp.task('sass', function() {
    return gulp
        .src(paths.sass.src)
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('scripts', function () {
    return gulp
        .src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('statics', function() {
    return gulp
        .src(paths.statics.src)
        .pipe(gulp.dest(paths.statics.dest));
});

gulp.task('clean', function () {
    return gulp.src(base.dest, {read: false})
        .pipe(clean());
});

gulp.task('build', ['statics', 'nunjucks', 'sass', 'scripts']);

gulp.task('serve', ['watch'], function() {
    // Webserver will start at http://127.0.0.1:8000
    gulp.src(base.dest)
        .pipe(webserver({
            host: '127.0.0.1'
        }));
});

gulp.task('watch', ['build'], function() {
    gulp.watch([base.src + '/**', './statics/**'],['build']);
});
