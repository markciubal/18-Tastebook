const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// Schema to create Student model
const reactionSchema = new Schema(
  {
    thoughtId: {
      type: ObjectId,
      ref: 'Thought'
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280
    },
    userId: {
      type: ObjectId,
      ref: 'User'
    }
  }
);
reactionSchema.set('timestamps', true);

const Reaction = model('Reaction', reactionSchema);



module.exports = Reaction;
