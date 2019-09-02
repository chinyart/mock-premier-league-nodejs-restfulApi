const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose
.Schema({
    full_name:{
        type: String,
        required: "Full name is required"
    },
    username:{
        type: String,
        unique: true,
        trim: true,
        required: "Username is required"
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        required: "Email address of this user is required."
    },
    password:{
        type: String,
        required: "Password is required."
    },
    role:{
      type: [{
          type: String,
          enum: ['admin','user']
      }],
      default: ['user']
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({email: email}, function (err,user) {
        if(err)
            res.send(err);
        if(user) {
            console.log(user);
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        }
    });
};

const User = module.exports = mongoose.model('User', UserSchema);
