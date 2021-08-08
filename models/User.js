const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  displayName: String,
  imageUrl: String,
});

mongoose.model('users', userSchema);
