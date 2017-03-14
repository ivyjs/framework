const http = require('http');

class Server {
    constructor() {
        this.boot();
    }

    /**
     * Boot up the server desired services and configs.
     */
    boot() {
        this.router = use('Ivy/Router');
    }

    /**
     * Start the application listener.
     */
    start() {
        http.createServer((req, res) => {
            this.router.resolveRoute(req.method, req.url, res);
        }).listen(3000);
    }
}

module.exports = Server;