const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String
    },
    user: {
      type: ObjectId,
      ref: 'User'
    },
    reactions: {
      type: [{ type: ObjectId, ref: 'Reaction' }]
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.set('timestamps', true);

thoughtSchema.virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;
