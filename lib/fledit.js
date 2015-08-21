'use strict';

var request = require('superagent'),
     extend = require('node.extend'),
     events = require('events');

function Fledit(id) {
  // Build the URL to the API at runtime
  Fledit.BASE = "http://" + Fledit.HOST + "/api/files";
  // Create an event emitter
  var emitter = new events.EventEmitter(),
  // Current instance of Fledit
  file = this;
  // The current file must be an instance of an EventEmiiter
  extend(file, emitter);
  // Do not load a file without id
  if(id) { file.load(id); }
  // Return the new instance
  return file;
}

// Fledit host (can be overided)
Fledit.HOST = 'www.fledit.io';

// Static method to create a new file and returns its instance
Fledit.create = function(content) {
  // Create a new empty file
  var file = new Fledit();
  // Return the new instance
  return file.create(content);
};

// Create a file
Fledit.prototype.create = function(content) {
  // Current instance of Fledit
  var file = this;
  // Gets the file
  request.post(Fledit.BASE, {content: content}).end(function(err, res) {
      if(res && res.ok) {
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
Fledit.load = function(id) {
  // Create a new file
  return new Fledit(id);
};

// Load a file using its id
Fledit.prototype.load = function(id) {
  // Current instance of Fledit
  var file = this;
  // Gets the file
  request.get(Fledit.BASE + "/" + id).end(function(err, res) {
    if(res && res.ok) {
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
Fledit.prototype.save = function() {
  // Current instance of Fledit
  var file = this;
  // This file may not have been saved yet
  if( ! file._id ) return file.create(file.content);
  // Gets the file
  request.put( file.raw(), file).end(function(err, res) {
    if(res && res.ok) {
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
Fledit.prototype.del = function() {
  // Current instance of Fledit
  var file = this;
  // Gets the file
  request.del( file.raw(true) ).end(function(err, res) {
    if(res && res.ok) {
      file.emit("deleted", file);
    } else {
      file.emit("error", err);
    }
  });
  // Return the instance
  return file;
};


// Link to a file
Fledit.prototype.link = function() {
  return "http://" + Fledit.HOST + "/#!/file/" + this._id;
};

// Raw link to a file
Fledit.prototype.raw = function(secret) {
  return Fledit.BASE + "/" + this._id + (secret ? '?secret=' + this.secret : '');
};

// Admin link to a file
Fledit.prototype.admin = function() {
  // Only admin link for file with a secret
  if(this.secret) {
    return this.link() + "?secret=" + this.secret;
  } else {
    return null;
  }
};

module.exports = Fledit;
