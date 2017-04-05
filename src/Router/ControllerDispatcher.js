class ControllerDispatcher {
    /**
     * Dispatch a route to the controller.
     *
     * @param handler
     * @param parameters
     */
    static dispatchRoute(handler, parameters) {
        let [controllerName, methodName] = handler.split('@');

        let controller = ControllerDispatcher.getController(controllerName);

        return app().call(controller, methodName, parameters);
    }

    /**
     * Returns a controller instance.
     *
     * @param controllerName
     */
    static getController(controllerName) {
        return use(`App/Controller/${controllerName}`);
    }
}

module.exports = ControllerDispatcher;