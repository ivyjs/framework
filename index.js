require('./src/Ioc');

module.exports = require('./src/Server');

let config = require('./src/Config');
let c = new config();
c.loadConfig();