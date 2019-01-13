"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const config_1 = require("./config");
class BrewKeeperAppServer {
    constructor(brewLogic) {
        this.brewLogic = brewLogic;
    }
    start(app) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
        app.listen(config_1.Config.serverPort, () => {
            console.log(`Brew Keeper server listening on port ${config_1.Config.serverPort} (${config_1.Config.isDev ? 'DEVELOPMENT' : 'PRODUCTION'} mode).`);
        });
    }
    configureMiddleware(app) {
        // request-parsing middleware
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        // session middleware
        app.use(session({
            secret: 'wmdtug',
            resave: false,
            saveUninitialized: true,
        }));
        // view engine
        app.set('views', __dirname + '/views');
        app.set('view engine', 'pug');
        // configure static path
        app.use(express.static(__dirname + '/../public'));
        // development-only middleware
        if (config_1.Config.isDev) {
            app.use(logger('dev'));
            // CORS for Angular development server 
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
        }
    }
    configureRoutes(app) {
        // API routes
        app.get('/api/brew', (req, res) => {
            let brewID = req.query.id;
            this.brewLogic.get(brewID).then(response => res.send(response));
        });
        app.post('/api/brew', (req, res) => {
            this.brewLogic.create(req.body).then(response => res.send(response));
        });
        app.post('/api/brew/:id', (req, res) => {
            let brewID = req.params.id;
            this.brewLogic.update(req.body).then(response => res.send(response));
        });
        // View route
        app.get('*', (req, res) => {
            res.render('index');
        });
    }
}
exports.BrewKeeperAppServer = BrewKeeperAppServer;
//# sourceMappingURL=app-server.js.map