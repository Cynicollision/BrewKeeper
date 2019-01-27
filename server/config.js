"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
}
Config.authClientID = '2EHHIox2_2t01td8HfxYNpSuEZAVwLpH';
Config.authJwksUri = 'https://brewkeeper.auth0.com/.well-known/jwks.json';
Config.authUri = 'https://brewkeeper.auth0.com/';
Config.mongo = process.env.MONGODB_URI || 'mongodb://localdev:l0cald3v@localhost:27017/brewkeeper';
Config.dev = (process.env.NODE_ENV || 'development') === 'development';
Config.port = process.env.PORT || '3000';
exports.Config = Config;
//# sourceMappingURL=config.js.map