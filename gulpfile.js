var gulp     = require('gulp'),
    compass  = require('gulp-compass'),
    imagemin = require('gulp-imagemin'),
    changed  = require('gulp-changed'),
    notify   = require('gulp-notify'),
    handleError;

handleError = function () {
	var args = Array.prototype.slice.call(arguments);

	// Send error to notification center
	notify.onError({
		title: 'Compile error',
		message: '<%= error.message %>'
	}).apply(this, args);

	// Prevent gulp from hanging on this task
	this.emit('end');
};

gulp.task('compass', function () {
	return gulp.src('./src/scss/*.scss')
		.pipe(compass({
			config_file: 'compass.rb',
			css: 'assets/css',
			sass: 'src/scss'
		}))
		.on('error', handleError);
});

gulp.task('images', function () {
	var dest = './assets/img';

	return gulp.src('./src/images/**')
		.pipe(changed(dest))
	        .pipe(imagemin())
		.pipe(gulp.dest(dest));
});

gulp.task('watch', ['images', 'compass'], function () {
	gulp.watch('src/scss/**', ['compass']);
	gulp.watch('src/images/**', ['images']);
});
