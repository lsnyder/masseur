'use strict';

module.exports = {
  collection: function(transformer) {
    return function(ary) {
      return ary.map(function(e) {
        return transformer.transform(e);
      });
    };
  },

  member: function(transformer) {
    return function(member) {
      return transformer.transform(member);
    };
  }
};
