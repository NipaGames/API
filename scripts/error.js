module.exports = {
    send(res, errcode, errmsg) {
        let err = {
            "error": {
                "status": errcode,
                "message": errmsg
            }
        };
        res.status(400).send(err);
    }
};