'use strict';

var    $ = require('jquery'),
  events = require('events');

function File(id) {
  var emitter = new events.EventEmitter();

  $.getJSON("http://localhost:9000/api/files/" + id, function(result) {
    emitter.emit("complete", result);
  });

  return emitter;
}

module.exports = File;
