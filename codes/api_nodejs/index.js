//BISMILAHI RAHMANI RAHIM
//ALAHOUMA SOLI ALA MOUHALIMANA MOUHALIMA AL-BACHARIYA SOLAWATOU RABI ALEY-HI WA ALA ALI-HI WA SOH-BIHI WA SALIM DA IMAN ABADAN

'use strict'

/* ----------------------------------------------------------------------------------
                                Nodejs Modules
-----------------------------------------------------------------------------------*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const expressValidator = require('express-validator')
const config = require('./utils/config/config.json');
//defining the Express App
const app = express();

//Variables
const baseUrl = config.base_url;
const publicPath = path.join(__dirname, config.public_file);

/* ----------------------------------------------------------------------------------
                                MIDDLEWARE
-----------------------------------------------------------------------------------*/
//Adding morgan to log HTTP requests
app.use(morgan('combined'));

// Adding helmet to enhance your API's security 
app.use(helmet());


// Using body parser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//express validator
//app.use(expressValidator());


//Enabling CORS
app.use(cors());



/* ----------------------------------------------------------------------------------
                            Personal Modules and variables
-----------------------------------------------------------------------------------*/
// const migrate = require('../database/migration');
// console.log(migrate);
const routes = require('./src/routes/routes');
const logger = require('./app/middlewares/logMiddleware').logMiddleware;


/* ----------------------------------------------------------------------------------
                                    ROUTES
-----------------------------------------------------------------------------------*/

//Root route
app.get("/", (req, res) => {

    var welcome = "----------------------------------------------------------<br>";
    welcome += " -- Bienvenue sur api v1, ton baseUrl est " + baseUrl + "--<br>";
    welcome += "----------------------------------------------------------<br>";
    console.log("welcome")
    res.status(200).send(welcome)
});

//Other routes(user,...)
routes.configRoutes(baseUrl, app);


//undefined routes (404)
app.use("/*", (req, res) => {
    var welcome = "----------------------------------------------------------<br>";
    welcome += " -- Bienvenue sur api v1, ton baseUrl est " + baseUrl + "--<br>";
    welcome += "----------------------------------------------------------<br>";
    res.status(404).json({
        api: welcome,
        "error": true,
        "status": 404,
        "message": "Page not found"
    })
});


/* ----------------------------------------------------------------------------------
                                SERVER LISTENING
-----------------------------------------------------------------------------------*/
app.listen(config.port, config.hostname, () => {
    console.log("Applcation démarrer sur http://" + config.hostname + ":" + config.port);
    logger.info("Application démarré sur " + config.hostname + ":" + config.port);

});