'use strict';

var spawn = require('child_process').spawn;
var which = require('which').sync;
var File = require('vinyl');
var path = require('path');
var fs = require('fs');

var compassOptions = require('./option');
var compass = module.exports = {};

var compassHandler = 'compass';

compass.compile = function(filePath, opts, callback) {
  try {
    compassHandler = which(compassHandler);
  } catch (err) {
    return callback(127);
  }
  if (typeof opts === 'undefined') {
    opts = compassOptions.getOpts({});
  } else {
    opts = compassOptions.getOpts(opts);
  }
  var commandOptins = compassOptions.getCommand();
  commandOptins.unshift(filePath);
  commandOptins.unshift(opts.project);
  commandOptins.unshift('compile');
  var child = spawn(compassHandler, commandOptins, {
    cwd: opts.project
  });
  var fileList = [];
  var stdout = '';
  var stderr = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function(data) {
    stdout += data;
    var css = /([^ ]+.css)/.exec(data);
    if (css) {
      fileList.push(path.join(opts.project, css[1]));
    }
  });
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function(data) {
    stderr += data;
  });
  child.on('close', function(code) {
    var fileArray = [];
    fileList.forEach(function(i) {
      var contents = fs.readFileSync(i);
      if (!opts.relative) { // 绝对地址
        var form = path.basename(opts.sassDir);
        var reg = new RegExp('/' + form + '/', 'g');
        var to = path.basename(opts.cssOut);
        contents = String(contents).replace(reg, '/' + to + '/');
      }
      if (!(contents instanceof Buffer)) {
        contents = new Buffer(contents);
      }
      var file = new File({
        cwd: opts.project,
        base: opts.cssOut,
        path: path.relative(opts.project, i),
        contents: contents
      });
      fileArray.push(file);
    });
    callback(code, {
      'stdout': stdout,
      'stderr': stderr
    }, fileArray);
  });
};
