const RequestType = require("../request/type");
const error = require("../error");
const btd6ID = 960090;
const request = require("request");

module.exports = {
    requests: [
        {
            type: RequestType.GET,
            url: "/btd6",
            exec(req, res) {
                let hoursOnRecord = -1;
                let hoursLast2Weeks = -1;
                request('http://steamcommunity.com/id/nipagames/games?xml=1', function (err, response, body) {
                    if (!err && response.statusCode == 200) {
                        var parseString = require('xml2js').parseString;
                        parseString(body, function (err, r) {
                            if (err)
                                return error.send(res, 500, "Invalid XML format");
                            r.gamesList.games[0].game.forEach(e => {
                                if (e.appID == btd6ID) {
                                    hoursOnRecord = e.hoursOnRecord[0];
                                    hoursLast2Weeks = e.hoursLast2Weeks[0];
                                }
                            });
                            return res.send({"hoursOnRecord": hoursOnRecord, "hoursLast2Weeks": hoursLast2Weeks});
                        });
                    }
                    else
                        return error.send(res, 500, "GET request failed");
                });
            }
        }
    ]            
}