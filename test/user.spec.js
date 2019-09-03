const app = require('../Auth/authController');
const faker = require("faker");
const expect = require('chai').expect;
const request = require('supertest');

let email = (faker.internet.email()).toLowerCase();
let password = (faker.internet.password()).toLowerCase();

describe('POST /admin/signup', function () {
    it('respond with 200 created', function (done) {
        request(app)
            .post('/admin/signup')
            .send({
                "full_name": faker.name.firstName(),
                "username": faker.internet.userName(),
                "email": email,
                "password": password
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /admin/login', function () {
    const authenticatedUser = request.agent(app)
    it('respond with 200 created', function (done) {
        request(app)
        authenticatedUser
            .post('/admin/login')
            .send({
                "email": email,
                "password": password
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
