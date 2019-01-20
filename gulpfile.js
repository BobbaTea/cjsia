const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data'); 


  gulp.task('nunjucks', function() {
    nunjucksRender.nunjucks.configure(['html/templates']);
    return gulp.src('html/pages/**/*.+(html|nunjucks)')
      // Adding data to nunjucks
      .pipe(data(function() {
        return require('./html/data.json')
      }))
      .pipe(nunjucksRender())
      .pipe(gulp.dest('html'))
  });