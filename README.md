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
