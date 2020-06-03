// Bcrypt to hash user password
const bcrypt = require('bcrypt')
const message = require('../../utils/config/messages.json').message

const logger = require('../middlewares/logMiddleware').logMiddleware
const userDbRequest = require('../../database/query/User.query');
const tokenDbRequest = require('../../database/query/Token.query')

var dataReturn = {}

exports.login = (req, res) => {
    console.log(req.body)
    var email = req.body.email;
    var password = req.body.password
    return new Promise((resolve, reject) => {
        userDbRequest
            .findOneByEmail(email)
            .then(
                // if all is ok
                user => {
                    if (user) {
                        const userPasswordFromDataBase = user.password
                        console.log(userPasswordFromDataBase)
                        bcrypt.compare(
                            password,
                            userPasswordFromDataBase /* this is the password get from database */ ,
                            (err, result) => {
                                if (result) {
                                    dataReturn = {
                                        error: false,
                                        status: 200,
                                        email: email,
                                        password: userPasswordFromDataBase,
                                        user: user,
                                        message: 'SUCCESS : ' + message.success.login
                                    }
                                    resolve(dataReturn)
                                } else {
                                    dataReturn = {
                                        error: true,
                                        status: 404,
                                        message: 'ERROR : Mot de pass ne correspond pas'
                                    }
                                    resolve(dataReturn)
                                }
                            }
                        )
                    } else {
                        console.log('something went wrong')
                        dataReturn = {
                            error: true,
                            status: 404,
                            message: 'ERROR : User not found'
                        }
                        resolve(dataReturn)
                    }
                }
            )
            .catch(e => {
                // if err
                console.log('something went wrong')
                dataReturn = {
                    error: true,
                    status: 404,
                    message: 'ERROR : User not found'
                }
                resolve(dataReturn)
            })
    })
}

exports.logout = (req, res, next) => {
    const { email, token } = req.body
    tokenDbRequest
        .insert(email, token)
        .then(
            // if all is ok
            result => {
                if (result) {
                    res.json({
                        error: true,
                        success: false,
                        status: 200,
                        message: 'Token depreciated with success'
                    })
                } else {
                    res.json({
                        error: true,
                        success: false,
                        status: 400,
                        message: 'ERROR : Token not added'
                    })
                }
            }
        ).catch(e => {
            // if err
            res.json({
                error: true,
                success: false,
                status: 400,
                message: 'ERROR : ' + JSON.stringify(e)
            })
        });
}