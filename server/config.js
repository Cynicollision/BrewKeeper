"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
}
Config.mongo = process.env.MONGODB_URI || 'mongodb://heroku_plkzjqr5:v0fncearcvi9akue09see6jhtq@ds255794.mlab.com:55794/heroku_plkzjqr5';
Config.dev = (process.env.NODE_ENV || 'development') === 'development';
Config.port = process.env.PORT || '3000';
exports.Config = Config;
//# sourceMappingURL=config.js.map