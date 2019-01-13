"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
}
Config.isDev = (process.env.NODE_ENV || 'development') === 'development';
Config.serverPort = process.env.PORT || 3000;
exports.Config = Config;
//# sourceMappingURL=config.js.map