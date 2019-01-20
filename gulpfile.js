const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data'); 


// gulp.task('render', function() {
//     // Gets .html and .nunjucks files in pages
//     return gulp.src('html/pages/**/*.+(html|nunjucks)')
//     // Renders template with nunjucks
//     .pipe(data(function() {
//       return require('.data.json')
//     }))
//     .pipe(nunjucksRender({
//         path: ['html/templates']
//       }))
//     // output files in app folder
//     .pipe(gulp.dest('html'))
  
 
//   });
  gulp.task('nunjucks', function() {
    return gulp.src('html/pages/**/*.+(html|nunjucks)')
      // Adding data to nunjucks
      .pipe(data(function() {
        return require('./html/data.json')
      }))
      .pipe(nunjucksRender({
                 path: ['html/templates']
               }))
      .pipe(gulp.dest('html'))
  });