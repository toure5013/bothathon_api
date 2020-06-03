/*-------------------------------------------------------
                        Modules
-------------------------------------------------------*/
const userRoute = require('./user.route');
const authRoute = require('./auth.route')




/*-------------------------------------------------------
                        Routes
-------------------------------------------------------*/
exports.configRoutes = (baseUrl, app) =>{
    userRoute.users(baseUrl, app);
    authRoute.auth(baseUrl, app);
}
