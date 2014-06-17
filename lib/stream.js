'use strict';

var Transform = require('stream').Transform;
var inherits = require('util').inherits;

function Stream(transformer) {
  Transform.call(this, {
    objectMode: true
  });

  this.transformer = transformer;
}

inherits(Stream, Transform);

Stream.prototype._transform = function(input, encoding, cb) {
  cb(null, this.transformer.transform(input));
};

module.exports = Stream;
