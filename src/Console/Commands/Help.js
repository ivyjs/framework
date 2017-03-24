let Command = require('./Command');

class Help extends Command {
    /**
     * Get the command name.
     *
     * @return {string}
     */
    static commandName() {
        return 'help';
    }

    /**
     * Get the commands description.
     *
     * @return {string}
     */
    static description() {
        return "Show the list of available commands.";
    }

    /**
     * Run this command.
     */
    run() {
        console.log('Available commands:');
        for (let key in this.parameters) {
            let command = use(this.parameters[key]);
            console.log(`  ${Help.padEnd(command.commandName(), 20, ' ').green}${command.description()}`);
        }
    }

    /**
     * Add char on the remaining place until length is reached.
     *
     * @param string
     * @param length
     * @param chars
     * @return {*}
     */
    static padEnd(string, length, chars) {
        const strLength = length ? string.length : 0;
        return (length && strLength < length)
            ? (string + chars.repeat(length - strLength))
            : string
    }
}

namespace('Ivy/Command/Help', Help);