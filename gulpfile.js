const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
	return gulp.src('app/assets/stylesheets/main.scss')
	// .pipe(wait(200))
	.pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}, {errLogToConsole: true}))
	.pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
	.pipe(gulp.dest('./app/assets/css'))
	.pipe(browserSync.stream())
});

gulp.task('imagemin', function() {
	return gulp .src('app/assets/img/*')
	.pipe(imagemin()) 
	.pipe(gulp.dest('.app/assets/stylesheets/minified/images'));
});

gulp.task('serve', gulp.series('sass', 'imagemin', function () {
	browserSync.init({
		server: {
			baseDir:'./app'
		}
	});
	gulp.watch("app/scss/*.scss",  gulp.series('sass'));
	gulp.watch('app/assets/img/*', gulp.series('imagemin'));
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/*.js').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));