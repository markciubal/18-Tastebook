const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280
    },
    user: {
      type: [{ type: ObjectId, ref: 'User' }]
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = model('Reaction', reactionSchema);

reactionSchema.set('timestamps', true);

module.exports = Reaction;
