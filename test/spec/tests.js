'use strict';
/*jshint -W117 */
if (typeof require === 'function') {
  const chai = require('chai');
  const fs = require('fs');
  var content = fs.readFileSync('test/jsdom.html', 'utf8');
  require('jsdom-global')(content, {
    url: 'file://' + __dirname,
    pretendToBeVisual: true,
    resources: 'usable',
    runScripts: 'dangerously'
  });
  // var iptUtils = window.iptUtils;
  //var iptUtils = require('../../src/iptools-utils');
  var expect = chai.expect;
}

(function() {

  describe('iptUtils', function() {

    beforeEach(function(){
      global.iptUtils = window.iptUtils;
    });

    describe('init', function() {
      it('expected to be an object', function() {
        return expect(iptUtils).to.be.an('object');
      });

    });

    describe('API', function() {

      describe('getNamespacedEvents', function() {
        var eventNames;
        var namespace;
        var result;

        it('expected to return a namespaced event', function() {
          eventNames = 'click';
          namespace = 'ip';
          result = 'click.ip';
          return expect(iptUtils.getNamespacedEvents(eventNames, namespace)).to.equal(result);
        });

        it('expected to return a namespaced event', function() {
          eventNames = ['mouseUp'];
          namespace = 'ip';
          result = 'mouseUp.ip';
          console.log('what?', typeof eventNames);
          console.log('wtf', iptUtils.getNamespacedEvents(eventNames, namespace));
          return expect(iptUtils.getNamespacedEvents(eventNames, namespace)).to.equal(result);
        });

        it('expected to return a list of namespaced events', function() {
          eventNames = ['mouseUp', 'mouseDown', 'keyDown'];
          namespace = 'ip';
          result = 'mouseUp.ip mouseDown.ip keyDown.ip';
          return expect(iptUtils.getNamespacedEvents(eventNames, namespace)).to.equal(result);
        });

        it('expected to throw an error', function() {
          eventNames = undefined;
          namespace = 'ip';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to throw an error', function() {
          eventNames = 'click';
          namespace = {};
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to throw an error', function() {
          eventNames = 'click';
          namespace = 'im batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to throw an error', function() {
          eventNames = 'click';
          namespace = 'im.batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to throw an error', function() {
          eventNames = 'cli ck';
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to throw an error', function() {
          eventNames = 'cli.ck';
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to throw an error', function() {
          eventNames = ['mouseUp', {}];
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to throw an error', function() {
          eventNames = ['mouseUp', 'cli ck'];
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to throw an error', function() {
          eventNames = ['mouseUp', 'cli.ck'];
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

      });

      describe('deviceDetection', function() {
        var result;

        it('expected getMediaQueries to return an object', function() {
          result = iptUtils.deviceDetection.getMediaQueries();
          return expect(result).to.be.an('object');
        });

        it('expected getMediaQueries to return an object that has a property "phone"', function() {
          result = iptUtils.deviceDetection.getMediaQueries();
          return (expect(result).to.be.an('object') && expect(result).to.have.property('phone'));
        });

        it('expected getMediaQueries to return an object that has a property "phone" which is a boolean', function() {
          result = iptUtils.deviceDetection.getMediaQueries();
          return (
            expect(result).to.be.an('object') &&
            expect(result).to.have.property('phone') &&
            expect(result.phone).to.be.a('boolean')
          );
        });

        it('expected isMediaQuery to return a boolean value on parameter "phone"', function() {
          result = iptUtils.deviceDetection.isMediaQuery('phone');
          return expect(result).to.be.a('boolean');
        });

        it('expected isMediaQuery to throw an error on parameter "batman"', function() {
          result = function() {
            iptUtils.deviceDetection.isMediaQuery('batman');
          };
          return expect(result).to.throw();
        });

      });

    });

  });

})();
