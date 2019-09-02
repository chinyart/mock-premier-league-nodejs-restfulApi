'use strict';

module.exports = function(app){
    let users = require('../controllers/usersController'),
        fixture = require('../controllers/fixtureController'),
        team = require('../controllers/teamController'),
        auth = require('../controllers/authController'),
        express = require('express'),
        router = express.Router();
        // middlewareVerifyToken = require('../controllers/VerifyToken');


    router.get('/users',users.find_all_users())
    router.post('/login', auth.userLogin())
    router.post('/login', auth.userLogin())
    // app.route('/users')
    //     .get(users.find_all_users())
    //     .post(users.create_user())
    // app.route('/users/:userId')
    //     .get(users.find_one_user())
    //     .put(users.update_user())
    //
    // app.route('/fixtures')
    //     .get(fixture.list_fixtures())
    //     .post(fixture.new_fixtures())
    // app.route('/fixtures/:fixtureId')
    //     .get(fixture.find_one_Fixture())
    //     .put(fixture.update_fixture())
    //     .delete(fixture.remove_fixture())
    //
    // app.route('/teams')
    //     .get(team.list_team())
    //     .post(team.create_team())
    // app.route('/teams/:teamId')
    //     .get(team.find_one_team())
    //     .put(team.update_team())
    //     .delete(team.remove_team())
    //
    // app.route('/me')
    //     .get(auth.getToken())
    //
    // app.route('/login')
    //     .post(auth.userLogin())
    //
    // app.route('/logout')
    //     .get(auth.logOut())
    //
    // app.route('/register')
    //     .post(auth.create_user())
}
