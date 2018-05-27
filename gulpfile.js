'use strict';



const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const using = require('gulp-using');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const rigger = require('gulp-rigger');
const uglify = require('gulp-uglify');
const empty = require('gulp-empty-pipe');
const browserSync = require("browser-sync");



var config = {
    minimize: false,
};



var path = {
    src: 'frontend/src',
    build: 'frontend/web',
    emailSrc: 'frontend/src/email',
    emailBuild: 'frontend/email',
    api: 'node_modules/lawsaw-api/api-src'
};



var themes = [
    'index'
];



var themeSrc = {
    'build': [],
    'watching': [],
    'watch': []
};


var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        js: path.build + '/js/',
        jsLibs: path.build + '/js/',
        style: path.build + '/css/',
        pug: path.build + '/',
        images: path.build + '/images/',
        fonts: path.build + '/css/fonts/',
        svg: path.build + '/images/',
        htaccess: path.build + '/',
        emailPug: path.emailBuild + '/',
        emailImages: path.build + '/images/email/',
    },
    src: { //Пути откуда брать исходники
        js: path.src + '/js/',
        jsLibs: [
            path.api + '/js/external-libs/**/*.js',
            path.src + '/js/external-libs/**/*.js'
        ],
        style: path.src + '/scss/',
        pug: path.src + '/pug/',
        images: [
            path.api + '/images/**/*.*',
            path.src + '/images/**/*.*'
        ],
        fonts: [
            path.api + '/fonts/**/*.*',
            path.src + '/fonts/**/*.*'
        ],
        svg: path.src + '/svg/',
        htaccess: path.src + '/.htaccess',
        emailPug: path.emailSrc + '/pug/',
        emailImages: path.emailSrc + '/images/**/*.*',
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        js: [
            path.api + '/js/**/*.js',
            path.src + '/js/**/*.js'
        ],
        jsLibs: [
            path.api + '/js/external-libs/**/*.js',
            path.src + '/js/external-libs/**/*.js'
        ],
        style: [
            path.api + '/scss/**/*.scss',
            path.src + '/scss/**/*.scss'
        ],
        pug: [
            path.api + '/pug/**/*.pug',
            path.src + '/pug/**/*.pug'
        ],
        images: [
            path.api + '/images/**/*.*',
            path.src + '/images/**/*.*'
        ],
        fonts: [
            path.api + '/fonts/**/*.*',
            path.src + '/fonts/**/*.*'
        ],
        svg: [
            path.api + '/svg/**/*.*',
            path.src + '/svg/**/*.*'
        ],
        htaccess: path.src + '/.htaccess',
        emailPug: path.emailSrc + '/pug/',
        emailImages: path.emailSrc + '/images/**/*.*',
    },
    basedir: path.build
};



gulp.task('clean', function(cb) {
    return del(path.basedir, cb);
});



themes.forEach(function(element, index, array) {



    gulp.task(element + '-style:build', function () {
        return gulp.src(path.src.style + element + '.scss')
            .pipe(!config.minimize ? sourcemaps.init({largeFile: true}) : empty())
            //.pipe(using({ prefix: 'Changed: ' }))
            .pipe(sass(
                {
                    outputStyle: config.minimize ? 'compressed' : 'nested',
                    sourceComments: false
                }).on(
                'error', sass.logError
            ))
            .pipe(postcss([
                autoprefixer({
                    browsers: [
                        '> 5%',
                        'last 100 versions',
                        //'ie 6-8'
                    ],
                    add: true,
                    supports: true,
                    flexbox: true,
                    grid: true,
                    cascade: true
                }),
                // cssnano({
                //     discardComments: {
                //         removeAll: true
                //     }
                // })
            ]))
            //.pipe(rename('style.min.css'))
            .pipe(rename(
                {
                    suffix: ".min",
                    extname: ".css"
                }
            ))
            .pipe(!config.minimize ? sourcemaps.write('/') : empty())
            .pipe(gulp.dest(path.build.style))
            .pipe(browserSync.reload({stream:true}));
    });
    gulp.task(element + '-style:watching', function() {
            //gulp.watch(path.watch.style,
            gulp.watch(path.watch.style,
                gulp.series(element + '-style:build')
            );
        }
    );
    gulp.task(element + '-style:watch',
        gulp.series(element + '-style:build', element + '-style:watching')
    );



    gulp.task(element + '-js:build', function () {
        return gulp.src(path.src.js + element + '.js')
            .pipe(using({prefix: 'Changed: '}))
            .pipe(!config.minimize ? sourcemaps.init({largeFile: true}) : empty())
            .pipe(rigger())
            .pipe(config.minimize ? uglify() : empty())
            //.pipe(rename('script.min.js'))
            .pipe(rename(
                {
                    suffix: ".min",
                    extname: ".js"
                }
            ))
            .pipe(!config.minimize ? sourcemaps.write('/') : empty())
            .pipe(gulp.dest(path.build.js))
            .pipe(browserSync.reload({stream: true}));
    });
    gulp.task(element + '-js:watching', function () {
            gulp.watch(path.watch.js,
                gulp.series(element + '-js:build')
            );
        }
    );
    gulp.task(element + '-js:watch',
        gulp.series(element + '-js:build', element + '-js:watching')
    );



    gulp.task(element + '-pug:build', function () {
        return gulp.src(path.src.pug + element + '.pug')
            .pipe(using({prefix: 'Changed: '}))
            .pipe(pug({
                pretty: true,
                compileDebug: false
            }))
            .pipe(gulp.dest(path.build.pug))
            .pipe(browserSync.reload({stream: true}));
    });
    gulp.task(element + '-pug:watching', function () {
            gulp.watch(path.watch.pug,
                gulp.series(element + '-pug:build')
            );
        }
    );
    gulp.task(element + '-pug:watch',
        gulp.series(element + '-pug:build', element + '-pug:watching')
    );



    gulp.task(element + ':build',
        gulp.parallel(
            element + '-style:build',
            element + '-js:build',
            element + '-pug:build'
        )
    );



    gulp.task(element + ':watching',
        gulp.parallel(
            element + '-style:watching',
            element + '-js:watching',
            element +'-pug:watching'
        )
    );



    gulp.task(element + ':watch',
        gulp.series(
            element + ':build',
            element + ':watching'
        )
    );



    themeSrc.build.push(element + ':build');
    themeSrc.watching.push(element + ':watching');
    themeSrc.watch.push(element + ':watch');



});



gulp.task('jsLibs:build', function() {
    return gulp.src(path.src.jsLibs)
        .pipe(gulp.dest(path.build.jsLibs))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('jsLibs:watching', function() {
        gulp.watch(path.watch.jsLibs,
            gulp.series('jsLibs:build')
        );
    }
);
gulp.task('jsLibs:watch',
    gulp.series('jsLibs:build', 'jsLibs:watching')
);



gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('fonts:watching', function() {
        gulp.watch(path.watch.fonts,
            gulp.series('fonts:build')
        );
    }
);
gulp.task('fonts:watch',
    gulp.series('fonts:build', 'fonts:watching')
);



gulp.task('images:build', function() {
    return gulp.src(path.src.images)
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true,
                optimizationLevel: 3, //1-3
                colors: 256, //2-256
                buffer: true
            }),
            imagemin.jpegtran({
                progressive: true,
                //arithmetic: true,
                buffer: true
            }),
            imagemin.optipng({
                optimizationLevel: 5, //1-7
                bitDepthReduction: true,
                colorTypeReduction: true,
                paletteReduction: true,
                buffer: true
            }),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ],{
            verbose: true
        }))
        .pipe(gulp.dest(path.build.images))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('images:watching', function() {
        gulp.watch(path.watch.images,
            gulp.series('images:build')
        );
    }
);
gulp.task('images:watch',
    gulp.series('images:build', 'images:watching')
);



gulp.task('svg:build', function () {
    return gulp.src(path.src.svg + '/**/*.svg')
        .pipe(rename({prefix: 'svg-'}))
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest(path.build.svg))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('svg:watching', function(){
    gulp.watch(path.watch.svg,
        gulp.series('svg:build')
    );
});
gulp.task('svg:watch', function(){
    gulp.series('svg:build', 'svg:watching')
});




gulp.task('build',
    gulp.parallel(
        themeSrc.build,
        //'images:build',
        'fonts:build',
        'jsLibs:build',
        'svg:build'
    )
);
gulp.task('watching',
    gulp.parallel(
        themeSrc.watching,
        //'images:watching',
        'fonts:watching',
        'jsLibs:watching',
        'svg:watching'
    )
);
gulp.task('watch',
    gulp.parallel(
        themeSrc.watch,
        //'images:watch',
        'fonts:watch',
        'jsLibs:watch',
        'svg:watch'
    )
);



gulp.task('webserver', function(cb) {
    browserSync({
        server: {
            baseDir: path.basedir
        },
        port: 4000,
        notify: false,
        open: true
    }, cb);
});



gulp.task('default', gulp.series('build', 'webserver', 'watch'));




/* BEGIN EMAIL */
gulp.task('email-pug:build', function () {
    return gulp.src(path.src.emailPug + '*.pug')
        .pipe(pug({
            pretty: true,
            compileDebug: false
        }))
        .pipe(gulp.dest(path.build.emailPug));
});
gulp.task('email-pug:watching', function () {
        gulp.watch(path.watch.emailPug + '**/*.pug',
            gulp.series('email-pug:build')
        );
    }
);
gulp.task('email-pug:watch',
    gulp.series('email-pug:build', 'email-pug:watching')
);
gulp.task('email-images:build', function() {
    return gulp.src(path.src.emailImages)
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true,
                optimizationLevel: 3, //1-3
                colors: 256, //2-256
                buffer: true
            }),
            imagemin.jpegtran({
                progressive: true,
                //arithmetic: true,
                buffer: true
            }),
            imagemin.optipng({
                optimizationLevel: 5, //1-7
                bitDepthReduction: true,
                colorTypeReduction: true,
                paletteReduction: true,
                buffer: true
            }),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ],{
            verbose: true
        }))
        .pipe(gulp.dest(path.build.emailImages))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('email-images:watching', function() {
        gulp.watch(path.watch.emailImages,
            gulp.series('email-images:build')
        );
    }
);
gulp.task('email-images:watch',
    gulp.series('email-images:build', 'email-images:watching')
);
gulp.task('email:build',
    gulp.parallel(
        'email-pug:build',
        'email-images:build'
    )
);
gulp.task('email:watching',
    gulp.parallel(
        'email-pug:watching',
        'email-images:watching'
    )
);
gulp.task('email:watch',
    gulp.parallel(
        'email-pug:watch',
        'email-images:watch'
    )
);


/* END EMAIL */
