'use strict';

var request = require('superagent'),
     extend = require('node.extend'),
     events = require('events');

function File(id) {
  // Build the URL to the file
  var url = "http://localhost:9000/api/files/" + id,
  // Create an event emitter
  emitter = new events.EventEmitter(),
  // Current instance of File
  file = this;


  request.get(url).end(function(err, res) {
    if(res.ok) {
      extend(file, res.body);
      emitter.emit("complete", file);
    } else {
      emitter.emit("error", err);
    }
  });

  return emitter;
}

module.exports = File;
