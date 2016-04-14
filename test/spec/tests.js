/*jshint -W117 */

'use strict';

(function() {

  describe('iptUtils', function() {

    describe('init', function() {

      it('expected to be an object', function() {
        return expect(iptUtils).to.be.an.object;
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
          return expect(iptUtils.getNamespacedEvents(eventNames, namespace)).to.equal(result);
        });

        it('expected to return a list of namespaced events', function() {
          eventNames = ['mouseUp', 'mouseDown', 'keyDown'];
          namespace = 'ip';
          result = 'mouseUp.ip mouseDown.ip keyDown.ip';
          return expect(iptUtils.getNamespacedEvents(eventNames, namespace)).to.equal(result);
        });

        it('expected to trow an error', function() {
          eventNames = undefined;
          namespace = 'ip';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to trow an error', function() {
          eventNames = 'click';
          namespace = {};
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to trow an error', function() {
          eventNames = 'click';
          namespace = 'im batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to trow an error', function() {
          eventNames = 'click';
          namespace = 'im.batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to trow an error', function() {
          eventNames = 'cli ck';
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to trow an error', function() {
          eventNames = 'cli.ck';
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to trow an error', function() {
          eventNames = ['mouseUp', {}];
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to trow an error', function() {
          eventNames = ['mouseUp', 'cli ck'];
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

        it('expected to trow an error', function() {
          eventNames = ['mouseUp', 'cli.ck'];
          namespace = 'batman';
          result = function() {
            iptUtils.getNamespacedEvents(eventNames, namespace);
          };
          return expect(result).to.throw();
        });

      });

    });

  });

})();
