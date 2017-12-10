const gulp = require('gulp')
const stylus = require('gulp-stylus')

gulp.task('default', () => {
	gulp.watch('./src/style/main.styl', e => {
		gulp.src(e.path)
			.pipe(stylus())
			.pipe(gulp.dest('./src/style/'))
	})
})