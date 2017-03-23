let mocha = require('mocha'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    servicesList = require('./config/services');

chai.use(chaiHttp);
chai.should();


describe('RequestHandling', () => {
    before(() => {
        let server = require('../../');

        servicesList.providers.forEach((provider) => {
            require(provider);
        });

        let config = use('Ivy/Config');
        config.loadConfig('app', {'port': 3000});

        (new server).start();
    });

    it('gets the response from server for no param route', (done) => {
        use('Ivy/Router').get('/', function () {
            return 'ok';
        });

        chai.request('http://localhost:3000')
            .get('/')
            .end((err, res) => {
                res.should.have.property('text').that.equal('ok');
                done();
            });
    });

    it('adds a middleware to the route and go through it', (done) => {
        bind('TestMiddleware', () => {
            return function (data, next) {
                data.route.params.id = "33";
                return next();
            }
        });

        use('Ivy/MiddlewareContainer').registerMiddleware('test', 'TestMiddleware');

        use('Ivy/Router').get('/:id', function (params) {
            return params.id;
        }, { middleware: 'test' });

        chai.request('http://localhost:3000')
            .get('/20')
            .end((err, res) => {
                res.should.have.property('text').that.equal('33');
                done();
            });
    });

    it('returns an error if it cannot go through the middleware', (done) => {
        bind('TestMiddleware1', () => {
            return function (data, next) {
                return next("Cant go through!");
            }
        });

        use('Ivy/MiddlewareContainer').registerMiddleware('test1', 'TestMiddleware1');

        use('Ivy/Router').get('/error', function (params) {
            return params.id;
        }, { middleware: 'test1' });

        chai.request('http://localhost:3000')
            .get('/error')
            .end((err, res) => {
                res.should.have.property('text').that.equals('Error piping through middleware. Cant go through!');
                res.should.have.property('statusCode').that.equals(500);
                done();
            });
    });
});