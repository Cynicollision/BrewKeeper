import * as express from 'express';
import { BrewData } from './data/brew-data';
import { ProfileData } from './data/profile-data';
import { BrewLogic } from './logic/brew-logic';
import { ProfileLogic } from './logic/profile-logic';
import { BrewKeeperAppServer } from './app-server';

const brewData = new BrewData();
const profileData = new ProfileData();

const appServer = new BrewKeeperAppServer(
    new BrewLogic(brewData, profileData),
    new ProfileLogic(brewData, profileData));

appServer.start(express());
