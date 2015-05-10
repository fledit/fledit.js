'use strict';

var assert = require('assert');
var Fledit = require('../');

var EXISTING_ID = "5538c9b58814581100287a17";
// If tests are with a local instance of Fledit.io
Fledit.HOST = "www.fledit.io";

describe('fledit node module', function () {

  it('must have load one file', function (done) {

    var fledit = new Fledit(EXISTING_ID);

    fledit.on("complete", function(file) {
      assert(file._id === EXISTING_ID);
      done();
    });

  });

  it('must gets the permalink to a file', function (done) {
    Fledit.load(EXISTING_ID).on("complete", function(file) {
      assert(file.link() === "http://" + Fledit.HOST + "/#!/file/" + EXISTING_ID);
      done();
    });
  });

  it('must gets the raw link to a file', function (done) {
    Fledit.load(EXISTING_ID).on("complete", function(file) {
      assert(file.raw() === "http://" + Fledit.HOST + "/api/files/" + EXISTING_ID);
      done();
    });
  });

  it('must failled to get the admin link to a file', function (done) {
    Fledit.load(EXISTING_ID).on("complete", function(file) {
      assert(file.admin() === null);
      done();
    });
  });

  it('must gets the admin link to a file', function (done) {
    Fledit.create(null).once("complete", function(file) {
      var link = "http://" + Fledit.HOST + "/#!/file/" + file._id;
      assert(file.admin() === link + "?secret=" + file.secret);
      done();
    });
  });


  it('must have load one file with static method', function (done) {

    Fledit.load(EXISTING_ID).on("complete", function(file) {
      assert(file._id === EXISTING_ID);
      done();
    });

  });


  it('must not validate the file id', function (done) {

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
      file.save().once("updated", function(file) {
        // The content must not be the same
        assert(file.content.bar === 'Foo');
        done();
      });
    });

  });

  it('must create a file then delete it', function (done) {

    Fledit.create("Please delete me.").once("complete", function(file) {
      // The created file must have an id
      assert(!!file._id);
      // Delele the file
      file.del().once("deleted", function() {
        // The file must not be found
        Fledit.load(file._id).once("error", function(error) {
          assert(error.status === 404);
          done();
        });
      });
    });

  });
});
