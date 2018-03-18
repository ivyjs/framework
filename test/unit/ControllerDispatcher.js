let mocha = require('mocha'),
    chai = require('chai'),
    sinon = require('sinon'),
    ControllerDispatcher = require('../../src/Router/ControllerDispatcher');

chai.should();

describe('ControllerDispatcher', () => {
    it('returns an instance of controller with a given namespace', () => {
        sinon.stub(app(), 'make').returns(true);
        ControllerDispatcher.getController('TestNamespace').should.equal(true);
        app().make.restore();
    });

    it('dispatches a route', async () => {
        sinon.stub(app(), 'make').returns({
            goodHandler: function (param) {
                return param;
            }
        });

        (await ControllerDispatcher.dispatchRoute('TestNamespace@goodHandler', ['test'])).should.equal('test');
        app().make.restore();
    })
});