const fs = require("fs");

module.exports = class APIConfig {
    constructor(path) {
        this.path = path;
    }
    get(callback) {
        fs.readFile(this.path, (err, data) => {
            if (err)
                throw err;
            let config = JSON.parse(data);
            callback(config);
        });
    }
};