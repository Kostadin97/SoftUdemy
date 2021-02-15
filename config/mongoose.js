const mongoose = require("mongoose");

module.exports = (app) => {
  mongoose.connect("mongodb://localhost:27017/softudemy", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", console.log.bind(console, "DB Connected!"));
};
