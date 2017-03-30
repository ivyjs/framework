let Commander = use('Ivy/Commander'),
    color = require('colors'),
    Helper = use('Ivy/Helper');

Commander.register('route:list')
    .description("Show the list of available routes.")
    .usage("route:list")
    .execute(() => {
        let Router = use('Ivy/Router');
        let output = Helper.padEnd('Method', 7, ' ') + Helper.padEnd('Route', 25, ' ') + Helper.padEnd('Handler', 25, ' ') + Helper.padEnd('Middleware', 15, ' ') + '\n';
        output += Helper.padEnd('', 72, '-') + "\n";
        Router.routesList.forEach((route) => {
            let middleware = "";
            if (route.options && route.options.middleware)
                middleware = Array.isArray(route.options.middleware) ? route.options.middleware.join(', ') : [route.options.middleware].join(', ');

            output +=`${Helper.padEnd(route.method, 7, ' ')}${Helper.padEnd(route.path, 25, ' ')}${Helper.padEnd(route.closure, 25, ' ')}${Helper.padEnd(middleware, 15, ' ')}\n`;
        });
        return output;
    });