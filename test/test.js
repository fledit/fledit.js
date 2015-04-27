'use strict';

var assert = require('assert');
var Fledit = require('../');

describe('fledit node module', function () {
  it('must have at least one test', function (done) {
    var fledit = new Fledit("54f9f00f509e85d4040ba535");
    fledit.on("complete", function(file) {
      console.log(file);
      assert(true);
      done();
    });
  });
});
