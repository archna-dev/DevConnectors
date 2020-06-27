const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema, if we don't specify then it is always false.
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});
//hey mongoose build me a model which means build me a collection called collection as users using the schema. User will be the internal name while users will be the real name.
module.exports = User = mongoose.model('users', UserSchema);
