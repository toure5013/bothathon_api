const jwt = require('jsonwebtoken');
const config = require('../../utils/config/config.json');
const verifyTokenMiddleware = require('../middlewares/tokenVerificationMiddleware');
const signinController = require('./auth.controller');
const message = require('../../utils/config/messages.json').message;
const logger = require('../middlewares/logMiddleware').logMiddleware;

class tokenGenerator {
    loginVerification(req, res) {
        var loginState = signinController.login(req, res);

        loginState.then((loginStateResult) => {

            if (loginStateResult.error == false) {
                const secret = config.tokenkey;
                let email = loginStateResult.email;
                // let password = loginStateResult.password;
                //Generation du token
                const loginDate = new Date();


                let token = jwt.sign({
                        email: email,
                        loginDate: loginDate
                    },
                    secret, {
                        //additional parameters to token , le token est valable un jour
                        expiresIn: config.token_valid_time
                    });
                //return the data to return to user after login
                const user_info = {
                    id: loginStateResult.user.id,
                    ID: loginStateResult.user.ID,
                    email: loginStateResult.user.email,
                    firstname: loginStateResult.user.firstname,
                    lastname: loginStateResult.user.lastname,
                    picturename: loginStateResult.user.picturename,
                }
                res.json({
                    error: false,
                    success: true,
                    status: 200,
                    message: message.success.login,
                    token: token,
                    role: loginStateResult.user.role,
                    user_info: user_info
                })
            } else {
                //-------------auth failed------------
                res.json({
                    error: true,
                    success: false,
                    status: 400,
                    message: loginStateResult.message
                })
            }
        }).catch((err) => {
            logger.error(JSON.stringify(err));
            console.log(JSON.stringify(err.message));
            res.json({
                error: true,
                success: false,
                status: 400,
                message: err.message,
            })
        })
    }


    index(req, res) {
        res.json({
            error: false,
            success: true,
            status: 200,
            message: "Bienvenue sur l'api v1"
        })
    }
}

module.exports = tokenGenerator;