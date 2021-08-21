const mongoose = require('mongoose');

const { Schema } = mongoose;

const email = {
  type: String,
  trim: true,
  lowercase: true,
  required: true,
  match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please fill a valid email address'],
};

const localSchema = new Schema({
  email: {
    ...email,
    unique: true,
    sparse: true,
  },
  password: { type: String, required: true },
});

const userSchema = new Schema({
  google: {
    id: String,
  },
  facebook: {
    id: String,
  },
  local: {
    type: localSchema,
    required: false,
  },
  email,
  displayName: { type: String, required: true },
  avatar: String,
});

// eslint-disable-next-line func-names
userSchema.pre('validate', function (next) {
  if (!this.google.id
    && !this.facebook.id
    && (!this.local.email && !this.local.password)
  ) {
    return next(new Error('At least one identity provider is required.'));
  }
  return next();
});

mongoose.model('users', userSchema);
