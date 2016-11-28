var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require('gulp-autoprefixer');

gulp.task("default", ["sass"]);

gulp.task('sass', function() {

    gulp.src(['./ui/sass/base.scss', './ui/sass/overlays.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
        }))
        .pipe(gulp.dest('public/stylesheets/')
    );

});
