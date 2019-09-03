const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/', (req,res) => {
   User.find({}, (err, user) => {
      if(err)
          res.send(err)
       res.json(user)
   });
});

router.post('/register', (req,res,next) => {

    User.findOne({email: req.body.email}, function (err,user) {
        if(err)
            res.send(err);
        if(user)
            return res.status(400).send('User already exist!');
        else {
            if (req.body.password !== req.body.passwordConf) {
                return res.status(401).send('Password does not match!');
            }
            if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {

                let userData = {
                    full_name: req.body.full_name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    role: req.body.role,
                };

                User.create(userData, function (error, user) {
                    if (error) {
                        return next(error);
                    } else {
                        return res.json({"message":"done",user});
                    }
                });

            } else {
                res.status(400).send('That user already exists!');
            }
        }
    });

});

router.put('/:id',(req,res)=>{
    let id = req.params.id
   User.findOneAndUpdate({_id: id}, req.body, {new: true}, (err,user) =>{
       if(err)
           res.send(err)
       res.json(user)
   }) ;
});

router.get('/:id',(req,res)=>{
   let id = req.params.id
    User.findById(id,(err,user)=>{
        if(err)
            res.send(err)
        res.json(user)
    });
});

router.delete(':/id',(req,res) => {
    let id = req.params.id
   User.findOneAndDelete({_id: id}, (err,user)=>{
       if(err)
           res.send(err)
       res.json({"message":"User deleted successfully."})
   })
});


module.exports = router;
