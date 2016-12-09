import gulp from 'gulp'
import changed from 'gulp-changed'
import sass from 'gulp-sass'
import clean from 'gulp-clean-css'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import uglify from 'gulp-uglify'

const sass_src = 'devpublic/sass/*.sass'
const css_dir = 'public/css'

const js_src = 'devpublic/js/*.js'
const js_dir = 'public/js'


gulp.task('sass2css', function() {
  	return 	gulp.src(sass_src)
  				.pipe(changed(css_dir))
  				.pipe(sass())
  				.pipe(postcss([autoprefixer]))
  				.pipe(clean())
  			.pipe(gulp.dest(css_dir))
});

gulp.task('js',function() {
	return 	gulp.src(js_src)
				.pipe(changed(js_dir))
				.pipe(uglify())
			.pipe(gulp.dest(js_dir))
})

gulp.task('default',['sass2css','js'])