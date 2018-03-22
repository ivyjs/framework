const Commander = use('Ivy/Commander');
const Scaffold = require('../Scaffold');
const path = require('path');

Commander.register('make:middleware')
    .description('Creates a new middleware.')
    .usage('make:middleware {name}')
    .execute((command) => {
        if (!command.parameters[0]) {
            return 'Missing middleware name.';
        }

        let generator = new MiddlewareScaffold();

        generator.scaffoldMiddleware(command.parameters[0]);
        generator.generateFile(path.join(process.env.PWD, 'app', 'middleware', command.parameters[0] + '.js'));
        return `Middleware ${command.parameters[0]} created.`.green;
    });

class MiddlewareScaffold extends Scaffold {
    /**
     * Scaffold the middleware.
     *
     * @param name
     */
    scaffoldMiddleware(name) {
        this.setTemplate(
            `bind('App/${name}', function () {
    return function (data, next) {
        next();
    }
});`
        );
        this.bind({name: name});
    }
}
