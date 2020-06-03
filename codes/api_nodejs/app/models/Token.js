/*----------------------------------------------------------
                //Modeling Token table
------------------------------------------------------------*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../../database/mongodb').db;
const TokenSchema = new Schema({
    // attributes
    email: String,
    token: String,
    depreciated: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const TokenValidator = {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['email', 'token'],
            properties: {
                email: {
                    bsonType: 'string'
                },
                token: {
                    bsonType: 'string'
                },
                createdAt: {
                    bsonType: 'string'
                },
                createdAt: {
                    bsonType: 'string'
                }
            }
        }
    }
}

module.exports = {
    TokenSchema,
    TokenValidator
}