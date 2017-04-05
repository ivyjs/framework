'use strict';

const Console = require('.');

singleton('Ivy/Commander', function () {
    return new Console;
});

require('./Commands/Help');
require('./Commands/RouteList');

require('./Commands/CreateController');
require('./Commands/CreateMiddleware');
