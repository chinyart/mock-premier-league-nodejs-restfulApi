'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FixtureSchema = new Schema({
    fixture_name:{
        type: String,
        required: "Fixture name is required."
    },
    first_team:{
        type: String,
        required: "First team is required."
    },
    second_team:{
        type: String,
        required: "Second team is required."
    },
    fixture_score:{
        type: Number,
        default: 0
    },
    fixture_status:{
        type: [{
            type: String,
            enum: ['Pending','Completed']
        }],
        deafult: ['Pending']
    },
    created:{
        type: Date,
        required: Date.now()
    }
});

module.exports = mongoose.model("Fixtures",FixtureSchema);
