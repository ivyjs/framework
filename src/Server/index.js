const http = require('http');

class Server {
    constructor() {
        this.router = use('Ivy/Router');
    }

    /**
     * Start the application listener.
     */
    start() {
        http.createServer((req, res) => {
            this.router.resolveRoute(req, res);
        }).listen(use('Ivy/Config').get('app.port'));
    }
}

module.exports = Server;