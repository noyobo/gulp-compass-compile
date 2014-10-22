'use strict';
var expect = require('chai').expect
var path = require('path')
var compass = require('../lib/compass')
var fs = require('fs')
var del = require('del')
var Q = require('q')

//nested, expanded, compact, compressed

describe('testing', function() {
  this.timeout(60000)
  before(function(done) {
    del.sync(path.join(__dirname, 'build'))
    compass.compile(path.join(__dirname, 'src/home/index.scss'), {
      time: true,
      force: true,
      project: __dirname
    }, function(code, files) {
      done()
    })
  });
  it('file complete', function(done) {
    var v = fs.existsSync(path.join(__dirname, 'build/home/index.css'))
    expect(v).to.be.true;
    done()
  });
});
