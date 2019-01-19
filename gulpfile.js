const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const del = require('del');


gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('html/pages/**/*.+(html|nunjucks)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['html/templates']
      }))
    // output files in app folder
    .pipe(gulp.dest('html'))
  });

