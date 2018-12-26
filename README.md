# Brew Keeper

[![Build Status](https://travis-ci.org/Cynicollision/BrewKeeper.svg?branch=master)](https://travis-ci.org/Cynicollision/BrewKeeper)

Work in progress home brew journal for tracking bottling and refrigeration dates.

## Build/Develop
### Client (Angular)
Install dependencies, run unit and end-to-end tests:
```
npm install
ng test
ng e2e
```
Start the development server:
```
ng server
```
### Server (Node/Express)
Install dependencies, compile TypeScript, run tests:
```
npm install
tsc
npm test
```
Start the sever:
```
cd server
node app
```
Note: Use `tsc -w` while actively developing.