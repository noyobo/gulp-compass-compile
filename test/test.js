'use strict';
var expect = require('chai').expect
var path = require('path')
var compile = require('../lib/compass').compile;
var fs = require('fs')
var del = require('del')
var async = require('async')

//nested, expanded, compact, compressed
var read_file = function(filepath) {
  var contents;
  try {
    contents = fs.readFileSync(String(filepath), {
      encoding: 'utf8'
    });
    // Strip any BOM that might exist.
    if (contents.charCodeAt(0) === 0xFEFF) {
      contents = contents.substring(1);
    }
    return contents;
  } catch (e) {
    throw new Error('Unable to read "' + filepath + '" file');
  }
};

describe('testing', function() {
  this.timeout(60000)
  describe('test `relative` compass', function() {
    var build = path.join(__dirname, 'build')
    before(function(done) {
      async.parallel([
        function(callback) {
          compile(path.join(__dirname, 'src/home/index.scss'), {
            project: __dirname
          }, function(err, result, files) {
            callback(null, files)
          })
        }
      ], function(err, results) {
        done()
      })
    });
    after(function(done) {
      del.sync(build)
      done()
    })
    it('ok', function() {
      var e = read_file(path.join(__dirname, 'expectBuild/home/index.css'))
      var b = read_file(path.join(__dirname, 'build/home/index.css'))
      expect(b).to.be.string(e);
    });
  });


  describe('test `absolute` compass', function() {
    var build = path.join(__dirname, 'build')
    before(function(done) {
      async.parallel([
        function(callback) {
          compile(path.join(__dirname, 'src/home/absolute.scss'), {
            project: __dirname,
            relative: false
          }, function(err, result, files) {
            fs.writeFileSync(path.join(__dirname, 'build/home/absolute.css'), String(files[0].contents))
            callback(null, files)
          })
        }
      ], function(err, results) {
        done()
      })
    });
    after(function(done) {
      del.sync(build)
      done()
    })
    it('default compile ok', function() {
      var e = read_file(path.join(__dirname, 'expectBuild/home/absolute.css'))
      var b = read_file(path.join(__dirname, 'build/home/absolute.css'))
      expect(b).to.be.string(e);
    });
  });


  describe('test `import` compass', function() {
    var build = path.join(__dirname, 'build')
    before(function(done) {
      async.parallel([
        function(callback) {
          compile(path.join(__dirname, 'src/home/import.scss'), {
            project: __dirname
          }, function(err, result, files) {
            callback(null, files)
          })
        }
      ], function(err, results) {
        done()
      })
    });
    after(function(done) {
      del.sync(build)
      done()
    })
    it('ok', function() {
      var e = read_file(path.join(__dirname, 'expectBuild/home/import.css'))
      var b = read_file(path.join(__dirname, 'build/home/import.css'))
      expect(b).to.be.string(e);
    });
  });

  describe('test `imports` compass', function() {
    var build = path.join(__dirname, 'build')
    before(function(done) {
      async.parallel([
        function(callback) {
          compile(path.join(__dirname, 'src/home/import2.scss'), {
            project: __dirname,
            imports: ['./imports']
          }, function(err, result, files) {
            callback(null, files)
          })
        }
      ], function(err, results) {
        done()
      })
    });
    after(function(done) {
      del.sync(build)
      done()
    })
    it('ok', function() {
      var e = read_file(path.join(__dirname, 'expectBuild/home/import2.css'))
      var b = read_file(path.join(__dirname, 'build/home/import2.css'))
      expect(b).to.be.string(e);
    });
  });
});
