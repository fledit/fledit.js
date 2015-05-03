'use strict';

var request = require('superagent'),
     events = require('events');

function File(id) {

  var url = "http://localhost:9000/api/files/" + id,
  emitter = new events.EventEmitter();

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
