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
