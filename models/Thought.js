const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String
    },
    user: {
      type: [{ type: ObjectId, ref: 'User' }]
    },
    reactions: {
      type: [{ type: ObjectId, ref: 'Friends' }]
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('Thought', thoughtSchema);

thoughtSchema.set('timestamps', true);

module.exports = Thought;
