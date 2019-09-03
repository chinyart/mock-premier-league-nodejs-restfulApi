const Team = require('../models/Team');
const faker = require("faker");
const expect = require('chai').expect;

const team = {
    name: faker.name.firstName(),
    members: 11,
    coach: faker.name.firstName(),
};

describe('team management', () => {
   it("should create a team", () => {
       Team.create(team, (err, result) => {
          if(err)
              console.log(err)
           expect(result).to.be(typeof object);
       });
   }) ;
});
