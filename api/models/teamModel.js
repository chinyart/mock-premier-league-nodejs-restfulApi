'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    team_name:{
        type: String,
        required: "Please provide name for this team"
    },
    team_number:{
        type: Number,
        required: "How many are they in the team"
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Team",TeamSchema);
