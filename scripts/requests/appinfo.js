const RequestType = require("../request/type");
const error = require("../error");
const fs = require("fs");

module.exports = {
    requests: [
        {
            type: RequestType.GET,
            url: "/apps",
            exec(req, res) {
                return error.send(res, 400, "Application name is not defined");
            }
        },
        {
            type: RequestType.GET,
            url: "/apps/:appname",
            exec(req, res) {
                const appname = req.params.appname;
                fs.readFile(`res/appinfo/${appname}.json`, (err, data) => {
                    if(err)
                        return error.send(res, 400, "Invalid application name");
                    res.send(data);
                });
            }
        }
    ]
}