"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const config_1 = require("./config");
class BrewKeeperAppServer {
    constructor(brewLogic, profileLogic) {
        this.brewLogic = brewLogic;
        this.profileLogic = profileLogic;
    }
    start(app) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
        this.connectDatabase().then(connected => {
            if (connected) {
                app.listen(config_1.Config.port, () => {
                    console.log(`Brew Keeper server listening on port ${config_1.Config.port} (${config_1.Config.dev ? 'DEVELOPMENT' : 'PRODUCTION'} mode).`);
                });
            }
        });
    }
    configureMiddleware(app) {
        // request-parsing middleware
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        // development-only middleware
        if (config_1.Config.dev) {
            app.use(logger('dev'));
            // CORS for Angular development server 
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
                next();
            });
        }
        // configure static path
        app.use(express.static(__dirname + '/../public'));
        // configure jwt handling
        app.use(jwt({
            secret: jwksRsa.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: config_1.Config.authJwksUri,
            }),
            audience: config_1.Config.authClientID,
            issuer: config_1.Config.authUri,
            algorithms: ['RS256']
        }).unless({
            path: [
                '/',
                '/callback'
            ]
        }));
        // custom error-handling middleware
        app.use((err, req, res, next) => {
            if (err.name === 'UnauthorizedError') {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
                //return res.sendFile(__dirname + './../public/index.html');
            }
        });
    }
    connectDatabase() {
        return new Promise((resolve, reject) => {
            mongoose.connect(config_1.Config.mongo, { useNewUrlParser: true });
            mongoose.connection.on('error', () => {
                console.log('Fatal: Brew Keeper DB connection failed.');
                resolve(false);
            });
            mongoose.connection.once('open', () => {
                console.log('Connected to Brew Keeper DB.');
                resolve(true);
            });
            resolve(true);
        });
    }
    configureRoutes(app) {
        // Auth routes
        app.post('/api/login', (req, res) => {
            // if (!req.user) {
            //     res.send(403);
            //     return;
            // }
            this.profileLogic.login(req.user.sub).then(response => {
                res.send(response);
            });
        });
        app.post('/api/register', (req, res) => {
            // if (!req.user) {
            //     res.send(403);
            //     return;
            // }
            this.profileLogic.register(req.user.sub, req.body.userName).then(response => {
                res.send(response);
            });
        });
        // API routes
        app.get('/api/brew', (req, res) => {
            this.brewLogic.get(req.query.id).then(response => res.send(response));
        });
        app.post('/api/brew', (req, res) => {
            this.brewLogic.create(req.session.profileID, req.body).then(response => res.send(response));
        });
        app.post('/api/brew/:id', (req, res) => {
            this.brewLogic.update(req.session.profileID, req.params.id, req.body).then(response => res.send(response));
        });
        app.get('*', (req, res) => {
            return res.sendFile(path.resolve(__dirname + './../public/index.html'));
        });
    }
}
exports.BrewKeeperAppServer = BrewKeeperAppServer;
//# sourceMappingURL=app-server.js.map