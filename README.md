# Brew Keeper

[![Build Status](https://travis-ci.org/Cynicollision/BrewKeeper.svg?branch=master)](https://travis-ci.org/Cynicollision/BrewKeeper)

Journal for home brewers that helps track bottling and refrigeration dates.

**Work in progress!**

## Build/Develop
#### Prerequisites
```
npm install -g @angular/cli
npm install -g gulp
npm install -g typescript
```
### Client (Angular)
Install dependencies, run unit and end-to-end tests:
```
cd client
npm install
ng test
ng e2e
```
Then start the development server:
```
ng server
```
### Server (Node/Express)
Install dependencies, compile TypeScript, run tests:
```
cd server
npm install
tsc
npm test
```
Then start the server:
```
node app
```
Note: Use `tsc -w` while actively developing.
### Packaging
Copy Angular build output to folder served by the Express app:
```
cd server
gulp publish
```
## Deploy to Heroku
Full build and deploy process:
```
git checkout release
git merge master
cd server
tsc
gulp publish
git commit -m <version>
git push heroku release:master
```
## Dependency Status
Client 

[![Dependency Status (client)](https://david-dm.org/Cynicollision/BrewKeeper/status.svg?path=client)](https://david-dm.org/Cynicollision/BrewKeeper?path=client)
[![Dependency Status (client)](https://david-dm.org/Cynicollision/BrewKeeper/dev-status.svg?path=client)](https://david-dm.org/Cynicollision/BrewKeeper?path=client&type=dev)

Server

[![Dependency Status (server)](https://david-dm.org/Cynicollision/BrewKeeper/status.svg?path=server)](https://david-dm.org/Cynicollision/BrewKeeper?path=server)
[![Dependency Status (server)](https://david-dm.org/Cynicollision/BrewKeeper/dev-status.svg?path=server&type=dev)](https://david-dm.org/Cynicollision/BrewKeeper?path=server&type=dev)
