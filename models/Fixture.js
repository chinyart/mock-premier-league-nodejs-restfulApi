const mongoose = require('mongoose');

const fixtureSchema = mongoose.Schema({
    //id of first team
    team: {
        first_team: {
            type: String,
            required: "The first team is required.",
            trim: true,
        },
        second_team: {
            type: String,
            required: "Second team is required.",
            trim: true,
        },
    },
    score: {
        teamA_score:{
            type: Number,
            default: 0
        },
        teamB_score:{
            type: Number,
            default: 0
        }
    },
    status:{
        type: [{
            type: String,
            enum: ["pending","complete"],
        }],
        default: ["pending"],
    },
    stadium: {
        type: String,
        required: "Stadium is required."
    },
    playDate: {
        type: Date,
        default: Date.now()
    },
    playTime:{
        type: String,
        required: "Play time is required."
    },
    created:{
        type: Date,
        default: Date.now()
    },
    modified_by:{
        type: Date,
        default: null
    }
});

const Fixture = module.exports = mongoose.model('Fixture',fixtureSchema);
