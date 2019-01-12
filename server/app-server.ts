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
            console.log(`Brew Keeper server listening on port ${Config.serverPort} (${Config.isDev ? 'DEVELOPMENT' : 'PRODUCTION'} mode).`);
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

        // view engine
        app.set('views', __dirname + '/views');
        app.set('view engine', 'pug');

        // configure static path
        app.use(express.static(__dirname + '/../public'));

        // development-only middleware
        if (Config.isDev) {
            app.use(logger('dev'));

            // CORS for Angular development server 
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
        }
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

        // View route
        app.get('*', (req: express.Request, res: express.Response) => {
            res.render('index');
        });
    }
}