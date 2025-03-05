
const mongoose = require('mongoose');
const Firm = require('./Firm'); // Add this line to require the 'Firm' model

const vendorSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;