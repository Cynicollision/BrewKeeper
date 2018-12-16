import * as express from 'express';
import { BrewData } from './data/brew-data';
import { BrewLogic } from './logic/brew-logic';
import { BrewKeeperAppServer } from './app-server';

new BrewKeeperAppServer(new BrewLogic(new BrewData())).start(express());