const Fixture = require('../models/Fixture');
const faker = require("faker");
const expect = require('chai').expect;

const fixture = {
    team: {
        first_team: faker.name.firstName(),
        second_team: faker.name.firstName(),
    },
    stadium: faker.name.firstName(),
    playTime: "10:00 am"
};

describe("fixture management", () => {
   it("should create fixture", () => {
     Fixture.create(fixture, (err, result) => {
         if(err)
             console.log(err)
         expect(result).to.be(typeof  object);
     });
   });
});
