var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify-es').default;
var header = require('gulp-header');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var notifier = require('node-notifier');

gulp.task('js', function(){
  // Set the order
  return gulp.src([
      'src/sf-a_init.js',
      'src/sf-a_polyfill.js',
      'src/sf-dom.js',
      'src/sf-loader.js',
      'src/sf-component.js',
      'src/sf-model.js',
      'src/**/*.js'
    ]).pipe(sourcemaps.init())

    // Save as combined script
    .pipe(concat('scarletsframe.js'))
    /*.pipe(babel({
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              ie: 10
            },
            loose:true,
            modules: false
          }
        ]
      ]
    }))*/
    .pipe(gulp.dest('dist'))

    // Create minified file (This would be little slower)
    .pipe(rename('scarletsframe.min.js')).on('error', swallowError)
    .pipe(uglify()).on('error', swallowError)

    // Add header so developer can know about this script
    .pipe(header(`/*
  ScarletsFrame
  A frontend library for Scarlets Framework that support
  lazy page load and element binding that can help
  simplify your code

  https://github.com/ScarletsFiction/ScarletsFrame
*/\n`))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist')).on('end', function(){
      notifier.notify({
        title: 'Gulp Compilation',
        message: 'JavaScript was finished!'
      });
    });
});

gulp.task('watch', function(){
  gulp.watch(['src/**/*.js'], gulp.series('js'));
});

gulp.task('default', gulp.series('watch'));

function swallowError(error){
  console.log(error.message)
  this.emit('end')
}