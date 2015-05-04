'use strict';

var assert = require('assert');
var Fledit = require('../');

describe('fledit node module', function () {

  it('must have load one file', function (done) {

    var fledit = new Fledit("54f9f00f509e85d4040ba535");

    fledit.on("complete", function(file) {
      assert(file._id === "54f9f00f509e85d4040ba535");
      done();
    });

  });

  it('must have load one file with static method', function (done) {

    Fledit.load("54f9f00f509e85d4040ba535").on("complete", function(file) {
      assert(file._id === "54f9f00f509e85d4040ba535");
      done();
    });

  });


  it('must have not found a file', function (done) {

    var fledit = new Fledit("not_a_valid_id");

    fledit.on("error", function(error) {
      assert(error.status === 500);
      done();
    });

  });


  it('must create a file', function (done) {

    var fledit = Fledit.create({ foo: 'Bar'});

    fledit.on("complete", function(file) {
      assert(!!file._id);
      done();
    });

  });
});
