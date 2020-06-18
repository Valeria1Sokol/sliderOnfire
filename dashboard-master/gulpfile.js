let gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglify-es').default, // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	// pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	// cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	rigger = require('gulp-rigger'),
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	notify       = require("gulp-notify");

	let path = {
		build: { //Тут мы укажем куда складывать готовые после сборки файлы
			html: 'build/',
			js: 'build/assets/js/',
			css: 'build/assets/css/',
			img: 'build/assets/images/',
			fonts: 'build/assets/fonts/'
		},
		app: { //Пути откуда брать исходники
			html: 'app/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
			js: 'app/assets/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
			style: 'app/assets/scss/main.scss',
			img: 'app/assets/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
			fonts: 'app/assets/fonts/**/*.*'
		},
		watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
			html: 'app/**/*.html',
			js: 'app/assets/js/**/*.js',
			style: 'app/assets/scss/**/*.scss',
			img: 'app/assets/images/**/*.*',
			fonts: 'app/assets/fonts/**/*.*'
		},
		clean: './build'
	};


	gulp.task('images', function() {
		return gulp.src(path.app.img)
		.pipe(imagemin(
			{
				interlaced: true,
				progressive: true,
				optimizationLevel: 5
			}
		))
		.pipe(gulp.dest(path.build.img))
	});

gulp.task('style', function(){ // Создаем таск Sass
	return gulp.src('app/assets/scss/**/*.scss') // Берем источник
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError())) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest(path.build.css)) // Выгружаем в папку app/css
		.pipe(browserSync.reload({stream: true})) 
});

gulp.task('html', function () {
    return gulp.src(path.app.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(browserSync.reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'build' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/assets/js/frontend.js',
		])
		.pipe(concat('frontend.min.js')) // Собираем их в кучу в новом файле
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest(path.build.js)); // Выгружаем в папку app/js
});

gulp.task('bower-libs', function() {
	return gulp.src('app/libs/*')
		.pipe(gulp.dest('build/libs/'));
});

gulp.task('fonts', function() {
	return gulp.src('app/assets/fonts/*')
		.pipe(gulp.dest('build/fonts/'));
});

gulp.task('watch', function() {
		gulp.watch('app/assets/scss/**/*.scss', gulp.parallel('style')); // Наблюдение за sass файлами в папке sass
		gulp.watch('app/**/*.html',  gulp.parallel('html')); // Наблюдение за HTML файлами в корне проекта
		gulp.watch('app/assets/js/**/*.js',  gulp.parallel('scripts')); // Наблюдение за JS файлами в папке js
		gulp.watch('app/assets/images/**/*', gulp.parallel('images')); // GraphicsMagick watching image sources if allowed.
});

gulp.task('default', gulp.parallel('html','style','scripts','images','browser-sync', 'watch'));

gulp.task('build', gulp.parallel('html','style','scripts','images'));
