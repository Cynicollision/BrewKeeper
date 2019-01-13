"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
}
Config.isDev = (process.env.NODE_ENV || 'development') === 'development';
Config.serverPort = 3000;
exports.Config = Config;
//# sourceMappingURL=config.js.map