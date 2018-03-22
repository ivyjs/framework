const Command = require('./Commands/Command');

class Console {
    constructor() {
        this.commandsContainer = {};
    }

    /**
     * Registers a new command and return a builder instance
     *
     * @param commandName
     * @return {Command}
     */
    register(commandName) {
        let tempCommand = new Command(commandName);
        this.commandsContainer[commandName] = tempCommand;
        return tempCommand;
    }

    /**
     * Returns the list of the commands.
     *
     * @return {Object}
     */
    getCommandsList() {
        return this.commandsContainer;
    }

    /**
     * Execute a command.
     *
     * @param argumentsList
     * @return {*}
     */
    run(argumentsList) {
        if (!this.commandsContainer[argumentsList[0]]) {
            return false;
        }

        if (argumentsList.includes('--help')) {
            return this.runHelp(argumentsList[0]);
        }

        let filteredArguments = this.filterArguments(argumentsList.slice(1));
        let command = this.commandsContainer[argumentsList[0]];
        return this.consolePrint(command.run(filteredArguments.parameters, filteredArguments.options));
    }

    /**
     * Outputs the desired text in console.
     *
     * @param content
     */
    consolePrint(content) {
        console.log(content);
        return true;
    }

    /**
     * Run a help of the command.
     *
     * @param command
     * @return {*|string}
     */
    runHelp(command) {
        this.consolePrint(this.commandsContainer[command].help());
        return true;
    }

    /**
     * Filter arguments to get options and params list
     *
     * @param argumentsList
     * @return {{parameters: Array, options: Array}}
     */
    filterArguments(argumentsList) {
        let params = [];
        let options = [];

        if (Array.isArray(argumentsList)) {
            argumentsList.forEach(argument => {
                argument.startsWith('--') ? options.push(argument) : params.push(argument);
            });
        }

        return { parameters: params, options: options };
    }
}

module.exports = Console;
