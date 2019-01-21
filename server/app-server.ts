import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jwksRsa from 'jwks-rsa';
import * as jwt from'express-jwt';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import { Config } from './config';
import { IBrewLogic } from './logic/brew-logic';
import { IProfileLogic } from './logic/profile-logic';

export class BrewKeeperAppServer {
    private brewLogic: IBrewLogic;
    private profileLogic: IProfileLogic;

    constructor(brewLogic: IBrewLogic, profileLogic: IProfileLogic) {
        this.brewLogic = brewLogic;
        this.profileLogic = profileLogic;
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

        // configure static path
        app.use(express.static(__dirname + '/../public'));

        // configure jwt handling
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
            path:[
              '/',
            ]}
        ));

        // custom error-handling middleware
        app.use((err, req, res, next) => {
            if (err.name === 'UnauthorizedError') {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        });

        // development-only middleware
        if (Config.dev) {
            app.use(logger('dev'));

            // CORS for Angular development server 
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
                next();
            });
        }
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
        // Auth routes
        app.post('/api/login', (req: express.Request, res: express.Response) => {
            if (!req.user) {
                res.send(403);
                return;
            }
            this.profileLogic.login(req.user.sub).then(response => {
                res.send(response);
            });
        });

        app.post('/api/register', (req: express.Request, res: express.Response) => {
            if (!req.user) {
                res.send(403);
                return;
            }
            this.profileLogic.register(req.user.sub, req.body.userName).then(response => {
                res.send(response);
            });
        });

        // API routes
        app.get('/api/brew', (req: express.Request, res: express.Response) => {
            this.brewLogic.get(req.query.id).then(response => res.send(response));
        });

        app.post('/api/brew', (req: express.Request, res: express.Response) => {
            this.brewLogic.create(req.session.profileID, req.body).then(response => res.send(response));
        });

        app.post('/api/brew/:id', (req: express.Request, res: express.Response) => {
            this.brewLogic.update(req.session.profileID, req.params.id, req.body).then(response => res.send(response));
        });
    }
}