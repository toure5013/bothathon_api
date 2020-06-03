/*----------------------------------------------------------
                //Modeling user table
------------------------------------------------------------*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    // attributes
    firstname: String,
    lastname: String,
    ID: String,
    email: String,
    password: String,
    // role: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: 0
    // },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = {
    User
}