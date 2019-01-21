"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
}
Config.mongo = process.env.MONGODB_URI || 'mongodb://localdev:l0cald3v@localhost:27017/brewkeeper';
Config.dev = (process.env.NODE_ENV || 'development') === 'development';
Config.port = process.env.PORT || '3000';
exports.Config = Config;
//# sourceMappingURL=config.js.map