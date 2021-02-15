const Tutorial = require('../models/Tutorial');

const create = (data) => {
    return new Tutorial(data).save();
}

module.exports = {
    create,
}