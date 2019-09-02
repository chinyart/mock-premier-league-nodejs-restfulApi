const express = require('express');
const router = express.Router();
const authManager = require('../../Auth/authManager');

const jwt = require('jsonwebtoken');

const Team = require('../../models/Team');

router.get('/', authManager, (req,res) => {
        Team.find({}, (err, team) => {
            if (err)
                res.send(err);
            res.json(team)
        });
});

router.post('/add', authManager, (req,res) =>{
        const new_team = new Team(req.body);
        new_team.save((err,team)=>{
            if(err)
                res.send(err);
            res.json(team)
        })
});

router.put('/update/:id', authManager, (req,res) =>{
        const id = req.params.id;
        Team.findOneAndUpdate({_id: id}, req.body,{new: true},(err,team) =>{
            if(err)
                res.send(err)
            res.json(team)
        });
});

router.get('/team/:id', authManager, (req,res) =>{
        const id = req.params.id;
        Team.findById(id,(err,team)=>{
            if(err)
                res.send(err);
            res.json(team);
        });
});

router.delete('/delete/:id',authManager, (req,res)=>{
        const id = req.params.id;
        Team.findOneAndDelete({_id: id},(err,team)=>{
            if(err)
                res.send(err);
            res.json({"message":"Team deleted successfully!"})
        });
});

module.exports = router;
