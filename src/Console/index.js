let color = require('colors');

class Console {
    constructor() {
        this.commandsContainer = {};
    }

    /**
     * Registers a new command.
     *
     * @param namespace
     */
    addCommand(namespace) {
        let command = use(namespace);
        this.commandsContainer[command.commandName()] = namespace;
    }

    /**
     * Run a given command.
     *
     * @param command
     * @param parameters
     */
    run(command, parameters = {}) {
        if (!this.commandsContainer[command]) {
            console.error(`Command "${command}" not found.`.red);
            return false;
        }

        let Command = use(this.commandsContainer[command]);
        let action = new Command;

        if (command === 'help')
            parameters = this.commandsContainer;

        action.setCommandParameters(parameters);

        parameters[0] === '--help' || parameters[0] === '-h' ? Command.help() : action.run();
        return true;
    }
}

module.exports = Console;