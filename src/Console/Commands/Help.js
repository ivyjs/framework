let Command = require('./Command'),
    Helper = use('Ivy/Helper');

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
            console.log(`  ${Helper.padEnd(command.commandName(), 20, ' ').green}${command.description()}`);
        }
    }
}

namespace('Ivy/Command/Help', Help);