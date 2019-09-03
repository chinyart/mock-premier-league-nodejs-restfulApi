const user = require('../models/User');
const faker = require("faker");
const expect = require('chai').expect;

let name = faker.name.firstName;
let username = faker.name.firstName;
let email = faker.internet.email();
let password = faker.internet.password();

const login_details = {
    email: email,
    password: password
};

const registration_details = {
    full_name: name,
    username: username,
    email: email,
    password: password,
};
// authenticate
describe('POST /auth/register', function () {
        it('should return a token', () => {
            var token = {};
            user.create(registration_details, (err, result) => {
                if(err)
                    console.log(err)
                token = result.token;
                expect(token).to.be(typeof object);
            });
        });
        it('should login successfully', () => {
            user.authenticate(email,password, (err, result) => {
                if(err)
                    console.log(err);
                expect(result).to.be(typeof object);
            });
        });
});


// describe('POST /admin/login', function () {
//     const authenticatedUser = request.agent(app)
//     it('respond with 200 created', function (done) {
//         request(app)
//         authenticatedUser
//             .post('/admin/login')
//             .send({
//                 "email": email,
//                 "password": password
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end((err) => {
//                 if (err) return done(err);
//                 done();
//             });
//     });
// });
