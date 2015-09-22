'use strict';

module.exports = {
  collection: function(transformer) {
    return function(ary) {
      if (ary === null || ary === undefined ) { return []; }
      return ary.map(function(e) {
        return transformer.transform(e);
      });
    };
  },

  member: function(transformer) {
    return function(member) {
      return transformer.transform(member);
    };
  },

  int: function(acc, input){
    return parseInt(acc, 10);
  },

  bool: function(acc, input){
    return !!acc;
  },

  float: function(acc, input){
    return parseFloat(acc);
  },

  default: function(value, acc){
    return (acc === null || acc === undefined) ? value : acc;
  }
};
