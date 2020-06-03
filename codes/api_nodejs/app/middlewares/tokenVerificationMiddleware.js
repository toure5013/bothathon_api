const jwt = require("jsonwebtoken");

//Personal modules
// const login = require('../../src/controllers/signin.controller');
const message = require("../../utils/config/messages.json").message;
const config = require("../../utils/config/config.json");
const logger = require("./logMiddleware").logMiddleware;
const tokenDbRequest = require("../../database/query/Token.query");

let checkToken = (req, res, next) => {
    //   console.log(req.headers);
    logger.info(JSON.stringify(req.headers));

    //get token from headers (express headers are auto converted to lowercase)
    let token = req.headers["x-access-token"] || req.headers["authorization"] || req.headers["Authorization"];
    try {
        if (token.startsWith("Bearer")) {
            //Remove Bearer
            token = token.slice(7, token.length);
        }
    } catch (e) {
        token = false;
        logger.error("Error token invalid " + JSON.stringify(e));
        return res.json({
            error: true,
            success: false,
            status: 400,
            message: "Error token invalid " + JSON.stringify(e)
        });
    }

    //We verify if token is present and valid
    if (token) {
        const secret = config.tokenkey;
        tokenDbRequest.findOneToken(token).then(result => {
            console.log(result);
            console.log("tok tok tok to,")
            if (result.length !== 0) {
                return res.json({
                    error: true,
                    success: false,
                    status: 500,
                    message: message.error.missing_token,
                });
            } else {
                jwt.verify(token, secret, (err, decoded) => {
                    console.log(decoded)
                    if (err) {
                        return res.json({
                            error: true,
                            success: false,
                            status: 500,
                            message: message.error.invalid_token,
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            }
        });
        //we verify if the token is valid
    } else {
        return res.json({
            error: true,
            success: false,
            status: 400,
            message: message.error.missing_token,
        });
    }
};

module.exports = {
    checkToken,
};