/*----------------------------------------------------------
                //Modeling Token table
------------------------------------------------------------*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema({
    // attributes
    email: String,
    token: String,
    depreciated: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = {
    Token
}