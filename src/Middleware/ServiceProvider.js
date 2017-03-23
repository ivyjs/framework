const Middleware = require('.');

singleton('Ivy/MiddlewareContainer', () => {
    return new Middleware;
});