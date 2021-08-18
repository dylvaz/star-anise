/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const localLoginSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  googleID: String,
  username: String,
  localLogin: localLoginSchema,
});

localLoginSchema.pre('save', (next) => {
  const loginUser = this;

  if (!loginUser.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // eslint-disable-next-line no-shadow
    bcrypt.hash(loginUser.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      loginUser.password = hash;
      next();
    });
  });
});

mongoose.model('users', userSchema);
