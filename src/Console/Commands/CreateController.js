let Commander = use('Ivy/Commander'),
    ClassScaffold = require('../Scaffold/ClassScaffold'),
    color = require('colors'),
    path = require('path');

Commander.register('make:controller')
    .description('Creates a new controller.')
    .usage('make:controller {name}')
    .option('--resource', function(command) {
        command.resource = true;
    }, 'Description of red option.')
    .execute((command) => {
        if (!command.parameters[0])
            return 'Missing controller name.';

        let generator = new ControllerScaffold(command.parameters[0], command.resource);

        generator.generateClass(path.join(process.env.PWD, 'app', 'controller', command.parameters[0] + '.js'));
        return `Controller ${command.parameters[0]} created.`.green;
    });


class ControllerScaffold extends ClassScaffold {
    constructor(controllerName, isResource) {
        super(controllerName);
        this.setNamespace(`App/Controller/${controllerName}`);

        if (isResource)
            this.addResourceMethods();
    }

    addResourceMethods() {
        this.addMethod('index', 'Show all the results.');
        this.addMethod('show', 'Show resource.\n\t*\n\t* @param request', ['request']);
        this.addMethod('create', 'Creates a resource.\n\t*\n\t* @param request', ['request']);
        this.addMethod('update', 'Updates a resource.\n\t*\n\t* @param request', ['request']);
        this.addMethod('remove', 'Delete a resource.\n\t*\n\t* @param request', ['request']);
    }
}