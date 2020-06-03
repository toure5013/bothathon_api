const winston = require('winston');
const winstonRotator =  require('winston-daily-rotate-file');
const date = new Date();


/*-------------------------------------------------------------------------------------------------------------------------------------
        Here I'll go use the date to give ti file name : this 'll permit to have one folder dayly, monthly or yearly
            For changing the save time change dateOfLog to dateOfLogDaily or dateOfLogMonthly or dateOfLogYearly.
//-------------------------------------------------------------------------------------------------------------------------------------*/

const day =date.getUTCDate() ;
const month = (date.getUTCMonth()+1);
const year = date.getUTCFullYear();

//Create one folder per day
var dateOfLogDaily = day + "-" +  month+ "-" + year;

//Create one folder per  month
var dateOfLogMonthly = month + "-" + year;

//Create one folder per year 
var dateOfLogYearly = year;

//-------Date of save : default is daily-------
var dateOfLog = dateOfLogMonthly;


/*---------------------------------------------------------------------------------
    Defintion des différents types de log et les fichiers dans lesquels enrégistré
//---------------------------------------------------------------------------------*/


const consoleConfig = new winston.transports.Console({
        'colorize' : true
    });

const infoConfig =  new winston.transports.File({
        filename : './utils/logs/'+ dateOfLog + '/info.log',
        level : 'info',
    });

const errorConfig =    new winston.transports.File({
            filename : './utils/logs/'+ dateOfLog +'/error.log',
            level : 'error',
        });

const debugConfig = new winston.transports.File({
        filename : `./utils/logs/${dateOfLog}/debug.log`,
        level : 'debug',
    });

const warningConfig = new winston.transports.File({
            filename : `./utils/logs/${dateOfLog}/warning.log`,
            level : 'warn',
    });

const sillyCongig = new winston.transports.File({
            filename : `./utils/logs/${dateOfLog}/silly.log`,
            level : 'silly',
    });




/*---------------------------------------------------------------------
                        Mise en forme du message de log
        --------Exemple :
-pour un code : errorLog.logMiddleware.warn('message de log ');
-on a un retour de ce type : - Date : 2019-10-13T17:41:20.350Z  --  level : warn -- message : message de log
//---------------------------------------------------------------------*/

const myFormat = winston.format.printf(({level,timestamp,message})=>{
        return `- Date : ${timestamp}  --  level : ${level} -- message : ${message} ` ;
    });



/*---------------------------------------------------------------------
                        Defintion des différents types de log
//---------------------------------------------------------------------*/
exports.logMiddleware =  winston.createLogger({
    format : winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.label(),
        winston.format.colorize(),
        myFormat
    ) ,
    //to caught log and save in file
    transports : [
        consoleConfig,
        infoConfig, 
        errorConfig,
        debugConfig,
        warningConfig,
    ],
    //To caught exception and save in file
    exceptionHandlers : [
        new winston.transports.File(
            {
                filename : './utils/logs/'+ dateOfLog +'/Exception.log',
            }),
    ]
});




/*---------------------------------------------------------------------
                Supprimé un type de log et son fichier 
//---------------------------------------------------------------------*/

//remove transport 
// exports.combineLogs = createLogger.transports.find(transports=>{
//     return transports.filename === 'filename.log';
// });
