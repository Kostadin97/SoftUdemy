const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  enrolledUsers: [],
  author: {
    type: String,
  }
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
