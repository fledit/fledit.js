'use strict';

var request = require('superagent'),
     extend = require('node.extend'),
     events = require('events');

function File(id) {
  // Build the URL to the file
  File.BASE = "http://localhost:9000/api/files";
  // Create an event emitter
  var emitter = new events.EventEmitter(),
  // Current instance of File
  file = this;
  // The current file must be an instance of an EventEmiiter
  extend(file, emitter);
  // Do not load a file without id
  if(id) {
    // Gets the file
    request.get(File.BASE + "/" + id).end(function(err, res) {
      if(res.ok) {
        extend(file, res.body);
        emitter.emit("complete", file);
      } else {
        emitter.emit("error", err);
      }
    });
  }

  return file;
}

// Static method to create a new file and returns its instance
File.create = function(content) {
  // Create a new empty file
  var file = new File();
  // Gets the file
  request.post(File.BASE, {content: content}).end(function(err, res) {
      if(res.ok) {
        extend(file, res.body);
        file.emit("complete", file);
      } else {
        file.emit("error", err);
      }
  });

  return file;
};

module.exports = File;
