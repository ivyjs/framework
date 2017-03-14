let HttpHash = require('http-hash');

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
        this[method + 'Routes'].set(routeUrl, binding);
        this.routesList.push({ method: method, path: routeUrl, options: options });
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
     * @param httpMethod
     * @param routeUrl
     * @param res
     */
    resolveRoute(httpMethod, routeUrl, res) {
        let route = this.findMatchingRoute(httpMethod, routeUrl);

        if (route.handler)
            return route.handler(res);

        return res.end('Route not found');
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
}

module.exports = Router;