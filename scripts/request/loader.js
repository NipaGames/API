const path = require("path");
const glob = require("glob");
const RequestType = require("./type");

module.exports = class RequestLoader {
    constructor(app) {
        this.modules = {};
        this.app = app;
    }

    load(dir) {
        let modules = this.modules;
        glob.sync(dir).forEach(function(file) {
            const moduleName = path.parse(file).name;
            const fileName = path.parse(file).base;
            console.log(`Loaded ${fileName}!`);
            // glob.sync starts from process.cwd()
            modules[moduleName] = require(process.cwd() + "/" + file);
        });
    }

    createRequests() {
        for (const [file, module] of Object.entries(this.modules)) {
            for (const request of module.requests) {
                const url = request.url;
                switch (request.type) {
                    case RequestType.GET:
                        this.app.get(url, (req, res) => {
                            request.exec(req, res);
                        });
                        break;
                    case RequestType.POST:
                        this.app.post(url, (req, res) => {
                            request.exec(req, res);
                        });
                        break;
                    default:
                        this.app.get(url, (req, res) => {
                            return error.send(res, 500, "Internal exception in RequestLoader");
                        });
                        break;
                }    
            }
        }
    }
}