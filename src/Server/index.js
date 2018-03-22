const http = require('http');

class Server {
    constructor() {
        this.router = use('Ivy/Router');
    }

    /**
     * Start the application listener.
     */
    start() {
        const port = use('Ivy/Config').get('app.port');

        http.createServer((req, res) => {
            this.router.resolveRoute(req, res);
        })
            .listen(port);
    }
}

module.exports = Server;
