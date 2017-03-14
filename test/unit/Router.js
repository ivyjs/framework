let mocha = require('mocha'),
    chai = require('chai'),
    Router = require('../../src/Router');

chai.should();

describe('Router', function () {
    let router;

    beforeEach(function () {
        router = new Router();
    });

    it('should register get route', function () {
        router.get('/home', function (req, res) {
            res.end();
        });
        router.routesList.should.have.property('length').that.equals(1);
        router.routesList[0].should.have.all.keys('method', 'path', 'options');
    });

    it('should register post route', function () {
        router.post('/home', function (req, res) {
            res.end();
        });
        router.routesList.should.have.property('length').that.equals(1);
        router.routesList[0].should.have.all.keys('method', 'path', 'options');
    });

    it('should register put route', function () {
        router.put('/home', function (req, res) {
            res.end();
        });
        router.routesList.should.have.property('length').that.equals(1);
        router.routesList[0].should.have.all.keys('method', 'path', 'options');
    });

    it('should register delete route', function () {
        router.delete('/home', function (req, res) {
            res.end();
        });
        router.routesList.should.have.property('length').that.equals(1);
        router.routesList[0].should.have.all.keys('method', 'path', 'options');
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
        route1.handler().should.equal(1);

        let route2 = router.findMatchingRoute('GET', '/home/2');
        route2.should.have.all.keys('handler', 'params', 'splat', 'src');
        route2.handler().should.equal(2);

        let route3 = router.findMatchingRoute('POST', '/home/3');
        route3.should.have.all.keys('handler', 'params', 'splat', 'src');
        route3.handler().should.equal(3);
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

    it('resolve a route', function () {
        router.get('/test', function () {
            return 1;
        });

        router.resolveRoute('GET', '/test', {}).should.equal(1);
    });

    it('should return Route not found if theres no route', function () {
        let response = {
            end: function (text) {
                return text;
            }
        };

        router.resolveRoute('GET', '404', response).should.equal('Route not found');
    })

});