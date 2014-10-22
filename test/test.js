'use strict';
var expect = require('chai').expect
var path = require('path')
var compass = require('../lib/compass')
var fs = require('fs')
var del = require('del')
// var File = require('vinyl')

//nested, expanded, compact, compressed

describe('testing', function() {
  this.timeout(60000)
  before(function(done) {
    del.sync(path.join(__dirname, 'build'))
    compass.compile(path.join(__dirname, 'src/home/index.scss'), {
      'project': __dirname,
      'time': true,
      'debug': false,
      'force': false,
      'boring': false,
      'sourcemap': false,
      'relative': false,
      'comments': false,
      'imports': [],
      'sassDir': 'src',
      'imagesDir': 'src',
      'jsDir': 'src',
      'fontDir': 'src',
      'cssOut': 'build',
      'outStyle': 'nested',
      'ignoreBuild': true
    }, function(code, result, files) {
      fs.writeFileSync(path.join(__dirname, 'build/home/index-out.css'), String(files[0].contents))
      done()
    })
  });
  it('file complete', function(done) {
    var v = fs.existsSync(path.join(__dirname, 'build/home/index.css'))
    expect(v).to.be.true;
    done()
  });
});
