const express = require('express');
const router = express.Router();

const authManager = require('../../Auth/authManager');

const Fixture = require('../../models/Fixture');

router.get('/scores', (req,res) => {
    Fixture.find()
        .populate('Team')
        .select('scores')
        .then(fixture => {
            res.send(fixture);
        }).catch( err => {
        res.status(500).send({"message":err.message});
    });
});
router.get('/scores/:id', (req,res) => {
    Fixture.find({ _id : req.params.id },(err, fixture) => {
        if (err){
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "fixture not found!" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving fixture with given Id " + req.params.id
            });
        }

        res.send(fixture);
    });

});
router.get('/pendingfixtures', (req,res) => {
    Fixture.find({ status : ['pending'] },(err, fixture) => {
        if (err){
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "fixture not found!" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving fixture with given Id " + req.params.id
            });
        }

        res.send(fixture);
    });

});
router.get('/completefixtures', (req,res) => {
    Fixture.find({ status : ['complete'] },(err, fixture) => {
        if (err){
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "fixture not found!" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving fixture with given Id " + req.params.id
            });
        }

        res.send(fixture);
    });

});
router.get('/', authManager, (req,res) => {
    Fixture.find()
        .populate('Team')
        .select()
        .then(fixture => {
            res.send(fixture);
        }).catch( err => {
            res.status(500).send({"message":err.message});
    });
});
router.post('/add', authManager, (req,res) => {
    const new_fixture = new Fixture(req.body);
    new_fixture.save((err,fixture) => {
        if(err)
            res.send(err);
        res.json(fixture);
    });
});
router.get('/search/:id', authManager, (req,res) => {
   Fixture.find({ _id : req.params.id },(err, fixture) => {
        if (err){
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "fixture not found!" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving fixture with given Id " + req.params.id
            });
        }

        res.send(fixture);
    });

});
router.put('/update/:id', authManager, (req,res) => {
    let id = req.params.id;
    let fixs = req.body;
    fixs.modified_by = Date.now();
    Fixture.findOneAndUpdate({_id: id},fixs,{new: true}, (err,fixture) => {
        if(err)
            res.send(err)
        res.json(fixture)
    });
});
router.delete('/delete/:id', authManager, (req, res) => {
    let id = req.params.id;
   Fixture.findOneAndDelete({_id:id}, (err,fixture) => {
       if(err)
           res.send(err)
       res.json({"message":"Fixture successfully deleted!!"})
   })
});

module.exports = router;
