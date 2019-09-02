'use strict';

module.exports = function(app){
    let fixture = require('../controllers/fixtureController'),
        team = require('../controllers/teamController'),
        auth = require('../controllers/authController'),
        express = require('express'),
        router = express.Router(),
        middlewareVerifyToken = require('../controllers/VerifyToken');

    //display all team
    router.get('/team',team.list_team())
    //find just one team
    router.get('/team/:teamId',team.find_one_team())
    //create a team
    router.post('/team',team.create_team())
    //update a team
    router.put('/team/:teamId',team.update_team())
    //delete a team
    router.delete('/team/:teamId',team.remove_team())


    //display all fixture
    router.get('/fixture',fixture.list_fixtures())
    //find just one fixture
    router.get('/fixture/:fixtureId',fixture.find_one_Fixture())
    //create a new fixture
    router.post('/fixture',fixture.new_fixtures())
    //update a fixture
    router.put('/fixture/:fixtureId',fixture.update_fixture())
    //delete a fixture
    router.delete('/fixture/:fixtureId',fixture.remove_fixture())

}
