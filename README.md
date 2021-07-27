### NipaGames REST API
## What is it?
This API is used for the backend in my website (https://nipagames.com/).
It is hosted in https://ngapi.nipagames.repl.co/ (yes, free hosting = good)
## How to use it?
_All responses are returned in JSON-format_\
HTTP GET request table:
- /btd6: My BTD6 playtime (from Steam)
- /apps/\[appname\]: Application info (only the version so far)
## How to modify it?
I highly recommend to take a look at express.js before trying to modify this.\
_All scripts (excluding node_modules) should be located in scripts/_
### Creating a new request
Write a new script to scripts/requests/ to create a new request.\
Request file syntax:
- type: see RequestType
- url: url of the request (in express.js format)
- exec: is executed when a request is sent (parameters from express.js)
### RequestLoader (request/loader.js)
RequestLoader loads all .js-files from the folder dynamically when the program is started.\
### RequestType (request/type.js)
An enum file containing supported request types.
### config.json
Configuration file for the API.\
Fields\
- port: port for the API