'use strict';

var request = require('superagent'),
     events = require('events');

function File(id) {
  // Build the URL to the file
  var url = "http://localhost:9000/api/files/" + id,
  // Create an event emitter
  emitter = new events.EventEmitter(),
  // Create an empty object to contain the futur file
  file = null;


  request.get(url).end(function(err, res) {
    if(res.ok) {
      emitter.emit("complete", res.body);
    } else {
      emitter.emit("error", err);
    }
  });

  return emitter;
}

module.exports = File;
