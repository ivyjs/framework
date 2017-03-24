class Command {

    constructor() {
        this.parameters = [];
    }

    /**
     * Return the default command name.
     *
     * @return {string}
     */
    static commandName() {
        return "default";
    }

    /**
     * Return the default command description.
     *
     * @return {string}
     */
    static description() {
        return "default";
    }

    /**
     * Execute the command.
     */
    run() {
        console.log("Override me!");
        return false;
    }

    /**
     * Display command help.
     *
     * @return {boolean}
     */
    static help() {
        return false;
    }

    /**
     * Set command parameters.
     *
     * @param params
     */
    setCommandParameters(params) {
        this.parameters = params;
    }
}

module.exports = Command;