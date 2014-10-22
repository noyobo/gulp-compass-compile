'use strict';

var optionDefault = {
  'project': process.cwd(),
  'time': false,
  'debug': false,
  'force': false,
  'boring': false,
  'sourcemap': false,
  'relative': true,
  'comments': false,
  'imports': [],
  'sassDir': 'src',
  'imagesDir': 'src',
  'jsDir': 'src',
  'fontDir': 'src',
  'cssOut': 'build',
  'outStyle': 'nested'
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
  result.push('--sass-dir', obj.sassDir);
  result.push('--images-dir', obj.imagesDir);
  result.push('--javascripts-dir', obj.jsDir);
  result.push('--fonts-dir', obj.fontDir);
  result.push('--output-style', obj.outStyle);
  result.push('--css-dir', obj.cssOut);
  result.push('--generated-images-path', obj.cssOut);
  return result;
};

module.exports.getOpts = function(opts) {
  Object.keys(opts).forEach(function(i) {
    optionDefault[i] = opts[i];
  });
  this.opts = optionDefault;
  if (process.platform === 'win32') {
    optionDefault.project = String(optionDefault.project).replace(/\\/g, '/')
  };
  return optionDefault;
};
