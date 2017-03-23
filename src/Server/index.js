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
            this.router.resolveRoute(req.method, req.url, res);
        }).listen(use('Ivy/Config').get('app.port'));
    }
}

module.exports = Server;