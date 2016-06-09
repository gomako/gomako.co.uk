var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');


var loc = ['./node_modules/jquery/dist/jquery.min.js',
'./node_modules/matter-js/demo/js/lib/decomp.js',
'./node_modules/matter-js/demo/js/lib/pathseg.js',
'./node_modules/matter-js/build/matter.js',
'./js/matter.js']

gulp.task('scripts', function(){
	return gulp.src(loc)
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./js/'))
});

gulp.task('default', function(){
	gulp.watch('./js/*.js', function(){
		gulp.run('scripts')
	});
});