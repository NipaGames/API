const express = require("express");
const cors = require("cors")

const RequestLoader = require("./request/loader");
const Config = require("./config");
const error = require("./error");

const app = express();
app.use(cors());

const config = new Config("config.json");

config.get((data) => {
    const port = data.port;
    app.listen(port);
    console.log(`Listening on port ${port}!`);
});

app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status == 400 && "body" in err) {
        return error.send(res, 400, "Bad JSON syntax");
    }
});

app.get("", (req, res) => {
    res.send("NipaGames REST API");
});

const reqLoader = new RequestLoader(app);
reqLoader.load("scripts/requests/*.js");
reqLoader.createRequests();