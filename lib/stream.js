'use strict';

var Transform = require('stream').Transform;
var inherits = require('util').inherits;

function TransformStream(transformer) {
  Transform.call(this, {
    objectMode: true
  });

  this.transformer = transformer;
}

inherits(TransformStream, Transform);

TransformStream.prototype._transform = function(input, encoding, cb) {
  cb(null, this.transformer.transform(input));
};
