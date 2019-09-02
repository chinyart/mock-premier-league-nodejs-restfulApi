'use strict';

var mongoose = require("mongoose"),
    Fixture = mongoose.model("Fixtures");

exports.list_fixtures = function(req,res){
    Fixture.find({},function(err,fixtures){
        if(err)
            res.send(err);
        res.json(fixture);
    });
};
exports.new_fixtures = function (req,res){
    var new_fixture = new Fixture(req.body);
    new_fixture.save(function(err,fixtures){
       if(err)
           res.send(err);
       res.json(fixtures);
    });
};
exports.find_one_Fixture = function(req,res){
    Fixture.findById(req.params.fixtureId,function(err, fixture){
       if(err)
           res.send(err);
       res.json(fixture);
    });
};
exports.update_fixture = function(req,res){
    Fixture.findOneAndUpdate({_id: req.params.fixtureId},req.body,{new: true},function(err, fixture){
       if(err)
           res.send(err);
       res.json(fixture);
    });
};
exports.remove_fixture = function(req,res){
    Fixture.remove({_id: req.params.fixtureId},function (err, fixture){
        if(err)
            res.send(res);
        res.json({"message":"Fixture removed successfully!!!"})
    });
};
