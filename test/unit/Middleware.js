let mocha = require('mocha'),
    chai = require('chai'),
    MiddlewareContainer = require('../../src/Middleware');

chai.should();

describe('Middleware Container', function () {
    let container;

    before(() => {
        global.use = function (namespace) {
            return namespace;
        }
    });

    beforeEach(() => {
        container = new MiddlewareContainer();
    });

    it('registers a new middleware', () => {
        container.registerMiddleware('test', 'Test/namespace');
        container.middlewaresList.should.have.property('test').that.equals('Test/namespace');
    });

    it('registers a list of middlewares', () => {
        container.registerMiddleware({'test': 'Test/namespace'});
        container.middlewaresList.should.have.property('test').that.equals('Test/namespace');
    });

    it('register a group', () => {
        container.registerGroup('test-group', ['test', 'test1']);
        container.middlewareGroups.should.have.property('test-group').that.deep.equals(['test', 'test1']);
    });

    it('registers several groups', () => {
        container.registerGroup({
            'test-group1': [ 'test', 'test1' ],
            'test-group2': [ 'test2', 'test3' ]
        });
        container.middlewareGroups.should.deep.equal({
            'test-group1': [ 'test', 'test1' ],
            'test-group2': [ 'test2', 'test3' ]
        });
    });

    it('parse a list of middlewares', () => {
        container.registerMiddleware({'test': 'Test', 'test1': 'Test1', 'test2': 'Test2'});
        container.parse(['test', 'test1', 'test2']).should.deep.equal(['Test', 'Test1', 'Test2']);
    });

    it('parse a group of middlewares', () => {
        container.registerMiddleware({'test': 'Test', 'test1': 'Test1', 'test2': 'Test2'});
        container.registerGroup('test-group', ['test', 'test1']);
        container.registerGroup('test-group1', ['test1', 'test2']);
        container.parse(['test', 'test-group', 'test-group1']).should.deep.equal(['Test', 'Test', 'Test1', 'Test1', 'Test2']);
    });

    it('throws if middleware not found during parse', () => {
        (() => {
            return container.parse(['test'])
        }).should.throw();
    });

    it('throws if middleware from group is not found', () => {
        container.registerGroup('test-group', ['test', 'test1']);
        (() => {
            return container.parse(['test-group'])
        }).should.throw();
    });

    it('casts to array if middleware is given in a form of string', () => {
        container.registerMiddleware({'test': 'Test', 'test1': 'Test1', 'test2': 'Test2'});
        container.parse('test').should.be.deep.equal(['Test']);
    })
});