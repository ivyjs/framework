let config = require('.');

singleton('Ivy/Config', function () {
    let c = new config;
    global.env = c.env;
    return c;
});