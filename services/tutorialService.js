const Tutorial = require("../models/Tutorial");
const User = require("../models/User");

const create = (data) => {
  return new Tutorial(data).save();
};

async function getAll(query) {
  let tutorials = await Tutorial.find({}).lean();

  if (query.search) {
    tutorials = tutorials.filter((x) =>
      x.title.toLowerCase().includes(query.search)
    );
  }

  return tutorials;
}

function getOne(id) {
  return Tutorial.findById(id).lean();
}

function deleteTutorial(id) {
  return Tutorial.findByIdAndDelete(id);
}

function editTutorial(id, data) {
  return Tutorial.findByIdAndUpdate(id, data);
}

async function enroll(tutorialId, userId) {
  let tutorial = await Tutorial.findById(tutorialId);
  let user = await User.findById(userId);

  tutorial.enrolledUsers.push(user._id);
  return tutorial.save();
}

async function like(tutorialId, userId) {
  let tutorial = await Tutorial.findById(tutorialId);
  let user = await User.findById(userId);

  tutorial.likes.push(user._id);
  return tutorial.save();
}

async function comment(tutorialId, comment) {
  let tutorial = await Tutorial.findById(tutorialId);

  tutorial.comments.push(comment);
  return tutorial.save();
}


module.exports = {
  create,
  getAll,
  getOne,
  deleteTutorial,
  editTutorial,
  enroll,
  comment,
  like
};
