const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  google: {
    id: String,
  },
  facebook: {
    id: String,
  },
  local: {
    username: String,
    password: String,
  },
  email: String,
  displayName: String,
  avatar: String,
});

// eslint-disable-next-line func-names
userSchema.pre('validate', function (next) {
  if (!this.google.id
    && !this.facebook.id
    && (!this.local.username && !this.local.password)
  ) {
    return next(new Error('At least one identity provider is required.'));
  }
  return next();
});

mongoose.model('users', userSchema);
