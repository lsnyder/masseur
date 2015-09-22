'use strict';

function Property(key) {
  this._srcKey = this._dstKey = key;
  this._processors = [];
}

Property.prototype.constructor = Property;

Property.prototype.setSrcKey = function(key) {
  this._srcKey = key;
};

Property.prototype.ownsKey = function(key) {
  return this._srcKey === key || this._dstKey === key;
};

Property.prototype.setRemoveIf = function(condition) {
  this._removeIf = condition;
};

Property.prototype.appendProcessors = function(processors) {
  this._processors = this._processors.concat(processors);
};

Property.prototype.transform = function(input, output, options) {
  var result = this._process(input);
  if (this._removeIf && this._removeIf(result) ||
    (options.omitNulls && result === null)) {
    return;
  }
  output[this._dstKey] = result;
};

Property.prototype._process = function(input) {
  return this._processors.reduce(function(acc, processor) {
    return processor(acc, input);
  }, input[this._srcKey]);
};

module.exports = Property;
