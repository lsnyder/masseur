/*global describe, it*/

'use strict';

var masseur = require('../lib');
var expect = require('chai').expect;
var Transform = masseur.Transform;
var Processors = {
  lowercase: function(val) {
    return val.toString().toLowerCase();
  },

  uppercase: function(val) {
    return val.toString().toUpperCase();
  },

  importantify: function(val) {
    return '*** ' + val + ' ***';
  }
};

/*jshint camelcase: false */
var input = {
  first_name: 'Aaron',
  last_name: 'qian',
  username: 'aq1018',
  phone: '123-456-789'
};
/*jshint camelcase: true */

var transformer = (new Transform())
  .key('username')

  .key('first')
  .src('first_name')
  .use(Processors.lowercase, Processors.importantify)

  .key('last')
  .src('last_name')
  .use(Processors.uppercase);


describe('Transform', function() {
  it('transforms', function(){
    var output = transformer.transform(input);

    expect(output.username).to.equal('aq1018');
    expect(output.first).to.equal('*** aaron ***');
    expect(output.last).to.equal('QIAN');
    expect(output).not.to.have.property('phone');
  });

});
