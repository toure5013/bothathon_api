const logger = require('../../app/middlewares/logMiddleware').logMiddleware;
const userDbRequest = require('../../database/query/querySequelize/User.request');


var sameEmail = false;