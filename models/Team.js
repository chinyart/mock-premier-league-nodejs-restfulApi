const  mongoose = require('mongoose')
const TeamSchema = mongoose.Schema({
    name:{
        type: String,
        required: "This team name is required."
    },
    members:{
      type: Number,
      required: "Member count is required"
    },
    coach:{
      type: String,
      required: "Coach is required."
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

const Team = module.exports = mongoose.model('Team', TeamSchema);
