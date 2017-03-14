let mocha = require('mocha'),
    chai = require('chai'),
    Ioc = require('../../src/Ioc'),
    Example = require('./Classes/Example');

chai.should();

function closure() {
    return new Example();
}

describe('Ioc', function () {
    let containers;

    before(function () {
        containers = Ioc.innerAccess();
    });

    it('registers a new binding', function () {
        Ioc.bind('Ex', closure);

        containers._bindings.should.have.a.property('Ex').that.deep.equals({
            closure: closure,
            singleton: false
        });
    });

    it('registers a new binding which is singleton', function () {
        Ioc.bind('Ex/singleton', closure, true);

        containers._bindings.should.have.a.property('Ex/singleton').that.deep.equals({
            closure: closure,
            singleton: true
        });
        containers._instances.should.have.a.property('Ex/singleton').that.is.instanceOf(Example);
    });

    it('registers a new binding which is singleton and deferred', function () {
        Ioc.bind('Ex/singleton/deferred', closure, true, true);

        containers._bindings.should.have.a.property('Ex/singleton/deferred').that.deep.equals({
            closure: closure,
            singleton: true
        });
        containers._instances.should.not.have.a.property('Ex/singleton/deferred');
    });

    it('registers a new namespace', function () {
        Ioc.namespace('Ex/namespace', Example);

        containers._namespaces.should.have.a.property('Ex/namespace').that.deep.equals(Example);
    });

    it('registers a new alias', function () {
        Ioc.alias('Alias', 'Ex/namespace');

        containers._alias.should.have.a.property('Alias').that.equals('Ex/namespace');
    });

    it('throws when namespace isnt founded', function () {
        (() => {
            Ioc.use('Not/here');
        }).should.throw(Error);
    });

    it('returns an instance when binding is found', function () {
        Ioc.use('Ex').should.be.instanceOf(Example);
    });

    it('returns a singleton instance if its already instantiated', function () {
        Ioc.use('Ex/singleton').should.be.instanceOf(Example);
    });

    it('returns a namespace when its found', function () {
        Ioc.use('Ex/namespace').should.be.deep.equal(Example);
    });

    it('returns an alias when its found', function () {
        Ioc.use('Alias').should.be.deep.equal(Example);
    });

    it('registers a singleton', function () {
        Ioc.singleton('Ex/by/singleton', closure);

        containers._bindings.should.have.a.property('Ex/by/singleton').that.deep.equals({
            closure: closure,
            singleton: true
        });
    });

    it('have global functions available', function () {
        use.should.be.instanceOf(Function);
        namespace.should.be.instanceOf(Function);
        bind.should.be.instanceOf(Function);
        singleton.should.be.instanceOf(Function);
        alias.should.be.instanceOf(Function);
    });

});