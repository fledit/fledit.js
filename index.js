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
  if(id) { file.load(id); }
  // Return the new instance
  return file;
}

// Static method to create a new file and returns its instance
File.create = function(content) {
  // Create a new empty file
  var file = new File();
  // Return the new instance
  return file.create(content);
};

// Create a file
File.prototype.create = function(content) {
  // Current instance of File
  var file = this;
  // Gets the file
  request.post(File.BASE, {content: content}).end(function(err, res) {
      if(res.ok) {
        extend(file, res.body);
        file.emit("complete", file);
      } else {
        file.emit("error", err);
      }
  });
  // Return the instance
  return file;
};


// Static method to load aa file using its id
File.load = function(id) {
  // Create a new file
  return new File(id);
};

// Load a file using its id
File.prototype.load = function(id) {
  // Current instance of File
  var file = this;
  // Gets the file
  request.get(File.BASE + "/" + id).end(function(err, res) {
    if(res.ok) {
      extend(file, res.body);
      file.emit("complete", file);
    } else {
      file.emit("error", err);
    }
  });
  // Return the instance
  return file;
};

module.exports = File;
