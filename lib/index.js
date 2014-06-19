'use strict';

var Stream = require('./stream');
var Property = require('./property');
var Processors = require('./processors');

function Transform() {
  this._properties = [];
}

Transform.prototype.key = function(prop) {
  this._properties.push(new Property(prop));
  return this;
};

Transform.prototype.src = function(key) {
  this._getLastProperty().setSrcKey(key);
  return this;
};

Transform.prototype.use = function( /*fn1, fn2, ...*/ ) {
  var processors = Array.prototype.slice.call(arguments, 0);

  // make sure we can use either variable args or array
  if(processors.length === 1 && processors[0] instanceof Array) {
    processors = processors[0];
  }

  this._getLastProperty().appendProcessors(processors);
  return this;
};

Transform.prototype._getLastProperty = function() {
  return this._properties[this._properties.length - 1];
};

Transform.prototype.transform = function(input) {
  var output = {};

  this._properties.forEach(function(property) {
    property.transform(input, output);
  });

  return output;
};

Transform.prototype.createStream = function() {
  return new Stream(this);
};

module.exports = {
  Transform: Transform,
  Stream: Stream,
  Property: Property,
  Processors: Processors
};
