gulp-compass-compile
====================

[![Greenkeeper badge](https://badges.greenkeeper.io/noyobo/gulp-compass-compile.svg)](https://greenkeeper.io/)

[![npm version](http://img.shields.io/npm/v/gulp-compass-compile.svg)](https://www.npmjs.org/package/gulp-compass-compile) [![npm download](http://img.shields.io/npm/dm/gulp-compass-compile.svg)](https://www.npmjs.org/package/gulp-compass-compile) [![npm engines](http://img.shields.io/node/v/gulp-compass-compile.svg)](https://www.npmjs.org/package/gulp-compass-compile) [![npm dependencise](https://david-dm.org/noyobo/gulp-compass-compile.svg)](https://david-dm.org/noyobo/gulp-compass-compile) [![build status](http://img.shields.io/travis/noyobo/gulp-compass-compile.svg)](https://travis-ci.org/noyobo/gulp-compass-compile) 
[![Coverage Status](https://img.shields.io/coveralls/noyobo/gulp-compass-compile.svg)](https://coveralls.io/r/noyobo/gulp-compass-compile)

## Directory rule 

```
build // Build
└── home
    ├── b-min.css
    ├── b.css
    ├── images
    │   └── i-s7122265bbf.png
    ├── index-min.css
    └── index.css
src // Project source
└── home   // page
    ├── b.scss
    ├── images
    │   ├── _sprites.scss
    │   └── i
    │       ├── a1.png
    │       └── a2.png
    └── index.scss
```

## Example

```javascript
var gulpCompass = require('gulp-compass-compile')

gulp.task('sass', ['clean'], function() {
  return gulp
    .src(['src/**/*.scss', '!src/**/_*.scss'])
    .pipe(gulpCompass({
      'logger' : true // show progress of compile
    }))
    // .pipe(gulp.dest('./build'))  // When Options relative:false, need overwrite the `buildDir` 
    .pipe(cssmin())
    .pipe(rename({
      suffix: "-min"
    }))
    .pipe(gulp.dest('./build'))
})
```

## Options

```
var optionDefault = {
  'project': process.cwd(),
  'time': true,
  'debug': false,
  'force': false,
  'boring': false,
  'sourcemap': false,
  'relative': true,
  'comments': false,
  'logger': false,
  'imports': [],
  'srcDir': 'src',
  'buildDir': 'build',
  'buildStyle': 'nested',
  'ignoreBuildDir': true
};
```
