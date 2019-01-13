import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import { Config } from './config';
import { IBrewLogic } from './logic/brew-logic';

export class BrewKeeperAppServer {
    private brewLogic: IBrewLogic;

    constructor(brewLogic: IBrewLogic) {
        this.brewLogic = brewLogic;
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
        // API routes
        app.get('/api/brew', (req: express.Request, res: express.Response) => {
            let brewID = req.query.id;
            this.brewLogic.get(brewID).then(response => res.send(response));
        });

        app.post('/api/brew', (req: express.Request, res: express.Response) => {
            this.brewLogic.create(req.body).then(response => res.send(response));
        });

        app.post('/api/brew/:id', (req: express.Request, res: express.Response) => {
            let brewID = req.params.id;
            this.brewLogic.update(req.body).then(response => res.send(response));
        });
    }
}