# Brew Keeper

[![Build Status](https://travis-ci.org/Cynicollision/BrewKeeper.svg?branch=master)](https://travis-ci.org/Cynicollision/BrewKeeper)

Work in progress home brew journal for tracking bottling and refrigeration dates.

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
## Packaging
Copy Angular build output to folder served by the Express app:
```
cd server
gulp publish
```
