const HttpHash = require('http-hash');
const ControllerDispatcher = require('./ControllerDispatcher');

class Router {
    constructor() {
        this.GETRoutes = HttpHash();
        this.POSTRoutes = HttpHash();
        this.PUTRoutes = HttpHash();
        this.DELETERoutes = HttpHash();
        this.routesList = [];
    }

    /**
     * Creates a binding for a new route.
     *
     * @param method
     * @param routeUrl
     * @param binding
     * @param options
     */
    _registerRoute(method, routeUrl, binding, options) {
        this[method + 'Routes'].set(routeUrl, {closure: binding, options: options});
        this.routesList.push({
            method: method,
            path: routeUrl,
            options: options,
            closure: typeof binding === 'function' ? 'Function' : binding
        });
    }

    /**
     * Creates a get route.
     *
     * @param routeUrl
     * @param binding
     * @param options
     * @return {*}
     */
    get(routeUrl, binding, options) {
        return this._registerRoute('GET', routeUrl, binding, options);
    }

    /**
     * Creates a post route.
     *
     * @param routeUrl
     * @param binding
     * @param options
     * @return {*}
     */
    post(routeUrl, binding, options) {
        return this._registerRoute('POST', routeUrl, binding, options);
    }

    /**
     * Creates a put route.
     *
     * @param routeUrl
     * @param binding
     * @param options
     * @return {*}
     */
    put(routeUrl, binding, options) {
        return this._registerRoute('PUT', routeUrl, binding, options);
    }

    /**
     * Creates a delete route.
     *
     * @param routeUrl
     * @param binding
     * @param options
     * @return {*}
     */
    delete(routeUrl, binding, options) {
        return this._registerRoute('DELETE', routeUrl, binding, options);
    }

    /**
     * Resolve a given route.
     *
     * @param request
     * @param response
     */
    async resolveRoute(request, response) {
        const route = this.findMatchingRoute(request.method, request.url);

        if (!route.handler) {
            return this.notFoundResponse(response);
        }

        try {
            return await Router.goThroughMiddleware(route, request, response);
        } catch (e) {
            console.error('Error while trying to resolve route. ' + e);
            response.writeHead(500);
            response.end('Server error.');
            throw new Error(e);
        }
    }

    /**
     * Route not found
     * - return 404 error
     *
     * @param response
     */
    notFoundResponse(response) {
        response.writeHead(404);
        return response.end('Route not found');
    }

    /**
     * Find the matching route.
     *
     * @param method
     * @param route
     */
    findMatchingRoute(method, route) {
        return this[method + 'Routes'].get(route);
    }

    /**
     * Check if data should go through a middleware.
     *
     * @param route
     * @param request
     * @param response
     * @return {*}
     */
    static async goThroughMiddleware(route, request, response) {
        if (!Router.hasMiddlewareOption(route)) {
            try {
                return await Router.dispatchRoute(route, response);
            } catch (e) {
                throw new Error(e);
            }
        }

        return Router.pipeMiddleware(route, request, response);
    }

    /**
     * Pipe data through a middleware
     *
     * @param route
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    static async pipeMiddleware(route, request, response) {
        const middlewareContainer = use('Ivy/MiddlewareContainer');
        const Pipe = use('Ivy/Pipe');

        let middlewareList = middlewareContainer.parse(route.handler.options.middleware);

        return Pipe.data({route: route, request: request, response: response})
            .through(middlewareList)
            .catch((err) => {
                console.error(err);
                response.writeHead(500);
                return response.end('Error piping through middleware. ' + err);
            }).then(async(data) => {
                try {
                    return await Router.dispatchRoute(data.route, data.response);
                } catch (e) {
                    throw new Error(e);
                }
            });
    }

    /**
     * Check if route has middleware to go through.
     *
     * @param route
     * @return {string|string}
     */
    static hasMiddlewareOption(route) {
        return route.handler.options && route.handler.options.middleware;
    }

    /**
     * Dispatch a request to the handler.
     *
     * @param route
     * @param response
     * @return {*}
     */
    static async dispatchRoute(route, response) {
        const handler = route.handler.closure;
        try {
            const handlerResponse = typeof handler === 'string'
                ? await ControllerDispatcher.dispatchRoute(handler, route.params)
                : await handler(route.params);

            return Router.respondToRoute(handlerResponse, response);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Make a response to the request.
     *
     * @param handlerAnswer
     * @param response
     * @return {*}
     */
    static respondToRoute(handlerAnswer, response) {
        if (!handlerAnswer) {
            return response.end();
        }

        if (typeof handlerAnswer === 'string') {
            return response.end(handlerAnswer);
        }

        if (handlerAnswer['toString'] && typeof handlerAnswer !== 'object') {
            return response.end(handlerAnswer.toString());
        }

        try {
            response.setHeader('content-type', 'application/json');
            return response.end(JSON.stringify(handlerAnswer, null, 4));
        } catch (e) {
            console.error('Error while trying to stringify JSON object. ' + e);
            response.writeHead(500);
            return response.end('Server error.');
        }
    }

    /**
     * Creates a new resource.
     *
     * @param resourceName
     * @param controllerHandler
     * @param options
     */
    resource(resourceName, controllerHandler, options = {}) {
        this.get(resourceName, `${controllerHandler}@index`, options);
        this.get(`${resourceName}/:id`, `${controllerHandler}@show`, options);
        this.post(`${resourceName}`, `${controllerHandler}@create`, options);
        this.put(`${resourceName}/:id`, `${controllerHandler}@update`, options);
        this.delete(`${resourceName}/:id`, `${controllerHandler}@remove`, options);
    }
}

module.exports = Router;
