const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Query = new Schema({
    name: {
        type: String
    },
    email: {
        type: String 
    },
    phone: {
        type: String
    },
    query: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});

exports.find= function(){
    return mongoose.model('Query', Query);
}