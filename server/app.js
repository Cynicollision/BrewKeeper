"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app_server_1 = require("./app-server");
const brew_data_1 = require("./data/brew-data");
const brew_logic_1 = require("./logic/brew-logic");
const profile_data_1 = require("./data/profile-data");
const profile_logic_1 = require("./logic/profile-logic");
const recipe_data_1 = require("./data/recipe-data");
const recipe_logic_1 = require("./logic/recipe-logic");
const brewData = new brew_data_1.BrewData();
const profileData = new profile_data_1.ProfileData();
const recipeData = new recipe_data_1.RecipeData();
const appServer = new app_server_1.BrewKeeperAppServer(new brew_logic_1.BrewLogic(brewData, profileData), new profile_logic_1.ProfileLogic(brewData, profileData, recipeData), new recipe_logic_1.RecipeLogic(recipeData, profileData));
appServer.start(express());
//# sourceMappingURL=app.js.map