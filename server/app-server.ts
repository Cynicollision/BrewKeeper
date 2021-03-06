import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jwksRsa from 'jwks-rsa';
import * as jwt from'express-jwt';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { Config } from './config';
import { IBrewLogic } from './logic/brew-logic';
import { IProfileLogic } from './logic/profile-logic';
import { IRecipeLogic } from './logic/recipe-logic';
import { Brew } from '../shared/models/Brew';
import { Profile } from '../shared/models/Profile';
import { Recipe } from '../shared/models/Recipe';

export class BrewKeeperAppServer {
    private brewLogic: IBrewLogic;
    private profileLogic: IProfileLogic;
    private recipeLogic: IRecipeLogic;

    constructor(brewLogic: IBrewLogic, profileLogic: IProfileLogic, recipeLogic: IRecipeLogic) {
        this.brewLogic = brewLogic;
        this.profileLogic = profileLogic;
        this.recipeLogic = recipeLogic
    }

    start(app: express.Application) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
        
        this.connectDatabase().then(connected => {
            if (connected) {
                app.listen(Config.port, () => {
                    console.log(`Brew Keeper server listening on port ${Config.port} (${Config.dev ? 'DEVELOPMENT' : 'PRODUCTION'} mode).`);
                });
            }
        });
    }

    private configureMiddleware(app: express.Application): void {

        // request-parsing middleware
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // development-only middleware
        if (Config.dev) {
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
                jwksUri: Config.authJwksUri,
            }),
            audience: Config.authClientID,
            issuer: Config.authUri,
            algorithms: [ 'RS256' ]
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
            }
        });
    }

    private connectDatabase(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            mongoose.connect(Config.mongo, { useNewUrlParser: true });
            mongoose.connection.on('error', () => { 
                console.log('Fatal: Brew Keeper DB connection failed.');
                resolve(false);
            });
            mongoose.connection.once('open', () => {
                console.log('Connected to Brew Keeper DB.');
                resolve(true);
            });
        });
    }

    private configureRoutes(app: express.Application): void {
        // profile routes
        app.post('/api/login', (req: express.Request, res: express.Response) => {
            let externalID = req.user.sub || '';
            this.profileLogic.login(externalID).then(response => res.send(response));
        });

        app.post('/api/register', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let profile = this.getReqBody<Profile>(req);
            this.profileLogic.register(externalID, profile.name).then(response => res.send(response));
        });

        app.get('/api/profile-data', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let profileID = req.query.id;
            this.profileLogic.getProfileData(externalID, profileID).then(response => res.send(response));
        });

        // brew routes
        app.get('/api/brew', (req: express.Request, res: express.Response) => {
            this.brewLogic.get(req.query.id).then(response => res.send(response));
        });

        app.post('/api/brew', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let brew = this.getReqBody<Brew>(req);
            this.brewLogic.create(externalID, brew).then(response => res.send(response));
        });

        app.post('/api/brew/:id', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let brew = this.getReqBody<Brew>(req);
            this.brewLogic.update(externalID, brew).then(response => res.send(response));
        });

        app.delete('/api/brew/:id', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let brewID = this.getReqParam(req, 'id');
            this.brewLogic.delete(externalID, brewID).then(response => res.send(response));
        });

        // recipe routes
        app.get('/api/recipe', (req: express.Request, res: express.Response) => {
            this.recipeLogic.get(req.query.id).then(response => res.send(response));
        });

        app.post('/api/recipe', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let recipe = this.getReqBody<Recipe>(req);
            this.recipeLogic.create(externalID, recipe).then(response => res.send(response));
        });

        app.post('/api/recipe/:id', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let recipe = this.getReqBody<Recipe>(req);
            this.recipeLogic.update(externalID, recipe).then(response => res.send(response));
        });

        app.delete('/api/recipe/:id', (req: express.Request, res: express.Response) => {
            let externalID = this.getReqExternalID(req);
            let recipe = this.getReqParam(req, 'id');
            this.recipeLogic.delete(externalID, recipe).then(response => res.send(response));
        });

        app.get('*', (req: express.Request, res: express.Response) => {
            return res.sendFile(path.resolve(__dirname + './../public/index.html'));
        });
    }

    private getReqExternalID(req: express.Request): string {
        return (req.user || {}).sub;
    }

    private getReqParam(req: express.Request, name: string): string {
        return (req.params || {})[name];
    }

    private getReqBody<T>(req: express.Request): T {
        return <T>(req.body || {});
    }
}
