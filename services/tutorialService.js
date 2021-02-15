const Tutorial = require('../models/Tutorial');

const create = (data) => {
    return new Tutorial(data).save();
}

async function getAll() {
    let tutorials = await Tutorial.find({}).lean();

    return tutorials;
}

module.exports = {
    create,
    getAll,
}