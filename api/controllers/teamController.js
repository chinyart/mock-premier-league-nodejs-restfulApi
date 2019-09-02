'use strict';

var mongoose = require("mongoose"),
    Team = mongoose.model("Team");

exports.list_team = function(req,res){
    Team.find({},function(err,team){
       if(err)
           res.send(err);
       res.json(team);
    });
};
exports.create_team = function(req,res){
    var new_team = new Team(req.body);
    new_team.save(function(err,team){
        if(err)
            res.send(err);
        res.json(team);
    });
};
exports.update_team = function(req,res){
    Team.findOneAndUpdate({_id: req.params.teamId},req.body,{new: true},function(err, team){
        if(err)
            res.send(err);
        res.join(team);
    });
};
exports.find_one_team = function(req,res){
    Team.findById( req.params.teamId, function(err,team){
        if(err)
            res.send(err);
        res.json(team);
    });
};
exports.remove_team = function(req,res){
    Team.remove({_id: req.params.teamId},function(err,team){
       if(err)
           res.send(err);
       res.json({"message":"Team removed successfully!!"});
    });
};
