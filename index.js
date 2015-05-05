'use strict';

var request = require('superagent'),
     extend = require('node.extend'),
     events = require('events');

function File(id) {
  // Build the URL to the API at runtime
  File.BASE = "http://" + File.HOST + "/api/files";
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

// Fledit host (can be overided)
File.HOST = 'www.fledit.io';

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


// Static method to load a file using its id
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

// Save a file
File.prototype.save = function() {
  // Current instance of File
  var file = this;
  // Gets the file
  request.put(File.BASE + "/" + file._id, file).end(function(err, res) {
    if(res.ok) {
      extend(file, res.body);
      file.emit("updated", file);
    } else {
      file.emit("error", err);
    }
  });
  // Return the instance
  return file;
};

// Delete a file
File.prototype.del = function() {
  // Current instance of File
  var file = this;
  // Gets the file
  request.del(File.BASE + "/" + file._id + "?secret=" + file.secret).end(function(err, res) {
    if(res.ok) {
      file.emit("deleted", file);
    } else {
      file.emit("error", err);
    }
  });
  // Return the instance
  return file;

};

module.exports = File;
