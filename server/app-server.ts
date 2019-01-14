import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
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
        this.connectDatabase();

        app.listen(Config.port, () => {
            console.log(`Brew Keeper server listening on port ${Config.port} (${Config.dev ? 'DEVELOPMENT' : 'PRODUCTION'} mode).`);
        });
    }

    private configureMiddleware(app: express.Application): void {

        // request-parsing middleware
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // session middleware
        app.use(session({
            secret: 'wmdtug',
            resave: false,
            saveUninitialized: true,
        }));

        // configure static path
        app.use(express.static(__dirname + '/../public'));

        // development-only middleware
        if (Config.dev) {
            app.use(logger('dev'));

            // CORS for Angular development server 
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
        }
    }

    private connectDatabase(): void {
        mongoose.connect(Config.mongo, { useNewUrlParser: true });
        mongoose.connection.on('error', () => console.log('Connection to Brew Keeper DB failed.'));
        mongoose.connection.once('open', () => console.log('Connected to Brew Keeper DB.'));
    }

    private configureRoutes(app: express.Application): void {
        // Auth routes
        app.post('/login', (req: express.Request, res: express.Response) => {
            this.profileLogic.login(req.body.token, req.body.externalID).then(response => {
                if (response.success) {
                    req.session.profileID = response.data.id;
                }
                res.send(response);
            });
        });

        app.post('/register', (req: express.Request, res: express.Response) => {
            this.profileLogic.register(req.body.token, req.body.profile).then(response => {
                if (response.success) {
                    req.session.profileID = response.data.id;
                }
                res.send(response);
            });
        });

        app.post('/logout', (req: express.Request, res: express.Response) => {
            req.session.profileID = null;
            res.send(200);
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