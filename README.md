# Friday-charity-meals

This is a voluntary project created to help organize and manage the friday meals charity deliveries to homes of the needy.
It provides a system for registeering and assigning volunteers as well as a way for them to access their assignments and report completion

## Requires

Built with Vue.js and integrated with firebase RTDB, AUTH and Hosting

## Development

* Run ```npm install``` in ```client``` folder
* Add ```.env.local``` file in ```client``` directory based on ```.env.local.emulators``` file in the same directory
* Run ```npm run serve-client``` from root directory or ```npm run serve``` from client directory will create development server on localhost:4200

### Use Firebase local emulator

This requires firebase cli

* Rename ```.env.local.emulators``` to ```.env.local```
* Run ```firebase emulators:start``` or ```firebase emulators:start --import emulators-data``` to start with users and data