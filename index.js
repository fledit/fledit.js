'use strict';

var request = require('request'),
     events = require('events');

function File(id) {

  var url = "http://localhost:9000/api/files/" + id,
  emitter = new events.EventEmitter();

  request({ url: url, json: true }, function(err, res, body) {
    emitter.emit("complete", body);
  });

  return emitter;
}

module.exports = File;
