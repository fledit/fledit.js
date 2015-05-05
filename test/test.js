'use strict';

var assert = require('assert');
var Fledit = require('../');

var EXISTING_ID = "54f9f00f509e85d4040ba535";
// If tests are with a local instance of Fledit.io
Fledit.HOST = "localhost:9000";

describe('fledit node module', function () {

  it('must have load one file', function (done) {

    var fledit = new Fledit(EXISTING_ID);

    fledit.on("complete", function(file) {
      assert(file._id === EXISTING_ID);
      done();
    });

  });

  it('must have load one file with static method', function (done) {

    Fledit.load(EXISTING_ID).on("complete", function(file) {
      assert(file._id === EXISTING_ID);
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


  it('must create then update a file', function (done) {

    var fledit = Fledit.create({ foo: 'Bar'});

    fledit.once("complete", function(file) {
      assert(file.content.foo === 'Bar');
      // Update the content of the file
      file.content = { bar: 'Foo' };
      file.name = 'This is a file created by a robot during a test';
      // And save it!
      file.save().once("complete", function(file) {
        // The content must not be the same
        assert(file.content.bar === 'Foo');
        done();
      });
    });

  });
});
