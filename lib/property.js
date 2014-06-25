'use strict';

function Property(key) {
  this._srcKey = this._dstKey = key;
  this._processors = [];
}

Property.prototype.constructor = Property;

Property.prototype.setSrcKey = function(key) {
  this._srcKey = key;
};

Property.prototype.appendProcessors = function(processors) {
  this._processors = this._processors.concat(processors);
};

Property.prototype.transform = function(input, output) {
  output[this._dstKey] = this._process(input);
};

Property.prototype._process = function(input) {
  return this._processors.reduce(function(acc, processor) {
    return processor(acc, input);
  }, input[this._srcKey]);
};

module.exports = Property;
