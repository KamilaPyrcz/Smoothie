const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const wait = require('gulp-wait');

gulp.task('sass', function () {
	return gulp.src('app/assets/stylesheets/main.scss')
	.pipe(wait(200))
	.pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}, {errLogToConsole: true}))
	.pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
	.pipe(gulp.dest('./app/assets/css'))
	.pipe(browserSync.stream())
});

gulp.task('serve', gulp.series('sass', function () {
	browserSync.init({
		server: {
			baseDir:'./app'
		}
	});
	gulp.watch('app/assets/stylesheets/**/_*.scss',  gulp.series('sass')).on('change', browserSync.reload)
	gulp.watch('app/assets/stylesheets/*.scss',  gulp.series('sass')).on('change', browserSync.reload)
	gulp.watch('app/*.html').on('change', browserSync.reload)
	gulp.watch('app/*.js').on('change', browserSync.reload)
}));

gulp.task('default', gulp.series('serve'));