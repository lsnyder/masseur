/*global describe, it*/

'use strict';

var yajm = require('../index');
var expect = require('chai').expect;
var Model = yajm.Model;

var Contact = Model.define({
  firstName: {
    type: String
  },

  lastName: {
    type: String
  },

  emails: [{
    label: String,
    value: String
  }]
});

var User = Model.define({
  id: {
    type: Number,
    integer: true
  },

  alias: {
    type: String,
    default: 'n/a'
  },

  contacts: {
    type: [Contact]
  }
});

describe('Model', function() {
  it('works', function() {
    var user = new User({
      id: '1',
      contacts: [{
        firstName: 'aaron',
        lastName: 'qian',
        emails: [{
          label: 'default',
          value: 'aq1018@gmail.com'
        }, {
          label: 'fake',
          value: 'idontexist@gmail.com'
        }]
      }]
    });

    expect(user.id).to.equal(1);
    expect(user.contacts).to.have.length(1);

    var me = user.contacts[0];

    expect(me.firstName).to.equal('aaron');
    expect(me.lastName).to.equal('qian');

    expect(me.emails).to.have.length(2);

    var email1 = me.emails[0];
    var email2 = me.emails[1];

    expect(email1.label).to.equal('default');
    expect(email1.value).to.equal('aq1018@gmail.com');
    expect(email2.label).to.equal('fake');
    expect(email2.value).to.equal('idontexist@gmail.com');

  });

  describe('default values', function(){
    it('is empty array when type is collection', function() {
      var user = new User();
      expect(user.contacts).to.have.length(0);
    });

    it('equals to default value when default is set', function() {
      var user = new User();
      expect(user.alias).to.equal('n/a');
    });

    it('is null when type is not collection', function() {
      var user = new User();
      expect(user.id).to.eql(null);
    });
  });

  describe('setter', function() {
    it('coerces value', function() {
      var user = new User();
      user.id = '123';
      expect(user.id).to.equal(123);
    });

    it('fails to set undefined properties', function() {
      expect(function() {
        var user = new User();
        user.anUndefinedProperty = 'will blow up';
      }).to.throw(TypeError);
    });
  });
});
