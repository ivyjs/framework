const Config = require('.');

singleton('Ivy/Config', function() {
    let configInstance = new Config();
    global.env = configInstance.env;
    return configInstance;
});
