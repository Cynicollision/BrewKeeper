"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const brew_data_1 = require("./data/brew-data");
const brew_logic_1 = require("./logic/brew-logic");
const app_server_1 = require("./app-server");
new app_server_1.BrewKeeperAppServer(new brew_logic_1.BrewLogic(new brew_data_1.BrewData())).start(express());
//# sourceMappingURL=app.js.map