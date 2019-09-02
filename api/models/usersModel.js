'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name:{
        type: String,
        required: 'Kindly provide first name of this user'
    },
    last_name:{
        type: String,
        required: 'Kindly provide last name of this user'
    },
    username:{
        type: String,
        required: 'Kindly provide the username of this user'
    },
    email_address:{
        type: String,
        required: 'Kindly provide the email address of this user'
    },
    password:{
        type: String,
        required: 'Password is required.'
    },
    role:{
        type: [{
            type: String,
            enum: ['Admin','User']
        }],
        default: ['User']
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Users', UserSchema);
