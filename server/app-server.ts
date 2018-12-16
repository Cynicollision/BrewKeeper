import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
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

        app.listen(Config.serverPort, () => {
            console.log('Starting %s mode', (Config.isDev ? 'DEVELOPMENT' : 'PRODUCTION'));
            console.log('Express server listening on port ' + Config.serverPort);
        });
    }

    private configureRoutes(app: express.Application): void {
        // API routes
        app.post('/api/brew', (req: express.Request, res: express.Response) => {
            let brewName = req.body.brewName;
            this.brewLogic.create(brewName).then(response => res.send(response));
        });

        app.get('/api/brew', (req: express.Request, res: express.Response) => {
            let brewID = req.query.id;
            this.brewLogic.get(brewID).then(response => res.send(response));
        });

        // View route
        app.get('', (req: express.Request, res: express.Response) => {
            res.render('index', { message: 'Hello Brew Keeper' });
        });
    }

    private configureMiddleware(app: express.Application): void {

        // request-parsing middleware
        app.use(bodyParser.urlencoded({ extended: true })); // TODO: not sure if needed
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
        if (Config.isDev) {
            app.use(logger('dev'));
        }
    }
}