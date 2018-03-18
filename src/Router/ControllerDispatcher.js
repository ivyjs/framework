class ControllerDispatcher {
    /**
     * Dispatch a route to the controller.
     *
     * @param handler
     * @param parameters
     */
    static async dispatchRoute(handler, parameters) {
        let [controllerName, methodName] = handler.split('@');

        let controller = ControllerDispatcher.getController(controllerName);
        try {
            return await app().call(controller, methodName, parameters);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Returns a controller instance.
     *
     * @param controllerName
     */
    static getController(controllerName) {
        return app().make(`App/Controller/${controllerName}`);
    }
}

module.exports = ControllerDispatcher;