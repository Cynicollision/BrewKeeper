import * as express from 'express';
import { BrewKeeperAppServer } from './app-server';
import { BrewData } from './data/brew-data';
import { BrewLogic } from './logic/brew-logic';
import { ProfileData } from './data/profile-data';
import { ProfileLogic } from './logic/profile-logic';
import { RecipeData } from './data/recipe-data';
import { RecipeLogic } from './logic/recipe-logic';

const brewData = new BrewData();
const profileData = new ProfileData();
const recipeData = new RecipeData();

const appServer = new BrewKeeperAppServer(
    new BrewLogic(brewData, profileData),
    new ProfileLogic(brewData, profileData),
    new RecipeLogic(recipeData, profileData),
);

appServer.start(express());
