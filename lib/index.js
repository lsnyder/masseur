'use strict';

var Stream = require('./stream');
var Property = require('./property');
var Processors = require('./processors');

function Transform(options) {
  this.options = options || {};
  this._properties = [];
}

Transform.prototype.key = function(prop) {
  this._properties.push(new Property(prop));
  return this;
};

Transform.prototype.removeIf = function(condition) {
  this._getLastProperty().setRemoveIf(condition);
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

Transform.prototype.int = function() {
  return this.use(Processors.int);
};

Transform.prototype.bool = function() {
  return this.use(Processors.bool);
};

Transform.prototype.float = function() {
  return this.use(Processors.float);
};

Transform.prototype.default = function(value) {
  return this.use(Processors.default.bind(this, value));
};

Transform.prototype.default = function(value) {
  return this.use(Processors.default.bind(this, value));
};

Transform.prototype.collection = function(type) {
  return this.use(Processors.collection(type));
};

Transform.prototype._getLastProperty = function() {
  return this._properties[this._properties.length - 1];
};

Transform.prototype._find = function() {
  return this._properties[this._properties.length - 1];
};

Transform.prototype.transform = function(input) {
  var output = {};
  var self = this;

  this._properties.forEach(function(property) {
    property.transform(input, output, self.options);
  });

  if (this.options.passThrough) {
    Object.keys(input).forEach(function(key){
      var owned = self._properties.some(function(prop){
        return prop.ownsKey(key);
      });
      if (!owned && (!self.options.omitNulls || input[key] !== null)) {
        output[key] = input[key];
      }
    });
  }
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
