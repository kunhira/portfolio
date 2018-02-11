var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require('gulp-plumber');　
 
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(sass())
        .pipe(plumber())
        .pipe(autoprefixer())
        .pipe(gulp.dest("css"));
});

gulp.task('watch', function(){
  gulp.watch('sass/**/*scss', ['sass']);
});

gulp.task('default',['sass']);