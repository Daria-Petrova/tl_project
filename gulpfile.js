'use strict';

let preprocessor = 'sass';

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

function browsersync() {
	browserSync.init({
		server: { baseDir: 'src/' }, 
		notify: false, 
		online: true 
	})
}

function scripts() {
	return src([
		'src/js/main.js',
		])
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(dest('src/js/'))
	.pipe(browserSync.stream())
}

function startwatch() {
	watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
	watch('src/assets/images/**/*', images);
  watch('src/scss/**/*', styles);
  watch('src/*.html').on('change', browserSync.reload);
}

function styles() {
	return src('src/**/*.scss')
	.pipe(eval(preprocessor)())
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) 
	.pipe(dest('src/css'))
	.pipe(browserSync.stream())
}

function images() {
	return src('src/assets/images/**/*.jpg')
	.pipe(newer('src/assets/images/**/*'))
	.pipe(imagemin())
	.pipe(dest('src/assets/images'))
}

function fonts() {
	return src('src/assets/fonts/*')
	.pipe(dest('src/assets/fonts/'))
}

function resourses(){
	return src('src/assets/resources/*')
	.pipe(dest('src/assets/resources/'))
}

function cleanimg() {
	return del('src/assets/images/**/*', { force: true })
}
function cleandist() {
	return del('dist/**/*', { force: true })
}

function buildcopy() {
	return src([
		'src/css/**/*.min.css',
		'src/js/**/*.min.js',
		'src/assets/images/**/*.jpg',
		'src/assets/resources/*',
		'src/assets/fonts/*',
		'src/**/*.html',
		], { base: 'src' })
	.pipe(dest('dist')) 
}




exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.cleanimg = cleanimg;
exports.resourses = resourses;
exports.build = series(cleandist, styles, scripts, images, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);
