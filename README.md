gulp-compass-compile
====================

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
  // 'imagesDir': 'src',
  // 'jsDir': 'src',
  // 'fontDir': 'src',
  'buildDir': 'build',
  'buildStyle': 'nested'
};
```
