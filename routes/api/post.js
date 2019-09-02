const express = require('express');
const router = express.Router();
const authManager = require('../../Auth/authManager');
const Post = require('../../models/Post');

const jwt  = require('jsonwebtoken');

router.get('/', authManager, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (error, result) => {
        console.log(req.token);
        console.log(req);
        Post.find({}, (err, post) => {
            if(err)
                  res.send(err);
            res.json(post);
        });

    });
});

router.post('/add', (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;
    const new_post = new Post({
        title: title,
        body: body
    });
    new_post.save()
        .then( posts => res.json(posts))
        .catch(err => console.log(err))
})

router.put('/update/:id', (req,res,next) => {
    //grab the id of the post
    let id = req.params.id;
   //find the post by id from the database
    let post = Post.findById(id)
        .then(post => {
            post.title = req.body.title;
            post.body = req.body.body;
            post.save()
                .then(post => {
                    res.send({"message":"update is successful", "status": true, "post": post})
                })
                .catch(err => console.log(err))
        })
        .catch(err=> console.log(err))
});

module.exports = router;
