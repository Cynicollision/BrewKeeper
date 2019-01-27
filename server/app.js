"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const brew_data_1 = require("./data/brew-data");
const profile_data_1 = require("./data/profile-data");
const brew_logic_1 = require("./logic/brew-logic");
const profile_logic_1 = require("./logic/profile-logic");
const app_server_1 = require("./app-server");
const brewData = new brew_data_1.BrewData();
const profileData = new profile_data_1.ProfileData();
const appServer = new app_server_1.BrewKeeperAppServer(new brew_logic_1.BrewLogic(brewData, profileData), new profile_logic_1.ProfileLogic(brewData, profileData));
appServer.start(express());
//# sourceMappingURL=app.js.map