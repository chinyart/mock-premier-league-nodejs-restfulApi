'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    config = require('../../config');

exports.create_user = function(req,res){

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            username : req.body.username,
            email_address : req.body.email_address,
            role : [req.body.role],
            password : hashedPassword
        },
        function (err, user) {
            if (err)
                return res.status(500).send("There was a problem registering the user.")

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, status : 200, message : 'User created!' });

    });
};
exports.getToken = function(req,res,next){
    //collect the user token attached to the header property
    //like a Bearer value and fetch then verify if it exist
    var token = req.headers['x-access-token'];
    //If there is no token provided with the request the server
    // sends back an error. To be more precise,
    //an 401 unauthorized status with a response message of ‘No token provided’.
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided, kindly provide a user token.' });

    //If the token exists, the jwt.verify() method will be called.
    // This method decodes the token making it possible to view the original payload.
    jwt.verify(token, config.secret, function(err, decoded) {
        console.log(token);
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        //if there are no errors
        //send back the decoded value as the response.
        // res.status(200).send(decoded);/

        //verify that the jwt decoded id actually belongsTo the newly created user
        //refused to return the password among the json object (projection)
        User.findById(decoded.id, {password : 0} , (err, retrieved_user) => {
            if(err){
                return res.status(500).send('User was not found!');
            }
            if (!retrieved_user)
                return res.status(404).send("No user found.");
            res.status(200).send(retrieved_user);
            // next(retrieved_user); // add this line
        });
    });
};
exports.userLogin = function(req, res){
    User.findOne({ email: req.body.email }, function (err, user) {
        // let user_data = found_user;
        // console.log(found_user);
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        //compare the request password with the retrieved hashed user password in the database
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) //wrong password
        //if password and saved password is not the same
        //return
            return res.status(401).send({ auth: false, token: null, status : 401, message : 'Incorrect Username of Password' });
        //if the password sent from the request matches the password in the db
        //we call the jwt .sign method with an object value with the secret key
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token, user : user, message : 'Login successful!'});
    });
};
exports.logOut = function(req, res){
    //this end point is not necessarily needed
    //it can be done by the front-end .. also the act of setting a token to null
    res.status(200).send({ auth: false, token: null });
};
