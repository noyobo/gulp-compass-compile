'use strict';

var through2 = require('through2');
var pluginName = 'gulp-compass-compile';
var PluginError = require('gulp-util/lib/PluginError');
var compass = require('./lib/compass');
var path = require('path');

module.exports = function(opts) {
  function compile(file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }
    if (file.isStream()) {
      return callback(new PluginError(pluginName, 'Streaming not supported', {
        fileName: file.path,
        showStack: false
      }));
    }
    if (path.basename(file.path)[0] === '_') {
      return callback();
    }
    /*jshint validthis:true */
    var self = this;
    compass.compile(file.path, opts, function(code, stdout, stderr, files) {
      if (code === 127) {
        return callback(new PluginError(pluginName, 'You need to have Ruby and Compass installed and in your system PATH for this task to work.'));
      }
      if (code !== 0) {
        return callback(new PluginError(pluginName, 'Compass compile faild:\n' + stdout), {
          fileName: file.path
        });
      }

      if (files.length === 0) {
        return callback(null, file);
      }
      files.forEach(function(i) {
        self.push(i);
      });
      callback();
    });
  }
  return through2.obj(compile);
};
