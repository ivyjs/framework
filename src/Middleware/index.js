class MiddlewareContainer {
    constructor() {
        this.pipe = use('Ivy/Pipe');
        this.middlewaresList = {};
        this.middlewareGroups = {};
    }

    /**
     * Registers a new middleware, or a list of them.
     *
     * @param middleware
     * @param namespace
     */
    registerMiddleware(middleware, namespace) {
        if (!namespace) {
            for (let key in middleware)
                if (middleware.hasOwnProperty(key))
                    this.appendMiddleware(key, middleware[key]);
            return;
        }

        this.appendMiddleware(middleware, namespace);
    }

    /**
     * Appends the middleware to the list.
     *
     * @param name
     * @param middlewareNamespace
     */
    appendMiddleware(name, middlewareNamespace) {
        this.middlewaresList[name] = use(middlewareNamespace);
    }

    /**
     * Register a new group, or a list of them.
     *
     * @param group
     * @param list
     */
    registerGroup(group, list) {
        if (!list) {
            for (let key in group)
                if (group.hasOwnProperty(key))
                    this.appendGroup(key, group[key]);
            return;
        }
        this.appendGroup(group, list);
    }

    /**
     * Append a group of middlewares.
     *
     * @param name
     * @param keys
     */
    appendGroup(name, keys) {
        this.middlewareGroups[name] = keys;
    }

    /**
     * Parse a given list and get a handlers.
     *
     * @param middleware
     * @return {Array}
     */
    parse(middleware) {
        let handlersList = [];
        middleware = MiddlewareContainer.parseMiddlewareType(middleware);

        for (let i = 0, middlewareLength = middleware.length; i < middlewareLength; i++) {
            let tmpMiddleware;

            if (tmpMiddleware = this.middlewaresList[middleware[i]])
                handlersList.push(tmpMiddleware);
            else if (tmpMiddleware = this.middlewareGroups[middleware[i]]) {
                let group = this.resolveGroup(tmpMiddleware);
                handlersList = handlersList.concat(group);
            }
            else
                throw new Error(`Middleware ${middleware[i]} not found.`);
        }

        return handlersList;
    }

    /**
     * Ensure that its array.
     *
     * @param middleware
     * @return {[*]}
     */
    static parseMiddlewareType(middleware) {
        return !Array.isArray(middleware) ? [middleware] : middleware;
    }

    /**
     * Resolve a middlewares from group.
     *
     * @param group
     * @return {Array}
     */
    resolveGroup(group) {
        let resultList = [],
            tmpMiddleware;

        for (let i = 0, groupLength = group.length; i < groupLength; i++) {
            tmpMiddleware = this.middlewaresList[group[i]];

            if (!tmpMiddleware)
                throw new Error(`Middleware ${group[i]} not found.`);

            resultList.push(tmpMiddleware);
        }

        return resultList;
    }
}

module.exports = MiddlewareContainer;