let Helper = use('Ivy/Helper');

class Command {

    constructor(commandName) {
        this.parameters = [];
        this.commandName = commandName;
        this.descriptionText = '';
        this.usageText = '';
        this.parameters = [];
        this.options = {};
        this.callback = () => {};
    }

    /**
     * Sets a command name.
     *
     * @param commandName
     * @return {Command}
     */
    name(commandName) {
        this.commandName = commandName;
        return this;
    }

    /**
     * Set usage example.
     *
     * @param usage
     */
    usage(usage) {
        this.usageText = usage;
        return this;
    }

    /**
     * Sets the description of command.
     *
     * @param descriptionText
     * @return {Command}
     */
    description(descriptionText) {
        this.descriptionText = descriptionText;
        return this;
    }

    /**
     * Adds a new option.
     *
     * @param optionName
     * @param callback
     * @param description
     * @return {Command}
     */
    option(optionName, callback, description = '') {
        this.options[optionName] = {
            callback: callback,
            description: description
        };
        return this;
    }

    /**
     * Sets the command callback.
     *
     * @param callback
     * @return {Command}
     */
    execute(callback) {
        this.callback = callback;
        return this;
    }

    /**
     * Returns the help text.
     *
     * @return {string}
     */
    help() {
        let help = `Command: 
    ${this.commandName}
Description: 
    ${this.descriptionText}
`;

        if (this.usageText)
            help += `Usage: 
    ${this.usageText}
`;

        help += "Options:\n";

        for (let option in this.options)
            help += `  ${Helper.padEnd(option, 15, ' ')}  ${this.options[option].description}\n`;

        help += `  ${Helper.padEnd('--help', 15, ' ')}  Show help menu`;

        return help;
    }

    /**
     * Execute the command.
     */
    run(parameters, options) {
        this.parameters = parameters;

        options.forEach((option) => {
            if (this.options[option])
                this.options[option].callback(this);
        });

        return this.callback(this);
    }
}

module.exports = Command;