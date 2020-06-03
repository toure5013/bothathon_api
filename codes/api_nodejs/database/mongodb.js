// Using Node.js `require()`
const mongoose = require('mongoose');
const UserSchema = require('../app/models/User').UserSchema; //Users models
const TokenSchema = require('../app/models/Token').TokenSchema; //Token models
const dbConfig = require('../utils/config/dbConfig.json').mongodb;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

const uri = dbConfig.uri;


try {
    mongoose.connect(uri, options);
} catch (error) {
    handleError(error);
};

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
    console.log("Connection Successful!");
});



//user Model
var UserModel = mongoose.model('User', UserSchema);
var TokenModel = mongoose.model('Token', TokenSchema);


//Create collection
// db.createCollection('User', User.UserValidator);
// db.createCollection('Token', Token.TokenValidator);


module.exports = {
    db,
    mongoose,
    UserModel,
    TokenModel
}