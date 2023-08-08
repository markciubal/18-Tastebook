const { User, Thought, Reaction } = require('../models');

module.exports = {
  // Get all reactions
  async getReaction(req, res) {
    try {
      const reaction = await Reaction.find();
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a reaction
  async getSingleReaction(req, res) {
    try {
      const reaction = await Reaction.findOne({ _id: req.params.reactionId })
        .select('-__v');

      if (!reaction) {
        return res.status(404).json({ message: 'No reaction with that ID' });
      }

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a reaction
  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $addToSet: { reactions: reaction._id } },
        { new: true }
      );
      console.log(thought);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId });

      if (!reaction) {
        res.status(404).json({ message: 'No reaction with that ID' });
      }
      res.json({ message: 'Reaction and students deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a reaction
  async updateReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndUpdate(
        { _id: req.params.reactionId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        res.status(404).json({ message: 'No reaction with this id!' });
      }

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
