const dotEnv = require('dotenv');
const ObjectHelper = require('../Util/ObjectHelper');

class Config {
    constructor() {
        this.configs = new ObjectHelper();
    }

    /**
     * Load Config using .env
     */
    loadEnvConfigs() {
        dotEnv.config({
            verbose: true
        });
    }

    /**
     * Load env variables from a given path.
     *
     * @param path
     */
    loadEnvFromPath(path) {
        dotEnv.config({
            path: path
        });
    }

    /**
     * Return variable if its set into the .env, otherwise returns the default
     * value.
     *
     * @param key
     * @param defaultValue
     * @return {*}
     */
    env(key, defaultValue) {
        return !!process.env[key] ? process.env[key] : defaultValue;
    }

    /**
     * Load config from file.
     *
     * @param configName
     * @param configData
     */
    loadConfig(configName, configData) {
        this.configs.collection[configName] = configData;
    }

    /**
     * Get config using dot notation.
     *
     * @param property
     * @param defaultValue
     */
    get(property, defaultValue) {
        return this.configs.getWithDotNotation(property, defaultValue)
    }
}

module.exports = Config;
