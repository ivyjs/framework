let Command = require('./Command'),
    Scaffold = require('../Scaffold'),
    color = require('colors'),
    path = require('path');

class CreateMiddleware extends Command {

    constructor() {
        super();
        this.scaffold = new Scaffold();
    }

    /**
     * Get the command name.
     *
     * @return {string}
     */
    static commandName() {
        return 'make:middleware';
    }

    /**
     * Get the command description.
     *
     * @return {string}
     */
    static description() {
        return "Creates new middleware.";
    }

    /**
     * Display a help of a command.
     */
    static help() {
        let help = `Description:
  ${CreateMiddleware.description()}
Usage: 
  'node ivy make:middleware {middlewareName}'`;
        console.log(help);
    }

    /**
     * Run the command.
     */
    run() {
        if (!this.parameters[0])
            console.log('Missing middleware name.');

        this.scaffoldMiddleware(this.parameters[0]);
        this.scaffold.generateFile(path.join(process.env.PWD, 'app', 'middleware', this.parameters[0] + '.js'));
        console.log(`Middleware ${this.parameters[0]} created.`.green);
    }

    /**
     * Scaffold the middleware.
     *
     * @param name
     */
    scaffoldMiddleware(name) {
        this.scaffold.setTemplate(
            `bind('App/${name}', function () {
    return function (data, next) {
        next();
    }
});`
        );
        this.scaffold.bind({name: name});
    }
}

namespace('Ivy/Command/CreateMiddleware', CreateMiddleware);