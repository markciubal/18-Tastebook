const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
      max_length: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, 'Please enter a valid email address.']
    },
    thoughts: {
      type: [{ type: ObjectId, ref: 'Thoughts' }]
    },
    friends: {
      type: [{ type: ObjectId, ref: 'Friends' }]
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.set('timestamps', true);

const User = model('User', userSchema);

module.exports = User;
