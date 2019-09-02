'use strict';

var mongoose = require("mongoose"),
    User = mongoose.model("Users");

exports.create_user = function(req,res){
    var new_user = new User(req.body);
    new_user.save(function(err,user){
       if(err)
           res.send(err);
       res.json(user);
    });
};
exports.find_all_users = function(res,req){
    // User.find({},function(err,user){
    //    if(err)
    //        res.send(err);
    //    res.json(user);
    // });
    console.log("happy")
};
exports.find_one_user = function(res,req){
    User.findById(req.params.userId,function(err,user){
        if(err)
            res.send(err);
        res.json(user);
    });
};
exports.update_user = function(res,req){
    User.findOneAndUpdate({_id: req.params.userId},req.body,{new: true},function(err,user){
        if(err)
            res.send(err);
        res.json(user);
    });
};
