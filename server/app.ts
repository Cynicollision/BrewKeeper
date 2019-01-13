import * as express from 'express';
import { BrewData } from './data/brew-data';
import { ProfileData } from './data/profile-data';
import { BrewLogic } from './logic/brew-logic';
import { ProfileLogic } from './logic/profile-logic';
import { BrewKeeperAppServer } from './app-server';

const appServer = new BrewKeeperAppServer(
    new BrewLogic(new BrewData()),
    new ProfileLogic(new ProfileData()));
appServer.start(express());