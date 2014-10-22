'use strict';

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
  'buildStyle': 'nested',
  'ignoreBuildDir': true
};

module.exports.getCommand = function() {
  var obj = this.opts;
  var result = [];
  /*jshint expr:true */
  obj.time && result.push('--time');
  obj.debug ? result.push('--debug-info') : result.push('--no-debug-info');
  obj.force && result.push('--force');
  obj.boring && result.push('--boring');
  obj.quiet && result.push('--quiet');
  obj.sourcemap && result.push('--sourcemap');
  obj.relative && result.push('--relative-assets');
  obj.comments || result.push('--no-line-comments');
  obj.imports.forEach(function(i) {
    result.push('-I', i);
  });
  result.push('--sass-dir', obj.srcDir);
  result.push('--images-dir', obj.srcDir);
  result.push('--javascripts-dir', obj.srcDir);
  result.push('--fonts-dir', obj.srcDir);
  result.push('--output-style', obj.buildStyle);
  result.push('--css-dir', obj.buildDir);
  result.push('--generated-images-path', obj.buildDir);
  return result;
};

module.exports.getOpts = function(opts) {
  Object.keys(opts).forEach(function(i) {
    optionDefault[i] = opts[i];
  });
  this.opts = optionDefault;
  if (process.platform === 'win32') {
    optionDefault.project = String(optionDefault.project).replace(/\\/g, '/');
  }
  return optionDefault;
};
