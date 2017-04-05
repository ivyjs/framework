let mocha = require('mocha'),
    chai = require('chai'),
    sinon = require('sinon'),
    ControllerDispatcher = require('../../src/Router/ControllerDispatcher');

chai.should();

describe('ControllerDispatcher', () => {
    it('returns an instance of controller with a given namespace', () => {
        sinon.stub(global, 'use').returns(true);
        ControllerDispatcher.getController('TestNamespace').should.equal(true);
        global.use.restore();
    });

    it('dispatches a route', () => {
        sinon.stub(global, 'use').returns({
            goodHandler: function (param) {
                return param;
            }
        });
        ControllerDispatcher.dispatchRoute('TestNamespace@goodHandler', ['test']).should.equal('test');
        global.use.restore();
    })
});