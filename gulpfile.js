const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const nodemon = require('gulp-nodemon');
const wait = require('gulp-wait');
const imagemin = require('gulp-imagemin');


gulp.task('sass', function () {
	return gulp.src('app/assets/stylesheets/main.scss')
	.pipe(wait(200))
	.pipe(sass({outputStyle: 'compressed', sourceComments: 'map'}, {errLogToConsole: true}))
	.pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
	.pipe(gulp.dest('./app/assets/css'))
});

gulp.task('nodemon', function (cb) {
	let called = false;
	return nodemon({script: 'server.js'}).on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	});
});

gulp.task('imagemin', function() {
	return gulp .src('app/assets/img/*')
	.pipe(imagemin()) 
	.pipe(gulp.dest('.app/assets/stylesheets/minified/images'));
});


gulp.task('default', gulp.series('sass', 'imagemin', 'nodemon', function () {
	gulp.watch('app/assets/stylesheets/*.scss', gulp.series('sass'));
	gulp.watch('app/assets/img/*', gulp.series('imagemin'));
	gulp.watch(['app/Js/*.js', 'app/*.html'],);
}));