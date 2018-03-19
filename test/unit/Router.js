let mocha = require('mocha'),
    chai = require('chai'),
    sinon = require('sinon'),
    Router = require('../../src/Router'),
    ControllerDispatcher = require('../../src/Router/ControllerDispatcher');

chai.should();

describe('Router', function () {
    let router, response;

    beforeEach(function () {
        router = new Router();

        response = {
            end: function (text) {
                return text;
            },
            setHeader: function (key, value) {
                return {};
            },
            writeHead: function (value) {
                return value;
            }
        };

    });

    afterEach(function () {
        if (JSON.stringify['restore'])
            JSON.stringify.restore();
    });

    it('should register get route', function () {
        router.get('/home', function (req, res) {
            res.end();
        });
        router.routesList.should.have.property('length').that.equals(1);
        router.routesList[0].should.have.all.keys('method', 'path', 'options', 'closure');
    });

    it('should register post route', function () {
        router.post('/home', function (req, res) {
            res.end();
        });
        router.routesList.should.have.property('length').that.equals(1);
        router.routesList[0].should.have.all.keys('method', 'path', 'options', 'closure');
    });

    it('should register put route', function () {
        router.put('/home', function (req, res) {
            res.end();
        });
        router.routesList.should.have.property('length').that.equals(1);
        router.routesList[0].should.have.all.keys('method', 'path', 'options', 'closure');
    });

    it('should register delete route', function () {
        router.delete('/home', function (req, res) {
            res.end();
        });
        router.routesList.should.have.property('length').that.equals(1);
        router.routesList[0].should.have.all.keys('method', 'path', 'options', 'closure');
    });

    it('should register multiple routes', function () {
        router.get('/home/1', function () {
            return 1;
        });

        router.get('/home/2', function () {
            return 2;
        });

        router.post('/home/3', function () {
            return 3;
        });

        router.routesList.should.have.property('length').that.equals(3);

        let route1 = router.findMatchingRoute('GET', '/home/1');
        route1.should.have.all.keys('handler', 'params', 'splat', 'src');
        route1.handler.closure().should.equal(1);

        let route2 = router.findMatchingRoute('GET', '/home/2');
        route2.should.have.all.keys('handler', 'params', 'splat', 'src');
        route2.handler.closure().should.equal(2);

        let route3 = router.findMatchingRoute('POST', '/home/3');
        route3.should.have.all.keys('handler', 'params', 'splat', 'src');
        route3.handler.closure().should.equal(3);
    });

    it('cant resolve missing route', function () {
        router.findMatchingRoute('GET', 'missingroute')
            .should.have.all.keys('handler', 'params', 'splat', 'src')
            .and.deep.equals({
                handler: null,
                params: {},
                splat: null,
                src: null
            });
    });

    it('extract parameters from route', function () {
        router.get('/:id', function () {
            return 1;
        });
        router.findMatchingRoute('GET', '/34')
            .should.have.property('params')
            .that.deep.equals({
                id: '34'
            });
    });

    it('resolve a route with casting', async function () {
        router.get('/test', function () {
            return 1;
        });

        (await router.resolveRoute({method: 'GET', url: '/test'}, response)).should.equal('1');
    });

    it('respond with string right away', async function () {
        router.get('/test/string', function () {
            return "ok";
        });

        (await router.resolveRoute({ method: 'GET', url: '/test/string' }, response)).should.equal('ok');
    });

    it('should return Route not found if theres no route', async function () {
        (await router.resolveRoute({ method: 'GET', url: '404' }, response)).should.equal('Route not found');
    });

    it('parse object to string', async function () {
        router.get('/test/parsed', function () {
            return {
                "test": "test"
            };
        });

        (await router.resolveRoute({ method: 'GET', url: '/test/parsed' }, response)).should.equal('{\n    "test": "test"\n}');
    });

    it('adds string as handler', function () {
        router.get('/test/string', 'Controller');

        router.routesList[0].should.have.property('closure').that.equals('Controller');
    });

    it('returns a 500 error if json cannot be parsed to string', async () => {
        sinon.stub(JSON, 'stringify').throws("Error");

        router.get('/test/errors', function () {
            return {
                "test": "test"
            };
        });
        (await router.resolveRoute({ method: 'GET', url: '/test/errors' }, response)).should.equal('Server error.');
    });

    it('nothing to return', () => {
        router.get('/test/nothing', function () {
        });
        router.resolveRoute({method: 'GET', url: '/test/nothing'}, response);
    });

    it('goes through the controller',  async () => {
        let dispatch = sinon.stub(ControllerDispatcher, 'dispatchRoute').returns(true);
        let responder = sinon.stub(Router, 'respondToRoute').returns(true);
        let route = {
            handler: { closure: "TestController" },
            params: {}
        };

        await Router.dispatchRoute(route, response);
        dispatch.restore();
        responder.restore();
        sinon.assert.calledOnce(dispatch);
        sinon.assert.calledOnce(responder);
    });

    it('creates a resource', () => {
        router.resource('post', 'PostController');

        router.routesList.should.have.property('length').that.equals(5);

        router.routesList[0].should.have.property('method').that.equals('GET');
        router.routesList[0].should.have.property('path').that.equals('post');
        router.routesList[0].should.have.property('closure').that.equals('PostController@index');

        router.routesList[1].should.have.property('method').that.equals('GET');
        router.routesList[1].should.have.property('path').that.equals('post/:id');
        router.routesList[1].should.have.property('closure').that.equals('PostController@show');

        router.routesList[2].should.have.property('method').that.equals('POST');
        router.routesList[2].should.have.property('path').that.equals('post');
        router.routesList[2].should.have.property('closure').that.equals('PostController@create');

        router.routesList[3].should.have.property('method').that.equals('PUT');
        router.routesList[3].should.have.property('path').that.equals('post/:id');
        router.routesList[3].should.have.property('closure').that.equals('PostController@update');

        router.routesList[4].should.have.property('method').that.equals('DELETE');
        router.routesList[4].should.have.property('path').that.equals('post/:id');
        router.routesList[4].should.have.property('closure').that.equals('PostController@remove');
    });
});