let Command = require('./Command'),
    Helper = use('Ivy/Helper');

class RouteList extends Command {
    /**
     * Get the command name.
     *
     * @return {string}
     */
    static commandName() {
        return 'route:list';
    }

    /**
     * Get the commands description.
     *
     * @return {string}
     */
    static description() {
        return "Show the list of available routes.";
    }

    /**
     * Run this command.
     */
    run() {
        let Router = use('Ivy/Router');

        console.log(Helper.padEnd('Method', 7, ' ') + Helper.padEnd('Route', 25, ' ') + Helper.padEnd('Handler', 25, ' ') + Helper.padEnd('Middleware', 15, ' '));
        console.log(Helper.padEnd('', 72, '-'));
        Router.routesList.forEach((route) => {
            let middleware = "";
            if (route.options && route.options.middleware)
                middleware = Array.isArray(route.options.middleware) ? route.options.middleware.join(', ') : [route.options.middleware].join(', ');

            console.log(`${Helper.padEnd(route.method, 7, ' ')}${Helper.padEnd(route.path, 25, ' ')}${Helper.padEnd(route.closure, 25, ' ')}${Helper.padEnd(middleware, 15, ' ')}`);
        });
    }
}

namespace('Ivy/Command/RouteList', RouteList);