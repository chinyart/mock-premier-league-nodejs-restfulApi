const express = require('express');

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req,res,next) => {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                // let err = new Error('Wrong email or password.');
                // err.status = 401;
                return res.send({"message":"Wrong email or password!"});
            } else {
                jwt.sign(req.body, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                    res.json({
                        token,
                        user
                    });
                });
            }
        });
    } else {
        return res.send({"error": 401,"message":"Email address and password is required!"})
    }

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

router.get('/logout', (req, res) => {
    //this end point is not necessarily needed
    //it can be done by the front-end .. also the act of setting a token to null
    res.status(200).send({ token: null, user: null });
});


module.exports = router;
