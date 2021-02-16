const Tutorial = require("../models/Tutorial");

const create = (data) => {
  return new Tutorial(data).save();
};

async function getAll(query) {
  let tutorials = await Tutorial.find({}).lean();

  if (query.search) {
    tutorials = tutorials.filter(x => x.title.toLowerCase().includes(query.search));
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

module.exports = {
  create,
  getAll,
  getOne,
  deleteTutorial,
  editTutorial
};
