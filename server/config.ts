export class Config {
    static readonly authClientID = '2EHHIox2_2t01td8HfxYNpSuEZAVwLpH';
    static readonly authJwksUri = 'https://brewkeeper.auth0.com/.well-known/jwks.json';
    static readonly authUri = 'https://brewkeeper.auth0.com/';
    static readonly mongo = process.env.MONGODB_URI || 'mongodb://heroku_plkzjqr5:v0fncearcvi9akue09see6jhtq@ds255794.mlab.com:55794/heroku_plkzjqr5'
    static readonly dev = (process.env.NODE_ENV || 'development') === 'development';
    static readonly port = process.env.PORT || '3000';
}