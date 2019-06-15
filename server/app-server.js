"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const config_1 = require("./config");
class BrewKeeperAppServer {
    constructor(brewLogic, profileLogic, recipeLogic) {
        this.brewLogic = brewLogic;
        this.profileLogic = profileLogic;
        this.recipeLogic = recipeLogic;
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
                res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
                next();
            });
        }
        // configure static path
        app.use(express.static(__dirname + '/../public'));
        // configure jwt handling for authorized API routes
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
            path: /^(?!\/api.*$).*/
        }));
        // custom error-handling middleware for unauthorized API requests
        app.use((err, req, res, next) => {
            if (err.name === 'UnauthorizedError') {
                return res.status(403).send({
                    success: false,
                    message: 'Not authorized to call API.',
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
        // profile routes
        app.post('/api/login', (req, res) => {
            let externalID = req.user.sub || '';
            this.profileLogic.login(externalID).then(response => res.send(response));
        });
        app.post('/api/register', (req, res) => {
            let externalID = this.getReqExternalID(req);
            let profile = this.getReqBody(req);
            this.profileLogic.register(externalID, profile.name).then(response => res.send(response));
        });
        app.get('/api/profile-data', (req, res) => {
            let externalID = this.getReqExternalID(req);
            let profileID = req.query.id;
            this.profileLogic.getProfileData(externalID, profileID).then(response => res.send(response));
        });
        // brew routes
        app.get('/api/brew', (req, res) => {
            this.brewLogic.get(req.query.id).then(response => res.send(response));
        });
        app.post('/api/brew', (req, res) => {
            let externalID = this.getReqExternalID(req);
            let brew = this.getReqBody(req);
            this.brewLogic.create(externalID, brew).then(response => res.send(response));
        });
        app.post('/api/brew/:id', (req, res) => {
            let externalID = this.getReqExternalID(req);
            let brew = this.getReqBody(req);
            this.brewLogic.update(externalID, brew).then(response => res.send(response));
        });
        app.delete('/api/brew/:id', (req, res) => {
            let externalID = this.getReqExternalID(req);
            let brewID = this.getReqParam(req, 'id');
            this.brewLogic.delete(externalID, brewID).then(response => res.send(response));
        });
        // recipe routes
        app.get('/api/recipe', (req, res) => {
            this.recipeLogic.get(req.query.id).then(response => res.send(response));
        });
        app.post('/api/recipe', (req, res) => {
            let externalID = this.getReqExternalID(req);
            let recipe = this.getReqBody(req);
            this.recipeLogic.create(externalID, recipe).then(response => res.send(response));
        });
        app.post('/api/recipe/:id', (req, res) => {
            let externalID = this.getReqExternalID(req);
            let recipe = this.getReqBody(req);
            this.recipeLogic.update(externalID, recipe).then(response => res.send(response));
        });
        app.delete('/api/recipe/:id', (req, res) => {
            let externalID = this.getReqExternalID(req);
            let recipe = this.getReqParam(req, 'id');
            this.recipeLogic.delete(externalID, recipe).then(response => res.send(response));
        });
        app.get('*', (req, res) => {
            return res.sendFile(path.resolve(__dirname + './../public/index.html'));
        });
        app.get('*', (req, res) => {
            return res.sendFile(path.resolve(__dirname + './../public/index.html'));
        });
    }
    getReqExternalID(req) {
        return (req.user || {}).sub;
    }
    getReqParam(req, name) {
        return (req.params || {})[name];
    }
    getReqBody(req) {
        return (req.body || {});
    }
}
exports.BrewKeeperAppServer = BrewKeeperAppServer;
//# sourceMappingURL=app-server.js.map